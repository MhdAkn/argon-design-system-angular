import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { ApiResponse } from '../../response/api-response';
import { AlertService } from '../../utils/alert.service';
import { FormGroup } from '@angular/forms';
import { Note } from '../../models/Note';
import { LikeService } from '../../services/like.service';
import { AuthServices } from '../../auth/services/auth-services.service';
import { HttpCode } from '../../enums/EN_SHARED/EN_HttpCode.enum';
import { NoteWithLikeInfo } from '../../playloads/note.playload';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})

export class LikesComponent implements OnInit {
  focus: any;
  focus1: any;
  badge_success = "badge badge-pill badge-success"
  currentUser: User
  isConnect: boolean
  ContactForm: FormGroup;
  allNotesLikes: NoteWithLikeInfo[]
  appUrl = environment.appUrl

  notesLiked: Note[]
  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private authService: AuthServices,
    private likeService: LikeService,
    private _changeDetector: ChangeDetectorRef,
    private alertService: AlertService
  ) {

  }
  ngOnInit(): void {
    let _activatedRoute: { user?: User, DataInfo?: ApiResponse } = this.activateRoute.snapshot.data
    console.log(_activatedRoute);
    this.allNotesLikes = _activatedRoute.DataInfo.data
    this.allNotesLikes.map((note) => note.note.showParagraph = false)

    console.log(this.allNotesLikes);

    this.currentUser = _activatedRoute.user
  }
  toggleParagraph(item: Note) {
    this.allNotesLikes.find((note) => {
      if (note.note.id == item.id) {
        note.note.showParagraph = !item.showParagraph
        this._changeDetector.markForCheck();
      }
    })
  }
  saveOrRemoveLike($event, noteId: string, isLiked: boolean) {
    $event.stopPropagation();
    if (this.authService.isAuthenticated()) {

      if (!isLiked) {
        let reqData = { isLiked: true, userId: this.currentUser.id, noteId: noteId }
        this.likeService.saveOrRemoveLike(reqData).subscribe({
          next: (response) => {
            if (response.status == HttpCode.SUCCESS) {
              this.allNotesLikes.find(note => {
                if (note.note.id == noteId) {
                  note.isLiked = true
                }
              });
              this._changeDetector.markForCheck();
            } else {
              this.alertService.showToast('Oops une erreur est survenue! Veuillez réessayer plus tard!', 'error', 'top-center')
            }
          }
        });
      } else {
        let reqData = { isLiked: false, userId: this.currentUser.id, noteId: noteId }
        this.likeService.saveOrRemoveLike(reqData).subscribe({
          next: (response) => {
            if (response.status == HttpCode.SUCCESS) {
              this.allNotesLikes.find(note => {
                if (note.note.id == noteId) {
                  note.isLiked = false
                  this._changeDetector.markForCheck();
                }
              });
            } else {
              this.alertService.showToast('Oops une erreur est survenue! Veuillez réessayer plus tard!', 'error', 'top-center')
            }

          }
        });
      }
    } else {
      this.route.navigateByUrl(this.appUrl + 'login');
    }
  }

  goToDetail(note) {
    window.location.href = `notes/${note.id}/detail`
  }


}

