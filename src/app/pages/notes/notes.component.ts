import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { ApiResponse } from '../../response/api-response';
import { AlertService } from '../../utils/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Note } from '../../models/Note';
import { AuthServices } from '../../auth/services/auth-services.service';
import { HttpCode } from '../../enums/EN_SHARED/EN_HttpCode.enum';
import { NewNotePlayload, NoteWithLikeInfo } from '../../playloads/note.playload';
import { environment } from '../../../environments/environment';
import { NoteType } from '../../enums/EN_NOTES/EN_NoteType.enum';
import { NoteService } from '../../services/note.service';
import { FuseConfirmationService } from '../../../confirmation/confirmation.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent implements OnInit {
  focus: any;
  focus1: any;
  badge_success = "badge badge-pill badge-success"
  currentUser: User
  isConnect: boolean
  ContactForm: FormGroup;
  allNotesLikes: NoteWithLikeInfo[]
  appUrl = environment.appUrl
  PUBLIC_NoteType = NoteType.PUBLIC
  PRIVATE_NoteType = NoteType.PRIVATE
  notesList: Note[];
  isNewNote: boolean = false
  createNewNote: boolean = true
  newNote: Note
  NewNoteForm: FormGroup;

  constructor(
    private activateRoute: ActivatedRoute,
    private route: Router,
    private authService: AuthServices,
    private noteService: NoteService,
    private _changeDetector: ChangeDetectorRef,
    private alertService: AlertService,
    private _fuseConfirmationService: FuseConfirmationService,

  ) {

  }
  ngOnInit(): void {
    let _activatedRoute: { user?: User, DataInfo?: ApiResponse } = this.activateRoute.snapshot.data
    console.log(_activatedRoute);
    this.allNotesLikes = _activatedRoute.DataInfo.data
    this.allNotesLikes.map((note) => note.note.showParagraph = false)
    this.newNote = new Note()
    this.newNote.typeNotes = this.PRIVATE_NoteType
    console.log(this.allNotesLikes);
    if (this.isNewNote) {
      this.NewNoteForm = new FormGroup({
        title: new FormControl('', Validators.required),
        contenu: new FormControl('', Validators.required),
      })
    }

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

  updateLockNew($event, noteId: string, note: Note) {
    $event.stopPropagation();

  }
  updateLock($event, noteId: string, note: Note) {
    $event.stopPropagation();
    if (this.authService.isAuthenticated()) {
      this.noteService.updateNote({ note: { title: note.title, typeNotes: note.typeNotes, content: note.content }, userId: this.currentUser.id }).subscribe({
        next:
          (res) => {
            if (res.status == HttpCode.SUCCESS) {
            } else {
              this.alertService.showToast('Modification échouée', 'error', 'top-center');
            }
          }
      })
      // if (!isLiked) {
      //   let reqData = { isLiked: true, userId: this.currentUser.id, noteId: noteId }
      //   this.likeService.saveOrRemoveLike(reqData).subscribe({
      //     next: (response) => {
      //       if (response.status == HttpCode.SUCCESS) {
      //         this.allNotesLikes.find(note => {
      //           if (note.note.id == noteId) {
      //             note.isLiked = true
      //           }
      //         });
      //         this._changeDetector.markForCheck();
      //       } else {
      //         this.alertService.showToast('Oops une erreur est survenue! Veuillez réessayer plus tard!', 'error', 'top-center')
      //       }
      //     }
      //   });
      // } else {
      //   let reqData = { isLiked: false, userId: this.currentUser.id, noteId: noteId }
      //   this.likeService.saveOrRemoveLike(reqData).subscribe({
      //     next: (response) => {
      //       if (response.status == HttpCode.SUCCESS) {
      //         this.allNotesLikes.find(note => {
      //           if (note.note.id == noteId) {
      //             note.isLiked = false
      //             this._changeDetector.markForCheck();
      //           }
      //         });
      //       } else {
      //         this.alertService.showToast('Oops une erreur est survenue! Veuillez réessayer plus tard!', 'error', 'top-center')
      //       }

      //     }
      //   });
      // }
    } else {
      this.route.navigateByUrl(this.appUrl + 'login');
    }
  }

  goToDetail(note) {
    window.location.href = `notes/${note.id}/detail`
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
    confirmation.afterClosed().subscribe(async (result) => {
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
  onSubmit() {
    if (this.NewNoteForm.invalid) {
      return;
    } else {
      let note: NewNotePlayload = {
        title: this.NewNoteForm.value.title,
        content: this.NewNoteForm.value.content,
        typeNotes: this.newNote.typeNotes
      }
      console.log(note);
      console.log(this.currentUser);

      console.log({ note: note, userId: this.currentUser.id });
      if (this.currentUser !== undefined && this.currentUser !== null && note !== null && note !== undefined) {
        this.noteService.addNote({ note: note, userId: this.currentUser.id }).subscribe({
          next:
            (res) => {
              if (res.status == HttpCode.SUCCESS) {
                this.allNotesLikes[this.allNotesLikes.length].note = res.data
                this.allNotesLikes[this.allNotesLikes.length].isLiked = false
                this.allNotesLikes[this.allNotesLikes.length].note.showParagraph = false
                this.alertService.showToast('Note ajoutée avec succés', 'success', 'top-center');
              } else {
                this.alertService.showToast('Ajout échoué', 'error', 'top-center');
              }
            }
        })
        window.location.href = 'notes'
      }

    }
  }

}

