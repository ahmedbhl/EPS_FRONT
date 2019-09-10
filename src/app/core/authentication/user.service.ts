import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeader } from 'src/app/shared/helpers/http-header';
import { Administration } from 'src/app/shared/models/administration';
import { User } from 'src/app/shared/models/user.class';
import { environment } from 'src/environments/environment';
import { Helper } from '../helper.service';

@Injectable()
export class UserService {
    /**
    * Url for request
    * @var string
    **/
    userUrl: string;

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
        this.userUrl = environment.users_api_url;
        this.headers = new HttpHeaders();
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT,OPTIONS');
        this.headers.append('Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
    }

    /**
    * Get all the Users
    */
    public getAllUsers(): Observable<User[]> {
        console.log('get the list of all Users ' + this.userUrl);
        return this.http.get<User[]>(`${this.userUrl}`, { headers: HttpHeader.getHeaders() });
    }

    /**
      * Get all the Administrations
      */
    public getAllAdministrations(): Observable<Administration[]> {
        console.log('get the list of all Administrations ' + this.userUrl);
        return this.http.get<Administration[]>(`${this.userUrl}/administrations`, { headers: HttpHeader.getHeaders() });
    }

    /**
     * Get all the Professors
     */
    public getAllProfessors(): Observable<User[]> {
        console.log('get the list of all Professors ' + this.userUrl);
        return this.http.get<User[]>(`${this.userUrl}/professors`, { headers: HttpHeader.getHeaders() });
    }

    /**
       * Save a new User
       */
    public save(user: User): Observable<User> {
        this.helper.trace(`adding new User : ${user.roles[0]}`);
        const roles = user.roles.map(role => role.name);
        if (roles.indexOf('administration') > -1) {
            return this.http.post<User>(`${this.userUrl}/administration`, user, { headers: this.headers });
        }
        if (roles.indexOf('professor') > -1) {
            return this.http.post<User>(`${this.userUrl}/professor`, user, { headers: this.headers });
        }
        if (roles.indexOf('student') > -1) {
            return this.http.post<User>(`${this.userUrl}/student`, user, { headers: this.headers });
        }
    }

    /**
     * update the User
     */
    public update(user: User): Observable<User> {
        this.helper.trace(`updating : ${user.id}`);
        let RequestParams: HttpParams = new HttpParams();
        RequestParams = RequestParams.append('id', user.id.toString());
        const roles = user.roles.map(role => role.name);
        if (roles.indexOf('ADMINISTRATION') > -1) {
            return this.http.put<User>(`${this.userUrl}/administration/${user.id}`, user, { headers: HttpHeader.getHeaders() });
        }
        if (roles.indexOf('PROFESSOR') > -1) {
            return this.http.put<User>(`${this.userUrl}/professor/${user.id}`, user, { headers: HttpHeader.getHeaders() });
        }
        if (roles.indexOf('STUDENT') > -1) {
            return this.http.put<User>(`${this.userUrl}/student/${user.id}`, user, { headers: HttpHeader.getHeaders() });
        }
    }

    /**
    * delete an User
    */
    public delete(user: User): Observable<User> {
        this.helper.trace(`deleting : ${user.id}`);
        return this.http.delete<User>(`${this.userUrl}/${user.id}`, { headers: HttpHeader.getHeaders() });
    }

    /**
     * 
     * @param id
     */
    changeStatus(id: number): Observable<boolean> {
        this.helper.trace(`Update the User status`);
        return this.http.put<boolean>(`${this.userUrl}/status/${id}`, { headers: this.headers });
    }

    /**
     * 
     * @param key
     */
    activateUser(key: string): Observable<boolean> {
        this.helper.trace(`Activate User`);
        return this.http.put<boolean>(`${this.userUrl}/activate/${key}`, { headers: this.headers });
    }

    /**
    * Used to check if the user exist before reset password
    * @param email
    */
    checkMailForResetPassword(email: string): Observable<boolean> {
        this.helper.trace(`check Mail For Reset Password`);
        return this.http.get<boolean>(`${this.userUrl}/exist/${email}`, { headers: this.headers });
    }

    /**
    * Used for check the key
    * @param key
    */
    checkUserKeyForResetPassword(email: string, key: string): Observable<boolean> {
        this.helper.trace(`check User Key For Reset Password`);
        let requestParams: HttpParams = new HttpParams();
        requestParams = requestParams.append('key', key);
        requestParams = requestParams.append('email', email);
        return this.http.get<boolean>(`${this.userUrl}/check`, { headers: this.headers, params: requestParams });
    }

    resetPassword(email: string, key: string, password: string): Observable<boolean> {
        this.helper.trace(`Reset Password`);
        let requestParams: HttpParams = new HttpParams();
        requestParams = requestParams.append('email', email);
        requestParams = requestParams.append('key', key);
        requestParams = requestParams.append('password', password);
        return this.http.get<boolean>(`${this.userUrl}/reset`, { headers: this.headers, params: requestParams });
    }
}
