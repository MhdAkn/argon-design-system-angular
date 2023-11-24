import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    //SigninComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }