import type { ReactNode } from 'react';
import { CrossIcon } from '../../assets/icons/CrossIcon';
import s from './styles.module.css';

interface PopupProps {
  heading: string;
  children: ReactNode;
  onClose: () => void;
}

export const Popup = ({ heading, children, onClose }: PopupProps) => {
  return (
    <section className={s.wrapper}>
      <div className={s.form}>
        <div className={s.heading}>
          <h3 className={s.heading__title}>{heading}</h3>
          <button onClick={onClose} type='button'>
            <CrossIcon />
          </button>
        </div>
        {children}
      </div>
    </section>
  );
};
