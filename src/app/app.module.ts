import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExtraOptions, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './pages/home/home.module';
import { LoginComponent } from './auth/login/login.component';
import { CommonModule, LocationStrategy, PathLocationStrategy, registerLocaleData } from '@angular/common';
import { AuthServices } from './auth/services/auth-services.service';
import { CustomPreloadingWithDelayStrategy } from './custom-preload';
import localeFr from "@angular/common/locales/fr";
import { LocalStorageKey } from './keys/LocalStorageKey';
import { AppRoutingModule, appRoutes } from './app.routing';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { InitDateModule } from './shared/initialise-date/initialise-date.pipe.module';
import { LikesComponent } from './pages/likes/likes.component';
import { FuseConfirmationService } from '../confirmation/confirmation.service';
import { FuseConfirmationModule } from '../confirmation/confirmation.module';
import { MatIconModule } from '@angular/material/icon';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
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
    LikesComponent,
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
    MatIconModule,
    HttpClientModule,
    FuseConfirmationModule,
    InitDateModule

  ],
  providers: [AuthServices,
    CustomPreloadingWithDelayStrategy,
    {
      // Disable 'theme' sanity check
      provide: MATERIAL_SANITY_CHECKS,
      useValue: {
          doctype: true,
          theme: false,
          version: true
      }
  },
  // {
  //     // Use the 'fill' appearance on Angular Material form fields by default
  //     provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  //     useValue: {
  //         appearance: 'fill'
  //     }
  // }
    // { provide: MAT_DATE_LOCALE, useValue: "fr" },
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ], bootstrap: [AppComponent]
})
export class AppModule { }
function READ_LOCAL_TOKEN(ACCESS_TOKEN: any) {
  throw new Error('Function not implemented.');
}

