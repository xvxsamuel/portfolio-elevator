import { motion } from 'framer-motion';
import styles from './LoadingScreen.module.css';

interface LoadingScreenProps {
  progress: number;
  isVisible: boolean;
}

export function LoadingScreen({ progress, isVisible }: LoadingScreenProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>Loading...</h1>
        <div className={styles.barContainer}>
          <motion.div
            className={styles.barFill}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className={styles.percentage}>{progress}%</p>
      </div>
    </motion.div>
  );
}
