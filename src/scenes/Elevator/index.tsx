import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Scene } from '../../components/Scene';
import { Modal } from '../../components/ui/Modal';
import { ButtonsPanel } from './modals/ButtonsPanel';
import { ExitPanel } from './modals/ExitPanel';
import { useGame } from '../../context/GameProvider';
import { useElevatorAudio } from './useElevatorAudio';
import { useFloorTheme } from '../../hooks/useFloorTheme';
import { getPreloadedAudio } from '../../hooks/usePreloader';
import { ElevatorDoors } from './ElevatorDoors';
import { ElevatorContent } from './ElevatorContent';
import { RevealedScene } from './RevealedScene';
import { FloorOverlays } from './FloorOverlays';
import { EnterArrow } from './EnterArrow';
import { RitualSequence } from './RitualSequence';
import { FLOOR_SCENES, REAL_FLOORS, MIN_MOVE_DURATION, MAX_MOVE_DURATION, DOOR_OPEN_DELAY, DOOR_ANIMATION_DURATION } from './constants';
import elevatorBg from '../../assets/images/interiors/elevator/main.png';
import exitButton from '../../assets/images/interiors/elevator/exit.png';
import callSound from '../../assets/audio/elevator/call.mp3';
import callFailSound from '../../assets/audio/elevator/call_fail.mp3';
import styles from './ElevatorScene.module.css';
import type { SceneName } from '../../types/game';

type ElevatorState = 'idle' | 'closing-doors' | 'moving' | 'stopped' | 'doors-opening' | 'arrived' | 'entering' | 'returning' | 'ending-moving' | 'ending-entering';

const ENDING_MOVE_DURATION = 14000;

interface ElevatorSceneProps {
  onSceneChange?: (scene: SceneName) => void;
  onEndingStart?: () => void;
  onRitualComplete?: () => void;
  onGlowingChange?: (slots: number[]) => void;
  onHiddenChange?: (slots: number[]) => void;
}

