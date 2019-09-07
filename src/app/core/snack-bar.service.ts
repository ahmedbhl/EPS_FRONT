import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class SnackBarService {

    constructor(public snackBar: MatSnackBar) { }

    openSnackBar(message: string, action: string, className: string, position: any) {
        this.snackBar.open(message, action, {
            duration: 5000,
            panelClass: [className],
            verticalPosition: position
        });
    }

    openSuccessSnackBar(message: string) {
        this.snackBar.open(message, 'X', {
            duration: 5000,
            panelClass: ['alert-success'],
            verticalPosition: 'top'
        });
    }

    openDangernackBar(message: string) {
        this.snackBar.open(message, 'X', {
            duration: 5000,
            panelClass: ['alert-danger'],
            verticalPosition: 'top'
        });
    }

    openWarningnackBar(message: string) {
        this.snackBar.open(message, 'X', {
            duration: 5000,
            panelClass: ['alert-warning'],
            verticalPosition: 'top'
        });
    }

    openInfonackBar(message: string) {
        this.snackBar.open(message, 'X', {
            duration: 5000,
            panelClass: ['alert-info'],
            verticalPosition: 'top'
        });
    }

    openPrimaryBackBar(message: string) {
        this.snackBar.open(message, 'X', {
            duration: 5000,
            panelClass: ['alert-primary'],
            verticalPosition: 'top'
        });
    }
}
