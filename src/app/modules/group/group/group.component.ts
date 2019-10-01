import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Helper } from 'src/app/core/helper.service';
import { Comment } from 'src/app/shared/models/comment';
import { Like } from 'src/app/shared/models/like';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user.class';
import { CommentService } from 'src/app/shared/services/comment.service';
import { LikeService } from 'src/app/shared/services/like.service';
import { PostService } from 'src/app/shared/services/post.service';
import { Classe } from '../../classe/model/Classe';
import { ClasseService } from '../../classe/services/classe.service';
import { LibraryService } from '../../library/services/library.service';
import { GroupModalComponent } from '../group-modal/group-modal.component';
import { Group } from '../model/group';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css'],
  providers: [DatePipe]

})
export class GroupComponent implements OnInit {

  actionForm: string;
  currentUser: User;
  profilePictureLink: string;
  formPost: FormGroup;
  type: string;
  selectedMenu: string;

  groups: Group[] = [];
  displayedColumns: string[] = ['select', 'groupName', 'description', 'more'];
  dataSource: MatTableDataSource<Group>;
  selection = new SelectionModel<Group>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectAction: String = 'delete';

  classes: Classe[] = [];
  posts: Post[] = [];
  isHiddenSpinner = false;
  likes: Like[];
  selectedImoj: any;
  currentFileUpload: File;
  path: String;
  isHiddenComment: Boolean[] = [];
  defaultValue: string[] = [];

  constructor(private authenticationService: AuthenticationService,
    private groupeService: GroupService,
    private helper: Helper,
    public dialog: MatDialog,
    private _Activatedroute: ActivatedRoute,
    private _formBuilder: FormBuilder, private datePipe: DatePipe,
    private groupService: GroupService,
    private classService: ClasseService,
    private postService: PostService,
    private likeService: LikeService,
    private commentService: CommentService,
    private _LibraryService: LibraryService) { }

  ngOnInit() {
    this.selectMenu('posts');
    this.initCurrentUser();
    this.initForm();
    this.getPictureLink();
    this.initDataSource();
    this.getAllPostsbyTypeAndUser();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  initDataSource() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.groups);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initCurrentUser() {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
      const roles = this.currentUser ? this.currentUser.roles.map(item => item.name) : [];
      if (roles.indexOf('PROFESSOR') > -1 || roles.indexOf('STUDENT') > -1) {
        if (this._Activatedroute.snapshot.paramMap.get('id') === 'all') {
          this.actionForm = this._Activatedroute.snapshot.paramMap.get('id');
          this.getAllGroupsByStudent();
        } else {
          this.actionForm = 'professorOrStudentUI';
          this.type = `GROUP${this._Activatedroute.snapshot.paramMap.get('id')}`;
          this.getAllGroupsByProfessor();
        }

      } else if (roles.indexOf('SUPER_ADMIN') > -1) {
        this.actionForm = 'SuperAdminOrAdministrationUI';
        this.getAllGroups();
      }
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


  getPictureLink() {
    if (this.currentUser && this.currentUser.profilePicture) {
      this.profilePictureLink = `${this.currentUser.profilePicture}`;
    } else {
      this.profilePictureLink = 'assets/images/avatars/profile.jpg';
    }
  }

  selectMenu(selectedMenu: string) {
    this.selectedMenu = selectedMenu;
    this.getPictureLink();
    console.log('this select enu  = ' + selectedMenu);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Group): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /**
  * Get all getAllGroups
  */
  getAllGroups() {
    this.groupeService.getAllGroups().subscribe(
      (data: Group[]) => {
        this.groups = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.groups);
      }
      ,
      error => this.helper.handleError,
      () => this.helper.trace('Get all groups complete ' + this.groups.length));
  }

  getAllGroupsByProfessor() {
    this.groupeService.getAllGroupsByProfessor(this.currentUser.id).subscribe(groups => {
      if (groups.length > 0) {
        this.groups = groups;
      }
    });
  }

  getAllGroupsByStudent() {
    this.groupeService.getAllGroupsByStudent(this.currentUser.id).subscribe(groups => {
      if (groups.length > 0) {
        this.groups = groups;
      }
    });
  }



  checkAndSavePost() {
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
          this.savePost(post);
        },
        (error) => this.helper.trace('Error ' + error)

      );
    } else {
      this.savePost(post);
    }
  }


  /**
   * 
   * @param post Save Post
   */
  savePost(post: Post) {
    this.postService.save(post).subscribe(p => {
      console.log('add post done' + p);
      this.posts.unshift(...[p]);
      this.defaultValue[0] = '';
      this.getPictureLink();
      this.initForm();
    });
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
        if (this.posts && this.posts[postIndex] && !this.posts[postIndex].comments) {
          this.posts[postIndex].comments = [];
        }
        this.posts[postIndex].comments.unshift(...[result]);
        this.defaultValue[postIndex] = '';
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
    if (post && post.likes && this.currentUser && this.currentUser.id) {
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

  getAllPostsbyTypeAndUser() {
    if (this.type && this.currentUser && this.currentUser.id) {
      this.postService.getAllPostsByType(this.type).subscribe(posts => {
        if (posts.length > 0) {
          this.posts = posts;
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

  openDialog(group: Group, action: string): void {
    const dialogRef = this.dialog.open(GroupModalComponent, {
      width: '600px',
      data: { group: group, action: action, currentUser: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllGroups();
      this.helper.trace('The dialog was closed' + result);
    });
  }
}
