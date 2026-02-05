import styles from './TextButton.module.css';

interface TextButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  variant?: 'dark' | 'light';
}

export function TextButton({ onClick, children, className, active = false, variant = 'dark' }: TextButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    active && styles.active,
    className
  ].filter(Boolean).join(' ');
  
  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}
