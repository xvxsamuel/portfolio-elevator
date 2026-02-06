import { useGame } from '../../../context/GameProvider';
import { getPreloadedAudio } from '../../../hooks/usePreloader';
import exitPanelBg from '../../../assets/images/interiors/elevator/exitPanel.png';
import sosButton from '../../../assets/images/interiors/elevator/sos.png';
import exitButton from '../../../assets/images/interiors/elevator/exit.png';
import liftClickSound from '../../../assets/audio/elevator/lift_click.mp3';
import styles from './ElevatorPanels.module.css';

interface ExitPanelProps {
  onButtonClick: (buttonId: 'sos' | 'exit') => void;
  onSOSCall: () => void;
  exitGlowing?: boolean;
}

const exitButtons = [
  { id: 'sos' as const, src: sosButton, x: 29.47, y: 40.7 },
  { id: 'exit' as const, src: exitButton, x: 67.81, y: 40.7 },
];

export function ExitPanel({ onButtonClick, onSOSCall, exitGlowing = false }: ExitPanelProps) {
  const { masterVolume } = useGame();

  const handleClick = (buttonId: 'sos' | 'exit') => {
    if (exitGlowing && buttonId === 'sos') return;
    
    const liftClickAudio = getPreloadedAudio(liftClickSound);
    liftClickAudio.volume = masterVolume / 100;
    liftClickAudio.currentTime = 0;
    liftClickAudio.play();
    
    if (buttonId === 'sos') {
      onSOSCall();
    }
    onButtonClick(buttonId);
  };

  const getButtonClassName = (buttonId: 'sos' | 'exit') => {
    if (buttonId === 'exit' && exitGlowing) {
      return `${styles.button} ${styles.exitGlowing}`;
    }
    return styles.button;
  };

  return (
    <div className={styles.panel} style={{ marginBottom: '25%' }} onClick={e => e.stopPropagation()}>
      <img src={exitPanelBg} alt="Exit panel" className={styles.background} />
      {exitButtons.map(btn => (
        <button
          key={btn.id}
          className={getButtonClassName(btn.id)}
          style={{ 
            left: `${btn.x}%`, 
            top: `${btn.y}%`,
          }}
          onClick={() => handleClick(btn.id)}
        >
          <img src={btn.src} alt={btn.id} />
        </button>
      ))}
    </div>
  );
}
