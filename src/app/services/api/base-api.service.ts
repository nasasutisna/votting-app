import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(private httpClient: HttpClient) { }

  httpGet<T>(url: string, queryParams?: any) {
    const apiUrl = this.createUrl(url, queryParams);
    const headers = this.createHeaders();
    return this.httpClient.get<T>(apiUrl, { headers });
  }

  httpPost<T>(url: string, body?: any, queryParams?: any) {
    const apiUrl = this.createUrl(url, queryParams);
    const headers = this.createHeaders();
    return this.httpClient.post<T>(apiUrl, body, { headers });
  }

  httpPut<T>(url: string, body: any) {
    const headers = this.createHeaders();
    return this.httpClient.put<T>(url, body, { headers });
  }

  httpDelete<T>(url: string) {
    const headers = this.createHeaders();
    return this.httpClient.delete<T>(url, { headers });
  }

  httpPatch<T>(url: string, body?: any, queryParams?: any) {
    const apiUrl = this.createUrl(url, queryParams);
    const headers = this.createHeaders();
    return this.httpClient.patch<T>(apiUrl, body, { headers });
  }

  private createUrl(url: string, queryParams?: any) {
    let apiUrl = url;
    if (queryParams) {
      apiUrl = `${url}?${this.jsonToQueryString(queryParams)}`;
    }

    return apiUrl;
  }

  private jsonToQueryString(params: Record<string, any>): string {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    return queryParams.toString();
  }

  createHeaders() {
    const token = localStorage.getItem('token') as string;
    return new HttpHeaders().set('Authorization', token);
  }
}
