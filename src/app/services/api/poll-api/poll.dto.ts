
export interface RequestPollDto {
  pollId: string;
  optionId: number;
}

export interface RequestAddOptionDto {
  name: string;
}

export interface OptionAdd {
	name: string;
}

export interface RequestAddPollDto {
	name: string;
	question: string;
	deadlineVote: string;
	options: OptionAdd[];
}

export interface UsersVoted {
	_id: string;
	fullName: string;
}

export interface Option {
	optionId: number;
	name: string;
	totalVoted: number;
	percentage: number;
	usersVoted: UsersVoted[];
}

export interface ResponseGetResultDto {
	totalAllVoted: number;
	options: Option[];
}

export interface Option2 {
	optionId: number;
	name: string;
	createdAt: string;
	createdBy: string;
}

export interface Voted {
	userId: string;
	optionId: number;
	createdAt: string;
	updatedAt: string;
}

export interface ResponsePollListDto {
	_id: string;
	name: string;
	question: string;
	deadlineVote: string;
	options: Option2[];
	voted: Voted[];
	isActived: boolean;
	createdBy: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}