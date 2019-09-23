import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { Helper } from 'src/app/core/helper.service';
import { SnackBarService } from 'src/app/core/snack-bar.service';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user.class';
import { PostService } from 'src/app/shared/services/post.service';
import { ClasseService } from '../../classe/services/classe.service';
import { GroupService } from '../../group/services/group.service';

@Component({
  selector: 'app-home-actors-modal',
  templateUrl: './home-actors-modal.component.html',
  styleUrls: ['./home-actors-modal.component.css']
})
export class HomeActorsModalComponent implements OnInit {

  form: FormGroup;
  currentUser: User;
  post: Post;
  comment: Comment;
  errorMessage = '';


  // Private
  private _unsubscribeAll: Subject<any>;
  public action: string;

  constructor(public dialogRef: MatDialogRef<HomeActorsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private postService: PostService,
    private groupService: GroupService,
    private classService: ClasseService,
    private readonly helper: Helper,
    private snackBar: SnackBarService) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.currentUser = data.currentUser;
    this.action = data.action;
  }

  ngOnInit() {
    this.initForm();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    if (this.action === 'joinClass') {

    } if (this.action === 'joinGroup') {
      this.groupService.joinStudent(this.currentUser.id, this.form.get('invitationCode').value).subscribe(group => {
        console.log('done add new usr to Groupe');
      },
        (error) => {
          switch (error.status) {
            case 401:
              this.errorMessage = error.message;
              break;
            case 403:
              this.errorMessage = error.message;
              break;
          }


        });

    } else if (this.action === 'create') {
    } else if (this.action === 'delete') {
      this.delete();
    }
  }

  /**
     * init the form Groupe
     */
  initForm() {
    // Reactive Form
    this.form = this._formBuilder.group({
      id: [{ value: null, disabled: true }],
      invitationCode: ['', Validators.required],
    });
  }



  delete() {
    /*   this.postService.delete(this.post).subscribe((item: HomeActors) => {
         if (item) {
           this.snackBar.openSuccessSnackBar('The HomeActors has been deleted successfully');
           this.dialogRef.close({ course: item });
           console.log('delete HomeActors');
         }
       });*/
  }

}

