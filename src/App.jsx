import React from 'react';
import { useStore } from './store';
import { BootSequence } from './components/BootSequence';
import { FileBrowserScreen } from './components/screens/FileBrowserScreen';
import { Workspace } from './components/Workspace';

function App() {
  const appPhase = useStore(state => state.appPhase);

  return (
    <div className="w-screen h-screen relative bg-[#0e0e0e] text-white overflow-hidden font-inter">
       {appPhase === 'boot' && <BootSequence />}
       {appPhase === 'home' && <FileBrowserScreen standalone={true} />}
       {appPhase === 'workspace' && <Workspace />}
    </div>
  );
}

export default App;
