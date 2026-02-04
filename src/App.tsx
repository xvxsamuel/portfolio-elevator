import { useEffect, useMemo, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { GameProvider, useGame } from './context/GameProvider';
import { GameContainer } from './components/GameContainer';
import { InventoryBar } from './components/ui/InventoryBar';
import { LoadingScreen } from './components/ui/LoadingScreen';
import { TitleScreen } from './components/ui/TitleScreen';
import { DialogueBox } from './components/ui/DialogueBox';
import { NameInputModal } from './components/ui/NameInputModal';
import { ElevatorScene } from './scenes/Elevator';
import { LauraScene } from './scenes/Laura';
import { MartinaScene } from './scenes/Martina';
import { JulieScene } from './scenes/Julie';
import { SamuelScene } from './scenes/Samuel';
import { usePreloader } from './hooks/usePreloader';

type IntroStep = 'where' | 'remember' | 'name-input' | 'final' | 'done';

function GameContent() {
  const { currentScene, isLoading, setLoading, setLoadingProgress, setScene, modalOpen, dialogue, dialogueCount, showDialogue, dismissDialogue, setPlayerName } = useGame();
  const { progress, isLoaded } = usePreloader();
  const [showTitleScreen, setShowTitleScreen] = useState(false);
  const [introStep, setIntroStep] = useState<IntroStep | null>(null);
  const introStarted = useRef(false);

  useEffect(() => {
    setLoadingProgress(progress);
  }, [progress, setLoadingProgress]);

  useEffect(() => {
    if (isLoaded && isLoading) {
      // Loading complete, show title screen
      setTimeout(() => {
        setLoading(false);
        setShowTitleScreen(true);
      }, 300);
    }
  }, [isLoaded, isLoading, setLoading]);

  const [fadeFromBlack, setFadeFromBlack] = useState(false);

  const handleStart = () => {
    setShowTitleScreen(false);
    setScene('elevator');
    setFadeFromBlack(true);
    setTimeout(() => {
      setFadeFromBlack(false);
      if (!introStarted.current) {
        introStarted.current = true;
        setIntroStep('where');
        showDialogue('Where am I?', '???');
      }
    }, 1500);
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
      showDialogue('Oh. I remember now. Must have been the piss fumes.', name);
    }, 100);
  };

  const handleBackToElevator = () => {
    setScene('elevator');
  };

  const renderScene = useMemo(() => {
    switch (currentScene) {
      case 'elevator':
        return <ElevatorScene onSceneChange={setScene} />;
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
        <TitleScreen isVisible={showTitleScreen} onStart={handleStart} />
      </AnimatePresence>

      {fadeFromBlack && <div className="fade-from-black" />}

      {isInGame && (
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
          <InventoryBar visible={!modalOpen && introStep !== 'name-input'} />
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
