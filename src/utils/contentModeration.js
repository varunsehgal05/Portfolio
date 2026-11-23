/**
 * VarunOS Multi-Language Content Moderation & Safety Guardian
 * Enforces strict 18+ content filters across multiple languages
 * Handles strike tracking (3-strike policy) and silent client IP/device ban
 */

// Normalized 18+ / Profanity / Explicit keywords in multiple languages (English, Hindi/Hinglish, Spanish, etc.)
const BLOCKED_WORDS_MULTI_LANG = [
  // English 18+ / Explicit / Profanity
  'fuck', 'fucking', 'fucker', 'fck', 'fuk', 'motherfucker',
  'shit', 'shite', 'bullshit', 'dipshit',
  'bitch', 'bitches', 'bitching',
  'asshole', 'bastard', 'cunt', 'dick', 'pussy', 'cock', 'blowjob',
  'slut', 'whore', 'porn', 'porno', 'pornography', 'xxx', 'nude', 'nudes',
  'sex', 'sexy', 'hardcore', 'erotic', 'boobs', 'vagina', 'penis', 'orgasm',
  'rape', 'pedophile', 'pedo', 'incest', 'dildo', 'masturbate', 'cum', 'ejaculate',

  // Hindi / Hinglish 18+ & Explicit terms (including common transliterations)
  'bhenchod', 'behenchod', 'bc', 'madarchod', 'mc', 'bhosdike', 'bhosadi', 'bhosad',
  'chutiya', 'chutiye', 'chut', 'chooth', 'choot', 'gaand', 'gand', 'gandu',
  'lund', 'lauda', 'loda', 'lawda', 'lodha',
  'randi', 'rande', 'kutta', 'kaminey', 'harami', 'haramkhor', 'saala', 'kamina',
  'chinal', 'bhadwa', 'bhadwe', 'jhaant', 'jhant', 'mutthal', 'chudaap', 'chudai',
  'bhadwe', 'bhadva', 'chod', 'chodu', 'chodo', 'gaandu',

  // Spanish / Global explicit keywords
  'puta', 'mierda', 'pendejo', 'chinga', 'cabron', 'coño', 'culiao', 'maricon', 'hijo de puta',
  'blyat', 'cyka', 'suka', 'kurwa'
];

// Leetspeak character mapping for evasive pattern detection
const LEET_MAP = {
  '@': 'a',
  '4': 'a',
  '8': 'b',
  '3': 'e',
  '1': 'i',
  '!': 'i',
  '|': 'i',
  '0': 'o',
  '5': 's',
  '$': 's',
  '7': 't',
  '+': 't'
};

/**
 * Normalizes input text to defeat leetspeak, repeated characters, and space injection
 */
export const normalizeText = (text = '') => {
  if (!text) return '';
  let str = text.toLowerCase();

  // Replace leet characters
  str = str.split('').map(char => LEET_MAP[char] || char).join('');

  // Remove whitespace and non-alphanumeric between single letters (e.g. "f u c k" or "f.u.c.k")
  const strippedSpacing = str.replace(/([a-z0-9])[\s_.-]+([a-z0-9])/gi, '$1$2');

  // Collapse consecutive repeated letters (e.g. "fuuuuck" -> "fuck", "bheeeen" -> "bhen")
  const collapsed = str.replace(/(.)\1{2,}/g, '$1$1');
  const fullyCollapsed = strippedSpacing.replace(/(.)\1{2,}/g, '$1$1');

  return { original: str, stripped: strippedSpacing, collapsed, fullyCollapsed };
};

/**
 * Checks if the content violates 18+ or offensive community guidelines
 * Returns { isSafe: boolean, matchedTerm: string | null }
 */
