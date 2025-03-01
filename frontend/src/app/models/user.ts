export interface User{
  id?:number;
  name?:string;
  email:string;
  password?:string;
  profile?:string;
  uniqueCode?:string,
  hasPartner?:boolean;
  authProvider?:string,
  updatedAt?:string
}
