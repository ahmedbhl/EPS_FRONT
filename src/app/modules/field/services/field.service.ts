import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from 'src/app/core/helper.service';
import { HttpHeader } from 'src/app/shared/helpers/http-header';
import { environment } from 'src/environments/environment';
import { Field } from '../model/field';

@Injectable()
export class FieldService {

  /**
    * Url for request
    * @var string
    **/
  fieldUrl: string;

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
    this.fieldUrl = environment.field_url;
    this.headers = HttpHeader.getHeaders();
  }

  /**
  * Get all the educationnal institutions
  */
  public getAllFields(): Observable<Field[]> {
    console.log('get the list of all Fields ' + this.fieldUrl);
    return this.http.get<Field[]>(`${this.fieldUrl}`, { headers: this.headers });
  }

  /**
* Get all Field By Administration
*/
  public getFieldsByAdministration(administrationId: number): Observable<Field[]> {
    console.log('get the list of all Fields By establishement ' + this.fieldUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('administrationId', administrationId.toString());
    return this.http.get<Field[]>(`${this.fieldUrl}/administration`, { headers: this.headers, params: requestParams });
  }


  /**
     * Save a new Field
     */
  public save(field: Field): Observable<Field> {
    this.helper.trace(`adding new Field : ${field.id}`);
    return this.http.post<Field>(`${this.fieldUrl}`, field, { headers: this.headers });
  }

  /**
   * update the Field
   */
  public update(field: Field): Observable<Field> {
    this.helper.trace(`updating : ${field.id}`);
    let RequestParams: HttpParams = new HttpParams();
    RequestParams = RequestParams.append('id', field.id.toString());
    return this.http.put<Field>(`${this.fieldUrl}/${field.id}`, field, { headers: this.headers });
  }

  /**
  * delete an Field
  */
  public delete(field: Field): Observable<Field> {
    this.helper.trace(`deleting : ${field.id}`);
    return this.http.delete<Field>(`${this.fieldUrl}/${field.id}`, { headers: this.headers });
  }
}
