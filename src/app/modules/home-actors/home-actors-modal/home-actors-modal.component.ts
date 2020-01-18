import { DatePipe } from '@angular/common';
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
  styleUrls: ['./home-actors-modal.component.css'],
  providers: [DatePipe]
})
export class HomeActorsModalComponent implements OnInit {

  form: FormGroup;
  currentUser: User;
  post: Post;
  comment: Comment;
  errorMessage = '';
  profilePictureLink: string;
  formPost: FormGroup;
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
    private datePipe: DatePipe,
    private snackBar: SnackBarService) {

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.currentUser = data.currentUser;
    this.action = data.action;
  }

  ngOnInit() {
    if (this.action === 'editPost') {
      this.post = this.data.post;
      this.initPostForm();
      this.dialogRef.updateSize('500px', null);
      this.formPost.patchValue(this.post);
    } if (this.action === 'deletePost') {
      this.post = this.data.post;
    } else {
      this.initForm();
    }
    this.getPictureLink();

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    // stop here if form is invalid

    if (this.action === 'joinClass') {

    } if (this.action === 'joinGroup') {
      if (this.form.invalid) {
        return;
      }
      this.groupService.joinStudent(this.currentUser.id, this.form.get('invitationCode').value).subscribe(group => {
        console.log('done add new usr to Groupe');
        this.dialogRef.close({ group: group, action: this.action });
        this.snackBar.openSuccessSnackBar('join in the group {{group.groupName}}');
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

    } else if (this.action === 'editPost') {
      if (this.formPost.invalid) {
        return;
      }
      this.post.description = this.formPost.get('description').value;
      this.post.postDate = this.datePipe.transform(this.post.postDate, 'yyyy-MM-dd HH:mm:ss');
      this.postService.update(this.post).subscribe(data => {
        this.helper.trace('Edite Post Done');
        this.dialogRef.close();
      });
    } else if (this.action === 'create') {
    } else if (this.action === 'delete') {
      this.delete();
    }
  }

  initPostForm() {
    // Reactive Form
    this.formPost = this._formBuilder.group({
      id: [{ value: null, disabled: true }],
      type: [this.post.type, Validators.required],
      description: [this.post.description, Validators.required],
      postPicture: [this.post.postPicture],
      postDate: [this.post.postDate],
      user: [this.post.user],
    });
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

  getPictureLink() {
    if (this.currentUser && this.currentUser.profilePicture) {
      this.profilePictureLink = `${this.currentUser.profilePicture}`;
    } else {
      this.profilePictureLink = 'assets/images/avatars/profile.jpg';
    }
  }


  delete() {
    this.postService.delete(this.post).subscribe((item: Post) => {
      if (item) {
        // this.snackBar.openSuccessSnackBar('The Post has been deleted successfully');
        this.dialogRef.close({ post: item, action: this.action });
        console.log('delete post');
      }
    });
  }

}

