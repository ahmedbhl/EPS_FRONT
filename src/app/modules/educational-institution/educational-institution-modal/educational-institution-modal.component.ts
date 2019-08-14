import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-educational-institution-modal',
  templateUrl: './educational-institution-modal.component.html',
  styleUrls: ['./educational-institution-modal.component.css']
})
export class EducationalInstitutionModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EducationalInstitutionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
