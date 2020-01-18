import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from 'src/app/core/helper.service';
import { HttpHeader } from 'src/app/shared/helpers/http-header';
import { environment } from 'src/environments/environment';
import { Classe } from '../model/Classe';

@Injectable()
export class ClasseService {

  /**
    * Url for request
    * @var string
    **/
  classeUrl: string;

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
    this.classeUrl = environment.classe_url;
    this.headers = HttpHeader.getHeaders();
  }

  /**
  * Get all the educationnal institutions
  */
  public getAllClasses(): Observable<Classe[]> {
    console.log('get the list of all Classes ' + this.classeUrl);
    return this.http.get<Classe[]>(`${this.classeUrl}`, { headers: this.headers });
  }

  public getAllClassesByProfessor(professorId: number): Observable<Classe[]> {
    console.log('get the list of all Classe By User ' + this.classeUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('professorId', professorId.toString());
    return this.http.get<Classe[]>(`${this.classeUrl}/professor`, { headers: this.headers, params: requestParams });
  }

  public getAllClassesByStudent(studentId: number): Observable<Classe[]> {
    console.log('get the list of all Classe By User ' + this.classeUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('studentId', studentId.toString());
    return this.http.get<Classe[]>(`${this.classeUrl}/student`, { headers: this.headers, params: requestParams });
  }

  public getClassByEstablishement(administrationId: number): Observable<Classe[]> {
    console.log('get the list of all Classe By administrationId ' + this.classeUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('administrationId', administrationId.toString());
    return this.http.get<Classe[]>(`${this.classeUrl}/administration`, { headers: this.headers, params: requestParams });
  }

  /**
     * Save a new Classe
     */
  public save(classe: Classe): Observable<Classe> {
    this.helper.trace(`adding new Classe : ${classe.className}`);
    return this.http.post<Classe>(`${this.classeUrl}`, classe, { headers: this.headers });
  }

  /**
   * update the Classe
   */
  public update(classe: Classe): Observable<Classe> {
    this.helper.trace(`updating : ${classe.className}`);
    let RequestParams: HttpParams = new HttpParams();
    RequestParams = RequestParams.append('id', classe.id.toString());
    return this.http.put<Classe>(`${this.classeUrl}/${classe.id}`, classe, { headers: this.headers });
  }

  /**
  * delete an Classe
  */
  public delete(classe: Classe): Observable<Classe> {
    this.helper.trace(`deleting : ${classe.id}`);
    return this.http.delete<Classe>(`${this.classeUrl}/${classe.id}`, { headers: this.headers });
  }
}
