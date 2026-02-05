import { useState, useEffect } from 'react';
import { Scene } from '../../components/Scene';
import { Modal } from '../../components/ui/Modal';
import { ButtonsPanel } from '../../components/ui/ButtonsPanel';
import { useGame } from '../../context/GameProvider';
import { useElevatorAudio } from './useElevatorAudio';
import { useFloorTheme } from '../../hooks/useFloorTheme';
import { ElevatorDoors } from './ElevatorDoors';
import { ElevatorContent } from './ElevatorContent';
import { RevealedScene } from './RevealedScene';
import { FloorOverlays } from './FloorOverlays';
import { EnterArrow } from './EnterArrow';
import { FLOOR_SCENES, FLOOR_ENTRY_OFFSETS, REAL_FLOORS, MIN_MOVE_DURATION, MAX_MOVE_DURATION, DOOR_OPEN_DELAY, DOOR_ANIMATION_DURATION } from './constants';
import elevatorBg from '../../assets/images/interiors/elevator/main.png';
import type { SceneName } from '../../types/game';

type ElevatorState = 'idle' | 'closing-doors' | 'moving' | 'stopped' | 'doors-opening' | 'arrived' | 'entering' | 'returning';

interface ElevatorSceneProps {
  onSceneChange?: (scene: SceneName) => void;
}

export function ElevatorScene({ onSceneChange }: ElevatorSceneProps) {
  const { currentFloor, setCurrentFloor, debugMode } = useGame();
  
  const [state, setState] = useState<ElevatorState>(currentFloor !== null ? 'returning' : 'idle');
  const [showButtons, setShowButtons] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [shakePhase, setShakePhase] = useState<'none' | 'building' | 'full' | 'stopping'>('none');
  const [shakeDurations, setShakeDurations] = useState({ build: 4, stop: 3 });
  
  const { liftButtonAudio, liftMoveAudio, liftStopOpenAudio, doorOpenAudio, fadeOutAmbience } = useElevatorAudio();
  const { startDistant, fadeToFull, fadeToDistant, fadeOut: fadeOutTheme } = useFloorTheme();

  const doorsOpen = state === 'arrived' || state === 'entering' || state === 'returning' || state === 'doors-opening';
  const arrowVisible = state === 'arrived';
  const showRevealedScene = currentFloor !== null && state !== 'idle';
  const isSceneHidden = state === 'moving';
  const isEntering = state === 'entering';
  const isReturning = state === 'returning';

  useEffect(() => {
    if (state === 'returning') {
      fadeToDistant();
      const timer = setTimeout(() => setState('arrived'), 2000);
      return () => clearTimeout(timer);
    }
  }, [state, fadeToDistant]);

  const revealedScene = currentFloor ? FLOOR_SCENES[currentFloor] : null;
  const entryOffset = currentFloor ? FLOOR_ENTRY_OFFSETS[currentFloor] : { x: 0, y: 0 };

  const handleFloorSelect = (floor: number, closesPanel: boolean) => {
    if (REAL_FLOORS.includes(floor)) {
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
    setIsFading(false);
  };

  return (
    <>
      {showRevealedScene && (
        <RevealedScene backgroundUrl={revealedScene} isZooming={isEntering} isReturning={isReturning} entryOffset={entryOffset} isHidden={isSceneHidden}>
          {currentFloor && <FloorOverlays floor={currentFloor} />}
        </RevealedScene>
      )}
      
      <Scene 
        backgroundImage={elevatorBg}
        isBlurred={showButtons && !isFading}
        shakePhase={shakePhase}
        shakeBuildDuration={shakeDurations.build}
        shakeStopDuration={shakeDurations.stop}
        isFadingOut={isEntering}
        isReturning={isReturning}
      >
        <ElevatorDoors isOpen={doorsOpen} />
        <EnterArrow visible={arrowVisible} onClick={handleEnterScene} />
        <ElevatorContent onButtonsClick={() => setShowButtons(true)} />
      </Scene>
      
      <Modal isOpen={showButtons} onClose={handleClose} isFading={isFading}>
        <ButtonsPanel onButtonClick={handleFloorSelect} />
      </Modal>
    </>
  );
}
