import { create } from 'zustand';

export const useStore = create((set, get) => ({
  // --- App Lifecycle Routing ---
  appPhase: 'boot', // 'boot', 'home', 'workspace'
  setAppPhase: (phase) => set({ appPhase: phase }),

  // --- Workspace Tools ---
  activeTool: 'move', // 'move', 'hand', 'comment'
  setActiveTool: (tool) => set({ activeTool: tool }),
  
  // --- Selection & Modes ---
  selectedNode: null, // Holds the ID of the clicked artboard
  setSelectedNode: (id) => set({ selectedNode: id }),
  
  appMode: 'design', // 'design', 'dev', 'prototype'
  setAppMode: (mode) => set({ appMode: mode }),

  // --- UI Shell State ---
  isLeftPanelOpen: true,
  isRightPanelOpen: true,
  toggleLeftPanel: () => set(state => ({ isLeftPanelOpen: !state.isLeftPanelOpen })),
  toggleRightPanel: () => set(state => ({ isRightPanelOpen: !state.isRightPanelOpen })),
  
  isCommandPaletteOpen: false,
  setCommandPaletteOpen: (isOpen) => set({ isCommandPaletteOpen: isOpen }),

  // --- Camera & Viewport Tracking ---
  // We track this to update the mini-map and status bar
  cameraPos: { x: 0, y: 0, zoom: 0.15 },
  setCameraPos: (pos) => set({ cameraPos: pos }),
  
  cursorPos: { x: 0, y: 0 },
  setCursorPos: (pos) => set({ cursorPos: pos }),

  // Programmatic Teleportation
  targetTransform: null,
  setTargetTransform: (transform) => set({ targetTransform: transform }),
  clearTargetTransform: () => set({ targetTransform: null }),
}));
