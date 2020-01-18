import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Helper } from 'src/app/core/helper.service';
import { User } from 'src/app/shared/models/user.class';
import { GroupModalComponent } from '../../group-modal/group-modal.component';
import { Group } from '../../model/group';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groups: Group[] = [];
  currentUser: User;
  iProfessor = false;

  constructor(private readonly helper: Helper,
    private readonly _groupService: GroupService,
    public dialog: MatDialog,
    private readonly userService: AuthenticationService) {
  }

  ngOnInit() {
    this.initCurrentUser();
  }

  /**
  * Init the Current User for specify wich UI should be display
  */
  initCurrentUser() {
    this.userService.currentUser.subscribe(data => {
      this.currentUser = data;
      if (data && this.currentUser !== null) {
        const roles = this.currentUser ? this.currentUser.roles.map(item => item.name) : [];
        if (roles.indexOf('PROFESSOR') > -1) {
          this.iProfessor = false;
          this.getAllGroupsByProfessor();
        } else if (roles.indexOf('STUDENT') > -1) {
          this.iProfessor = true;
          this.getAllGroupsByStudent();
        }
      }
    });
  }

  /**
    * Used for getAllGroupsByStudent the Group
    */
  getAllGroupsByStudent() {
    this._groupService.getAllGroupsByStudent(this.currentUser.id).subscribe(data => {
      this.groups = data;
    });
  }

  /**
    * Used for get All GroupsByProfessor the Group
    */
  getAllGroupsByProfessor() {
    this._groupService.getAllGroupsByProfessor(this.currentUser.id).subscribe(data => {
      this.groups = data;
    });
  }


  /**
    * Used for getAll the Group by groupName
    */
  getAllGroupByGroupName(groupName) {
    if (groupName.length > 3) {
      this._groupService.getAllGroupByGoupName(groupName).pipe(debounceTime(300)).subscribe(data => {
        this.groups = data;
      });
    }
  }
  openDialog(group: Group, action: string): void {
    const dialogRef = this.dialog.open(GroupModalComponent, {
      width: '600px',
      data: { group: group, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initCurrentUser();
      this.helper.trace('The dialog was closed' + result);
    });
  }

}





