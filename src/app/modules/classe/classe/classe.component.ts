import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Helper } from 'src/app/core/helper.service';
import { User } from 'src/app/shared/models/user.class';
import { ClasseModalComponent } from '../classe-modal/classe-modal.component';
import { Classe } from '../model/Classe';
import { ClasseService } from '../services/classe.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {

  classes: Classe[] = [];
  currentUser: User;
  displayedColumns: string[] = ['select', 'className', 'description', 'field', 'more'];
  dataSource: MatTableDataSource<Classe>;
  selection = new SelectionModel<Classe>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectAction: String = 'delete';

  constructor(private readonly helper: Helper,
    private readonly _classeService: ClasseService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog) {


  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
      const roles = this.currentUser ? this.currentUser.roles.map(item => item.name) : [];
      if (roles.indexOf('ADMINISTRATION') > -1) {
        if (this.currentUser && this.currentUser.id) {
          this.getClassByEstablishement(this.currentUser.id);
        }
      } else if (roles.indexOf('SUPER_ADMIN') > -1) {
        this.getAllClasse();
      }
    });
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
    this.dataSource = new MatTableDataSource(this.classes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  /**
  * Get all Classes
  */
  getAllClasse() {
    this._classeService.getAllClasses().subscribe(
      (data: Classe[]) => {
        this.classes = data;
        this.dataSource = new MatTableDataSource(this.classes);
      }
      ,
      error => this.helper.handleError,
      () => this.helper.trace('Get all classes complete ' + this.classes.length));
  }

  /**
 * Get all Classes
 */
  getClassByEstablishement(id: number) {
    this._classeService.getClassByEstablishement(id).subscribe(
      (data: Classe[]) => {
        this.classes = data;
        this.dataSource = new MatTableDataSource(this.classes);
      },
      error => this.helper.handleError,
      () => this.helper.trace('Get all classes complete ' + this.classes.length));
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
  checkboxLabel(row?: Classe): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  openDialog(classe: Classe, action: string): void {
    const dialogRef = this.dialog.open(ClasseModalComponent, {
      width: '600px',
      data: { classe: classe, action: action }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllClasse();
      this.helper.trace('The dialog was closed' + result);
    });
  }

}
