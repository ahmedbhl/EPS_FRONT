import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from 'src/app/core/helper.service';
import { HttpHeader } from 'src/app/shared/helpers/http-header';
import { environment } from 'src/environments/environment';
import { Level } from '../model/level';
import { EducationalInstitution } from '../../educational-institution/model/educational-institution';

@Injectable()
export class LevelService {

  /**
    * Url for request
    * @var string
    **/
  LevelUrl: string;

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
    this.LevelUrl = environment.level_url;
    this.headers = HttpHeader.getHeaders();
  }

  /**
  * Get all level
  */
  public getLevelByAdministration(administrationId: number): Observable<Level[]> {
    console.log('get the list of all levels By establishement ' + this.LevelUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('administrationId', administrationId.toString());
    return this.http.get<Level[]>(`${this.LevelUrl}/administration`, { headers: this.headers, params: requestParams });
  }

  /**
 *  Get all level by establishement
 */
  public getAllLevels(): Observable<Level[]> {
    console.log('get the list of all levels ' + this.LevelUrl);
    return this.http.get<Level[]>(`${this.LevelUrl}`, { headers: this.headers });
  }

  /**
     * Save a new level
     */
  public save(Level: Level): Observable<Level> {
    this.helper.trace(`adding new level : ${Level.id}`);
    return this.http.post<Level>(`${this.LevelUrl}`, Level, { headers: this.headers });
  }

  /**
   * update the level
   */
  public update(Level: Level): Observable<Level> {
    this.helper.trace(`updating : ${Level.id}`);
    let RequestParams: HttpParams = new HttpParams();
    RequestParams = RequestParams.append('id', Level.id.toString());
    return this.http.put<Level>(`${this.LevelUrl}/${Level.id}`, Level, { headers: this.headers });
  }

  /**
  * delete an level
  */
  public delete(Level: Level): Observable<Level> {
    this.helper.trace(`deleting : ${Level.id}`);
    return this.http.delete<Level>(`${this.LevelUrl}/${Level.id}`, { headers: this.headers });
  }
}
