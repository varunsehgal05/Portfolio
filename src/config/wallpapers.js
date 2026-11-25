export const ipadDefaultWallpaper = {
  id: 'sonoma',
  name: 'macOS Sonoma',
  tag: 'macOS 14',
  thumbnail: '/wallpapers/macos-sonoma.jpg',
  style: {
    backgroundColor: '#0a0d14',
    backgroundImage: 'url(/wallpapers/macos-sonoma.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  }
};

export const mobileDefaultWallpaper = {
  id: 'ventura',
  name: 'macOS Ventura',
  tag: 'macOS 13',
  thumbnail: '/wallpapers/macos-ventura.jpg',
  style: {
    backgroundColor: '#070a14',
    backgroundImage: 'url(/wallpapers/macos-ventura.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat'
  }
};

export function getDeviceWallpaper(wallpaperId = 'default', mode = 'desktop') {
  if (wallpaperId === 'default') {
    if (mode === 'tablet') return ipadDefaultWallpaper;
    if (mode === 'mobile') return mobileDefaultWallpaper;
    return desktopWallpapers[0]; // macOS Sequoia
  }
  const found = desktopWallpapers.find(w => w.id === wallpaperId);
  if (found) {
    return found;
  }
  // Aliases for legacy saved IDs
  if (wallpaperId === 'ipad-dune') return desktopWallpapers.find(w => w.id === 'sonoma') || desktopWallpapers[1];
  if (wallpaperId === 'ios-aurora') return desktopWallpapers.find(w => w.id === 'ventura') || desktopWallpapers[2];
  if (wallpaperId === 'cosmic') return desktopWallpapers.find(w => w.id === 'bigsur') || desktopWallpapers[0];
  if (wallpaperId === 'aurora' || wallpaperId === 'minimal') return desktopWallpapers.find(w => w.id === 'mojave') || desktopWallpapers[0];

  if (mode === 'tablet') return ipadDefaultWallpaper;
  if (mode === 'mobile') return mobileDefaultWallpaper;
  return desktopWallpapers[0];
}

export const desktopWallpapers = [
  {
    id: 'default',
    name: 'macOS Sequoia',
    tag: 'macOS 15',
    thumbnail: '/wallpapers/macos-sequoia.jpg',
    style: {
      backgroundColor: '#090c10',
      backgroundImage: 'url(/wallpapers/macos-sequoia.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  },
  ipadDefaultWallpaper,
  mobileDefaultWallpaper,
  {
    id: 'roxy-calendar',
    name: 'Roxy Ifrita (Teal Calendar)',
    tag: 'Anime Aesthetic',
    thumbnail: '/wallpapers/roxy-calendar.jpg',
    style: {
      backgroundColor: '#0c1b1e',
      backgroundImage: 'url(/wallpapers/roxy-calendar.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  },
  {
    id: 'cyberpunk-girl',
    name: 'Cyberpunk Neon Girl',
    tag: 'Cyberpunk Red',
    thumbnail: '/wallpapers/cyberpunk-girl.jpg',
    style: {
      backgroundColor: '#1a0408',
      backgroundImage: 'url(/wallpapers/cyberpunk-girl.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  },
  {
    id: 'batman-red',
    name: 'The Batman (Crimson)',
    tag: 'Dark Knight',
    thumbnail: '/wallpapers/batman-red.jpg',
    style: {
      backgroundColor: '#120205',
      backgroundImage: 'url(/wallpapers/batman-red.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  },
  {
    id: 'anime-room',
    name: 'Anime Room Selfie',
    tag: 'Cozy Manga',
    thumbnail: '/wallpapers/anime-room.jpg',
    style: {
      backgroundColor: '#1f1525',
      backgroundImage: 'url(/wallpapers/anime-room.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  },
  {
    id: 'minecraft-cat',
    name: 'Minecraft Cat Sunset',
    tag: 'Pixel Sunset',
    thumbnail: '/wallpapers/minecraft-cat.jpg',
    style: {
      backgroundColor: '#2b1429',
      backgroundImage: 'url(/wallpapers/minecraft-cat.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  },
  {
    id: 'monterey',
    name: 'macOS Monterey',
    tag: 'macOS 12',
    thumbnail: '/wallpapers/macos-monterey.jpg',
    style: {
      backgroundColor: '#130e26',
      backgroundImage: 'url(/wallpapers/macos-monterey.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  },
  {
    id: 'bigsur',
    name: 'macOS Big Sur',
    tag: 'macOS 11',
    thumbnail: '/wallpapers/macos-bigsur.jpg',
    style: {
      backgroundColor: '#080d1a',
      backgroundImage: 'url(/wallpapers/macos-bigsur.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
  },
  {
    id: 'mojave',
    name: 'macOS Mojave (Night Dunes)',
    tag: 'macOS 10.14',
    thumbnail: '/wallpapers/macos-mojave.jpg',
    style: {
      backgroundColor: '#05070f',
      backgroundImage: 'url(/wallpapers/macos-mojave.jpg)',
      backgroundSize: 'cover',
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
    tag: 'Anime Aesthetic',
    image: '/wallpapers/roxy-calendar.jpg',
    overlayColor: 'rgba(10, 15, 24, 0.35)',
    bgStyle: {
      backgroundImage: 'linear-gradient(rgba(10, 15, 24, 0.35), rgba(10, 15, 24, 0.45)), url(/wallpapers/roxy-calendar.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'auto'
    }
  },
  {
    id: 'cyberpunk-girl',
    name: 'Cyberpunk Neon Girl',
    tag: 'Cyberpunk Red',
    image: '/wallpapers/cyberpunk-girl.jpg',
    overlayColor: 'rgba(15, 5, 8, 0.35)',
    bgStyle: {
      backgroundImage: 'linear-gradient(rgba(15, 5, 8, 0.35), rgba(15, 5, 8, 0.45)), url(/wallpapers/cyberpunk-girl.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'auto'
    }
  },
  {
    id: 'batman-red',
    name: 'The Batman (Crimson)',
    tag: 'Dark Knight',
    image: '/wallpapers/batman-red.jpg',
    overlayColor: 'rgba(12, 2, 5, 0.35)',
    bgStyle: {
      backgroundImage: 'linear-gradient(rgba(12, 2, 5, 0.35), rgba(12, 2, 5, 0.45)), url(/wallpapers/batman-red.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'auto'
    }
  },
  {
    id: 'anime-room',
    name: 'Anime Room Selfie',
    tag: 'Cozy Manga',
    image: '/wallpapers/anime-room.jpg',
    overlayColor: 'rgba(15, 10, 20, 0.35)',
    bgStyle: {
      backgroundImage: 'linear-gradient(rgba(15, 10, 20, 0.35), rgba(15, 10, 20, 0.45)), url(/wallpapers/anime-room.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'auto'
    }
  },
  {
    id: 'minecraft-cat',
    name: 'Minecraft Cat Sunset',
    tag: 'Pixel Sunset',
    image: '/wallpapers/minecraft-cat.jpg',
    overlayColor: 'rgba(20, 10, 22, 0.35)',
    bgStyle: {
      backgroundImage: 'linear-gradient(rgba(20, 10, 22, 0.35), rgba(20, 10, 22, 0.45)), url(/wallpapers/minecraft-cat.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'auto'
    }
  },
  {
    id: 'monterey',
    name: 'macOS Monterey',
    tag: 'macOS 12',
    image: '/wallpapers/macos-monterey.jpg',
    overlayColor: 'rgba(13, 17, 23, 0.45)',
    bgStyle: {
      backgroundImage: 'linear-gradient(rgba(13, 17, 23, 0.45), rgba(13, 17, 23, 0.55)), url(/wallpapers/macos-monterey.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'auto'
    }
  },
  {
    id: 'sequoia',
    name: 'macOS Sequoia',
    tag: 'macOS 15',
    image: '/wallpapers/macos-sequoia.jpg',
    overlayColor: 'rgba(9, 12, 16, 0.45)',
    bgStyle: {
      backgroundImage: 'linear-gradient(rgba(9, 12, 16, 0.45), rgba(9, 12, 16, 0.55)), url(/wallpapers/macos-sequoia.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      imageRendering: 'auto'
    }
  },
  {
    id: 'sonoma',
    name: 'macOS Sonoma',
    tag: 'macOS 14',
    image: '/wallpapers/macos-sonoma.jpg',
    overlayColor: 'rgba(10, 13, 20, 0.45)',
    bgStyle: {
      backgroundImage: 'linear-gradient(rgba(10, 13, 20, 0.45), rgba(10, 13, 20, 0.55)), url(/wallpapers/macos-sonoma.jpg)',
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
