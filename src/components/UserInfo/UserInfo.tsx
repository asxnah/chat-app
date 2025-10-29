import type { MouseEvent } from 'react';
import { ChevronRight } from '../../assets/icons/ChevronRight';
import s from './styles.module.css';

type UserInfoProps = {
  type: 'contact' | 'profile' | 'message' | 'link';
  id?: string;
  name: string;
  avatar?: string;
  content?: 'Typing...' | 'New chat' | string;
  date?: string;
  counter?: number | 0;
  selected?: boolean;
  onClick?: (e: MouseEvent) => void;
};

export const UserInfo = ({
  type,
  id,
  name,
  avatar,
  content,
  date,
  counter = 0,
  selected,
  onClick,
}: UserInfoProps) => {
  return (
    <div
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
            {content && (
              <p
                className={
                  ['Typing...', 'New chat'].includes(content) ? s.status : ''
                }
              >
                {content}
              </p>
            )}
            {counter !== 0 && (
              <div className={s.counter}>
                <span>{counter}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {(type === 'profile' || type === 'link') && <ChevronRight />}
    </div>
  );
};
