import type { ChangeEvent, FormEvent } from 'react';
import { Button } from '../../uikit/Button/Button';
import { Input } from '../../uikit/Input/Input';
import s from './styles.module.css';

interface FormProps {
  buttonText: string;
  nameValue: string;
  emailValue: string;
  onNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const Form = ({
  buttonText,
  nameValue,
  emailValue,
  onNameChange,
  onEmailChange,
  onSubmit,
}: FormProps) => {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form className={s.form} onSubmit={submit}>
      <div className={s.form__inputs}>
        <Input
          name='name'
          placeholder='Name'
          value={nameValue}
          onChange={onNameChange}
        />
        <Input
          name='email'
          type='email'
          placeholder='email@example.com'
          value={emailValue}
          onChange={onEmailChange}
        />
      </div>
      <Button type='submit' content={buttonText} />
    </form>
  );
};
