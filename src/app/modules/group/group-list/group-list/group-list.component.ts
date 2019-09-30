import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { Helper } from 'src/app/core/helper.service';
import { Group } from '../../model/group';
import { GroupService } from '../../services/group.service';
import { GroupModalComponent } from '../../group-modal/group-modal.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groups: Group[] = [];

  constructor(private readonly helper: Helper,
    private readonly _groupService: GroupService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllGroup();
  }

  /**
    * Used for getAll the Group
    */
  getAllGroup() {
    this._groupService.getAllGroups().subscribe(data => {
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
      this.getAllGroup();
      this.helper.trace('The dialog was closed' + result);
    });
  }

}





