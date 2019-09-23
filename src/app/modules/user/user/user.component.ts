import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/core/authentication/user.service';
import { Helper } from 'src/app/core/helper.service';
import { SnackBarService } from 'src/app/core/snack-bar.service';
import { User } from 'src/app/shared/models/user.class';
import { UserModalComponent } from '../user-modal/user-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: User[] = [];

  // tslint:disable-next-line: max-line-length
  displayedColumns: string[] = ['select', 'profilePicture', 'email', 'firstName', 'lastName', 'phoneNumber', 'roles', 'enabled', 'more'];
  dataSource: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectAction: String = '';

  constructor(private readonly helper: Helper,
    private readonly _userService: UserService,
    public dialog: MatDialog,
    private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.getAllUser();
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
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
  * Get all Users
  */
  getAllUser() {
    this._userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data.filter((user: User) => user.roles[0].name !== 'SUPER_ADMIN');
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.users);
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


  /**
   * Used for change the User status
   */
  changeUserStat(id: number) {
    if (id) {
      this._userService.changeStatus(id).subscribe(actiovationResult => {
        this.helper.trace('Update the User status done');
      });
    }
  }

  /**
  * Used to check if the user exist before reset password
  * @param email
  */
  checkMailForResetPassword(email: string) {
    this._userService.checkMailForResetPassword(email).subscribe(data => {
      if (data) {
        this.snackBar.openSuccessSnackBar('An email sent to the user to reset the password');
      }
    }, error => {
      this.snackBar.openDangernackBar('An error occurred while resetting password');
    });
  }

  openDialog(user: User, action: string): void {
    const dialogRef = this.dialog.open(UserModalComponent, {
      width: '600px',
      data: { user: user, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllUser();
      this.helper.trace('The dialog was closed' + result);
    });
  }

}
