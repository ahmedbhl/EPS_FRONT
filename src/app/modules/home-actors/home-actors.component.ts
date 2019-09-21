import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Helper } from 'src/app/core/helper.service';
import { Comment } from 'src/app/shared/models/comment';
import { Like } from 'src/app/shared/models/like';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user.class';
import { CommentService } from 'src/app/shared/services/comment.service';
import { LikeService } from 'src/app/shared/services/like.service';
import { PostService } from 'src/app/shared/services/post.service';
import { Classe } from '../classe/model/Classe';
import { ClasseService } from '../classe/services/classe.service';
import { GroupModalComponent } from '../group/group-modal/group-modal.component';
import { Group } from '../group/model/group';
import { GroupService } from '../group/services/group.service';
import { LibraryService } from '../library/services/library.service';

@Component({
  selector: 'app-home-actors',
  templateUrl: './home-actors.component.html',
  styleUrls: ['./home-actors.component.css'],
  providers: [DatePipe]
})
export class HomeActorsComponent implements OnInit {

  show: boolean[] = [];
  state: any[] = [{ text: '' }];
  currentUser: User;
  profilePictureLink: string;
  isProfessor = false;
  groups: Group[] = [];
  classes: Classe[] = [];
  posts: Post[] = [];
  isHiddenSpinner = false;
  type = '';
  formPost: FormGroup;
  likes: Like[];
  selectedImoj: any;
  currentFileUpload: File;
  path: String;
  isHiddenComment: Boolean[] = [];
  defaultValue = '';

  constructor(private authenticationService: AuthenticationService,
    private _formBuilder: FormBuilder,
    private groupService: GroupService,
    private classService: ClasseService,
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService,
    public dialog: MatDialog,
    private _LibraryService: LibraryService,
    private helper: Helper,
    private datePipe: DatePipe) { }

  ngOnInit() {
    //   this.state[0] = { text: '' };
    //  this.show[0] = true;
    this.initCurrentUser();
  }

  addEmoji = (e, index) => {
    if (!this.state[index]) {
      this.state[index] = { text: '' };
    }
    /*  if (index === this.selectedImoj) {
        this.selectedImoj = null;
      } else {*/
    this.show[index] = !this.show[index];
    const emoji = e.emoji.native;
    this.state[index] = { text: this.state[index].text + emoji };
    this.selectedImoj = index;
    // }
  }

