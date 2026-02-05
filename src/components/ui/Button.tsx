import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function Button({ 
  children, 
  onClick, 
  active = false, 
  size = 'medium',
  className = ''
}: ButtonProps) {
  const classNames = [
    styles.button,
    active && styles.active,
    size !== 'medium' && styles[size],
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
}
