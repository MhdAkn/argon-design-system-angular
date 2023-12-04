import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UtilsService } from '../../utils/utils.service';
import { User } from '../../models/user';
import { AuthServices } from '../../auth/services/auth-services.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
    isPageRefreshing = false;
    isConnect: boolean = false
    currentUser: User
    constructor(private location: Location, private router: Router, private _utilsService: UtilsService, private _detector: ChangeDetectorRef, private auth: AuthServices,

    ) {
        // this.isConnect = this.getUserConnect() != null || this.getUserConnect() != undefined ? true : false
        this.isConnect = this.auth.isAuthenticated()
        this._detector.markForCheck()
        this.currentUser = this.getUserConnect()
        this._detector.markForCheck();
        console.log(this.isConnect);
        console.log(this.getUserConnect());
        // window.location.reload();  

    }

    ngOnInit() {
        // this.isConnect = this.getUserConnect() != null || this.getUserConnect() != undefined ? true : false
        this.isConnect = this.auth.isAuthenticated()
        this._detector.markForCheck()
        // Rafraîchir la page uniquement lors de la première initialisation du composant
        if (!localStorage.getItem('isPageRefreshed')) {
            localStorage.setItem('isPageRefreshed', 'true');
            setTimeout(() => {
                window.location.reload();
              }, 100);
        }

    }
    getUserConnect(): User {
        return this._utilsService.READ_LOCAL_ENCODE(localStorage.CURRENT_USER);
    }

    disconnect() {
        this.auth.logout()
    }
    toggleMobileMenu() {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
    }
    ngAfterViewInit(): void {
        this.isConnect = this.auth.isAuthenticated()
        this._detector.markForCheck()

    }
}
