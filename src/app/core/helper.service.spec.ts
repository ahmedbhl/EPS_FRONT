import {inject, TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Helper} from './helper.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

/**
 * Auth Service Unit Testing
 */

describe('[Service] Helper', () => {

    /**
     * Happens before each running test
     */
    beforeEach(() =>
        TestBed.configureTestingModule({
                imports: [MatSnackBarModule, BrowserAnimationsModule],
                providers: [Helper]
            }
        )
    );

    /**
     * @Test : test if service is rightly injected
     */
    it('Should inject service', inject([Helper], (helper) => {
        expect(helper).toBeTruthy();
    }));

    /**
     * @Test : test loadScript(url: string)
     */
    it('Should load a script : loadScript(url: string)', inject([Helper], (helper) => {

        const nbScript: number = document.getElementsByTagName('script').length;

        // There is no need to have a real url here because we can only test
        // that the script tag has been added to the DOM
        helper.loadScript('README.md');

        expect(document.getElementsByTagName('script').length).toBe(nbScript + 1);

    }));

    /**
     * @Test : test getCnxUrl(url: string)
     */
    it('Should convert url : getCnxUrl(url: string)', inject([Helper], (helper) => {
        expect(helper.getCnxUrl('http://google.fr')).toBeTruthy();
    }));

    /**
     * @Test : test handleError(error: HttpErrorResponse)
     */
    it('Should handle an error : handleError(error: HttpErrorResponse)', inject([Helper], (helper) => {

        // Set Dummy Response
        const error = 'This response contains a throwable error!';
        const st = 'Page Not Found';
        const response: HttpErrorResponse = new HttpErrorResponse(
            {
                status: 404,
                statusText: st
            }
        );

        // Calling handle error function
        let res: any = helper.handleError(response);

        // Check if object has been created
        expect(res).toBeTruthy();
    }));




});
