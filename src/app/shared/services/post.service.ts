import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from 'src/app/core/helper.service';
import { HttpHeader } from 'src/app/shared/helpers/http-header';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';

@Injectable()
export class PostService {

  /**
    * Url for request
    * @var string
    **/
  postUrl: string;

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
    this.postUrl = environment.post_url;
    this.headers = HttpHeader.getHeaders();
  }

  /**
  * Get all the Posts
  */
  public getAllPosts(): Observable<Post[]> {
    console.log('get the list of all posts ' + this.postUrl);
    return this.http.get<Post[]>(`${this.postUrl}`, { headers: this.headers });
  }

  /**
   * Get all the Posts by type
   */
  public getAllPostsByType(type: String): Observable<Post[]> {
    console.log('get the list of all posts by type ' + this.postUrl);
    return this.http.get<Post[]>(`${this.postUrl}/type/${type}`, { headers: this.headers });
  }

  /**
  * Get all the Posts by type and User
  */
  public getAllPostsByTypeAndUser(type: String, user: any): Observable<Post[]> {
    console.log('get the list of all posts by type and user ' + this.postUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('type', type.toString());
    requestParams = requestParams.append('user', user.id.toString());
    return this.http.get<Post[]>(`${this.postUrl}/user`, { headers: this.headers, params: requestParams });
  }


  /**
     * Save a new post
     */
  public save(post: Post): Observable<Post> {
    this.helper.trace(`adding new post : ${post.id}`);
    return this.http.post<Post>(`${this.postUrl}`, post, { headers: this.headers });
  }

  /**
   * update the post
   */
  public update(post: Post): Observable<Post> {
    this.helper.trace(`updating : ${post.id}`);
    let RequestParams: HttpParams = new HttpParams();
    RequestParams = RequestParams.append('id', post.id.toString());
    return this.http.put<Post>(`${this.postUrl}/${post.id}`, post, { headers: this.headers });
  }

  /**
  * delete an post
  */
  public delete(post: Post): Observable<Post> {
    this.helper.trace(`deleting : ${post.id}`);
    return this.http.delete<Post>(`${this.postUrl}/${post.id}`, { headers: this.headers });
  }
}
