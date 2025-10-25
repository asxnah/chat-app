import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../uikit/Button/Button';
import { Input } from '../../uikit/Input/Input';
import { Toggler } from '../../uikit/Toggler/Toggler';
import { UserInfo } from '../../components/UserInfo/UserInfo';
import { Confirm } from '../../uikit/Confirm/Confirm';
import { Form } from '../../components/Form/Form';
import s from './styles.module.css';
import { AddContactIcon } from '../../assets/icons/AddContactIcon';
import { BinIcon } from '../../assets/icons/BinIcon';
import { BugIcon } from '../../assets/icons/BugIcon';
import { ChatsIcon } from '../../assets/icons/ChatsIcon';
import { ChevronLeft } from '../../assets/icons/ChevronLeft';
import { ContactsIcon } from '../../assets/icons/ContactsIcon';
import { CrossIcon } from '../../assets/icons/CrossIcon';
import { PaletteIcon } from '../../assets/icons/PaletteIcon';
import { PictureIcon } from '../../assets/icons/PictureIcon';
import { SearchIcon } from '../../assets/icons/SearchIcon';
import { UserIcon } from '../../assets/icons/UserIcon';

const Test = () => {
  const navigate = useNavigate();

  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState('');
  const [emailValue, setEmail] = useState('');
  const [nameValue, setName] = useState('');

  return (
    <>
      <main className={s.main}>
        <section className={s.main__section}>
          <UserInfo
            type='link'
            name='Link somewhere'
            onClick={() => navigate('/')}
          />
          <UserInfo
            type='contact'
            name='Yuuki Asuna'
            avatar='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fswordartonline%2Fimages%2F0%2F06%2FAsuna_with_Yui_Biprobe.png%2Frevision%2Flatest%3Fcb%3D20141220180221&f=1&nofb=1&ipt=846f0f8e2eb21ba64bfdd02f854a54d2238d0a385afcd2b9056e9c220f8a8502'
          />
          <UserInfo
            type='profile'
            name='Yuuki Asuna'
            content='email@example.com'
            avatar='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fswordartonline%2Fimages%2F0%2F06%2FAsuna_with_Yui_Biprobe.png%2Frevision%2Flatest%3Fcb%3D20141220180221&f=1&nofb=1&ipt=846f0f8e2eb21ba64bfdd02f854a54d2238d0a385afcd2b9056e9c220f8a8502'
          />
          <UserInfo
            type='message'
            name='Yuuki Asuna'
            date='Now'
            avatar='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fswordartonline%2Fimages%2F0%2F06%2FAsuna_with_Yui_Biprobe.png%2Frevision%2Flatest%3Fcb%3D20141220180221&f=1&nofb=1&ipt=846f0f8e2eb21ba64bfdd02f854a54d2238d0a385afcd2b9056e9c220f8a8502'
          />
          <UserInfo
            type='message'
            name='Yuuki Asuna'
            content="Yes, I'll be there"
            date='11:30'
            avatar='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fswordartonline%2Fimages%2F0%2F06%2FAsuna_with_Yui_Biprobe.png%2Frevision%2Flatest%3Fcb%3D20141220180221&f=1&nofb=1&ipt=846f0f8e2eb21ba64bfdd02f854a54d2238d0a385afcd2b9056e9c220f8a8502'
          />
          <UserInfo
            type='message'
            name='Yuuki Asuna'
            content='Selected chat'
            date='11:30'
            avatar='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fswordartonline%2Fimages%2F0%2F06%2FAsuna_with_Yui_Biprobe.png%2Frevision%2Flatest%3Fcb%3D20141220180221&f=1&nofb=1&ipt=846f0f8e2eb21ba64bfdd02f854a54d2238d0a385afcd2b9056e9c220f8a8502'
            selected={true}
          />
          <UserInfo
            type='message'
            name='Yuuki Asuna'
            date='10:15'
            avatar='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fswordartonline%2Fimages%2F0%2F06%2FAsuna_with_Yui_Biprobe.png%2Frevision%2Flatest%3Fcb%3D20141220180221&f=1&nofb=1&ipt=846f0f8e2eb21ba64bfdd02f854a54d2238d0a385afcd2b9056e9c220f8a8502'
          />
          <UserInfo
            type='message'
            name='Yuuki Asuna'
            content='When can we meet?'
            date='Yesterday'
            avatar='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.wikia.nocookie.net%2Fswordartonline%2Fimages%2F0%2F06%2FAsuna_with_Yui_Biprobe.png%2Frevision%2Flatest%3Fcb%3D20141220180221&f=1&nofb=1&ipt=846f0f8e2eb21ba64bfdd02f854a54d2238d0a385afcd2b9056e9c220f8a8502'
            counter={3}
          />
        </section>

        <section
          className={s.main__section}
          style={{ display: 'flex', gap: '1rem' }}
        >
          <Button content='Button' onClick={() => alert('clicked')} />
          <Input
            name='example'
            placeholder='Placeholder'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Toggler
            content='Toggler'
            checked={checked}
            onToggle={() => setChecked(!checked)}
          />
          <div
            style={{
              padding: '0.5rem',
              borderRadius: '1rem',
              backgroundColor: 'var(--lightgrey)',
            }}
          >
            <Confirm
              content='Confirm?'
              onConfirm={() => alert('confirmed')}
              onDecline={() => alert('declined')}
            />
          </div>
          <Form
            buttonText='Submit'
            nameValue={nameValue}
            emailValue={emailValue}
            onNameChange={(e) => setName(e.target.value)}
            onEmailChange={(e) => setEmail(e.target.value)}
            onSubmit={() => alert('Submitted')}
          />
          <div className={s.icons}>
            <AddContactIcon />
            <BinIcon />
            <BugIcon />
            <ChatsIcon />
            <ChevronLeft />
            <ContactsIcon />
            <CrossIcon />
            <PaletteIcon />
            <PictureIcon />
            <SearchIcon />
            <UserIcon />
          </div>
        </section>
      </main>
    </>
  );
};

export default Test;
