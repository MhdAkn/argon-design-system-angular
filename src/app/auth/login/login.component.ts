import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserLogin } from '../../playloads/userRegistration.playload';
import { AuthServices } from '../services/auth-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  signInForm: FormGroup;
  //variables userEntres
  userLog: UserLogin
  //tableau d'user
  users: User[] = [];

  //message erreur
  msg?: string

  //validite
  isValid?: boolean
  //empty
  isEmpty?: boolean

  rememberMe: boolean

  returnUrl: string = '';

  constructor( private auth: AuthServices, private router: Router,/*,private toastr: ToastrService*/) {
    //verification des validités 
    this.signInForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(false)
    })
  }

  ngOnInit(): void {
    //console.log(userList)
    // this.getUsers()
  }

  // getUsers() {
  //   this.userService.users$.subscribe(
  //     {
  //       next: (data) => {
  //         //  this.users=data
  //       }
  //     }
  //   )
  // }
  onSubmit() {
    //recuperation des informations entréees par le user
    this.userLog = new UserLogin()
    this.userLog = Object.assign(this.userLog, this.signInForm.value)
    this.auth.login(this.userLog)
  }

}
