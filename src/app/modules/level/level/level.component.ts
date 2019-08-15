import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Helper } from 'src/app/core/helper.service';
import { Level } from '../model/level';
import { LevelService } from '../services/level.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {

  levels: Level[] = [];

  displayedColumns: string[] = ['select', 'id', 'levelName', 'description', 'more',];
  dataSource: MatTableDataSource<Level>;
  selection = new SelectionModel<Level>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectAction: string = 'delete';

  constructor(private readonly helper: Helper,
    private readonly _LevelService: LevelService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllLevel();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
  * Get all Levels
  */
  getAllLevel() {
    this._LevelService.getAllLevels().subscribe(
      (data: Level[]) => {
        this.levels = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.levels);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      ,
      error => this.helper.handleError,
      () => this.helper.trace('Get all Levels complete ' + this.levels.length));
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
  checkboxLabel(row?: Level): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /* openDialog(): void {
    const dialogRef = this.dialog.open(LevelModalComponent, {
      width: '250px',
      data: { name: 'Guest', animal: 'Guest' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.helper.trace('The dialog was closed' + result);
    });
  }*/

}
