import styles from './TextButton.module.css';
import { ChevronRight } from './icons';

interface BaseProps {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
  variant?: 'dark' | 'light';
  size?: 'small' | 'medium' | 'large';
  withChevron?: boolean;
}

interface ButtonProps extends BaseProps {
  onClick: () => void;
  href?: never;
}

interface LinkProps extends BaseProps {
  href: string;
  onClick?: never;
}

type TextButtonProps = ButtonProps | LinkProps;

export function TextButton({ children, className, active = false, variant = 'dark', size = 'medium', withChevron = false, ...rest }: TextButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    active && styles.active,
    size !== 'medium' && styles[size],
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {children}
      {withChevron && <ChevronRight className={styles.chevron} />}
    </>
  );

  if ('href' in rest && rest.href) {
    return (
      <a 
        href={rest.href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={buttonClasses}
      >
        {content}
      </a>
    );
  }
  
  return (
    <button className={buttonClasses} onClick={(rest as ButtonProps).onClick}>
      {content}
    </button>
  );
}
