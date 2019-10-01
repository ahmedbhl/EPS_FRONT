import { SelectionModel } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Helper } from 'src/app/core/helper.service';
import { User } from 'src/app/shared/models/user.class';
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


  constructor(private authenticationService: AuthenticationService,
    private groupeService: GroupService,
    private helper: Helper,
    public dialog: MatDialog,
    private _formBuilder: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit() {
    this.selectMenu('posts');
    this.type = 'group';
    this.initCurrentUser();
    this.initForm();
    this.getPictureLink();
    this.getAllGroups();
    this.initDataSource();
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
        this.actionForm = 'professorOrStudentUI';

      } else if (roles.indexOf('SUPER_ADMIN') > -1) {
        this.actionForm = 'SuperAdminOrAdministrationUI';
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
