import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Location, PopStateEvent } from '@angular/common';
import { UtilsService } from '../../utils/utils.service';
import { User } from '../../models/user';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
    public isCollapsed;
    private lastPoppedUrl: string;
    private yScrollStack: number[] = [];
    isConnect: boolean = false
    currentUser: User
    constructor(public location: Location, private router: Router, private _utilsService: UtilsService, private _detector: ChangeDetectorRef,

    ) {
        this.isCollapsed = true;
        this.isConnect = this.getUserConnect() != null || this.getUserConnect() != undefined ? true : false
        this.currentUser = this.getUserConnect()
        this._detector.markForCheck();
        console.log(this.isConnect);
        console.log(this.getUserConnect());
    }

    ngOnInit() {



        this.router.events.subscribe((event) => {
            this.isCollapsed = true;
            if (event instanceof NavigationStart) {
                if (event.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (event instanceof NavigationEnd) {
                if (event.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });
        this.location.subscribe((ev: PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
    }
    getUserConnect(): User {
        return this._utilsService.READ_LOCAL_ENCODE(localStorage.CURRENT_USER);
    }
    close() {
        this.isCollapsed = false
    }

    toggle() {
        this.isCollapsed = true
        this._detector.markForCheck()
    }
    isHome() {
        var titlee = this.location.prepareExternalUrl(this.location.path());

        if (titlee === '#/home') {
            return true;
        }
        else {
            return false;
        }
    }
    isDocumentation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee === '#/documentation') {
            return true;
        }
        else {
            return false;
        }
    }
}
