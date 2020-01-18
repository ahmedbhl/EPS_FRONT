import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from 'src/app/core/helper.service';
import { HttpHeader } from 'src/app/shared/helpers/http-header';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';

@Injectable()
export class CommentService {

  /**
    * Url for request
    * @var string
    **/
  commentUrl: string;

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
    this.commentUrl = environment.comment_url;
    this.headers = HttpHeader.getHeaders();
  }

  /**
  * Get all the Comments
  */
  public getAllComments(): Observable<Comment[]> {
    console.log('get the list of all comments ' + this.commentUrl);
    return this.http.get<Comment[]>(`${this.commentUrl}`, { headers: this.headers });
  }

  /**
   * Get all the Comments by user
   */
  public getAllCommentsByUser(userId: number): Observable<Comment[]> {
    console.log('get the list of all comments by type ' + this.commentUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('userId', userId.toString());
    return this.http.get<Comment[]>(`${this.commentUrl}/user/`, { headers: this.headers, params: requestParams });
  }

  /**
  * Get all the Comments by post and User
  */
  public getAllCommentsByUserAndPost(postId: number, userId: number): Observable<Comment[]> {
    console.log('get the list of all comments by user and post ' + this.commentUrl);
    return this.http.get<Comment[]>(`${this.commentUrl}/${userId}/${postId}`, { headers: this.headers });
  }

  /**
   * Get all the Comments by post
   */
  public getAllCommentsByPost(postId: number): Observable<Comment[]> {
    console.log('get the list of all comments by type ' + this.commentUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('postId', postId.toString());
    return this.http.get<Comment[]>(`${this.commentUrl}/post`, { headers: this.headers, params: requestParams });
  }

  /**
     * Save a new comment
     */
  public save(comment: Comment): Observable<Comment> {
    this.helper.trace(`adding new comment : ${comment.id}`);
    return this.http.post<Comment>(`${this.commentUrl}`, comment, { headers: this.headers });
  }

  /**
   * update the comment
   */
  public update(comment: Comment): Observable<Comment> {
    this.helper.trace(`updating : ${comment.id}`);
    let RequestParams: HttpParams = new HttpParams();
    RequestParams = RequestParams.append('id', comment.id.toString());
    return this.http.put<Comment>(`${this.commentUrl}/${comment.id}`, comment, { headers: this.headers });
  }

  /**
  * delete an comment
  */
  public delete(comment: Comment): Observable<Comment> {
    this.helper.trace(`deleting : ${comment.id}`);
    return this.http.delete<Comment>(`${this.commentUrl}/${comment.id}`, { headers: this.headers });
  }

  /**
 * delete an comment
 */
  public deleteByUserAndPost(userId, postId): Observable<Comment> {
    this.helper.trace(`deleting By user: ${userId} : and postId = ${postId} `);
    return this.http.delete<Comment>(`${this.commentUrl}/${userId}/${postId}`, { headers: this.headers });
  }
}
