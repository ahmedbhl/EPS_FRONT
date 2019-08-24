import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Helper } from 'src/app/core/helper.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private helper: Helper) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

   // convenience getter for easy access to form fields
   get form() { return this.resetForm.controls; }

   onSubmit() {
     this.submitted = true;
 
     // stop here if form is invalid
     if (this.resetForm.invalid) {
       return;
     }
 
   }

}
