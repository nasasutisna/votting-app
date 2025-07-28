import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { RequestLoginDto, RequestRegisterDto, ResponseLoginDto } from './auth.dto';
import { Subject } from 'rxjs';
import { ResponseData } from '../base-api.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly model = 'auth';
  constructor(private baseApiService: BaseApiService) { }

  register(body: RequestRegisterDto) {
    const url = `${this.model}/register`;
    return this.baseApiService.httpPost<ResponseLoginDto>(url, body);
  }

  login(body: RequestLoginDto) {
    const url = `${this.model}/login`;
    return this.baseApiService.httpPost<ResponseLoginDto>(url, body);
  }

  logout() {
    const url = `${this.model}/logout`;
    return this.baseApiService.httpPost(url);
  }

  loginData() {
    const url = `${this.model}/loginData`;
    return this.baseApiService.httpGet<ResponseData<ResponseLoginDto>>(url);
  }

}
