import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { RequestCreateUserDto, ResponseGetUsersDto } from './user.dto';
import { RequestPagingDto, ResponsePagingDto } from '../base-api.dto';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private readonly model = 'user';
  constructor(private baseApiService: BaseApiService) { }

  getUsers(queryParams: RequestPagingDto) {
    const url = `${this.model}`;
    return this.baseApiService.httpGet<ResponsePagingDto<ResponseGetUsersDto>>(url, queryParams);
  }

  addUser(body: RequestCreateUserDto) {
    const url = `${this.model}`;
    return this.baseApiService.httpPost(url, body);
  }

  updateUser(id: string, body: RequestCreateUserDto) {
    const url = `${this.model}/${id}`;
    return this.baseApiService.httpPut(url, body);
  }

  deletUser(id: string) {
    const url = `${this.model}/${id}`;
    return this.baseApiService.httpDelete(url);
  }

}