  initCurrentUser() {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
      const roles = this.currentUser ? this.currentUser.roles.map(item => item.name) : [];
      if (roles.indexOf('PROFESSOR') > -1) {
        this.isProfessor = true;
        this.type = 'PROFESSOR';
        this.getAllGroupsByProfessor();
        this.getAllClassesByProfessor();
      } else if (roles.indexOf('STUDENT') > -1) {
        this.isProfessor = false;
        this.type = 'STUDENT';
        this.getAllGroupsByStudent();
        this.getAllClassesByStudent();
      }
      this.getAllPostsbyTypeAndUser();

      this.getPictureLink();
      setTimeout(() => {
        this.isHiddenSpinner = true;
      }, 5000);
      this.initForm();
    });
  }

  initForm() {
    // Reactive Form
    this.formPost = this._formBuilder.group({
      id: [{ value: null, disabled: true }],
      type: [this.type, Validators.required],
      description: ['', Validators.required],
      postPicture: [null],
      postDate: [new Date()],
      user: [this.currentUser],
    });
  }


  savePoste() {
    // stop here if form is invalid
    if (this.formPost.invalid) {
      return;
    }
    const post: Post = Object.assign(new Post(), this.formPost.value);
    post.postDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
    // check if the user add picture with the post or no
    if (this.path) {
      this._LibraryService.uploadFile(this.currentFileUpload[0], this.path).subscribe(
        (data) => {
          this.helper.trace('the shared link  : ' + data['sharedlink']);
          post.postPicture = data['sharedlink'];
          this.postService.save(post).subscribe(p => {
            console.log('add post done' + p);
            this.posts.unshift(...[post]);
            this.getPictureLink();
            this.initForm();
          });
        },
        (error) => this.helper.trace('Error ' + error)

      );
    }


  }

  getPictureLink() {
    if (this.currentUser && this.currentUser.profilePicture) {
      this.profilePictureLink = `${this.currentUser.profilePicture}`;
    } else {
      this.profilePictureLink = 'assets/images/avatars/profile.jpg';
    }
  }

  getAllGroupsByProfessor() {
    this.groupService.getAllGroupsByProfessor(this.currentUser.id).subscribe(groups => {
      if (groups.length > 0) {
        this.groups = groups;
      }
    });
  }

  getAllGroupsByStudent() {
    this.groupService.getAllGroupsByStudent(this.currentUser.id).subscribe(groups => {
      if (groups.length > 0) {
        this.groups = groups;
      }
    });
  }

  getAllGroups() {
    this.groupService.getAllGroups().subscribe(groups => {
      if (groups.length > 0) {
        this.groups = groups;
      }
    });
  }

  getAllClassesByProfessor() {
    this.classService.getAllClassesByProfessor(this.currentUser.id).subscribe(classes => {
      if (classes.length > 0) {
        this.classes = classes;
      }
    });
  }

  getAllClassesByStudent() {
    this.classService.getAllClassesByStudent(this.currentUser.id).subscribe(classes => {
      if (classes.length > 0) {
        this.classes = classes;
      }
    });
  }

  getAllClasses() {
    this.classService.getAllClasses().subscribe(classes => {
      if (classes.length > 0) {
        this.classes = classes;
      }
    });
  }

  getAllPostsbyTypeAndUser() {
    if (this.type && this.currentUser && this.currentUser.id) {
      this.postService.getAllPostsByTypeAndUser(this.type, this.currentUser).subscribe(posts => {
        if (posts.length > 0) {
          this.posts = posts;
        }
      });
    }
  }

  getLikesLabel(post: Post) {
    return post && post.likes && post.likes.length > 0 ? `${post.likes.length} Likes` : 'Like';
  }

  getAllLikesbyPost(post: Post) {
    if (post && post.id) {
      this.likeService.getAllLikesByPost(post.id).subscribe(likes => {
        if (likes.length > 0) {
          this.likes = likes;
        }
      });
    }
  }

  getAllLikesbyPostAndUser(post: Post) {
    if (post && post.id && this.currentUser && this.currentUser.id) {
      this.likeService.getAllLikesByUserAndPost(post.id, this.currentUser.id).subscribe(likes => {
        if (likes.length > 0) {
          this.likes = likes;
        }
      });
    }
  }

  addLike(post: Post) {
    this.isLiked(post) ? this.removeLike(this.currentUser, post) : this.saveLike(post);
  }

  saveComment(event, post: Post, postIndex) {
    const comment = new Comment();
    if (event && event.currentTarget.value && post) {
      comment.commentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
      comment.message = event.currentTarget.value;
      post.postDate = this.datePipe.transform(post.postDate, 'yyyy-MM-dd HH:mm:ss');
      comment.post = post;
      comment.user = this.currentUser;
      this.commentService.save(comment).subscribe((result: Comment) => {
        const index = this.posts.indexOf(post);
        this.posts[index].comments.unshift(...[result]);
        this.defaultValue = '';
      });
    }
  }

  saveLike(post: Post) {
    const like = new Like();
    post.postDate = this.datePipe.transform(post.postDate, 'yyyy-MM-dd HH:mm:ss');
    like.post = post;
    like.user = this.currentUser;
    if (post && post.id && this.currentUser && this.currentUser.id) {
      this.likeService.save(like).subscribe(like => {
        if (like) {
          this.getAllPostsbyTypeAndUser();
          this.getAllLikesbyPostAndUser(post);
        }
      });
    }
  }

  isLiked(post: Post) {
    if (post && post.likes) {
      return post.likes.map((like: Like) => like.user && like.user.id === this.currentUser.id).length > 0 ? true : false;
    }
  }

  removeLike(user, post) {
    if (user && user.id && post && post.id) {
      this.likeService.deleteByUserAndPost(user.id, post.id).subscribe(data => {
        if (data) {
          this.getAllPostsbyTypeAndUser();
          this.getAllLikesbyPostAndUser(post);
        }
      });
    }
  }

  /**
     * Upload file csv with list of pairings
     */
  upload(event, type: string) {
    // this.inProgressBar = true;
    this.currentFileUpload = event.target.files;
    this.path = `/${this.currentUser.id}/${this.currentFileUpload[0].name}`;
  }

  /**
   * the the file after loaded on tmp memoire and if the path not empty
   */
  saveUploadedFile() {
    if (this.path) {
      this._LibraryService.uploadFile(this.currentFileUpload[0], this.path).subscribe(
        response => {
          setTimeout(() => {
            this.helper.trace('upload file done' + response);
          }, 2000);
        },
      );
    }
  }

  showHiddenComment(index) {
    if (!this.isHiddenComment && this.isHiddenComment[index] === undefined) {
      this.isHiddenComment[index] = true;
    }
    return this.isHiddenComment[index] = !this.isHiddenComment[index];
  }
  openDialog(action?: string): void {
    const dialogRef = this.dialog.open(GroupModalComponent, {
      width: '600px',
      data: { name: 'Guest', animal: 'Guest' }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
