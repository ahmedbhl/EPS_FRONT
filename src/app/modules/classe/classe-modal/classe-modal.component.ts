import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-classe-modal',
  templateUrl: './classe-modal.component.html',
  styleUrls: ['./classe-modal.component.css']
})
export class ClasseModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ClasseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
