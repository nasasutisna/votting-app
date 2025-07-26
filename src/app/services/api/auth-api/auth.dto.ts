
export interface RequestRegisterDto {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface RequestLoginDto {
  email: string;
  password: string;
}

export interface DataLogin {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  isActived: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ResponseLoginDto {
  token: string;
  data: DataLogin;
}