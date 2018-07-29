declare module "*.json" {
  const value: any;
  export default value;
}

declare type InputType = 'checkbox' | 'text' | 'password' | 'number' | 'select' | 'email';
