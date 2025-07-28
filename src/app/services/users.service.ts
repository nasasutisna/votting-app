import { inject, Injectable } from '@angular/core';
import { UserApiService } from './api/user-api/user-api.service';
import { firstValueFrom, Subject } from 'rxjs';
import { RequestPagingDto } from './api/base-api.dto';
import { RequestCreateUserDto } from './api/user-api/user.dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public loadList$ = new Subject<void>();
  readonly userApiService = inject(UserApiService);
  constructor() { }

  getUsers(queryParams: RequestPagingDto) {
    return firstValueFrom(this.userApiService.getUsers(queryParams));
  }

  addUser(body: RequestCreateUserDto) {
    return firstValueFrom(this.userApiService.addUser(body));
  }

  updateUser(id: string, body: RequestCreateUserDto) {
    return firstValueFrom(this.userApiService.updateUser(id, body));
  }

  deleteUser(id: string) {
    return firstValueFrom(this.userApiService.deletUser(id));
  }
}
