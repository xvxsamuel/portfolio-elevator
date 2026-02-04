import { useState } from 'react';
import { Scene } from '../../components/Scene';
import { Modal } from '../../components/ui/Modal';
import { ButtonsPanel } from '../../components/ui/ButtonsPanel';
import { useGame } from '../../context/GameProvider';
import { useElevatorAudio } from './useElevatorAudio';
import { ElevatorDoors } from './ElevatorDoors';
import { ElevatorContent } from './ElevatorContent';
import { RevealedScene } from './RevealedScene';
import { EnterArrow } from './EnterArrow';
import { FLOOR_SCENES, REAL_FLOORS, MIN_MOVE_DURATION, MAX_MOVE_DURATION, DOOR_OPEN_DELAY, DOOR_ANIMATION_DURATION } from './constants';
import elevatorBg from '../../assets/images/interiors/elevator/main.png';
import type { SceneName } from '../../types/game';

interface ElevatorSceneProps {
  onSceneChange?: (scene: SceneName) => void;
}

export function ElevatorScene({ onSceneChange }: ElevatorSceneProps) {
  const { currentFloor, setCurrentFloor } = useGame();
  
  const [showButtons, setShowButtons] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [shakePhase, setShakePhase] = useState<'none' | 'building' | 'full' | 'stopping'>('none');
  const [shakeDurations, setShakeDurations] = useState({ build: 4, stop: 3 });
  const [doorsOpen, setDoorsOpen] = useState(currentFloor !== null);
  const [arrowVisible, setArrowVisible] = useState(currentFloor !== null);
  const [isZooming, setIsZooming] = useState(false);
  const [showRevealedScene, setShowRevealedScene] = useState(currentFloor !== null);
  
  const { liftButtonAudio, liftMoveAudio, liftStopOpenAudio, doorOpenAudio } = useElevatorAudio();

  const revealedScene = currentFloor ? FLOOR_SCENES[currentFloor] : null;

  const handleFloorSelect = (floor: number, closesPanel: boolean) => {
    if (REAL_FLOORS.includes(floor)) {
      liftButtonAudio.current.currentTime = 0;
      liftButtonAudio.current.play();
      
      setIsFading(true);
      
      const needsToCloseDoors = doorsOpen;
      const closeDoorsDelay = needsToCloseDoors ? DOOR_ANIMATION_DURATION : 0;
      
      if (needsToCloseDoors) {
        setArrowVisible(false);
        doorOpenAudio.current.currentTime = 0;
        doorOpenAudio.current.play();
        setDoorsOpen(false);
      }
      
      const moveDuration = MIN_MOVE_DURATION + Math.random() * (MAX_MOVE_DURATION - MIN_MOVE_DURATION);
      const playbackRate = MAX_MOVE_DURATION / moveDuration;
      
      const buildDuration = moveDuration * 0.4;
      const stopDuration = moveDuration * 0.25;
      setShakeDurations({ build: buildDuration / 1000, stop: stopDuration / 1000 });
      
      setTimeout(() => {
        setShowRevealedScene(false);
        setCurrentFloor(floor);
        setShowButtons(false);
        setIsFading(false);
        setShakePhase('building');
        
        liftMoveAudio.current.currentTime = 0;
        liftMoveAudio.current.playbackRate = playbackRate;
        liftMoveAudio.current.play();
        
        setTimeout(() => {
          setShakePhase('full');
        }, buildDuration);
        
        setTimeout(() => {
          setShakePhase('stopping');
        }, moveDuration - stopDuration);
        
        setTimeout(() => {
          liftMoveAudio.current.pause();
          setShakePhase('none');
          setShowRevealedScene(true);
          
          liftStopOpenAudio.current.currentTime = 0;
          liftStopOpenAudio.current.play();
          
          setTimeout(() => {
            setDoorsOpen(true);
            setTimeout(() => {
              setArrowVisible(true);
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
    setIsZooming(true);
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
      {showRevealedScene && <RevealedScene backgroundUrl={revealedScene} isZooming={isZooming} />}
      
      <Scene 
        backgroundImage={elevatorBg}
        isBlurred={showButtons && !isFading}
        shakePhase={shakePhase}
        shakeBuildDuration={shakeDurations.build}
        shakeStopDuration={shakeDurations.stop}
        isFadingOut={isZooming}
      >
        <ElevatorDoors isOpen={doorsOpen} />
        <EnterArrow visible={arrowVisible && !isZooming} onClick={handleEnterScene} />
        <ElevatorContent onButtonsClick={() => setShowButtons(true)} />
      </Scene>
      
      <Modal isOpen={showButtons} onClose={handleClose} isFading={isFading}>
        <ButtonsPanel onButtonClick={handleFloorSelect} />
      </Modal>
    </>
  );
}
