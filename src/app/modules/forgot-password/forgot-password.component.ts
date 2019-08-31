import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/authentication/user.service';
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
  isExistedUserMail = false;
  isValidKey = false;
  isResetedPassword = false;
  email = '';

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private helper: Helper,
    private userService: UserService) {

  }

  ngOnInit() {
    this.checkUserKeyForResetPassword();
    this.initform();
  }

  // convenience getter for easy access to form fields
  get form() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    this.checkMailForResetPassword(this.resetForm.value.email);

  }

  /**
   * Used to check if the user exist before reset password
   * @param email
   */
  checkMailForResetPassword(email: string) {
    this.userService.checkMailForResetPassword(email).subscribe(data => {
      if (data) {
        this.isExistedUserMail = data;
      }
      setTimeout(() => {
        this.isExistedUserMail = false;
        this.resetForm.reset();
      }, 50000);
    });
  }

  /**
   * Used for check the key
   *
   */
  checkUserKeyForResetPassword() {
    this.helper.trace(`check User Key For Reset Password`);
    let key = '';
    this.route.queryParams.subscribe(params => {
      key = params['key'];
      this.email = params['email'];
    });
    if (this.email && key) {
      this.userService.checkUserKeyForResetPassword(this.email, key).subscribe(data => {
        if (data) {
          this.isValidKey = data;
          this.resetForm.controls['email'].setValue(this.email);
        }
      });
    }
  }

  /**
   * 
   * @param email
   * @param key
   * @param password
   */
  resetPassword() {
    let key = '';
    this.route.queryParams.subscribe(params => {
      key = params['key'];
      this.email = params['email'];
    });
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetForm.invalid) {
      return;
    }
    // tslint:disable-next-line: max-line-length
    if (this.isValidKey && this.resetForm.value.repassword === this.resetForm.value.password && key && (this.email === this.resetForm.value.email)) {
      this.userService.resetPassword(this.email, key, this.resetForm.value.password).subscribe(data => {
        this.isResetedPassword = data;
      });
    }
  }

  initform() {
    let key = null;
    let email = null;
    this.route.queryParams.subscribe(params => {
      key = params['key'];
      email = params['email'];
    });
    if (key != null && email != null) {
      this.resetForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        repassword: ['', Validators.required],

      });
    } else {
      this.resetForm = this.formBuilder.group({
        email: ['', Validators.required],
      });
    }
  }
}
