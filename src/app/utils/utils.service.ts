import { Injectable } from '@angular/core';
import { NavigationExtras, Router, RoutesRecognized } from '@angular/router';
import { ToastPosition } from '@ngneat/hot-toast';

import * as CryptoJS from 'crypto-js';
// import aes from 'crypto-js/aes';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, filter, pairwise } from 'rxjs';
import { environment } from '../../environments/environment';
import { AlertService } from './alert.service';
import { EncryptStorage } from 'storage-encryption';
// var Cipher = require('basic-cipher');
import encoDer from 'd-encode-decode';
encoDer.key('EXPO988798/9^jsqo{{oo5654YTS#332')

@Injectable({
    providedIn: 'root'
})

export class UtilsService {
    ipAddress: string;
    public previousRoutePath = new BehaviorSubject<string>('');
    public previousEventPath = new BehaviorSubject<string>('');

    encryptStorage = new EncryptStorage('&&$Notariat#20@76_x_=', 'localStorage');
    encryptSessionStore = new EncryptStorage('&&$Notariat#20@76_x_=', 'sessionStorage');
    ENCODING_KEY: string = 'YEIES98879Boksijsqo&&oo565332'
    tempCountAlert: number = 0

    get previousEventPath$(): Observable<string> {
        return this.previousEventPath.asObservable();
    }

    private ConnectMeNow = new BehaviorSubject<any>(null);