export function ElevatorScene({ onSceneChange, onEndingStart, onRitualComplete, onGlowingChange, onHiddenChange }: ElevatorSceneProps) {
  const { currentFloor, setCurrentFloor, debugMode, showDialogue, playerName, masterVolume, registerAudio, unregisterAudio, inventory } = useGame();
  
  const [state, setState] = useState<ElevatorState>(currentFloor !== null ? 'returning' : 'idle');
  const [showButtons, setShowButtons] = useState(false);
  const [showExitPanel, setShowExitPanel] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isCallInProgress, setIsCallInProgress] = useState(false);
  const [shakePhase, setShakePhase] = useState<'none' | 'building' | 'full' | 'stopping'>('none');
  const [shakeDurations, setShakeDurations] = useState({ build: 4, stop: 3 });
  const [isEndingMode, setIsEndingMode] = useState(false);
  const [ritualActive, setRitualActive] = useState(false);
  const [ritualComplete, setRitualComplete] = useState(false);
  
  const { liftButtonAudio, liftMoveAudio, liftStopOpenAudio, doorOpenAudio, fadeOutAmbience, pauseFly } = useElevatorAudio();
  const { startDistant, fadeToFull, fadeToDistant, fadeOut: fadeOutTheme } = useFloorTheme();

  const callAudioRef = useRef<HTMLAudioElement | null>(null);
  const callFailAudioRef = useRef<HTMLAudioElement | null>(null);
  const callTimeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      callTimeoutsRef.current.forEach(clearTimeout);
      if (callAudioRef.current) {
        callAudioRef.current.pause();
        unregisterAudio(callAudioRef.current);
      }
      if (callFailAudioRef.current) {
        callFailAudioRef.current.pause();
        unregisterAudio(callFailAudioRef.current);
      }
    };
  }, [unregisterAudio]);

  const handleSOSCall = useCallback(() => {
    if (isCallInProgress) return;
    
    setIsCallInProgress(true);

    if (!callAudioRef.current) {
      callAudioRef.current = getPreloadedAudio(callSound);
      callAudioRef.current.loop = true;
    }
    if (!callFailAudioRef.current) {
      callFailAudioRef.current = getPreloadedAudio(callFailSound);
    }

    registerAudio(callAudioRef.current);
    registerAudio(callFailAudioRef.current);

    const volume = masterVolume / 100;
    callAudioRef.current.volume = volume;
    callFailAudioRef.current.volume = volume * 0.5;

    callAudioRef.current.currentTime = 0;
    callAudioRef.current.play();

    const t1 = window.setTimeout(() => {
      callAudioRef.current?.pause();
      callFailAudioRef.current!.currentTime = 0;
      callFailAudioRef.current!.play();
    }, 15000);

    const t2 = window.setTimeout(() => {
      callFailAudioRef.current!.currentTime = 0;
      callFailAudioRef.current!.play();
    }, 16500);

    const t3 = window.setTimeout(() => {
      if (callAudioRef.current) unregisterAudio(callAudioRef.current);
      if (callFailAudioRef.current) unregisterAudio(callFailAudioRef.current);
      showDialogue("I guess they're closed.", playerName, () => {
        setIsCallInProgress(false);
      });
    }, 19500);

    callTimeoutsRef.current = [t1, t2, t3];
  }, [isCallInProgress, masterVolume, playerName, registerAudio, unregisterAudio, showDialogue]);

  const hasAllItems = useMemo(() => {
    const requiredItems = ['rosary', 'urn', 'polaroid', 'mask'];
    return requiredItems.every(itemId => inventory.some(item => item.id === itemId));
  }, [inventory]);

  const doorsOpen = state === 'arrived' || state === 'entering' || state === 'returning' || state === 'doors-opening' || state === 'ending-entering';
  const arrowVisible = state === 'arrived';
  const showRevealedScene = (currentFloor !== null && state !== 'idle') || isEndingMode;
  const isSceneHidden = state === 'moving' || state === 'ending-moving';
  const isEntering = state === 'entering' || state === 'ending-entering';
  const isReturning = state === 'returning';
  const isEndingSequence = isEndingMode;

  useEffect(() => {
    if (state === 'returning') {
      fadeToDistant();
      const timer = setTimeout(() => {
        setState('arrived');
        if (hasAllItems && !ritualComplete) {
          pauseFly();
          setRitualActive(true);
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state, fadeToDistant, hasAllItems, ritualComplete, pauseFly]);

  useEffect(() => {
    if ((state === 'idle' || state === 'arrived') && hasAllItems && !ritualComplete && !ritualActive) {
      pauseFly();
      setRitualActive(true);
    }
  }, [hasAllItems, state, ritualComplete, ritualActive, pauseFly]);

  const revealedScene = currentFloor ? FLOOR_SCENES[currentFloor] : null;

  const handleFloorSelect = (floor: number, closesPanel: boolean) => {
    if (REAL_FLOORS.includes(floor)) {
      setIsNavigating(true);
      liftButtonAudio.current.currentTime = 0;
      liftButtonAudio.current.play();
      
      setIsFading(true);
      
      const needsToCloseDoors = doorsOpen;
      const closeDoorsDelay = needsToCloseDoors ? DOOR_ANIMATION_DURATION : 0;
      
      if (needsToCloseDoors) {
        doorOpenAudio.current.currentTime = 0;
        doorOpenAudio.current.play();
        setState('closing-doors');
        fadeOutTheme(DOOR_ANIMATION_DURATION);
      }
      
      const moveDuration = debugMode ? MIN_MOVE_DURATION : MIN_MOVE_DURATION + Math.random() * (MAX_MOVE_DURATION - MIN_MOVE_DURATION);
      const playbackRate = MAX_MOVE_DURATION / moveDuration;
      
      const buildDuration = moveDuration * 0.4;
      const stopDuration = moveDuration * 0.25;
      setShakeDurations({ build: buildDuration / 1000, stop: stopDuration / 1000 });
      
      setTimeout(() => {
        setCurrentFloor(floor);
        setShowButtons(false);
        setIsFading(false);
        setState('moving');
        setShakePhase('building');
        
        liftMoveAudio.current.currentTime = 0;
        liftMoveAudio.current.playbackRate = playbackRate;
        liftMoveAudio.current.play();
        
        setTimeout(() => setShakePhase('full'), buildDuration);
        setTimeout(() => setShakePhase('stopping'), moveDuration - stopDuration);
        
        setTimeout(() => {
          liftMoveAudio.current.pause();
          setShakePhase('none');
          setState('stopped');
          
          liftStopOpenAudio.current.currentTime = 0;
          liftStopOpenAudio.current.play();
          
          setTimeout(() => {
            setState('doors-opening');
            startDistant(floor);
            setTimeout(() => {
              setState('arrived');
              setIsNavigating(false);
            }, DOOR_ANIMATION_DURATION);
          }, DOOR_OPEN_DELAY);
        }, moveDuration);
      }, 300 + closeDoorsDelay);
      return;
    }
    
    if (closesPanel) {
      setIsFading(true);
      setTimeout(() => {
        setShowButtons(false);
        setIsFading(false);
      }, 300);
    }
  };

  const handleEnterScene = () => {
    setState('entering');
    fadeOutAmbience(2000);
    fadeToFull();
    setTimeout(() => {
      if (onSceneChange && currentFloor) {
        onSceneChange(`floor-${currentFloor}` as SceneName);
      }
    }, 2000);
  };

  const handleClose = () => {
    setShowButtons(false);
    setShowExitPanel(false);
    setIsFading(false);
  };

  const handleExitButtonClick = (buttonId: 'sos' | 'exit') => {
    if (buttonId === 'exit' && ritualComplete) {
      setShowExitPanel(false);
      liftButtonAudio.current.currentTime = 0;
      liftButtonAudio.current.play();
      
      const needsToCloseDoors = doorsOpen;
      const closeDoorsDelay = needsToCloseDoors ? DOOR_ANIMATION_DURATION : 0;
      
      if (needsToCloseDoors) {
        doorOpenAudio.current.currentTime = 0;
        doorOpenAudio.current.play();
        setState('closing-doors');
        fadeOutTheme(DOOR_ANIMATION_DURATION);
      }
      
      const moveDuration = ENDING_MOVE_DURATION;
      const playbackRate = MAX_MOVE_DURATION / moveDuration;
      
      const buildDuration = moveDuration * 0.4;
      const stopDuration = moveDuration * 0.25;
      setShakeDurations({ build: buildDuration / 1000, stop: stopDuration / 1000 });
      
      setTimeout(() => {
        setCurrentFloor(null);
        setIsEndingMode(true);
        setState('ending-moving');
        setShakePhase('building');
        
        liftMoveAudio.current.currentTime = 0;
        liftMoveAudio.current.playbackRate = playbackRate;
        liftMoveAudio.current.play();
        
        setTimeout(() => setShakePhase('full'), buildDuration);
        setTimeout(() => setShakePhase('stopping'), moveDuration - stopDuration);
        
        setTimeout(() => {
          liftMoveAudio.current.pause();
          setShakePhase('none');
          setState('stopped');
          
          liftStopOpenAudio.current.currentTime = 0;
          liftStopOpenAudio.current.play();
          
          setTimeout(() => {
            setState('doors-opening');
            setTimeout(() => {
              setState('ending-entering');
              fadeOutAmbience(8000);
              setTimeout(() => {
                onEndingStart?.();
              }, 8000);
            }, DOOR_ANIMATION_DURATION);
          }, DOOR_OPEN_DELAY);
        }, moveDuration);
      }, 300 + closeDoorsDelay);
    }
  };

  const endingBackground = isEndingSequence ? null : revealedScene;

  return (
    <>
      {(showRevealedScene || isEndingSequence) && (
        <RevealedScene 
          backgroundUrl={endingBackground} 
          isZooming={isEntering && !isEndingSequence}
          isReturning={isReturning} 
          isHidden={isSceneHidden}
          isEndingWhite={isEndingSequence}
        >
          {currentFloor && !isEndingSequence && <FloorOverlays floor={currentFloor} />}
        </RevealedScene>
      )}
      
      <Scene 
        backgroundImage={elevatorBg}
        shakePhase={shakePhase}
        shakeBuildDuration={shakeDurations.build}
        shakeStopDuration={shakeDurations.stop}
        isFadingOut={isEntering}
        isReturning={isReturning}
        slowFadeOut={isEndingSequence}
      >
        <ElevatorDoors isOpen={doorsOpen} />
        <EnterArrow visible={arrowVisible && !ritualActive} onClick={handleEnterScene} />
        <ElevatorContent onButtonsClick={() => setShowButtons(true)} onExitClick={() => setShowExitPanel(true)} />
        {ritualComplete && (
          <div 
            className={styles.exitOverlay}
            style={{ left: '72.065%', top: '60.25%', width: '1.13%' }}
          >
            <img src={exitButton} alt="" />
          </div>
        )}
        <RitualSequence 
          isActive={ritualActive}
          onComplete={() => {
            setRitualActive(false);
            setRitualComplete(true);
            onRitualComplete?.();
          }}
          onStopTheme={() => fadeOutTheme(1500)}
          onFlash={() => {
            setRitualComplete(true);
            setState('idle');
            setCurrentFloor(null);
          }}
          onGlowingChange={(slots) => onGlowingChange?.(slots)}
          onHiddenChange={(slots) => onHiddenChange?.(slots)}
        />
      </Scene>
      
      <Modal isOpen={showButtons} onClose={handleClose} isFading={isFading}>
        <ButtonsPanel onButtonClick={handleFloorSelect} disabled={isNavigating || ritualComplete} />
      </Modal>

      <Modal isOpen={showExitPanel} onClose={handleClose} isFading={isFading}>
        <ExitPanel 
          onButtonClick={handleExitButtonClick} 
          onSOSCall={handleSOSCall}
          exitGlowing={ritualComplete}
        />
      </Modal>
    </>
  );
}
