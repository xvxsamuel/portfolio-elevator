import { useEffect, useMemo, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GameProvider, useGame } from './context/GameProvider';
import { GameContainer } from './components/GameContainer';
import { InventoryBar } from './components/ui/InventoryBar';
import { LoadingScreen } from './components/ui/menus/LoadingScreen';
import { FullscreenPrompt } from './components/ui/menus/FullscreenPrompt';
import { TitleScreen } from './components/ui/menus/TitleScreen';
import { DialogueBox } from './components/ui/DialogueBox';
import { NameInputModal } from './components/ui/NameInputModal';
import { PauseMenu } from './components/ui/menus/PauseMenu';
import { EndingScreen } from './components/ui/EndingScreen';
import { DebugPanel } from './components/ui/DebugPanel';
import { ElevatorScene } from './scenes/Elevator';
import { LauraScene } from './scenes/Laura';
import { MartinaScene } from './scenes/Martina';
import { JulieScene } from './scenes/Julie';
import { SamuelScene } from './scenes/Samuel';
import { usePreloader } from './hooks/usePreloader';

type IntroStep = 'where' | 'remember' | 'name-input' | 'final' | 'done';

function GameContent() {
  const { currentScene, isLoading, setLoading, setLoadingProgress, setScene, modalOpen, dialogue, dialogueCount, showDialogue, dismissDialogue, setPlayerName, debugMode, resetGameState, pauseAllAudio, resumeAllAudio, stopAllAudio } = useGame();
  const { progress, isLoaded } = usePreloader();
  const [showFullscreenPrompt, setShowFullscreenPrompt] = useState(false);
  const [showTitleScreen, setShowTitleScreen] = useState(false);
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [showEnding, setShowEnding] = useState(false);
  const [hideInventory, setHideInventory] = useState(false);
  const [glowingSlots, setGlowingSlots] = useState<number[]>([]);
  const [hiddenSlots, setHiddenSlots] = useState<number[]>([]);
  const [introStep, setIntroStep] = useState<IntroStep | null>(null);
  const introStarted = useRef(false);
  const wasPausedRef = useRef(false);

  useEffect(() => {
    if (debugMode) {
      setIntroStep('done');
      introStarted.current = true;
      setPlayerName('debug');
    }
  }, [debugMode, setPlayerName]);

  useEffect(() => {
    setLoadingProgress(progress);
  }, [progress, setLoadingProgress]);

  useEffect(() => {
    if (isLoaded && isLoading) {
      const hasSeenPrompt = localStorage.getItem('fullscreenPromptShown') === 'true';
      setTimeout(() => {
        setLoading(false);
        if (hasSeenPrompt && !debugMode) {
          setShowTitleScreen(true);
        } else {
          setShowFullscreenPrompt(true);
        }
      }, 300);
    }
  }, [isLoaded, isLoading, setLoading, debugMode]);

  useEffect(() => {
    if (showPauseMenu) {
      pauseAllAudio();
      wasPausedRef.current = true;
    } else if (wasPausedRef.current) {
      resumeAllAudio();
      wasPausedRef.current = false;
    }
  }, [showPauseMenu, pauseAllAudio, resumeAllAudio]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const canPause = !isLoading && !showTitleScreen && currentScene !== 'loading' && introStep === 'done' && !modalOpen && !showEnding;
      if (e.key === 'Escape' && canPause) {
        setShowPauseMenu(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLoading, showTitleScreen, currentScene, introStep, modalOpen, showEnding]);

  const handleFullscreenPromptComplete = () => {
    setShowFullscreenPrompt(false);
    setTimeout(() => {
      setShowTitleScreen(true);
    }, 100);
  };

  const handleStart = () => {
    setShowTitleScreen(false);
    setScene('elevator');
    setTimeout(() => {
      if (debugMode) {
        introStarted.current = true;
        setIntroStep('done');
        setPlayerName('debug');
      } else if (!introStarted.current) {
        introStarted.current = true;
        setIntroStep('where');
        showDialogue('Where am I?', '???');
      }
    }, 500);
  };

  const handleIntroDismiss = () => {
    dismissDialogue();
    if (introStep === 'where') {
      setTimeout(() => {
        setIntroStep('remember');
        showDialogue("I don't even remember my own name.", '???');
      }, 100);
    } else if (introStep === 'remember') {
      setIntroStep('name-input');
    } else if (introStep === 'final') {
      setIntroStep('done');
    }
  };

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    setIntroStep('final');
    setTimeout(() => {
      showDialogue('Oh. I remember now. Must have been the piss fumes.', name, () => {
        showDialogue('How do I get out of here?', name);
      });
    }, 100);
  };

  const handleBackToElevator = () => {
    setScene('elevator');
  };

  const handleExitToTitle = () => {
    wasPausedRef.current = false;
    setShowPauseMenu(false);
    setIntroStep(null);
    introStarted.current = false;
    stopAllAudio();
    resetGameState();
    setScene('elevator');
    setShowEnding(false);
    setShowTitleScreen(true);
    setHideInventory(false);
    setGlowingSlots([]);
    setHiddenSlots([]);
  };

  const handleEndingStart = () => {
    setShowEnding(true);
  };

  const handleRitualComplete = () => {
    setHideInventory(true);
    setGlowingSlots([]);
    setHiddenSlots([]);
  };

  const renderScene = useMemo(() => {
    switch (currentScene) {
      case 'elevator':
        return (
          <ElevatorScene 
            onSceneChange={setScene} 
            onEndingStart={handleEndingStart} 
            onRitualComplete={handleRitualComplete}
            onGlowingChange={setGlowingSlots}
            onHiddenChange={setHiddenSlots}
          />
        );
      case 'floor-1':
        return <MartinaScene onBack={handleBackToElevator} />;
      case 'floor-4':
        return <JulieScene onBack={handleBackToElevator} />;
      case 'floor-5':
        return <LauraScene onBack={handleBackToElevator} />;
      case 'floor-8':
        return <SamuelScene onBack={handleBackToElevator} />;
      default:
        return null;
    }
  }, [currentScene, setScene]);

  const isInGame = !isLoading && !showTitleScreen && currentScene !== 'loading';

  return (
    <GameContainer sceneContent={isInGame && renderScene}>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen progress={progress} isVisible={true} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showFullscreenPrompt && (
          <FullscreenPrompt 
            isVisible={true} 
            onComplete={handleFullscreenPromptComplete} 
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        <TitleScreen isVisible={showTitleScreen} onStart={handleStart} />
      </AnimatePresence>

      <PauseMenu 
        isVisible={showPauseMenu} 
        onResume={() => {
          setShowPauseMenu(false);
        }}
        onExitToTitle={handleExitToTitle}
      />

      <EndingScreen 
        isVisible={showEnding} 
        onReturnToTitle={handleExitToTitle}
      />

      {isInGame && !showPauseMenu && !showEnding && (
        <>
          <DialogueBox
            text={dialogue?.text || ''}
            speaker={dialogue?.speaker}
            isVisible={!!dialogue}
            onComplete={introStep && introStep !== 'done' ? handleIntroDismiss : dismissDialogue}
            isFirst={dialogueCount === 1}
          />
          <NameInputModal 
            isOpen={introStep === 'name-input'} 
            onSubmit={handleNameSubmit} 
          />
          <InventoryBar visible={!modalOpen && introStep !== 'name-input' && !hideInventory} glowingSlots={glowingSlots} hiddenSlots={hiddenSlots} />
          <DebugPanel />
        </>
      )}
    </GameContainer>
  );
}

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App;
