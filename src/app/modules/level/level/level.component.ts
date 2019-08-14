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

  displayedColumns: string[] = ['id', 'levelName', 'description'];
  dataSource: MatTableDataSource<Level>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


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
