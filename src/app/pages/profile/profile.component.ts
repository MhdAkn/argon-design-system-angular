import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiResponse } from '../../response/api-response';
import { User } from '../../models/user';
import { NoteType } from '../../enums/EN_NOTES/EN_NoteType.enum';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpCode } from '../../enums/EN_SHARED/EN_HttpCode.enum';
import { AlertService } from '../../utils/alert.service';
import { cloneDeep } from "lodash";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    currentUser: User
    whoManyNotePublic: number
    whoManyLikes: number
    whoManyNotePrivate: number
    BiographyForm: FormGroup
    isUpdateBiography: boolean = false
    constructor(
        private activateRoute: ActivatedRoute,
        private userService: UserService,
        private alertService: AlertService,
        private _changeDetector: ChangeDetectorRef,
        private _formBuilder: FormBuilder,



    ) {
        this.BiographyForm = this._formBuilder.group({ contenu: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(1000)]] });
    }

    ngOnInit() {
        let _activatedRoute: { user?: ApiResponse, DataInfo?: ApiResponse } = this.activateRoute.snapshot.data
        console.log(_activatedRoute);
        this.currentUser = _activatedRoute.user.data
        console.log(this.currentUser);
        this.whoManyLikes = this.currentUser.like.length
        this.whoManyNotePublic = this.currentUser.note.filter((note) => note.typeNotes == NoteType.PUBLIC).length
        this.whoManyNotePrivate = this.currentUser.note.length - this.whoManyNotePublic
        console.log();

    }

    addBiography() {
        this.isUpdateBiography = true
        this._changeDetector.markForCheck();
    }

    onSubmit() {
        if (this.BiographyForm.invalid) {
            return;
        } else {
            let user: User = cloneDeep(this.currentUser)
            user.biographie = this.BiographyForm.value.contenu
            console.log(user);

            this.userService.updateUser({ user: user }).subscribe({
                next:
                    (res) => {
                        this.isUpdateBiography = false
                        this._changeDetector.markForCheck();
                        if (res.status == HttpCode.SUCCESS) {
                            console.log(res.data);
                            this.currentUser = res.data
                            this.alertService.showToast('Modification réussie', 'success', 'top-center');
                        } else {
                            this.alertService.showToast('Modification échouée', 'error', 'top-center');
                        }
                    }
            })
        }
    }

}
