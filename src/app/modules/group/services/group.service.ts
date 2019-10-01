import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from 'src/app/core/helper.service';
import { HttpHeader } from 'src/app/shared/helpers/http-header';
import { environment } from 'src/environments/environment';
import { Group } from '../model/group';

@Injectable()
export class GroupService {

  /**
    * Url for request
    * @var string
    **/
  groupUrl: string;

  /**
   * Request Headers
   * @var Headers
   */
  private readonly headers: HttpHeaders;

  /**
   * constructor
   * @param http
   * @param helper
   */
  constructor(
    private readonly http: HttpClient,
    private readonly helper: Helper
  ) {
    this.groupUrl = environment.group_url;
    this.headers = HttpHeader.getHeaders();
  }

  /**
  * Get all the educationnal institutions
  */
  public getAllGroups(): Observable<Group[]> {
    console.log('get the list of all Groups ' + this.groupUrl);
    return this.http.get<Group[]>(`${this.groupUrl}`, { headers: this.headers });
  }

  public getAllGroupsByProfessor(professorId: number): Observable<Group[]> {
    console.log('get the list of all Groups By User ' + this.groupUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('professorId', professorId.toString());
    return this.http.get<Group[]>(`${this.groupUrl}/professor`, { headers: this.headers, params: requestParams });
  }

  public getAllGroupsByStudent(studentId: number): Observable<Group[]> {
    console.log('get the list of all Groups By User ' + this.groupUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('studentId', studentId.toString());
    return this.http.get<Group[]>(`${this.groupUrl}/student`, { headers: this.headers, params: requestParams });
  }

  /**
  * Get all the groups by group Name
  */
  public getAllGroupByGoupName(groupName: string): Observable<Group[]> {
    console.log('get the list of all Groups by group Name ' + this.groupUrl);
    return this.http.get<Group[]>(`${this.groupUrl}/name/${groupName}`, { headers: this.headers });
  }

  /**
     * Save a new Group
     */
  public save(group: Group): Observable<Group> {
    this.helper.trace(`adding new Group : ${group.id}`);
    return this.http.post<Group>(`${this.groupUrl}`, group, { headers: this.headers });
  }

  /**
   * update the Group
   */
  public update(group: Group): Observable<Group> {
    this.helper.trace(`updating : ${group.id}`);
    let RequestParams: HttpParams = new HttpParams();
    RequestParams = RequestParams.append('id', group.id.toString());
    return this.http.put<Group>(`${this.groupUrl}/${group.id}`, group, { headers: this.headers });
  }

  /**
  * delete an Group
  */
  public delete(group: Group): Observable<Group> {
    this.helper.trace(`deleting : ${group.id}`);
    return this.http.delete<Group>(`${this.groupUrl}/${group.id}`, { headers: this.headers });
  }

  /**
  * join student the Group
  */
  public joinStudent(userId: number, hashCode: string): Observable<Group> {
    this.helper.trace(`join Student : ${userId}`);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('hashCode', hashCode);
    requestParams = requestParams.append('userId', userId.toString());
    return this.http.put<Group>(`${this.groupUrl}/join/student`, new Group(), { headers: this.headers, params: requestParams });
  }

  /**
  * join professor to the Group
  */
  public joinProfessor(userId: number, hashCode: string): Observable<Group> {
    this.helper.trace(`join Professor : ${userId}`);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('hashCode', hashCode);
    requestParams = requestParams.append('userId', userId.toString());
    return this.http.put<Group>(`${this.groupUrl}/join/professor`, new Group(), { headers: this.headers, params: requestParams });
  }

  /**
   * remove student from Group
   */
  public removeStudent(userId: number, id: number): Observable<Group> {
    this.helper.trace(`remove Student from group : ${userId}`);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('id', id.toString());
    requestParams = requestParams.append('userId', userId.toString());
    return this.http.put<Group>(`${this.groupUrl}/remove/student`, new Group(), { headers: this.headers, params: requestParams });
  }

  /**
  * remove Professor from Group
  */
  public removeProfessor(userId: number, id: number): Observable<Group> {
    this.helper.trace(`remove professor from group : ${userId}`);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('id', id.toString());
    requestParams = requestParams.append('userId', userId.toString());
    return this.http.put<Group>(`${this.groupUrl}/remove/professor`, new Group(), { headers: this.headers, params: requestParams });
  }

}
