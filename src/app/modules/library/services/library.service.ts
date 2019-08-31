import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Helper } from 'src/app/core/helper.service';
import { HttpHeader } from 'src/app/shared/helpers/http-header';
import { environment } from 'src/environments/environment';
import { Library } from '../model/library';

@Injectable()
export class LibraryService {

  /**
    * Url for request
    * @var string
    **/
  libraryUrl: string;

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
    this.libraryUrl = environment.library_url;
    this.headers = HttpHeader.getHeaders();
  }

  /**
  * Get all the educationnal institutions
  */
  public getAlllibrarys(): Observable<Library[]> {

    console.log('get the list of all files and foldrs ' + this.libraryUrl);
    return this.http.get<Library[]>(`${this.libraryUrl}/list`, { headers: this.headers });
  }

  /**
     * Save a new library
     */
  /*public save(library: Library): Observable<Library> {
    this.helper.trace(`adding new library : ${library.id}`);
    return this.http.post<Library>(`${this.libraryUrl}`, library, { headers: this.headers });
  }

  /**
   * update the library
   */
  /*public update(library: Library): Observable<Library> {
    this.helper.trace(`updating : ${library.id}`);
    let RequestParams: HttpParams = new HttpParams();
    RequestParams = RequestParams.append('id', library.id.toString());
    return this.http.put<Library>(`${this.libraryUrl}/${library.id}`, library, { headers: this.headers });
  }

  /**
  * delete an library
  */
  /*public delete(library: Library): Observable<Library> {
    this.helper.trace(`deleting : ${library.id}`);
    return this.http.delete<Library>(`${this.libraryUrl}/${library.id}`, { headers: this.headers });
  }*/
}
