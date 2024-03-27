export interface ILoginUser {
  username?: string;
  email: string;
  password: string;
}

export interface ICodeVerification {
  phone: string;
  otpCode: string;
}
export interface IPhoneVerification {
  phone: string;
  channel: string;
}
export type NavLinkTypes = {
  imgURL: string;
  route: string;
  label: string;
};

export interface IUserData {
  _id: string;
  city: string;
  country: string;
  createdAt: string;
  dateOfBirth: string;
  email: string;
  fullname: string;
  nationality: string;
  phone: string;
  phoneVerified: boolean;
  role: string;
  state: string;
  status: string;
  updatedAt: string;
  username: string;
  weight?: number;
  height?: number;
  hairColor?: string;
  eyeColor?: string;
}

interface IRegister {
  username: string;
  fullname: string;
  email: string;
  password: string;
  nationality?: string | undefined;
  country: string;
  state: string;
  city: string;
  eyeColor?: string;
  hairColor?: string;
}

export interface IRegisterUser {
  userData: IRegister;
  role: string;
}
