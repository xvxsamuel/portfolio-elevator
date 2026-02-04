import doorLeftImg from '../../assets/images/interiors/elevator/doorLeft.png';
import doorRightImg from '../../assets/images/interiors/elevator/doorRight.png';
import styles from './ElevatorScene.module.css';

interface ElevatorDoorsProps {
  isOpen: boolean;
}

export function ElevatorDoors({ isOpen }: ElevatorDoorsProps) {
  return (
    <>
      <img 
        src={doorLeftImg} 
        alt="" 
        className={`${styles.door} ${styles.doorLeft} ${isOpen ? styles.doorOpen : ''}`}
      />
      <img 
        src={doorRightImg} 
        alt="" 
        className={`${styles.door} ${styles.doorRight} ${isOpen ? styles.doorOpen : ''}`}
      />
    </>
  );
}
