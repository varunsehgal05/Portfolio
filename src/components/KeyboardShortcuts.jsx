import { useEffect } from 'react';
import { useStore } from '../store';

export function KeyboardShortcuts() {
  const setTargetTransform = useStore(state => state.setTargetTransform);
  const setCommandPaletteOpen = useStore(state => state.setCommandPaletteOpen);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K / Cmd+K: Command Palette
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }

      // Shift+1: Fit Canvas
      if (e.shiftKey && e.key === '1') {
        e.preventDefault();
        setTargetTransform({ x: window.innerWidth / 2, y: window.innerHeight / 2, zoom: 0.1 });
      }
      
      // Shift+D: Dev Mode Toggle
      if (e.shiftKey && e.key === 'D') {
        e.preventDefault();
        useStore.getState().setAppMode(useStore.getState().appMode === 'dev' ? 'design' : 'dev');
      }

      // P: Prototype Mode Toggle
      if (e.key === 'p' && !e.ctrlKey && !e.metaKey && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        useStore.getState().setAppMode(useStore.getState().appMode === 'prototype' ? 'design' : 'prototype');
      }
      
      // Shift+C: Toggle Comments
      if (e.shiftKey && e.key === 'C') {
        e.preventDefault();
        useStore.getState().setActiveTool(useStore.getState().activeTool === 'comment' ? 'move' : 'comment');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setTargetTransform]);

  return null;
}
