import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class Helper {

    // evtBroadcast allow client to send message to subscriber without any import or dépendance
    // in the app, evtbroadcast get message from permission guard and send them to app.component.
    @Output() static evtBroadcast = new EventEmitter();
    DEFAULT_CONNECTION_ERROR = 'An error has occurred! Check the connection to the Back End!';

    public static broadcast(lbl: string) {
        Helper.evtBroadcast.emit(lbl);
    }

    /**
     * Helper Constructor
     *
     * @param sanitizer
     */
    constructor(
        private readonly sanitizer: DomSanitizer,
        public snack: MatSnackBar
    ) {
    }

    /**
     * Trace string in console
     */
    public trace(any: any) {
        if (environment.log === 'true') {
            console.log(any);
        }
    }

    /**
     * Load Custom script
     *
     * @param url
     */
    public loadScript(url: string) {
        this.trace('Preparing to load script... : ' + url);
        const node = document.createElement('script');
        node.src = url;
        node.id = 'bandeau-script';
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    /**
     * Get trustable and sanitized url
     *
     * @param url
     */
    public getCnxUrl(url: string) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    /**
     * Handle http request error : here is the throwing way
     *
     * @param error
     */
    public handleError(error: HttpErrorResponse | any) {

        // Log Technical error in console
        console.log(error);
        // Push error message to the snackBar
        this.pushSnackMessage(this.DEFAULT_CONNECTION_ERROR, 'error');

        // front end error
        if (error.error instanceof ErrorEvent) {
            return throwError('Erreur: ' + error.error.message);
        } else { // Back end error
            if (error && error.status >= 400) {
                return throwError(error.status + ' ' + error.statusText);
            } else if (error.status === 0) { // lost connection : reload page
                location.reload();
                return throwError('Allowed idle time exceeded. Reconnecting to the application.');
            }
        }
        return throwError(error.status + ' ' + error.statusText);
    }

    /**
     * Extract json from Response
     * Shortcut : used by map function
     *
     * @param res
     */
    public getObjectResponseBody(res: HttpResponse<any>) {
        return res.body;
    }

    /**
     * Convert Object to HttpParams
     *
     * @param params
     */
    public toHttpParams(params) {
        return Object.getOwnPropertyNames(params)
            .reduce((p, key) => p.set(key, params[key]), new HttpParams());
    }

    /**
     * Push snackError
     *
     * @param msg
     */
    public pushSnackMessage(msg: string, status = 'success') {

        const extraClassesArray: string[] = status === 'error' ? ['warn-fg', 'm-12'] : ['m-12'];

        // Display snackBar to display sample error
        this.snack.open(msg, null, {
            duration: 3000,
            panelClass: extraClassesArray,
            horizontalPosition: 'end'
        });

    }

}
