import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  private readonly baseUrl = 'http://localhost:8000/api/v1';
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
    const apiUrl = this.createUrl(url);
    const headers = this.createHeaders();
    return this.httpClient.put<T>(apiUrl, body, { headers });
  }

  httpDelete<T>(url: string) {
    const apiUrl = this.createUrl(url);
    const headers = this.createHeaders();
    return this.httpClient.delete<T>(apiUrl, { headers });
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

    return `${this.baseUrl}/${apiUrl}`;
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
    if (token) {
      const authorization = JSON.parse(token)
      return new HttpHeaders().set('Authorization', authorization)
    } else {
      return new HttpHeaders();
    }
  }
}
