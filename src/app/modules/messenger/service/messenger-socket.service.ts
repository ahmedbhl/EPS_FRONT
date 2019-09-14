import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeader } from 'src/app/shared/helpers/http-header';
import { environment } from 'src/environments/environment';
import { Message } from '../model/message';

@Injectable()
export class MessengerSocketService {

  private readonly headers: HttpHeaders;
  webSocket_url: string;

  constructor(private http: HttpClient) {
    this.webSocket_url = environment.webSocket_url;
    this.headers = HttpHeader.getHeaders();
    this.headers.append('Access-Control-Allow-Credentials', 'true');
  }

  /**
   * User for send message useing rest Controller
   * @param data
   */
  post(data: Message): Observable<Message> {
    return this.http.post<Message>(`${this.webSocket_url}`, data, { headers: this.headers });
  }

  /**
   * Get all message by userFrom and UserTo
   */
  getAllMessageByUserFromAndUserTo(userFromId: number, userToId: number): Observable<Message[]> {
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('userFrom', userFromId.toString());
    requestParams = requestParams.append('userTo', userToId.toString());

    console.log('get the list of messages byUserFrom UserTo ' + this.webSocket_url);
    return this.http.get<Message[]>(`${this.webSocket_url}/messages`, { headers: HttpHeader.getHeaders(), params: requestParams });
  }


  /**
   * Get all Users message by userFrom
   */
  getAllUsersMessageByUserFrom(userFromId: number): Observable<Message[]> {
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('userFrom', userFromId.toString());

    console.log('gGet all Users message by userFrom ' + this.webSocket_url);
    return this.http.get<Message[]>(`${this.webSocket_url}/messages/users`, { headers: HttpHeader.getHeaders(), params: requestParams });
  }
}
