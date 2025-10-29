export interface Message {
  id: string;
  user_id: string;
  msg: string;
  time: string;
  read: boolean;
}

export interface Chat {
  id: string;
  user_id: string;
  backgroundImage: string;
  chat_data: Message[] | [];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  chats: string[];
}
