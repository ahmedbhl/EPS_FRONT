import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  public getAlllibrarys(path): Observable<Library[]> {
    console.log('get the list of all files and foldrs ' + this.libraryUrl);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('target', `/${path}`);
    return this.http.get<Library[]>(`${this.libraryUrl}/list`, { headers: this.headers, params: requestParams });
  }

  /**
  * Get all the educationnal institutions
  */
  public getSharedLink(path): Observable<string> {
    console.log('get the shared link ' + path);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('path', `${path}`);
    return this.http.get<string>(`${this.libraryUrl}/share`, { headers: this.headers, params: requestParams });
  }

  /**
     * upload a file
     */
  uploadFile(file: File, filePath): Observable<string> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('filePath', filePath);
    return this.http.post<string>(`${this.libraryUrl}/upload`, formdata, { headers: this.headers, params: requestParams });
  }

  /**
  * Get all the educationnal institutions
  */
  public createFolder(folderName) {
    console.log('Create new foldr ' + folderName);
    let requestParams: HttpParams = new HttpParams();
    requestParams = requestParams.append('folderName', folderName.toString());
    return this.http.get<Library[]>(`${this.libraryUrl}/folder`, { headers: this.headers, params: requestParams });
  }

}
