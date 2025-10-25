export interface Message {
  user: boolean;
  msg: string;
  time: string;
  read: boolean;
}

export interface Chat {
  chat_id: string;
  user_id: string;
  chat_data: Message[] | [];
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  email: string;
  notifs: boolean;
}
