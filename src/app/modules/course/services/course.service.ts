import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from 'src/app/core/helper.service';
import { HttpHeader } from 'src/app/shared/helpers/http-header';
import { environment } from 'src/environments/environment';
import { Course } from '../model/course';

@Injectable()
export class CourseService {

  /**
    * Url for request
    * @var string
    **/
  courseUrl: string;

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
    this.courseUrl = environment.course_url;
    this.headers = HttpHeader.getHeaders();
  }

  /**
  * Get all the educationnal institutions
  */
  public getAllCourses(): Observable<Course[]> {
    console.log('get the list of all Courses ' + this.courseUrl);
    return this.http.get<Course[]>(`${this.courseUrl}`, { headers: this.headers });
  }


  /**
 * Get all Course By Administration
 */
  public getCourseByAdministration(administrationId: number): Observable<Course[]> {
    console.log('get the list of all Courses By establishement ' + this.courseUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('administrationId', administrationId.toString());
    return this.http.get<Course[]>(`${this.courseUrl}/administration`, { headers: this.headers, params: requestParams });
  }

  /**
     * Save a new Course
     */
  public save(course: Course): Observable<Course> {
    this.helper.trace(`adding new Course : ${course.id}`);
    return this.http.post<Course>(`${this.courseUrl}`, course, { headers: this.headers });
  }

  /**
   * update the Course
   */
  public update(course: Course): Observable<Course> {
    this.helper.trace(`updating : ${course.id}`);
    let RequestParams: HttpParams = new HttpParams();
    RequestParams = RequestParams.append('id', course.id.toString());
    return this.http.put<Course>(`${this.courseUrl}/${course.id}`, course, { headers: this.headers });
  }

  /**
  * delete an Course
  */
  public delete(course: Course): Observable<Course> {
    this.helper.trace(`deleting : ${course.id}`);
    return this.http.delete<Course>(`${this.courseUrl}/${course.id}`, { headers: this.headers });
  }
}
