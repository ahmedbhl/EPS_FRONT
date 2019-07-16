// export for convenience.
export {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';

import {Component, Directive, HostListener, Injectable, Input} from '@angular/core';
import {NavigationExtras} from '@angular/router';
// Only implements params and part of snapshot.params
import {BehaviorSubject} from 'rxjs';

@Directive({
    selector: '[routerLink]',
})
export class RouterLinkStubDirective {
    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    @HostListener('click')
    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent {
}

@Injectable()
export class RouterStub {
    navigate(commands: any[], extras?: NavigationExtras) {
    }

    navigateByUrl(url: string) {
        return url;
    }
}


@Injectable()
export class ActivatedRouteStub {

    // ActivatedRoute.params is Observable
    private subject = new BehaviorSubject(this.testParams);
    params = this.subject.asObservable();

    // Test parameters
    private _testParams: {};
    get testParams() {
        return this._testParams;
    }

    set testParams(params: {}) {
        this._testParams = params;
        this.subject.next(params);
    }

}
