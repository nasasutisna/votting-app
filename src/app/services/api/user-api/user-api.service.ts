import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { RequestCreateUserDto } from './user.dto';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private readonly model = 'user';
  constructor(private baseApiService: BaseApiService) { }

  getUsers() {
    const url = `${this.model}`;
    return this.baseApiService.httpGet(url);
  }

  addUser(body: RequestCreateUserDto) {
    const url = `${this.model}`;
    return this.baseApiService.httpPost(url, body);
  }

  updateUser(body: RequestCreateUserDto) {
    const url = `${this.model}`;
    return this.baseApiService.httpPut(url, body);
  }

  deletUser(id: string) {
    const url = `${this.model}/${id}`;
    return this.baseApiService.httpDelete(url);
  }

}
