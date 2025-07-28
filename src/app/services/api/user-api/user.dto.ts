
export interface RequestCreateUserDto {
  fullName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface ResponseGetUsersDto {
	_id: string;
	fullName: string;
	email: string;
	role: string;
	isActived: boolean;
	createdBy: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
