import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    * Get all the educationnal institutions
    */
    public getAllUsers(): Observable<User[]> {
        console.log('get the list of all Users ' + this.userUrl);
        return this.http.get<User[]>(`${this.userUrl}`, { headers: this.headers });
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
        if (user.roles.indexOf('ADMINISTRATION') > -1) {
            return this.http.put<User>(`${this.userUrl}/administration/${user.id}`, user, { headers: this.headers, params: RequestParams });
        }
        if (user.roles.indexOf('PROFESSOR') > -1) {
            return this.http.put<User>(`${this.userUrl}/professor/${user.id}`, user, { headers: this.headers });
        }
        if (user.roles.indexOf('STUDENT') > -1) {
            return this.http.put<User>(`${this.userUrl}/student/${user.id}`, user, { headers: this.headers });
        }
    }

    /**
    * delete an User
    */
    public delete(user: User): Observable<User> {
        this.helper.trace(`deleting : ${user.id}`);
        return this.http.delete<User>(`${this.userUrl}/${user.id}`, { headers: this.headers });
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
