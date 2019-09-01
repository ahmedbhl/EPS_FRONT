import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Helper } from 'src/app/core/helper.service';
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

  displayedColumns: string[] = ['select', 'id', 'className', 'description', 'field', 'more'];
  dataSource: MatTableDataSource<Classe>;
  selection = new SelectionModel<Classe>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectAction: String = 'delete';

  constructor(private readonly helper: Helper,
    private readonly _classeService: ClasseService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllClasse();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
  * Get all Classes
  */
  getAllClasse() {
    this._classeService.getAllClasses().subscribe(
      (data: Classe[]) => {
        this.classes = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.classes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      ,
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

  openDialog(): void {
    const dialogRef = this.dialog.open(ClasseModalComponent, {
      width: '250px',
      data: { name: 'Guest', animal: 'Guest' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.helper.trace('The dialog was closed' + result);
    });
  }

}