    setConnectMeNow(data: any) {
        this.ConnectMeNow.next(data);
    }

    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': environment.appUrl,
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    })

    private options = {
        headers: this.headers
    }

    getConnectMeNow(): Observable<any> {
        return this.ConnectMeNow.asObservable();
    }

    constructor(
        private _router: Router,
        private _httpClient: HttpClient,
        private _alertService: AlertService,
    ) {
        this._router.events.pipe(
            filter(e => e instanceof RoutesRecognized),
            pairwise(),
        ).subscribe((event: any[]) => {
            this.STORE_SESSION_ENCODE('previousUrl', event[0].urlAfterRedirects)
        });
    }

    STORE_LOCAL_ENCODE(key: string, value: any) {
        localStorage.removeItem(key)
        this.encryptStorage.encrypt(key, JSON.stringify(value));
        return true;
    };


    // STORE_LOCAL_ENCODE_CRYPTO(key: string, value: any) {
    //     var encrypted = aes.encrypt(JSON.stringify(value), "|nmW7V<G3)]<42pC£o>");
    //     localStorage.removeItem(key)
    //     localStorage.setItem(key, encrypted.toString())
    // };


    STORE_SESSION_ENCODE(key: string, value: any): void {
        localStorage.removeItem(key)
        this.encryptSessionStore.encrypt(key, JSON.stringify(value));
    };

    decryptAnyWord(uniqueUserLink: string) {
        try {
            // Try to convert to utf-8
            let utf8Text = decodeURIComponent(escape(uniqueUserLink));
            let mailDecrypted = CryptoJS.enc.Base64.parse(uniqueUserLink).toString(CryptoJS.enc.Utf8);
            return mailDecrypted
        } catch (e) {
            return 'FakeMail';
        }
    }

    convertDateToUTC(date: Date | string, offsetHours: number = -1): Date {
        // Obtenir la date en temps local
        const localDate = new Date(date);

        // Obtenir le temps local en millisecondes
        const localTime = localDate.getTime();

        // Obtenir l'heure UTC en millisecondes
        const utcTime = Date.UTC(
            localDate.getUTCFullYear(),
            localDate.getUTCMonth(),
            localDate.getUTCDate(),
            localDate.getUTCHours(),
            localDate.getUTCMinutes(),
            localDate.getUTCSeconds(),
            localDate.getUTCMilliseconds()
        );

        // Obtenir l'heure UTC+x en millisecondes
        const utcPlusXTime = localTime + (offsetHours * 60 * 60 * 1000);

        // Calculer la différence entre l'heure UTC+x et l'heure UTC en millisecondes
        const timeDiff = utcPlusXTime - utcTime;

        // Créer une nouvelle date avec l'heure UTC+x
        const utcPlusXDate = new Date(localTime - timeDiff);

        // Retourner la date convertie en UTC+x
        return utcPlusXDate;
    }

    omitSpecialCharOnlyNumber(eventChar) {
        var charCode = (eventChar.which) ? eventChar.which : eventChar.keyCode;
        // Only Numbers 0-9
        if ((charCode < 48 || charCode > 57)) {
            eventChar.preventDefault();
            return false;
        } else {
            return true;
        }
    }

    checkTotalNumberInString(dataChain: string) {
        const totalFoundedNumber = dataChain.replace(/[^0-9]/g, "").length;
        return totalFoundedNumber;
    }

    // checkPhoneNumberInDString(dataChain: string) {
    //     const string = 'test1 +91 9443134651 test2 +1 671-765-0091 +33442207724';
    //     let phone_numbers = [];
    //     const regexp = new RegExp("\\+?\\(?\\d*\\)? ?\\(?\\d+\\)?\\d*([\\s./-]?\\d{2,})+", "g");
    //     phone_numbers = [...dataChain.matchAll(regexp)];
    // }

    // googleAuthSDK(callBack: Function): any {
    //     (<any>window)['googleSDKLoaded'] = () => {
    //         (<any>window)['gapi'].load('auth2', () => {
    //             let auth = (<any>window)['gapi'].auth2.init({
    //                 client_id: '166221053568-6q8h09oj200uokgm4166oqvbvu31j38n.apps.googleusercontent.com',
    //                 plugin_name: 'login',
    //                 prompt: 'select_account',
    //                 skip_prompt_cookie: 'sid',
    //                 login_hint: 'user@example.com',
    //                 cookiepolicy: 'single_host_origin',
    //                 scope: 'profile'
    //             });
    //             callBack(auth)
    //         });

    //     }
    //     (function (d, s, id) {
    //         var js, fjs = d.getElementsByTagName(s)[0];
    //         if (d.getElementById(id)) {
    //             return;
    //         }
    //         js = d.createElement('script');
    //         js.id = id;
    //         js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
    //         fjs?.parentNode?.insertBefore(js, fjs);
    //     }(document, 'script', 'google-jssdk'));
    // }

    //Lecture d'une Donnée du Local Storage
    READ_LOCAL_ENCODE(key: any): any {
        let result = null;
        try {
            result = this.encryptStorage.decrypt(key);
        } catch (e) {
            result = null;
        }
        return result;
    };

    formatMail(mail: string) {
        let toHide = mail.substring(1, mail.indexOf("@") - 1);
        return mail.replace(toHide, toHide.replace(/./gi, "*"));
    }

    formatTel(tel: string) {
        if (tel) {
            let num = tel.toString()
            let lastTwoNumber = num.slice(-2)
            tel = `******${lastTwoNumber}`
        }
        return tel;
    }

    //Lecture d'une Donnée du Local Storage
    READ_SESSION_ENCODE(key: any): any {
        let result = null;
        try {
            result = this.encryptSessionStore.decrypt(key);
        } catch (e) {
            result = null;
        }
        return result;
    };

    //Lecture d'une Donnée du Local Storage
    cryptWord(word: any): any {
        let jsonValue = btoa(word);
        return jsonValue;
    };

    // async generateFingerprint() {
    //     const fpPromiseO = FingerprintJS.load();
    //     const fp = await fpPromiseO
    //     const result = await fp.get()
    //     return result.visitorId
    // }

    //Lecture d'une Donnée du Local Storage
    decryptWord(word: any): any {
        let result = atob(word);
        return result;
    };



    // getUserCurrentIPAddress(callBack: (explotelIpResponse: ExplotelIpResponse) => void) {
    //     //SEARCH_IP_STACK_ADRRESS
    //     let SEARCH_IP_WITH_IP_STACK = this._httpClient.get<IpStackResponse>(`https://api.ipstack.com/check?access_key=${IP_APIs_KEYS.IP_STACK_API_KEY}`, this.options);
    //     SEARCH_IP_WITH_IP_STACK.subscribe({
    //         next: (ipStackResponse) => {
    //             if (!this.nullOrEmptyValue(ipStackResponse.ip) && !this.nullOrEmptyValue(ipStackResponse.country_name) && !this.nullOrEmptyValue(ipStackResponse.city) && !this.nullOrEmptyValue(ipStackResponse.region_name)) {
    //                 callBack(new ExplotelIpResponse(ipStackResponse.ip, ipStackResponse.country_name, ipStackResponse.city, ipStackResponse.region_name, ipStackResponse.latitude, ipStackResponse.longitude))
    //                 return;
    //             }
    //             if (this.nullOrEmptyValue(ipStackResponse.country_name) || this.nullOrEmptyValue(ipStackResponse.city) || this.nullOrEmptyValue(ipStackResponse.region_name)) {
    //                 this.loadIpData_With_Others_IP_APIs(ipStackResponse.ip, (explotelIpResponse) => {
    //                     if (explotelIpResponse.ipAddress === '000.000.000.000') {
    //                         callBack(new ExplotelIpResponse(ipStackResponse.ip, ipStackResponse.country_name, ipStackResponse.city, ipStackResponse.region_name, ipStackResponse.latitude, ipStackResponse.longitude))
    //                         return;
    //                     } else {
    //                         callBack(explotelIpResponse);
    //                     }
    //                 })
    //             }
    //         },
    //         error: (err) => {
    //             this.getIpAddressWithAllIpAPIs(ipAddress => {
    //                 if (ipAddress === '000.000.000.000') {
    //                     callBack(new ExplotelIpResponse())
    //                     return;
    //                 } else {
    //                     let SEARCH_IP_DETAILS_WITH_IP_STACK = this._httpClient.get<IpStackResponse>(`https://api.ipstack.com/${ipAddress}?access_key=${IP_APIs_KEYS.IP_STACK_API_KEY}`, this.options);
    //                     SEARCH_IP_DETAILS_WITH_IP_STACK.subscribe({
    //                         next: (ipStackResponse) => {
    //                             if (!this.nullOrEmptyValue(ipStackResponse.ip) && !this.nullOrEmptyValue(ipStackResponse.country_name) && !this.nullOrEmptyValue(ipStackResponse.city) && !this.nullOrEmptyValue(ipStackResponse.region_name)) {
    //                                 callBack(new ExplotelIpResponse(ipStackResponse.ip, ipStackResponse.country_name, ipStackResponse.city, ipStackResponse.region_name, ipStackResponse.latitude, ipStackResponse.longitude))
    //                                 return;
    //                             }
    //                             if (this.nullOrEmptyValue(ipStackResponse.country_name) || this.nullOrEmptyValue(ipStackResponse.city) || this.nullOrEmptyValue(ipStackResponse.region_name)) {
    //                                 this.loadIpData_With_Others_IP_APIs(ipStackResponse.ip, (explotelIpResponse) => {
    //                                     callBack(explotelIpResponse);
    //                                 })
    //                             }

    //                         },
    //                         error: (err) => {
    //                             this.getIpAddressWithAllIpAPIs(ipAddress => {
    //                                 if (ipAddress === '000.000.000.000') {
    //                                     callBack(new ExplotelIpResponse())
    //                                     return;
    //                                 } else {
    //                                     this.loadIpData_With_Others_IP_APIs(ipAddress, (explotelIpResponse) => {
    //                                         callBack(explotelIpResponse);
    //                                     })
    //                                 }
    //                             })
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     })
    // }

    // loadIpData_With_Others_IP_APIs(ipAdress: string, callBack: (explotelIpResponse: ExplotelIpResponse) => void) {
    //     let SEARCH_IP_DETAILS_WITH_DB_IP = this._httpClient.get<DbIpDetailsResponse>(`https://api.db-ip.com/v2/${IP_APIs_KEYS.DB_IP_API_KEY}/${ipAdress}`, this.options);
    //     SEARCH_IP_DETAILS_WITH_DB_IP.subscribe({
    //         next: (dbIpDetailsResponse) => {
    //             if (!this.nullOrEmptyValue(dbIpDetailsResponse.ipAddress) && !this.nullOrEmptyValue(dbIpDetailsResponse.countryName) && !this.nullOrEmptyValue(dbIpDetailsResponse.city) && !this.nullOrEmptyValue(dbIpDetailsResponse.stateProv)) {
    //                 callBack(new ExplotelIpResponse(dbIpDetailsResponse.ipAddress, dbIpDetailsResponse.countryName, dbIpDetailsResponse.city, dbIpDetailsResponse.stateProv, dbIpDetailsResponse.latitude, dbIpDetailsResponse.longitude))
    //             } else

    //                 if (this.nullOrEmptyValue(dbIpDetailsResponse.countryName) || this.nullOrEmptyValue(dbIpDetailsResponse.city) || this.nullOrEmptyValue(dbIpDetailsResponse.stateProv)) {
    //                     let SEARCH_IP_DETAILS_WITH_FIND_IP = this._httpClient.get<FindIpResponse>(`https://api.findip.net/${ipAdress}/?token=${IP_APIs_KEYS.FIND_IP_API_KEY}`, this.options);
    //                     SEARCH_IP_DETAILS_WITH_FIND_IP.subscribe({
    //                         next: (findIpResponse) => {
    //                             if (!this.nullOrEmptyValue(findIpResponse?.country?.names?.fr) && !this.nullOrEmptyValue(findIpResponse?.city?.names?.fr) && !this.nullOrEmptyValue(findIpResponse.subdivisions[0]?.names?.en)) {
    //                                 callBack(new ExplotelIpResponse(dbIpDetailsResponse.ipAddress, findIpResponse?.country?.names?.fr, findIpResponse?.city?.names?.fr, findIpResponse.subdivisions[0]?.names?.en, findIpResponse.location.latitude, findIpResponse.location.longitude))
    //                             } else

    //                                 if (this.nullOrEmptyValue(findIpResponse?.country?.names?.fr) || this.nullOrEmptyValue(findIpResponse?.city?.names?.fr) || this.nullOrEmptyValue(findIpResponse.subdivisions[0]?.names?.en)) {
    //                                     callBack(new ExplotelIpResponse())
    //                                 }
    //                         },
    //                         error: (err) => {
    //                             callBack(new ExplotelIpResponse())
    //                         }
    //                     })
    //                 }
    //         },
    //         error: (err) => {
    //             let SEARCH_IP_DETAILS_WITH_FIND_IP = this._httpClient.get<FindIpResponse>(`https://api.findip.net/${ipAdress}/?token=${IP_APIs_KEYS.FIND_IP_API_KEY}`, this.options);
    //             SEARCH_IP_DETAILS_WITH_FIND_IP.subscribe({
    //                 next: (findIpResponse) => {
    //                     if (!this.nullOrEmptyValue(findIpResponse?.country?.names?.fr) && !this.nullOrEmptyValue(findIpResponse?.city?.names?.fr) && !this.nullOrEmptyValue(findIpResponse.subdivisions[0]?.names?.en)) {
    //                         callBack(new ExplotelIpResponse(ipAdress, findIpResponse?.country?.names?.fr, findIpResponse?.city?.names?.fr, findIpResponse.subdivisions[0]?.names?.en, findIpResponse.location.latitude, findIpResponse.location.longitude))
    //                     } else

    //                         if (this.nullOrEmptyValue(findIpResponse?.country?.names?.fr) || this.nullOrEmptyValue(findIpResponse?.city?.names?.fr) || this.nullOrEmptyValue(findIpResponse.subdivisions[0]?.names?.en)) {
    //                             callBack(new ExplotelIpResponse())
    //                         }
    //                 },
    //                 error: (err) => {
    //                     callBack(new ExplotelIpResponse())
    //                 }
    //             })
    //         }
    //     })
    // }

    // getIpAddressWithAllIpAPIs(callBack: (ipAddress: string) => void) {
    //     let SEARCH_IP_WITH_DB_IP = this._httpClient.get<DbIpResponse>(`https://api.db-ip.com/v2/free/self`, this.options);
    //     SEARCH_IP_WITH_DB_IP.subscribe({
    //         next: (dbIpResponse) => {
    //             if (!this.nullOrEmptyValue(dbIpResponse.ipAddress)) {
    //                 callBack(dbIpResponse.ipAddress)
    //                 return;

    //             } else {
    //                 let SEARCH_IP_WITH_MY_IP = this._httpClient.get<MyIpResponse>(`https://api.myip.com`, this.options);
    //                 SEARCH_IP_WITH_MY_IP.subscribe({
    //                     next: (myIpResponse) => {
    //                         if (!this.nullOrEmptyValue(myIpResponse.ip)) {
    //                             callBack(myIpResponse.ip)
    //                             return;
    //                         } else {
    //                             callBack('000.000.000.000')
    //                             return;
    //                         }
    //                     },
    //                     error: (err) => {
    //                         callBack('000.000.000.000')
    //                         return;
    //                     }
    //                 })
    //             }
    //         },
    //         error: (err) => {
    //             let SEARCH_IP_WITH_MY_IP = this._httpClient.get<MyIpResponse>(`https://api.myip.com`, this.options);
    //             SEARCH_IP_WITH_MY_IP.subscribe({
    //                 next: (myIpResponse) => {
    //                     if (!this.nullOrEmptyValue(myIpResponse.ip)) {
    //                         callBack(myIpResponse.ip)
    //                         return;
    //                     } else {
    //                         callBack('000.000.000.000')
    //                         return;
    //                     }
    //                 },
    //                 error: (err) => {
    //                     callBack('000.000.000.000')
    //                     return;
    //                 }
    //             })
    //         }
    //     })
    // }

    //check phone number
    checkPhoneNumber(phoneNumber: any) {
        let result = /^(?:9[012456789]|6[0123456789]|5[123456789]|4[012]|2[1])[0-9]{6}$/.test(phoneNumber);
        if (!result) {
            return false;
        } else {
            return true;
        }
    }//fin check phone number

    checkPhoneValidity(phone: any) {
        let count = 0;
        let pos = phone.indexOf("_");

        while (pos != -1) {
            count++;
            pos = phone.indexOf("_", pos + 1);
        }
        if (count > 0 || phone === "") {
            return false;
        } else {
            return true;
        }
    }

    checkPhoneValidityStrictly(phone: any) {
        let count = 0;
        let pos = phone.indexOf("_");

        while (pos != -1) {
            count++;
            pos = phone.indexOf("_", pos + 1);
        }
        if (count > 0 || phone === "") {
            return false;
        } else {
            let filterOne = phone.replaceAll('-', '');
            let filterTwo = filterOne.replaceAll(' ', '');
            let ckeckResponse = this.checkPhoneNumber(filterTwo);
            return ckeckResponse;
        }
    }

    //Dates Checkers
    checkStartDate(startDate: Date) {
        let toDay = new Date();
        let f_startDate = new Date(startDate);
        if (f_startDate.setHours(0, 0, 0, 0) < toDay.setHours(0, 0, 0, 0)) {
            return false;
        } else {
            return true;
        }
    }

    checkEndDate(startDate: Date, endDate: Date) {
        let f_startDate = new Date(startDate);
        let f_endDate = new Date(endDate);
        if (f_endDate.setHours(0, 0, 0, 0) < f_startDate.setHours(0, 0, 0, 0)) {
            return false;
        } else {
            return true;
        }
    }

    generateNumberKey(n: number) {
        let text = "";
        const possible = "0123456789";
        while (text.length < n) {
            for (let i = 0; i < n; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length)).trim();
        }
        return text;
    }

    checkHour(startDate: any, startHour: any) {
        let toDay = new Date();
        let s_toDay = new Date();
        let f_startDate = new Date(startDate);
        let customToDayHour;
        let customStartHour;
        if (toDay.setHours(0, 0, 0, 0) == f_startDate.setHours(0, 0, 0, 0)) {
            if (s_toDay.getMinutes().toString().length > 1) {
                customToDayHour = Number(s_toDay.getHours() + '' + s_toDay.getMinutes());
                customStartHour = Number(startHour.replace(':', ''));
                if (customStartHour < customToDayHour) {
                    return false;
                } else if ((customStartHour - customToDayHour) >= 200) {
                    return true;
                } else {
                    return false;
                }
            } else {
                let spliter = startHour.split(':');
                customToDayHour = Number(s_toDay.getHours() + '' + s_toDay.getMinutes());
                customStartHour = Number(spliter[0] + '' + (Number(spliter[1]) + 0));
                if (customStartHour < customToDayHour) {
                    return false;
                } else if ((customStartHour - customToDayHour) >= 200) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }

    nullValue(value: any): boolean { return (value == null || value == undefined); }

    nullOrEmptyValue(value: any): boolean {
        return (value == null || value == undefined || value == '');
    }

    generateUniqueKey(o: any) {
        var a = 10,
            b = 'abcdefghijklmnopqrstuvwxyz',
            c = '',
            d = 0,
            e = '' + b;
        if (o) {
            if (o.startsWithLowerCase) {
                c = b[Math.floor(Math.random() * b.length)];
                d = 1;
            }
            if (o.length) {
                a = o.length;
            }
            if (o.includeUpperCase) {
                e += b.toUpperCase();
            }
            if (o.includeNumbers) {
                e += '1234567890';
                e += '1234567890';
            }
        }
        for (; d < a; d++) {
            c += e[Math.floor(Math.random() * e.length)];
        }
        return c;

    } //fin generate Sale Unique Id

    generateKeyOnlyNumber(o: any) {
        var a = 10,
            b = '0123456789',
            c = '',
            d = 0,
            e = '' + b;
        if (o) {
            if (o.startsWithLowerCase) {
                c = b[Math.floor(Math.random() * b.length)];
                d = 1;
            }

            if (o.length) {
                a = o.length;
            }

            if (o.includeNumbers) {
                e += '1234567890';
                e += '1234567890';
            }
        }
        for (; d < a; d++) {
            c += e[Math.floor(Math.random() * e.length)];
        }
        return c;

        //////////////// How to use ////////////////////
        // let saleKey = this.libraryService.strRandom({
        //     includeUpperCase: true,
        //     includeNumbers: true,
        //     length: 25,
        //     startsWithLowerCase: true
        //   });
    }

    isValidDate(d) {
        return !isNaN(d) && d instanceof Date;
    }

    generateCode(min: number = 111111111111, max: number = 999999999999) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateLettersOnly(o: any) {
        var a = 10,
            b = 'abcdefghijklmnopqrstuvwxyz',
            c = '',
            d = 0,
            e = '' + b;
        if (o) {

            if (o.length) {
                a = o.length;
            }
            if (o.includeUpperCase) {
                e += b.toUpperCase();
            }
        }
        for (; d < a; d++) {
            c += e[Math.floor(Math.random() * e.length)];
        }
        if (o.startsWithUpperCase) {
            c = c[0].toUpperCase() + c.slice(1);
        }
        return c;

    } //fin generate Sale Unique Id

    // translateMatPaginator(paginator: MatPaginator, callBack: Function) {
    //     paginator._intl.firstPageLabel = 'Première page';
    //     paginator._intl.itemsPerPageLabel = 'Lignes par page';
    //     paginator._intl.lastPageLabel = 'Dernière page';
    //     paginator._intl.nextPageLabel = 'Page suivante';
    //     paginator._intl.previousPageLabel = 'Page précédente';
    //     callBack(paginator);
    // }

    nb_days_between(date1, date2) {
        const ONE_DAY = 1000 * 60 * 60 * 24;
        return Math.round(Math.abs(date1 - date2) / ONE_DAY);
    }

    Kmetric_format(num: number) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
    }

    // // **************************** __________________ JSON ENCODING OR DECODING  __________________ ****************************
    // encode_JSON_Data(jsonData: Object): Promise<string> {
    //     try {
    //         let ENCODED_JSON = Cipher.encodeJSON(jsonData, this.ENCODING_KEY);
    //         return ENCODED_JSON
    //     } catch (error) {
    //         return null
    //     }
    // }

    // decode_JSON_Data(EncodedjsonData: string): Promise<any> {
    //     try {
    //         let DECODED_JSON = Cipher.decodeJSON(EncodedjsonData, this.ENCODING_KEY);
    //         return DECODED_JSON
    //     } catch (error) {
    //         return null
    //     }
    // }

    // **************************** __________________ WORDS ENCODING OR DECODING  __________________ ****************************
    encodeAnyWord(word: any): Promise<string> {
        try {
            return encoDer.encode(word)
        } catch (error) {
            throw error;
        }
    }

    async decodeAnyWord(word: string): Promise<any> {
        try {
            if (word) {
                return encoDer.decode(word)
            }
        } catch (error) {
            return undefined;
        }
    }

    containsStringIgnoreAccents(text: string, searchString: string): boolean {
        const normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const normalizedSearchString = searchString.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        return normalizedText.toLowerCase().includes(normalizedSearchString.toLowerCase());
    }

    formatDateInFrenchFormat(date: Date, miniValues?: boolean, hidden: ('weekDay' | 'day' | 'year')[] = []): string {
        const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        const daysOfWeekShort = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        const monthsShort = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
        const dayOfWeek = miniValues ? daysOfWeekShort[date.getDay()] : daysOfWeek[date.getDay()];
        const month = miniValues ? monthsShort[date.getMonth()] : months[date.getMonth()];
        const day = date.getDate();
        const year = date.getFullYear();
        return `${(!hidden.includes('weekDay') ? dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1) + ',' : '')} ${day} ${month} ${!hidden.includes('year') ? year : ''}`;
    }

    getNDaysBeforeDate(date: Date, n: number): Date[] {
        const days: Date[] = [];
        for (let i = (n + 1) - 1; i >= 0; i--) {
            const day = new Date(date.getTime());
            day.setDate(day.getDate() - i);
            days.push(day);
        }
        return days;
    }

    getDayAfterDays(date: Date, nbDays: number): Date {
        var nextDay = new Date(date);
        nextDay.setDate(date.getDate() + nbDays);
        return nextDay;
    }

    // parseAppleJwt(token): AppleLoginResponse {
    //     var base64Url = token.split('.')[1];
    //     var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //     var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join(''));
    //     return JSON.parse(jsonPayload);
    // };

    formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) { return obj[key]; }

    // checkAnnouceType(annonce: any): boolean { return ('experienceKey' in annonce) }

    // trimLinkOfMessage(messageLink: string): string {
    //     let message = messageLink
    //     if (!message) { return '' }
    //     let links: LinkingMessage[] = linkify.find(message);
    //     if (links.length > 0) { links.forEach(link => { if (link.href.indexOf(environment.appUrl) == -1) { message = message.replace(link.value, '') } }) };
    //     return message;
    // }

    urlify(text) {
        // var urlRegex = /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;
        let urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        //var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, (url, b, c) => {
            let url2 = (c == 'www.') ? 'https://' + url : url;
            return '<a href="' + url2 + '" target="_blank">' + url + '</a>';
        })
    }




    redirectToHomeWithMessage(messageConfig: { text: string, type: 'info' | 'success' | 'warning' | 'error', position: ToastPosition, duration: number }) {
        const errorMessage: NavigationExtras = { state: { data: messageConfig } };
        this._router.navigate(['/'], errorMessage);
    }



    isMultipleOfTen(number) {
        // Calculate the logarithm base 10 of the number
        const logarithm = Math.log10(number);

        // Check if the logarithm is an integer
        return Number.isInteger(logarithm);
    }



    formatMoney(money: any, usePointSeparator: boolean = false): any {
        const moneyFormatted = money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, usePointSeparator ? '.' : ' ');
        return moneyFormatted;
    }

    checkFileConformity(file: File, posterIdx: number, callBack: Function) {
        //EXTENSIONS
        const fileExtension = file?.name.split('.').pop()?.toLowerCase();
        const fileSize = file?.size;
        const fileType = file?.type.toLowerCase();
        //IMAGES
        const ImgMaxSizeInBytes = 10 * 1024 * 1024;
        const ImgFileTypes = ['image/jpeg', 'image/png']
        const ImgFileExtensions = ['jpg', 'jpeg', 'png']
        //VIDEOS
        const VideoMaxSizeInBytes = 100 * 1024 * 1024;
        const VideoMaxDuration = 3 * 60;
        const VideoFileTypes = ['video/mp4']
        const VideoFileExtensions = ['mp4']
        //CHECKING
        switch (posterIdx) {
            case 1:
            case 2:
                if (fileSize > ImgMaxSizeInBytes) {
                    this._alertService.showToast('Taille du fichier > 10Mo', 'warning', 'bottom-center');
                    callBack(false);
                    return;
                }
                if (ImgFileTypes.includes(fileType) || ImgFileExtensions.includes(fileExtension)) {
                    callBack(true);
                    return;
                } else {
                    this._alertService.showToast(`Extension d'image non autorisée`, 'warning', 'bottom-center');
                    callBack(false);
                    return;
                }
            case 3:
                if (fileSize > VideoMaxSizeInBytes) {
                    this._alertService.showToast('Taille du fichier > 100Mo', 'warning', 'bottom-center');
                    callBack(false);
                    return;
                };
                if (VideoFileTypes.includes(fileType) || VideoFileExtensions.includes(fileExtension)) {
                    const video = document.createElement('video');
                    video.src = window.URL.createObjectURL(file);
                    video.preload = 'metadata';
                    video.onloadedmetadata = () => {
                        if (video.duration > VideoMaxDuration) {
                            this._alertService.showToast(`Durée maximale: 3 Minutes`, 'warning', 'bottom-center');
                            callBack(true);
                            return;
                        } else {
                            callBack(true);
                            return;
                        }
                    }
                } else {
                    this._alertService.showToast(`Extension de vidéo non autorisée`, 'warning', 'bottom-center');
                    callBack(false);
                    return;
                }
                break;
            default:
                callBack(false);
                return;
        }
    }


    hasTimePassed(targetTime) {
        // Get the current time in milliseconds
        const currentTime = new Date().getTime();

        // Get the target time in milliseconds
        const targetTimeMs = targetTime.getTime();

        // Compare the current time with the target time
        if (currentTime >= targetTimeMs) {
            return true; // The target time has passed
        } else {
            return false; // The target time has not passed yet
        }
    }

    getfirstDateOfYear(year): Date { return new Date(year, 0, 1); }

    includesNoNull(arr: any[]): boolean { console.log(arr); return !(arr.includes(null) || arr.includes(undefined)) }

    areNull(arr: any[]): boolean { console.log(arr); return this.null(arr.find(val => this.notNull(val))) }

    notNull(val: any): boolean { return !this.null(val) }

    null(val: any): boolean { return (val == null || val == undefined) };
}
