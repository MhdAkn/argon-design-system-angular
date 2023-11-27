import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { ApiResponse } from '../../response/api-response';
import { AlertService } from '../../utils/alert.service';
import { UtilsService } from '../../utils/utils.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../models/Note';
import { LikeService } from '../../services/like.service';
import { AuthServices } from '../../auth/services/auth-services.service';
import { HttpCode } from '../../enums/EN_SHARED/EN_HttpCode.enum';
import { NoteWithLikeInfo } from '../../playloads/note.playload';
import { environment } from '../../../environments/environment';

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

  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private _utilsService: UtilsService,
    private _alertService: AlertService,
    private _detector: ChangeDetectorRef,
    private likeService: LikeService,
    private authService: AuthServices
  ) { }

  ngOnInit() {
    let _activatedRouteData: { DataInfo?: ApiResponse, user?: User, } = this.activateRoute.snapshot.data
    console.log(_activatedRouteData);
    this.currentUser = _activatedRouteData.user
    this.allNotesList = _activatedRouteData.DataInfo.data
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

    }

  }

  goToDetail(note) {
    window.location.href = `notes/${note.id}/detail`
  }

  saveOrRemoveLike($event, noteId: string, isLiked: boolean) {
    $event.stopPropagation();
    console.log($event, noteId, isLiked);
    
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
      this.route.navigateByUrl(this.appUrl + 'login');
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
}

