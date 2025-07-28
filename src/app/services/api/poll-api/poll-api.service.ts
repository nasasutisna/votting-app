import { Injectable } from '@angular/core';
import { BaseApiService } from '../base-api.service';
import { RequestAddOptionDto, RequestAddPollDto, RequestPollDto, ResponseGetResultDto, ResponsePollListDto } from './poll.dto';
import { RequestPagingDto, ResponseData, ResponsePagingDto } from '../base-api.dto';

@Injectable({
  providedIn: 'root'
})
export class PollApiService {
  private readonly model = 'poll';
  constructor(private baseApiService: BaseApiService) { }

  vote(body: RequestPollDto) {
    const url = `${this.model}/voted`;
    return this.baseApiService.httpPost(url, body);
  }

  pollList(queryParams: RequestPagingDto) {
    const url = this.model;
    return this.baseApiService.httpGet<ResponsePagingDto<ResponsePollListDto>>(url, queryParams);
  }

  getResult(id: string) {
    const url = `${this.model}/result/${id}`;
    return this.baseApiService.httpGet<ResponseData<ResponseGetResultDto>>(url);
  }

  getDetail(id: string) {
    const url = `${this.model}/detail/${id}`;
    return this.baseApiService.httpGet<ResponseData<ResponsePollListDto>>(url);
  }

  addPoll(body: RequestAddPollDto) {
    const url = this.model;
    return this.baseApiService.httpPost(url, body);
  }

  deletePoll(id: string) {
    const url = `${this.model}/${id}`;
    return this.baseApiService.httpDelete(url);
  }

  addOption(id: string, body: RequestAddOptionDto) {
    const url = `${this.model}/addOption/${id}`;
    return this.baseApiService.httpPatch(url, body);
  }
}
