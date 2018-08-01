import { AuthType } from "@/constants";

declare module "*.json" {
  const value: any;
  export default value;
}

declare type InputType = 'checkbox' | 'text' | 'password' | 'number' | 'select' | 'email';

declare interface NodemailUserSettings {
  dbpass: string;
}

declare interface NodemailAccount {
  id?: number;
  name: string;
  address: string;
  password: string;
  mailHost: string;
  mailPort: number;
  mailSecure: boolean;
  authType: AuthType;
  oAuthCode: string;
  smtpHost: string;
  smtpPort: number;
  smtpSecure: boolean;
}

declare interface Author {
  email: string;
  name: string;
}

declare interface Mail {
  content: string;
  id: number;
  author: Author;
  date: Date;
  title: string;
  account: string;
  folder: string;
  recipients: string[];
  unread?: boolean;
  history?: Mail[];
}
