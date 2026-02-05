import steamImg from '../../../../assets/images/interiors/laura/steam.png';
import styles from './Steam.module.css';

export function Steam() {
  return (
    <div
      className={styles.steam}
      style={{ backgroundImage: `url(${steamImg})` }}
    />
  );
}
