import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/shared/models/user.class';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Helper } from 'src/app/core/helper.service';
import { UserService } from 'src/app/core/authentication/user.service';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];

  displayedColumns: string[] = ['select', 'id', 'profilePicture', 'email', 'firstName', 'lastName', 'phoneNumber', 'enabled', 'more'];
  dataSource: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectAction: String = 'delete';

  constructor(private readonly helper: Helper,
    private readonly _userService: UserService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllUser();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
  * Get all Users
  */
  getAllUser() {
    this._userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      ,
      error => this.helper.handleError,
      () => this.helper.trace('Get all Users complete ' + this.users.length));
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
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '250px',
      data: { name: 'Guest', animal: 'Guest' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.helper.trace('The dialog was closed' + result);
    });
  }

}
