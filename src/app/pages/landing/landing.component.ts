import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { ApiResponse } from '../../response/api-response';
import { AlertService } from '../../utils/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../models/Note';
import { LikeService } from '../../services/like.service';
import { AuthServices } from '../../auth/services/auth-services.service';
import { HttpCode } from '../../enums/EN_SHARED/EN_HttpCode.enum';
import { NoteWithLikeInfo } from '../../playloads/note.playload';
import { environment } from '../../../environments/environment';
import { FuseConfirmationService } from '../../../confirmation/confirmation.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
  focus: any;
  focus1: any;
  badge_success = "badge badge-pill badge-success"
  currentUser: User
  isConnect: boolean
  ContactForm: FormGroup;
  allNotesList: Note[]
  notesNews: NoteWithLikeInfo[]
  appUrl = environment.appUrl
  allUsersList: User[]
  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private userService: UserService,
    private _alertService: AlertService,
    private _detector: ChangeDetectorRef,
    private likeService: LikeService,
    private authService: AuthServices,
    private _fuseConfirmationService: FuseConfirmationService,

  ) { }

  ngOnInit() {
    let _activatedRouteData: { DataInfo?: ApiResponse, user?: User, AllUsers?: ApiResponse } = this.activateRoute.snapshot.data
    console.log(_activatedRouteData);
    this.currentUser = _activatedRouteData.user
    this.allNotesList = _activatedRouteData.DataInfo.data
    this.allUsersList = _activatedRouteData.AllUsers.data
    this.notesNews = _activatedRouteData.DataInfo.data
    this.notesNews.map((note) => note.note.showParagraph = false)
    this.isConnect = this.currentUser != null || this.currentUser != undefined ? true : false
    this.ContactForm = new FormGroup({
      email: new FormControl('', Validators.required),
      pseudo: new FormControl('', Validators.required),
      message: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    })
  }
  contactUs() {
    if (this.ContactForm.invalid) {
      return;
    } else {
      let reqData: {
        pseudo: string;
        email: string;
        message: string;
      } = {
        email: this.ContactForm.value.email,
        pseudo: this.ContactForm.value.pseudo,
        message: this.ContactForm.value.message,
      }
      this.userService.sendMessage(reqData).subscribe({
        next: (response) => {
          if (response.status == HttpCode.SUCCESS) {
            this._alertService.showToast('Votre message a été envoyée!', 'success', 'top-center')
            this._detector.markForCheck();
          } else {
            this._alertService.showToast('Oops une erreur est survenue! Veuillez réessayer plus tard!', 'error', 'top-center')
          }
          this.ContactForm.reset()
        }
      })
    }

  }

  goToDetail(note) {
    window.location.href = `notes/${note.id}/detail`
  }

  saveOrRemoveLike($event, noteId: string, isLiked: boolean) {
    $event.stopPropagation();
    console.log(noteId, isLiked);

    console.log(this.authService.isAuthenticated());

    if (this.authService.isAuthenticated()) {
      if (!isLiked) {
        let reqData = { isLiked: true, userId: this.currentUser.id, noteId: noteId }
        console.log(reqData);

        this.likeService.saveOrRemoveLike(reqData).subscribe({
          next: (response) => {
            if (response.status == HttpCode.SUCCESS) {
              this.notesNews.find(note => {
                if (note.note.id == noteId) {
                  note.isLiked = true
                }
              });
              this._detector.markForCheck();
            } else {
              this._alertService.showToast('Oops une erreur est survenue! Veuillez réessayer plus tard!', 'error', 'top-center')
            }
          }
        });
      } else {
        let reqData = { isLiked: false, userId: this.currentUser.id, noteId: noteId }
        this.likeService.saveOrRemoveLike(reqData).subscribe({
          next: (response) => {
            if (response.status == HttpCode.SUCCESS) {
              this.notesNews.find(note => {
                if (note.note.id == noteId) {
                  note.isLiked = false
                }
              });
              this._detector.markForCheck();
            } else {
              this._alertService.showToast('Oops une erreur est survenue! Veuillez réessayer plus tard!', 'error', 'top-center')
            }

          }
        });
      }
    } else {
      window.location.href=this.appUrl + 'login';
    }
  }
  toggleParagraph(item: Note) {
    this.notesNews.find((note) => {
      if (note.note.id == item.id) {
        note.note.showParagraph = !item.showParagraph
        this._detector.markForCheck();
      }
    })
  }
  // getBackgroundColorClass(index: number) {
  //   const colors = ['danger', 'warning', 'dark', 'success'];
  //   const colorIndex = index % colors.length;
  //   console.log(`badge-${colors[colorIndex]}`);

  //   return `badge-${colors[colorIndex]}`;
  // }

  getBackgroundColorClass(index: number) {
    const colors = ['danger', 'warning', 'dark', 'success'];
    const colorIndex = index % (colors.length * 2);
    const colorClass = colors[colorIndex % colors.length];
    return `badge-${colorClass}`;
  }

  getBtnColorClass(index: number) {
    const colors = ['danger', 'warning', 'dark', 'success'];
    const colorIndex = index % (colors.length * 2);
    const colorClass = colors[colorIndex % colors.length];
    return `btn-${colorClass}`;
  }
  deleteNote(note: Note) {

    const confirmation = this._fuseConfirmationService.open({

      title: 'Supression de note',
      icon: {
        color: 'warning',
      },
      message: "Confirmez-vous la suppression de la note ?",
      actions: {
        confirm: {
          label: 'Oui, Confirmer',
          color: 'primary',
        },
        cancel: {
          label: 'Annuler'
        },
      }
    });
    console.log('jjjh');

    confirmation.afterClosed().subscribe(async (result) => {
      console.log('jjjh');

      if (result === 'confirmed') {
        // this.noteService.deleteNote({ noteId: note.id, userId: this.currentUser.id }).subscribe({
        //   next:
        //     (res) => {
        //       if (res.status == HttpCode.SUCCESS) {
        //         const index = this.notesList.findIndex(objet => objet.id === note.id);
        //         console.log(index);

        //         if (index >= 0) {
        //           this.notesList.splice(index, 1)
        //           console.log(this.notesList);
        //           this._changeDetector.markForCheck()
        //         }
        //         this.alertService.showToast('Note supprimée avec succés', 'success', 'top-center');
        //       } else {
        //         this.alertService.showToast('Supression échoué', 'error', 'top-center');
        //       }
        //     }
        // })
      }
    }
    );
  }

}

