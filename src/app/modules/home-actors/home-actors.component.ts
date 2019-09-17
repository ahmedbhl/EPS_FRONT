import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Post } from 'src/app/shared/models/post';
import { User } from 'src/app/shared/models/user.class';
import { PostService } from 'src/app/shared/services/post.service';
import { Classe } from '../classe/model/Classe';
import { ClasseService } from '../classe/services/classe.service';
import { GroupModalComponent } from '../group/group-modal/group-modal.component';
import { Group } from '../group/model/group';
import { GroupService } from '../group/services/group.service';

@Component({
  selector: 'app-home-actors',
  templateUrl: './home-actors.component.html',
  styleUrls: ['./home-actors.component.css']
})
export class HomeActorsComponent implements OnInit {

  show = true;
  state: any = { text: '' };
  currentUser: User;
  profilePictureLink: string;
  isProfessor = false;
  groups: Group[] = [];
  classes: Classe[] = [];
  posts: Post[] = [];
  isHiddenSpinner = false;
  type = '';


  constructor(private authenticationService: AuthenticationService,
    private groupService: GroupService,
    private classService: ClasseService,
    private postService: PostService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.initCurrentUser();
  }

  addEmoji = (e) => {
    this.show = !this.show;
    const emoji = e.emoji.native;
    this.state = { text: this.state.text + emoji };
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
    });
  }

  getPictureLink() {
    if (this.currentUser && this.currentUser.profilePicture) {
      this.profilePictureLink = `${this.currentUser.profilePicture}?raw=1`;
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
    this.postService.getAllPostsByTypeAndUser(this.type, this.currentUser).subscribe(posts => {
      if (posts.length > 0) {
        this.posts = posts;
      }
    });
  }

  getLikesLabel(post: Post) {
    return post.likes.length > 0 ? `${post.likes.length} Likes` : 'Like';
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
