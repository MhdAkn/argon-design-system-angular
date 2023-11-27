
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { HttpCode } from '../../enums/EN_SHARED/EN_HttpCode.enum';
import { UtilsService } from '../../utils/utils.service';
import { AlertService } from '../../utils/alert.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserRegistration, UserLogin } from '../../playloads/userRegistration.playload';
import { ApiResponse } from '../../response/api-response';


enum UserRoutes {
  USER_REGISTRATION = "/user-registration",
  USER_LOGIN = "/user-login",
  USER_LOGOUT = "/user-logout",

}

@Injectable()

export class AuthServices {
  private tokenExpirationTime: number = 60 * 60 * 1000; // 1 heure en millisecondes
  private refreshTokenExpirationTime: number = 5 * 60 * 60 * 1000; // 5 heures en millisecondes

  userData: Array<{}>;
  tocken: number;
  signInForm: FormGroup;
  //variables userEntres
  currentUser: User
  //tableau d'user
  users: User[] = [];
  private _data: BehaviorSubject<any> = new BehaviorSubject(null);
  private apiUrl = environment.apiUrl;
  private headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  private options = {
    headers: this.headers
  }
  constructor(
    private router: Router,
    private _utilsService: UtilsService,
    private _alertService: AlertService,
    private _httpClient: HttpClient
  ) {


  }
  setTocken() {
    // Effectuer la logique d'authentification, par exemple, en appelant une API
    // Si les informations d'identification sont valides, vous pouvez stocker le jeton d'authentification et le refreshToken dans le local storage
    const authToken = this.generateToken(10);
    const refreshToken = this.generateToken(10);
    const now = new Date().getTime();

    localStorage.setItem('token', authToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('tokenExpirationTime', (now + this.tokenExpirationTime).toString());
    localStorage.setItem('refreshTokenExpirationTime', (now + this.refreshTokenExpirationTime).toString());
    // localStorage.setItem('tocken', JSON.stringify(this.tocken));
    console.log(localStorage.getItem('token'));
    console.log(localStorage.getItem('refreshToken'));
    console.log(localStorage.getItem('tokenExpirationTime'));
    console.log(localStorage.getItem('refreshTokenExpirationTime'));
    // console.log(localStorage.getItem('tocken'));

  }

  validateUserTocken() {


  }
  // getUsers() {
  //   this.userService.users$.subscribe(
  //     {
  //       next: (data) => {
  //         this.users = data
  //       }
  //     }
  //   )
  // }
  getToken(): number {
    return this.tocken;
  }

  getUserConnect(): User {
    return this._utilsService.READ_LOCAL_ENCODE(localStorage.CURRENT_USER);
  }


  login(currentUser: UserLogin) {
    console.log(currentUser);

    //genreration de token
    //verification des données identiques
    if (currentUser.email == '' || currentUser.password == '') {
      this.showError1()
    }
    else {
      this.setlogin(currentUser).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == HttpCode.SUCCESS) {
            this.currentUser = res.data;
            this._utilsService.STORE_LOCAL_ENCODE(localStorage.CURRENT_USER, this.currentUser);
            this.showSuccess()
            this.setTocken()
            this.router.navigateByUrl('/news')

          } else if (res.status == HttpCode.NOT_EXIST) {
            this._alertService.showToast('Email ou Mot de passe incorrecte', 'error', 'top-center')
          } else {
            this._alertService.showToast('Connexion échouée', 'error', 'top-center')
          }
        },
        error: (error)=>{
          console.log(error);
        }
      })
    }
  }

  saveUser(user: UserRegistration) {
    this.setlogin({ email: this.currentUser.email, password: this.currentUser.password }).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status == HttpCode.SUCCESS) {
          this.currentUser = res.data;
          this._utilsService.STORE_LOCAL_ENCODE(localStorage.CURRENT_USER, this.currentUser);
          this.showSuccess()
          this.setTocken()
          this.router.navigateByUrl('/news')

        } else if (res.status == HttpCode.NOT_EXIST) {
          this._alertService.showToast('Email ou Mot de passe incorrecte', 'error', 'top-center')
        } else {
          this._alertService.showToast('Connexion échouée', 'error', 'top-center')
        }
      }
    })
  }



  logout() {
    let user = this._utilsService.READ_LOCAL_ENCODE(localStorage.CURRENT_USER);

    this.setlogout({ email: user.email, password: user.password }).subscribe({
      next: (res) => {
        console.log(res);

        if (res.status == HttpCode.SUCCESS) {
          // Supprimer les jetons d'authentification et leurs durées de validité du local storage lors de la déconnexion
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('tokenExpirationTime');
          localStorage.removeItem('refreshTokenExpirationTime');
          this._alertService.showToast('Déconnexion réussie', 'success', 'top-center')
          this.router.navigateByUrl('/login')
        } else {
          this._alertService.showToast('Oops une erreur s\'est produite! Veuillez réassayer', 'error', 'top-center')
        }
      }
    })

  }

  showError() {
    this._alertService.showToast('Veuillez vérifier vos données entrées ! Informations incorrectes', 'error', 'top-center')
  }

  showError1() {
    this._alertService.showToast('Veuillez entrés vos données ! Champs requis', 'error', 'top-center')
  }

  showSuccess() {
    this._alertService.showToast('Connexion réussie', 'success', 'top-center')
  }

  generateToken(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      token += characters.charAt(randomIndex);
    }

    return token;
  }

  // Vérifier si l'utilisateur est connecté en vérifiant la présence du jeton d'authentification et sa durée de validité dans le local storage
  isAuthenticated(): boolean {
    const authToken = localStorage.getItem('token');
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');

    if (authToken && tokenExpirationTime) {
      const now = new Date().getTime();
      return now < parseInt(tokenExpirationTime, 10);
    }
    return false;
  }

  // Vérifier si le refreshToken est encore valide en vérifiant sa durée de validité dans le local storage
  isRefreshTokenValid(): boolean {
    const refreshToken = localStorage.getItem('refreshToken');
    const refreshTokenExpirationTime = localStorage.getItem('refreshTokenExpirationTime');

    if (refreshToken && refreshTokenExpirationTime) {
      const now = new Date().getTime();
      return now < parseInt(refreshTokenExpirationTime, 10);
    }

    return false;
  }

  refreshToken(): void {
    // Effectuer la logique pour rafraîchir le token d'authentification en appelant une API avec le refreshToken
    // Si le rafraîchissement est réussi, mettre à jour le jeton d'authentification et sa durée de validité dans le local storage
    const newAuthToken = this.generateToken(10);
    const now = new Date().getTime();

    localStorage.setItem('token', newAuthToken);
    localStorage.setItem('tokenExpirationTime', (now + this.tokenExpirationTime).toString());
  }


  registration(reqData: UserRegistration): Observable<ApiResponse> {
    return this._httpClient.post<ApiResponse>(`${this.apiUrl}auth${UserRoutes.USER_REGISTRATION}`, { reqData: reqData }, this.options)
  }

  setlogin(reqData: UserLogin): Observable<ApiResponse> {
    // fetch(`${this.apiUrl}auth${UserRoutes.USER_LOGIN}`, { method: 'POST',body: JSON.stringify({reqData:reqData}),headers: {
    //   "Content-Type": "application/json",
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // },})
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             this._utilsService.STORE_LOCAL_ENCODE(localStorage.CURRENT_USER, data);

    //         })
    //         .catch((error) => {
    //             console.log('CRASH');
    //         });
    return this._httpClient.post<ApiResponse>(`${this.apiUrl}auth${UserRoutes.USER_LOGIN}`, { reqData: reqData }, this.options)
  }
  setlogout(reqData: UserLogin): Observable<ApiResponse> {
    return this._httpClient.post<ApiResponse>(`${this.apiUrl}auth${UserRoutes.USER_LOGOUT}`, { reqData: reqData }, this.options)
  }
  getMe(): Observable<User> {
    let user = this._utilsService.READ_LOCAL_ENCODE(localStorage.CURRENT_USER);
    console.log(user);
    
    return user
  }
}