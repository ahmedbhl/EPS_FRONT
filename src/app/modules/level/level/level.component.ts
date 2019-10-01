import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Helper } from 'src/app/core/helper.service';
import { User } from 'src/app/shared/models/user.class';
import { LevelModalComponent } from '../level-modal/level-modal.component';
import { Level } from '../model/level';
import { LevelService } from '../services/level.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit {

  levels: Level[] = [];

  displayedColumns: string[] = ['select', 'levelName', 'description', 'establishment', 'more'];
  dataSource: MatTableDataSource<Level>;
  selection = new SelectionModel<Level>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  currentUser: User;
  selectAction: String = 'delete';

  constructor(private readonly helper: Helper,
    private readonly _LevelService: LevelService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.initLevels();
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
    this.dataSource = new MatTableDataSource(this.levels);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  initLevels() {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
      const roles = this.currentUser ? this.currentUser.roles.map(item => item.name) : [];
      if (roles.indexOf('ADMINISTRATION') > -1) {
        if (this.currentUser && this.currentUser.id) {
          this.getLevelByEstablishement(this.currentUser.id);
        }
      } else if (roles.indexOf('SUPER_ADMIN') > -1) {
        this.getAllLevel();
      }
    });
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
      }
      ,
      error => this.helper.handleError,
      () => this.helper.trace('Get all Levels complete ' + this.levels.length));
  }

  getLevelByEstablishement(administrationId: number) {
    this._LevelService.getLevelByAdministration(administrationId).subscribe(
      (data: Level[]) => {
        this.levels = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.levels);
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

  openDialog(level: Level, action: string): void {
    const dialogRef = this.dialog.open(LevelModalComponent, {
      width: '600px',
      data: { level: level, action: action, currentUser: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.initLevels();
      this.helper.trace('The dialog was closed' + result);
    });
  }

}
