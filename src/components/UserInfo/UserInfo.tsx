import type { MouseEvent } from 'react';
import { ChevronRight } from './ChevronRight';
import s from './styles.module.css';

type UserInfoProps = {
  type: 'contact' | 'profile' | 'message' | 'link';
  id?: string;
  name: string;
  avatar?: string;
  content?: string;
  status: 'Typing...' | 'New chat' | 'Idle';
  date?: string;
  counter?: number;
  selected?: boolean;
  onClick?: (e: MouseEvent) => void;
};

export const UserInfo = ({
  type,
  id,
  name,
  avatar,
  content,
  status = 'Idle',
  date,
  counter,
  selected,
  onClick,
}: UserInfoProps) => {
  return (
    <article
      className={`${s.userInfo} ${s[type]} ${selected && s.selected}`}
      onClick={onClick}
      tabIndex={0}
      id={id}
    >
      <div className={s.left}>
        {avatar && <img src={avatar} alt='user avatar' />}
        <div className={s.content}>
          <div className={s.container}>
            <h4>{name}</h4>
            {type === 'message' && <small>{date}</small>}
          </div>
          <div className={s.container}>
            {content && <p>{content}</p>}
            {status !== 'Idle' && <p className={s.status}>{status}</p>}
            {counter && (
              <div className={s.counter}>
                <span>{counter}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {(type === 'profile' || type === 'link') && <ChevronRight />}
    </article>
  );
};
