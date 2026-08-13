import React, { useRef, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import { useStore } from '../store';
import { Loader2 } from 'lucide-react';

import { HeroScreen } from './screens/HeroScreen';
import { CollaborationModal } from './screens/CollaborationModal';
import { TimelineScreen } from './screens/TimelineScreen';
import { ProcessBoard } from './screens/ProcessBoard';
import { DesignSystem } from './screens/DesignSystem';
import { AboutMeScreen } from './screens/AboutMeScreen';
import { SkillArsenalScreen } from './screens/SkillArsenalScreen';
import { ScreenshotArtboard } from './screens/templates/ScreenshotArtboard';
import { EducationScreen } from './screens/EducationScreen';
import { FileBrowserScreen } from './screens/FileBrowserScreen';
import { CaseStudyScreen } from './screens/CaseStudyScreen';
import { ProjectsOverviewScreen } from './screens/ProjectsOverviewScreen';
import { CommentsOverlay } from './screens/CommentsOverlay';

import { bespokePages } from '../gridConfig';

export function InfiniteCanvas() {
  const containerRef = useRef(null);
  const activeTool = useStore(state => state.activeTool);
  const targetTransform = useStore(state => state.targetTransform);
  const clearTargetTransform = useStore(state => state.clearTargetTransform);
  const setSelectedNode = useStore(state => state.setSelectedNode);

  const setCameraPos = useStore(state => state.setCameraPos);
  const setCursorPos = useStore(state => state.setCursorPos);

  // Spring for the canvas position and zoom
  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 0.15, // Start WAY zoomed out to see the whole Figma canvas
    config: { mass: 1, tension: 280, friction: 60 },
    onChange: (result) => {
       if (result.value) {
          setCameraPos({ x: result.value.x, y: result.value.y, zoom: result.value.scale });
       }
    }
  }));

  // Handle programmatic teleportation
  useEffect(() => {
    if (targetTransform) {
      api.start({
        x: targetTransform.x,
        y: targetTransform.y,
        scale: targetTransform.zoom,
      });
      clearTargetTransform();
    }
  }, [targetTransform, api, clearTargetTransform]);

  // Handle gestures
  useGesture(
    {
      onDrag: ({ offset: [dx, dy], event }) => {
        if (activeTool !== 'hand' && event.buttons !== 4) return;
        api.start({ x: dx, y: dy });
      },
      onWheel: ({ event, delta: [, dy], ctrlKey }) => {
        event.preventDefault();
        if (ctrlKey || event.metaKey) {
          const scaleChange = -dy * 0.005;
          const currentScale = scale.get();
          const newScale = Math.min(Math.max(0.05, currentScale + scaleChange), 3);
          api.start({ scale: newScale });
        } else {
          const currentX = x.get();
          const currentY = y.get();
          api.start({ x: currentX - event.deltaX, y: currentY - event.deltaY });
        }
      }
    },
    {
      target: containerRef,
      drag: { from: () => [x.get(), y.get()], pointer: { keys: false } },
      eventOptions: { passive: false }
    }
  );

  return (
    <div 
      ref={containerRef}
      onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
      className={`w-full h-full relative overflow-hidden canvas-bg select-none touch-none ${activeTool === 'hand' ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
      onClick={() => setSelectedNode(null)}
    >
      <animated.div
        className="absolute origin-top-left"
        style={{
          x,
          y,
          scale,
        }}
      >
        <svg className="absolute inset-0 w-[10000px] h-[10000px] pointer-events-none -translate-x-[2000px] -translate-y-[2000px]">
           {/* Center Trunk */}
           <path d="M2500 2800 L2500 9500" stroke="rgba(255,181,161,0.2)" strokeWidth="8" strokeDasharray="20, 20" fill="none" />
           {/* Branch Left */}
           <path d="M2500 3500 L900 3500 L900 8000" stroke="rgba(127,208,255,0.2)" strokeWidth="6" strokeDasharray="10, 10" fill="none" />
           {/* Branch Right */}
           <path d="M2500 3500 L4100 3500 L4100 8000" stroke="rgba(216,185,255,0.2)" strokeWidth="6" strokeDasharray="10, 10" fill="none" />
           
           {/* Case study detective board arrows */}
           <path d="M2500 5000 C 2700 5200, 2800 5200, 3000 5000" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
           <path d="M2300 5500 Q 2000 5600 2200 5800" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
        </svg>

        {bespokePages.map(page => {
            if (page.type === 'coded') {
               // Render the fully interactive coded components
               switch(page.id) {
                 case 'hero': return <HeroScreen key={page.id} x={page.x} y={page.y} />;
                 case 'contact': return <CollaborationModal key={page.id} x={page.x} y={page.y} />;
                 case 'ideation': return <ProcessBoard key={page.id} x={page.x} y={page.y} />;
                 case 'trajectory': return <TimelineScreen key={page.id} x={page.x} y={page.y} />;
                 case 'design_system': return <DesignSystem key={page.id} x={page.x} y={page.y} />;
                 case 'about': return <AboutMeScreen key={page.id} x={page.x} y={page.y} />;
                 case 'skill_arsenal': return <SkillArsenalScreen key={page.id} x={page.x} y={page.y} />;
                 case 'education': return <EducationScreen key={page.id} x={page.x} y={page.y} />;
                 case 'file_browser': return <FileBrowserScreen key={page.id} x={page.x} y={page.y} />;
                 case 'projects_overview': return <CaseStudyScreen key={page.id} x={page.x} y={page.y} />;
                 case 'recent_activity': return <ProjectsOverviewScreen key={page.id} x={page.x} y={page.y} />;
                 default: return null;
               }
            } else {
               // Render the high-fidelity screenshot wrappers for complex visual frames
               return <ScreenshotArtboard key={page.id} {...page} />;
            }
         })}
         
         <CommentsOverlay />
      </animated.div>
    </div>
  );
}
