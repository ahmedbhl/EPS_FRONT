import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from 'src/app/core/helper.service';
import { HttpHeader } from 'src/app/shared/helpers/http-header';
import { environment } from 'src/environments/environment';
import { Like } from '../models/like';

@Injectable()
export class LikeService {

  /**
    * Url for request
    * @var string
    **/
  likeUrl: string;

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
    this.likeUrl = environment.like_url;
    this.headers = HttpHeader.getHeaders();
  }

  /**
  * Get all the Likes
  */
  public getAllLikes(): Observable<Like[]> {
    console.log('get the list of all likes ' + this.likeUrl);
    return this.http.get<Like[]>(`${this.likeUrl}`, { headers: this.headers });
  }

  /**
   * Get all the Likes by user
   */
  public getAllLikesByUser(userId: number): Observable<Like[]> {
    console.log('get the list of all likes by type ' + this.likeUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('userId', userId.toString());
    return this.http.get<Like[]>(`${this.likeUrl}/user/`, { headers: this.headers, params: requestParams });
  }

  /**
  * Get all the Likes by post and User
  */
  public getAllLikesByUserAndPost(postId: number, userId: number): Observable<Like[]> {
    console.log('get the list of all likes by user and post ' + this.likeUrl);
    return this.http.get<Like[]>(`${this.likeUrl}/${userId}/${postId}`, { headers: this.headers });
  }

  /**
   * Get all the Likes by post
   */
  public getAllLikesByPost(postId: number): Observable<Like[]> {
    console.log('get the list of all likes by type ' + this.likeUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('postId', postId.toString());
    return this.http.get<Like[]>(`${this.likeUrl}/post`, { headers: this.headers, params: requestParams });
  }

  /**
     * Save a new like
     */
  public save(like: Like): Observable<Like> {
    this.helper.trace(`adding new like : ${like.id}`);
    return this.http.post<Like>(`${this.likeUrl}`, like, { headers: this.headers });
  }

  /**
   * update the like
   */
  public update(like: Like): Observable<Like> {
    this.helper.trace(`updating : ${like.id}`);
    let RequestParams: HttpParams = new HttpParams();
    RequestParams = RequestParams.append('id', like.id.toString());
    return this.http.put<Like>(`${this.likeUrl}/${like.id}`, like, { headers: this.headers });
  }

  /**
  * delete an like
  */
  public delete(like: Like): Observable<Like> {
    this.helper.trace(`deleting : ${like.id}`);
    return this.http.delete<Like>(`${this.likeUrl}/${like.id}`, { headers: this.headers });
  }

  /**
 * delete an like
 */
  public deleteByUserAndPost(userId, postId): Observable<Like> {
    this.helper.trace(`deleting By user: ${userId} : and postId = ${postId} `);
    return this.http.delete<Like>(`${this.likeUrl}/${userId}/${postId}`, { headers: this.headers });
  }
}