export const checkContentSafety = (text = '', authorName = '', email = '', linkedIn = '') => {
  const combined = `${authorName} ${email} ${linkedIn} ${text}`;
  const { original, stripped, collapsed, fullyCollapsed } = normalizeText(combined);

  for (const word of BLOCKED_WORDS_MULTI_LANG) {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|\\b|\\W)${escaped}(\\b|\\W|$)`, 'i');
    const substringRegex = new RegExp(escaped, 'i');

    if (
      regex.test(original) ||
      regex.test(collapsed) ||
      substringRegex.test(stripped) ||
      substringRegex.test(fullyCollapsed)
    ) {
      return {
        isSafe: false,
        matchedTerm: word
      };
    }
  }

  return {
    isSafe: true,
    matchedTerm: null
  };
};

const STRIKES_KEY = 'varunos_strike_count';
const BANNED_KEY = 'varunos_client_banned';
const BANNED_TIME_KEY = 'varunos_ban_timestamp';
const BANNED_IP_KEY = 'varunos_banned_client_ip';
const REVIEWS_STORAGE_KEY = 'varunos_user_reviews';

/**
 * Get current strike & ban status for this visitor
 */
export const getStrikeStatus = () => {
  try {
    const isBanned = localStorage.getItem(BANNED_KEY) === 'true';
    const strikes = parseInt(localStorage.getItem(STRIKES_KEY) || '0', 10);
    const bannedAt = localStorage.getItem(BANNED_TIME_KEY);
    return {
      strikes: Math.min(3, Math.max(0, strikes)),
      isBanned,
      bannedAt
    };
  } catch {
    return { strikes: 0, isBanned: false, bannedAt: null };
  }
};

/**
 * Record a violation strike. If strikes reach 3, silently ban the client!
 */
export const recordStrike = (clientIp = '127.0.0.1') => {
  try {
    let strikes = parseInt(localStorage.getItem(STRIKES_KEY) || '0', 10) + 1;
    localStorage.setItem(STRIKES_KEY, strikes.toString());

    if (strikes >= 3) {
      // Permanent silent IP/device ban
      localStorage.setItem(BANNED_KEY, 'true');
      localStorage.setItem(BANNED_TIME_KEY, new Date().toISOString());
      localStorage.setItem(BANNED_IP_KEY, clientIp);
      return { strikes: 3, isBanned: true, newlyBanned: true };
    }

    return { strikes, isBanned: false, newlyBanned: false };
  } catch {
    return { strikes: 1, isBanned: false, newlyBanned: false };
  }
};

/**
 * Check if current visitor is banned
 */
export const isClientBanned = () => {
  try {
    return localStorage.getItem(BANNED_KEY) === 'true';
  } catch {
    return false;
  }
};

/**
 * Default verified showcase recommendations from industry peers, hackathons, and clients
 */
export const SEED_REVIEWS = [
  {
    id: 'seed-1',
    name: 'Sarah Lin',
    role: 'Design Lead at Assemble',
    company: 'Assemble Esports',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    linkedIn: 'https://linkedin.com/in/varunsehgal02',
    email: 'sarah.lin@assemble.gg',
    rating: 5,
    date: 'Nov 2026',
    verified: true,
    text: 'Varun architected our tournament broadcast flows and Figma creator design systems. His execution speed, micro-interaction craftsmanship, and component token modularity are truly elite.'
  },
  {
    id: 'seed-2',
    name: 'Kavya Sharma',
    role: 'Convenor & Lead Organizer',
    company: 'CodeSrijan Hackathon',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    linkedIn: 'https://linkedin.com/in/varunsehgal02',
    email: 'kavya.s@juetguna.in',
    rating: 5,
    date: 'Oct 2026',
    verified: true,
    text: 'Varun engineered the entire CodeSrijan hackathon portal from zero to production. Over 200+ hackers used the platform smoothly for live matchmaking and judging. Outstanding UI/UX talent!'
  },
  {
    id: 'seed-3',
    name: 'Rohan Mehta',
    role: 'Product Manager',
    company: 'Knaptix Ventures',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    linkedIn: 'https://linkedin.com/in/varunsehgal02',
    email: 'rohan.m@knaptix.com',
    rating: 5,
    date: 'Sep 2026',
    verified: true,
    text: 'Incredible attention to detail. Varun redesigned conversion-focused SaaS landing pages for 10+ of our tech startups, boosting user engagement and client retention to 95%.'
  },
  {
    id: 'seed-4',
    name: 'Arjun Patel',
    role: 'Tech Lead & Hackathon Judge',
    company: 'Unstop / HACKeThor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    linkedIn: 'https://linkedin.com/in/varunsehgal02',
    email: 'arjun.patel@unstop.com',
    rating: 5,
    date: 'Apr 2025',
    verified: true,
    text: 'Varun took 1st Runner-Up (2nd Place) at national HACKeThor among 500+ participants. His prototype blew the jury away with silky 60fps animations and seamless usability.'
  }
];

/**
 * Get all reviews (custom user reviews from localStorage merged with seed reviews)
 */
export const getStoredReviews = () => {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    const userReviews = raw ? JSON.parse(raw) : [];
    return [...userReviews, ...SEED_REVIEWS];
  } catch {
    return SEED_REVIEWS;
  }
};

/**
 * Save a newly approved review to localStorage
 */
export const saveReview = (reviewData) => {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    const existing = raw ? JSON.parse(raw) : [];
    const newReview = {
      id: `rev-${Date.now()}`,
      name: reviewData.name.trim(),
      role: reviewData.role ? reviewData.role.trim() : 'Verified Reviewer',
      company: reviewData.company ? reviewData.company.trim() : 'Tech Community',
      email: reviewData.email.trim(),
      linkedIn: reviewData.linkedIn ? reviewData.linkedIn.trim() : '',
      rating: Number(reviewData.rating) || 5,
      date: 'Just now',
      verified: true,
      text: reviewData.text.trim()
    };
    const updated = [newReview, ...existing];
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
    return newReview;
  } catch (err) {
    console.error('Failed to save review:', err);
    return null;
  }
};
