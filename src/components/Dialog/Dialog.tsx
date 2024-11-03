import { FC, useState, useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

interface IDialogProps {
  icon?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  isDialogOpen: boolean;
  dialogClassName?: string;
  setIsDialogOpen: (value: boolean) => void;
  onClose?: () => void;
  size?:
    | 'xxs'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | 'upload'
    | 'auto-size'
    | 'auto-w'
    | 'auto-h';
  className?: string;
  overflow?: string;
}

interface ISizeClasses {
  '3xl': string;
  '2xl': string;
  xl: string;
  lg: string;
  md: string;
  sm: string;
  xs: string;
  xxs: string;
  upload: string;
  'auto-size': string;
  'auto-w': string;
  'auto-h': string;
}

const Dialog: FC<IDialogProps> = ({
  icon,
  children,
  className,
  title = '',
  size = 'md',
  isDialogOpen,
  subtitle = '',
  dialogClassName,
  overflow = 'overflow-y-auto',
  setIsDialogOpen,
  onClose,
}) => {
  const [opacity, setOpacity] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  const sizeClasses: ISizeClasses = {
    '3xl': 'w-9/12 h-5/6',
    '2xl': 'w-8/12 h-5/6',
    xl: 'w-7/12 h-5/6',
    lg: 'w-6/12 h-5/6',
    md: 'w-5/12 h-5/6',
    sm: 'w-4/12 h-5/6',
    xs: 'w-4/12 h-1/6',
    xxs: 'w-2/12 h-5/6',
    upload: 'w-4/12 h-2.5/6',
    'auto-size': 'h-auto w-auto',
    'auto-w': 'w-auto h-5/6',
    'auto-h': 'h-auto w-1/2',
  };

  const handleCloseDialog = () => {
    setOpacity(false);

    setTimeout(() => {
      setIsDialogOpen(false);
      if (onClose) onClose();
    }, 200);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') handleCloseDialog();
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isDialogOpen) {
      timeout = setTimeout(() => {
        setOpacity(true);
      }, 200);
    } else {
      setOpacity(false);

      timeout = setTimeout(() => {
        setIsDialogOpen(false);
        if (onClose) onClose();
      }, 200);
    }

    return () => clearTimeout(timeout);
  }, [isDialogOpen, setIsDialogOpen]);

  useEffect(() => {
    if (isDialogOpen) window.addEventListener('keydown', handleKeyDown);
    else window.removeEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDialogOpen, setIsDialogOpen]);

  return createPortal(
    (isDialogOpen || opacity) && (
      <div
        id="dialog"
        className={`${className} fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-bacdrop backdrop-blur-sm transition-opacity duration-200 ${
          opacity ? 'opacity-1' : 'opacity-0'
        }`}
      >
        <div
          id="inner-dialog"
          ref={settingsRef}
          className={`relative flex flex-col rounded-2xl bg-white p-6 pr-2 shadow-2xl ${sizeClasses[size]} ${dialogClassName}  ${size === 'sm' ? '!h-fit' : ''}`}
        >
          <div className="flex w-full items-start justify-between pb-4 pr-4">
            <div className="flex flex-col items-start">
              <div className={`${icon ? 'flex items-start' : ''}`}>
                {icon && (
                  <img src={icon} className="mr-4 h-10 w-10" alt={title} />
                )}
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-semibold text-primary">
                    {title}
                  </span>
                  {subtitle && (
                    <span
                      className={`text-sm text-secondary ${sizeClasses[size] == 'h-auto w-auto' ? 'w-[425px]' : ''}`}
                    >
                      {subtitle}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button onClick={handleCloseDialog}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>

          <div
            className={`${overflow} pr-4 ${className} ${sizeClasses[size] == 'h-auto w-auto' ? 'h-fit' : 'h-full min-h-20'}`}
          >
            {children}
          </div>
        </div>
      </div>
    ),
    document.body
  );
};

export default Dialog;
