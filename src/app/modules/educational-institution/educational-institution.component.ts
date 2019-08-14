import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Helper } from 'src/app/core/helper.service';
import { EducationalInstitutionModalComponent } from './educational-institution-modal/educational-institution-modal.component';
import { EducationalInstitution } from './model/educational-institution';
import { EducationalInstitutionService } from './services/educational-institution.service';

@Component({
  selector: 'app-educational-institution',
  templateUrl: './educational-institution.component.html',
  styleUrls: ['./educational-institution.component.css']
})
export class EducationalInstitutionComponent implements OnInit {

  educationalInstitutions: EducationalInstitution[] = [];

  displayedColumns: string[] = ['id', 'photos', 'establishmentName', 'description', 'location', 'yearOfFoundation'];
  dataSource: MatTableDataSource<EducationalInstitution>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private readonly helper: Helper,
    private readonly _educationalInstitutionService: EducationalInstitutionService,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllEducationalInstitution();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
  * Get all Educational Institutions
  */
  getAllEducationalInstitution() {
    this._educationalInstitutionService.getAllEducationalInstitution().subscribe(
      (data: EducationalInstitution[]) => {
        this.educationalInstitutions = data;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.educationalInstitutions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      ,
      error => this.helper.handleError,
      () => this.helper.trace('Get all educational Institutions complete ' + this.educationalInstitutions.length));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(EducationalInstitutionModalComponent, {
      width: '250px',
      data: { name: 'Guest', animal: 'Guest' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.helper.trace('The dialog was closed' + result);
    });
  }
}

