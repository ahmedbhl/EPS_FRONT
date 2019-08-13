import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from 'src/app/core/helper.service';
import { HttpHeader } from 'src/app/shared/helpers/http-header';
import { environment } from 'src/environments/environment';
import { EducationalInstitution } from '../model/educational-institution';

@Injectable()
export class EducationalInstitutionService {

  /**
  * Url for request
  * @var string
  **/
  educationalInstitutionUrl: string;

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
    this.educationalInstitutionUrl = environment.educational_institution_url;
    this.headers = HttpHeader.getHeaders();
  }

  /**
  * Get all the educationnal institutions
  */
  public getAllEducationalInstitution(): Observable<EducationalInstitution[]> {


    console.log('get the list of all educational institutions ' + this.educationalInstitutionUrl);
    return this.http.get<EducationalInstitution[]>(`${this.educationalInstitutionUrl}`, { headers: this.headers });
  }

  /**
     * Save a new educational Institution
     */
  public save(educationalInstitution: EducationalInstitution): Observable<EducationalInstitution> {
    this.helper.trace(`adding new educational Institution : ${educationalInstitution.id}`);
    return this.http.post<EducationalInstitution>(`${this.educationalInstitutionUrl}`, educationalInstitution, { headers: this.headers });
  }

  /**
   * update the educational Institution
   */
  public update(educationalInstitution: EducationalInstitution): Observable<EducationalInstitution> {
    this.helper.trace(`updating : ${educationalInstitution.id}`);
    let RequestParams: HttpParams = new HttpParams();
    RequestParams = RequestParams.append('id', educationalInstitution.id.toString());
    return this.http.put<EducationalInstitution>(`${this.educationalInstitutionUrl}/${educationalInstitution.id}`, educationalInstitution, { headers: this.headers });
  }

  /**
  * delete an educational Institution
  */
  public delete(educationalInstitution: EducationalInstitution): Observable<EducationalInstitution> {
    this.helper.trace(`deleting : ${educationalInstitution.id}`);
    return this.http.delete<EducationalInstitution>(`${this.educationalInstitutionUrl}/${educationalInstitution.id}`, { headers: this.headers });
  }
}
