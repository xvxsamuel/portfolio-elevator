import { getPreloadedAudio } from '../../../hooks/usePreloader';
import buttonsEmpty from '../../../assets/images/interiors/elevator/buttonsEmpty.png';
import button1 from '../../../assets/images/interiors/elevator/button_1.png';
import button2 from '../../../assets/images/interiors/elevator/button_2.png';
import button3 from '../../../assets/images/interiors/elevator/button_3.png';
import button4 from '../../../assets/images/interiors/elevator/button_4.png';
import button5 from '../../../assets/images/interiors/elevator/button_5.png';
import button6 from '../../../assets/images/interiors/elevator/button_6.png';
import button7 from '../../../assets/images/interiors/elevator/button_7.png';
import button8 from '../../../assets/images/interiors/elevator/button_8.png';
import meowSound from '../../../assets/audio/elevator/meow.mp3';
import liftClickSound from '../../../assets/audio/elevator/lift_click.mp3';
import styles from './ElevatorPanels.module.css';

interface ButtonsPanelProps {
  onButtonClick: (floor: number, closesPanel: boolean) => void;
  disabled?: boolean;
}

const buttons = [
  { id: 1, src: button1, x: 29.45, y: 20.8, closesPanel: false, extraSound: null as string | null },
  { id: 2, src: button2, x: 67.81, y: 20.8, closesPanel: false, extraSound: null as string | null },
  { id: 3, src: button3, x: 29.45, y: 40.95, closesPanel: false, extraSound: null as string | null },
  { id: 4, src: button4, x: 67.81, y: 40.95, closesPanel: false, extraSound: null as string | null },
  { id: 5, src: button5, x: 29.45, y: 61.1, closesPanel: false, extraSound: null as string | null },
  { id: 6, src: button6, x: 67.81, y: 61.1, closesPanel: false, extraSound: meowSound },
  { id: 7, src: button7, x: 29.45, y: 81.25, closesPanel: false, extraSound: null as string | null },
  { id: 8, src: button8, x: 67.81, y: 81.25, closesPanel: true, extraSound: null as string | null },
];

export function ButtonsPanel({ onButtonClick, disabled = false }: ButtonsPanelProps) {
  const handleClick = (btn: typeof buttons[0]) => {
    const liftClickAudio = getPreloadedAudio(liftClickSound);
    liftClickAudio.currentTime = 0;
    liftClickAudio.play();
    if (btn.extraSound) {
      const extraAudio = getPreloadedAudio(btn.extraSound);
      extraAudio.currentTime = 0;
      extraAudio.play();
    }
    if (disabled) return;
    onButtonClick(btn.id, btn.closesPanel);
  };

  return (
    <div className={styles.panel} onClick={e => e.stopPropagation()}>
      <img src={buttonsEmpty} alt="Elevator panel" className={styles.background} />
      {buttons.map(btn => (
        <button
          key={btn.id}
          className={styles.button}
          style={{ left: `${btn.x}%`, top: `${btn.y}%` }}
          onClick={() => handleClick(btn)}
        >
          <img src={btn.src} alt={`Floor ${btn.id}`} />
        </button>
      ))}
    </div>
  );
}
