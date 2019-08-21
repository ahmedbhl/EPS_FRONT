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

  /**
     * Save a new Classe
     */
  public save(classe: Classe): Observable<Classe> {
    this.helper.trace(`adding new Classe : ${classe.id}`);
    return this.http.post<Classe>(`${this.classeUrl}`, Classe, { headers: this.headers });
  }

  /**
   * update the Classe
   */
  public update(classe: Classe): Observable<Classe> {
    this.helper.trace(`updating : ${classe.id}`);
    let RequestParams: HttpParams = new HttpParams();
    RequestParams = RequestParams.append('id', classe.id.toString());
    return this.http.put<Classe>(`${this.classeUrl}/${classe.id}`, Classe, { headers: this.headers });
  }

  /**
  * delete an Classe
  */
  public delete(classe: Classe): Observable<Classe> {
    this.helper.trace(`deleting : ${classe.id}`);
    return this.http.delete<Classe>(`${this.classeUrl}/${classe.id}`, { headers: this.headers });
  }
}
