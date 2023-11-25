import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExtraOptions, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './home/home.module';
import { LoginComponent } from './auth/login/login.component';
import { CommonModule, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { AuthServices } from './auth/services/auth-services.service';
import { CustomPreloadingWithDelayStrategy } from './custom-preload';
import localeFr from "@angular/common/locales/fr";
import { LocalStorageKey } from './keys/LocalStorageKey';
import { AppRoutingModule, appRoutes } from './app.routing';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
// import { MAT_DATE_LOCALE } from "@angular/material/core";


const routerConfig: ExtraOptions = {
  preloadingStrategy: CustomPreloadingWithDelayStrategy,
  scrollPositionRestoration: "enabled",
  onSameUrlNavigation: "reload",
};
registerLocaleData(localeFr);

export function tokenGetter() {
  return READ_LOCAL_TOKEN(LocalStorageKey.ACCESS_TOKEN);
}

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LandingComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot(appRoutes, routerConfig),
    HomeModule,
    AppRoutingModule,
    CommonModule,
    CoreModule,
    HttpClientModule,
  ],
  providers: [AuthServices,
    CustomPreloadingWithDelayStrategy,
    // { provide: MAT_DATE_LOCALE, useValue: "fr" },
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ], bootstrap: [AppComponent]
})
export class AppModule { }
function READ_LOCAL_TOKEN(ACCESS_TOKEN: any) {
  throw new Error('Function not implemented.');
}

