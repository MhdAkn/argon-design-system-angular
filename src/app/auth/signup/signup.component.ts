import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpCode } from '../../enums/EN_SHARED/EN_HttpCode.enum';
import { UserRegistration } from '../../playloads/userRegistration.playload';
import { AlertService } from '../../utils/alert.service';
import { UtilsService } from '../../utils/utils.service';
import { User } from '../../models/user';
import { AuthServices } from '../services/auth-services.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    focus;
    focus1;
    focus2;
    focus3;
    focus4;
  
    user: UserRegistration
    isValidFormSubmitted?: boolean;
  
    emailRegex =
      '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  
    signUpForm: FormGroup;
    acceptTerm: boolean
    currentUser: User
  
  
    //table user
  
    constructor(private router: Router,
      private authService: AuthServices,
      private _alertService: AlertService,
      private _utilsService: UtilsService,
  
    ) {
      this.signUpForm = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        pseudo: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        email: new FormControl('', {
          validators: [Validators.required, Validators.pattern(this.emailRegex)],
          updateOn: 'blur',
        }),
        acceptTerm: new FormControl(false),
      })
    };
  
    ngOnInit(): void {
    }
  
  
  
    onFormSubmit() {
      this.isValidFormSubmitted = false;
      if (this.signUpForm.invalid) {
        return;
      }
      this.isValidFormSubmitted = true;
      this.user = new UserRegistration()
      this.user = Object.assign(this.user, this.signUpForm.value);
      console.log(this.user);
  
      //avec observable
  
      //console.log(this.user);
      //localStorage.setItem("data", JSON.stringify(this.user));
      //console.log(listes)   // this.userService.createUser(this.user);
      this.authService.registration(this.user).subscribe({
        next: (res) => {
          console.log(res);
  
          if (res.status == HttpCode.SUCCESS) {
            //Envoyer les données à l'observable
            this.currentUser = res.data;
            this._utilsService.STORE_LOCAL_ENCODE(localStorage.CURRENT_USER, this.currentUser);
  
            this._alertService.showToast('Inscription réussie', 'success', 'top-center')
            //vider le formulaire
            this.signUpForm.reset()
            //Redirection
            window.location.href = '/news'
          } else if (res.status = HttpCode.ALREADY_EXIST) {
            this._alertService.showToast('Email ou Pseudo existante', 'error', 'top-center')
          } else {
            this._alertService.showToast('Connexion échouée', 'error', 'top-center')
          }
        }
      })
  
  
    }
    get email() {
      return this.signUpForm.get('email');
    }
    logout() {
      this.authService.logout()
    }
    /*
    getFrom() {
     // let userList : User[] = ;
    // console.log('yyyyy')
     //userList.push(this.user)
     //console.log(users1)
     return this.user;
    }*/
  
  }
  