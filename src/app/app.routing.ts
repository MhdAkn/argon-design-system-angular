import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/services/auth-guard';
import { AccountResolver } from './resolvers/account.resolver';
import { LikesListesByUsersResolver } from './resolvers/likes-list';
import { NewsResolver } from './resolvers/news.resolver';
import { NoteDetailsResolver } from './resolvers/note-details.resolver';
import { NotesListesByUsersResolver } from './resolvers/note.resolver';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: ProfileComponent },
  { path: 'register', component: SignupComponent },
  { path: 'landing', component: LandingComponent },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'news',
    data: { theme: 'theme-brand' },
    resolve: {
      user: AccountResolver, DataInfo: NewsResolver
    },
    // loadChildren: () => import('./pages/news/news.module').then(m => m.NewsModule)
  },
  {
    path: 'notes',
    canActivate: [AuthGuard],
    data: { theme: 'theme-brand' },
    resolve: {
      DataInfo: NotesListesByUsersResolver, user: AccountResolver
    },
    // loadChildren: () => import('./pages/listes/listes.module').then(m => m.ListesModule)
  },
  {
    path: 'likes',
    canActivate: [AuthGuard],
    data: { theme: 'theme-brand' },
    resolve: {
      DataInfo: LikesListesByUsersResolver, user: AccountResolver
    },
    // loadChildren: () => import('./pages/likes/likes.module').then(m => m.LikesModule)
  },
  {
    path: 'notes/:reference/detail',
    canActivate: [AuthGuard],
    data: { theme: 'theme-brand' },
    resolve: { NoteData: NoteDetailsResolver, user: AccountResolver },
    // loadChildren: () => import('./pages/listes/detail-note/detail-note.module').then(m => m.DetailNoteModule)
  },
  // {
  //   path: '404',
  //   resolve: { user: AccountResolver },
  //   data: { preload: true },
  //   loadChildren: () => import('./errors/error-404/error-404.module').then(m => m.Error404Module)
  // },
  // {
  //   path: '**', redirectTo: '404'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
