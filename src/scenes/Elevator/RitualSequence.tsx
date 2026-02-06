import { useState, useEffect, useRef, useCallback } from 'react';
import { useGame } from '../../context/GameProvider';
import { getPreloadedAudio } from '../../hooks/usePreloader';
import ritualImage from '../../assets/images/interiors/elevator/ritual.png';
import ritualSound from '../../assets/audio/elevator/ritual.mp3';
import itemSound from '../../assets/audio/elevator/item.mp3';
import flashSound from '../../assets/audio/laura/flash.mp3';
import styles from './RitualSequence.module.css';

type RitualPhase = 
  | 'idle'
  | 'eyes-glow'
  | 'darkening'
  | 'dialogue'
  | 'inventory-glow'
  | 'circle-appear'
  | 'items-moving'
  | 'spinning-fast'
  | 'flash'
  | 'flash-fading'
  | 'complete';

interface RitualSequenceProps {
  isActive: boolean;
  onComplete: () => void;
  onStopTheme: () => void;
  onFlash: () => void;
  onGlowingChange: (slots: number[]) => void;
  onHiddenChange: (slots: number[]) => void;
}

export function RitualSequence({ isActive, onComplete, onStopTheme, onFlash, onGlowingChange, onHiddenChange }: RitualSequenceProps) {
  const { inventory, showDialogue, masterVolume, registerAudio, unregisterAudio } = useGame();
  const [phase, setPhase] = useState<RitualPhase>('idle');
  const [itemsInCircle, setItemsInCircle] = useState<number[]>([]);
  const [showFlash, setShowFlash] = useState(false);
  const [flashFading, setFlashFading] = useState(false);
  const [eyesGlowing, setEyesGlowing] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isFastSpin, setIsFastSpin] = useState(false);
  
  const dialogueShownRef = useRef(false);
  const hasStartedRef = useRef(false);
  const ritualAudioRef = useRef<HTMLAudioElement | null>(null);

  const playItemSound = useCallback(() => {
    const audio = getPreloadedAudio(itemSound);
    audio.volume = (masterVolume / 100) * 0.5;
    audio.playbackRate = 0.9 + Math.random() * 0.2;
    audio.currentTime = 0;
    audio.play();
  }, [masterVolume]);

  const resetState = useCallback(() => {
    setPhase('idle');
    setItemsInCircle([]);
    setShowFlash(false);
    setFlashFading(false);
    setEyesGlowing(false);
    setIsDark(false);
    setIsFastSpin(false);
    dialogueShownRef.current = false;
    hasStartedRef.current = false;
    onGlowingChange([]);
    onHiddenChange([]);
    if (ritualAudioRef.current) {
      ritualAudioRef.current.pause();
      unregisterAudio(ritualAudioRef.current);
      ritualAudioRef.current = null;
    }
  }, [onGlowingChange, onHiddenChange, unregisterAudio]);

  useEffect(() => {
    if (!isActive) {
      resetState();
      return;
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;

    setPhase('eyes-glow');
    setEyesGlowing(true);

    const themeTimer = setTimeout(() => {
      onStopTheme();
    }, 500);

    const darkenTimer = setTimeout(() => {
      setPhase('darkening');
      setIsDark(true);
    }, 1000);

    const dialogueTimer = setTimeout(() => {
      setPhase('dialogue');
      showDialogue('I see you have all the necessary items in your possession. I can help you get out of here.', 'Raccoon', () => {
        dialogueShownRef.current = true;
        startRitualSequence();
      });
    }, 2500);

    return () => {
      clearTimeout(themeTimer);
      clearTimeout(darkenTimer);
      clearTimeout(dialogueTimer);
    };
  }, [isActive]);

  const startRitualSequence = () => {
    ritualAudioRef.current = getPreloadedAudio(ritualSound);
    ritualAudioRef.current.volume = (masterVolume / 100) * 0.7;
    ritualAudioRef.current.currentTime = 0;
    registerAudio(ritualAudioRef.current);
    ritualAudioRef.current.play();

    setPhase('inventory-glow');
    onGlowingChange([0, 1, 2, 3]);

    setTimeout(() => {
      setPhase('circle-appear');
    }, 2000);

    setTimeout(() => {
      setPhase('items-moving');
      
      const addItem = (index: number) => {
        setItemsInCircle(prev => {
          const newItems = [...prev, index];
          onHiddenChange(newItems);
          return newItems;
        });
        playItemSound();
      };

      setTimeout(() => addItem(0), 0);
      setTimeout(() => addItem(1), 3000);
      setTimeout(() => addItem(2), 6000);
      setTimeout(() => addItem(3), 9000);

      setTimeout(() => {
        setPhase('spinning-fast');
        setIsFastSpin(true);
      }, 11000);

      setTimeout(() => {
        setPhase('flash');
        setShowFlash(true);
        setIsDark(false);
        setIsFastSpin(false);
        setItemsInCircle([]);
        
        const flashAudio = getPreloadedAudio(flashSound);
        flashAudio.volume = (masterVolume / 100) * 0.6;
        flashAudio.currentTime = 0;
        flashAudio.play();
        
        setTimeout(() => {
          onFlash();
        }, 250);
        
        setTimeout(() => {
          setFlashFading(true);
          setEyesGlowing(false);
          onGlowingChange([]);
          
          if (ritualAudioRef.current) {
            ritualAudioRef.current.pause();
            unregisterAudio(ritualAudioRef.current);
          }

          setTimeout(() => {
            setShowFlash(false);
            setFlashFading(false);
            setPhase('complete');
            onComplete();
          }, 5000);
        }, 3000);
      }, 12900);
    }, 4000);
  };

  const itemPositions = ['Top', 'Right', 'Bottom', 'Left'];
  const showCircle = phase === 'circle-appear' || phase === 'items-moving' || phase === 'spinning-fast';

  if (!isActive && phase === 'idle') return null;

  return (
    <>
      <div className={`${styles.darkOverlay} ${isDark ? styles.darkOverlayVisible : ''}`} />

      <div 
        className={styles.raccoonEyes}
        style={{ left: '73.45%', top: '33%' }}
      >
        <div className={`${styles.raccoonEye} ${eyesGlowing ? styles.raccoonEyeGlowing : ''}`} />
        <div className={`${styles.raccoonEye} ${eyesGlowing ? styles.raccoonEyeGlowing : ''}`} />
      </div>

      <div className={styles.ritualOverlay}>
        <img 
          src={ritualImage}
          alt=""
          className={`${styles.ritualCircle} ${showCircle ? styles.ritualCircleVisible : ''} ${showCircle ? (isFastSpin ? styles.ritualCircleSpinningFast : styles.ritualCircleSpinning) : ''}`}
        />

        {inventory.slice(0, 4).map((item, index) => (
          <div
            key={item.id}
            className={`${styles.ritualItem} ${styles[`ritualItem${itemPositions[index]}`]} ${itemsInCircle.includes(index) ? styles.ritualItemVisible : ''}`}
          >
            <img src={item.icon} alt="" className={styles.ritualItemImage} />
          </div>
        ))}
      </div>

      <div className={`${styles.whiteFlash} ${showFlash ? styles.whiteFlashVisible : ''} ${flashFading ? styles.whiteFlashFading : ''}`} />
    </>
  );
}
