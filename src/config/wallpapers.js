export const desktopWallpapers = [
  {
    id: 'roxy-calendar',
    name: 'Roxy Ifrita (Teal Calendar)',
    tag: 'Zenless Anime Calendar',
    thumbnail: '/wallpapers/roxy-calendar.jpg',
    style: {
      backgroundColor: '#0a1413',
      backgroundImage: 'url(/wallpapers/roxy-calendar.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'auto'
    }
  },
  {
    id: 'neon-crimson-cyber',
    name: 'Neon Crimson Cyberpunk',
    tag: 'Cyberpunk Neon',
    thumbnail: '/wallpapers/neon-crimson-cyber.jpg',
    style: {
      backgroundColor: '#160408',
      backgroundImage: 'url(/wallpapers/neon-crimson-cyber.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'auto'
    }
  },
  {
    id: 'default',
    name: 'Sequoia Midnight',
    tag: 'Dark Grid',
    thumbnail: null,
    style: {
      backgroundColor: '#0c0c10',
      backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.06) 1px, transparent 1px), radial-gradient(circle at 50% 45%, #181820 0%, #0e0e14 60%, #07070a 100%)',
      backgroundSize: '24px 24px, 100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat, no-repeat'
    }
  },
  {
    id: 'monterey',
    name: 'Monterey (inspired by macOS)',
    tag: 'macOS-inspired',
    thumbnail: '/monterey.jpg',
    style: {
      backgroundColor: '#1e1b4b',
      backgroundImage: 'url(/monterey.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  },
  {
    id: 'cosmic',
    name: 'Deep Cosmic Purple',
    tag: 'Nebula Glow',
    thumbnail: null,
    style: {
      backgroundColor: '#0a0614',
      backgroundImage: 'radial-gradient(rgba(168, 85, 247, 0.12) 1px, transparent 1px), radial-gradient(circle at 60% 40%, #2e1065 0%, #17082e 60%, #080312 100%)',
      backgroundSize: '28px 28px, 100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat, no-repeat'
    }
  },
  {
    id: 'aurora',
    name: 'Cyan Aurora Glow',
    tag: 'Borealis',
    thumbnail: null,
    style: {
      backgroundColor: '#03131e',
      backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.12) 1px, transparent 1px), radial-gradient(circle at 40% 60%, #0c4a6e 0%, #082f49 60%, #02111c 100%)',
      backgroundSize: '24px 24px, 100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat, no-repeat'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal Slate',
    tag: 'Minimalist',
    thumbnail: null,
    style: {
      backgroundColor: '#0f172a',
      backgroundImage: 'radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)',
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  }
];

export const terminalWallpapers = [
  {
    id: 'default',
    name: 'Solid Dark (Default)',
    tag: 'Clean Minimal',
    image: null,
    bgStyle: {
      backgroundColor: '#0d1117'
    }
  },
  {
    id: 'roxy-calendar',
    name: 'Roxy Ifrita (Teal Calendar)',
    tag: 'Anime Calendar',
    image: '/wallpapers/roxy-calendar.jpg',
    overlayColor: 'rgba(0, 0, 0, 0.22)',
    bgStyle: {
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0.32)), url(/wallpapers/roxy-calendar.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'auto'
    }
  },
  {
    id: 'neon-crimson-cyber',
    name: 'Neon Crimson Cyberpunk',
    tag: 'Cyberpunk Neon',
    image: '/wallpapers/neon-crimson-cyber.jpg',
    overlayColor: 'rgba(16, 6, 10, 0.40)',
    bgStyle: {
      backgroundImage: 'linear-gradient(rgba(16, 6, 10, 0.40), rgba(16, 6, 10, 0.50)), url(/wallpapers/neon-crimson-cyber.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'auto'
    }
  },
  {
    id: 'monterey',
    name: 'Monterey (inspired by macOS)',
    tag: 'macOS-inspired',
    image: '/monterey.jpg',
    overlayColor: 'rgba(13, 17, 23, 0.45)',
    bgStyle: {
      backgroundImage: 'linear-gradient(rgba(13, 17, 23, 0.45), rgba(13, 17, 23, 0.55)), url(/monterey.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'auto'
    }
  }
];

export const wallpapers = desktopWallpapers.map((w, idx) => ({
  id: idx + 1,
  key: w.id,
  url: w.thumbnail || '',
  name: w.name,
  style: w.style
}));
