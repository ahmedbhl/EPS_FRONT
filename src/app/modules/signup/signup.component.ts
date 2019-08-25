import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/authentication/user.service';
import { Helper } from 'src/app/core/helper.service';
import { Role } from 'src/app/shared/models/role';
import { User } from 'src/app/shared/models/user.class';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [DatePipe]

})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  activatedKeyStat = false;
  isSignup =false;

  user: User;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private helper: Helper,
    private datePipe: DatePipe) { }

  ngOnInit() {
    this.activatedKeyStat = false;
    this.activateUser();
    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get form() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      this.isSignup = false;
      return;
    }

    const user: User = Object.assign(new User(), this.signupForm.value);
    const role = new Role();
    role.name = this.signupForm.value.role;
    user.dateOfRegistration = this.datePipe.transform(new Date(), 'yyyy-MM-dd:hh:mm');
    user.roles.push(role);
    this.userService.save(user).subscribe(
      (data: User) => {
        this.helper.trace('the User Added with success');
        this.isSignup = true;
        setTimeout(() => {
          this.isSignup = false;
          this.signupForm.reset();
        }, 50000);
      }
    );
  }

  /**
   * Used for activate the user
   */
  activateUser() {
    let activatedKey = '';
    this.route.queryParams.subscribe(params => {
      activatedKey = params['key'];
    });
    if (activatedKey) {
      this.userService.activateUser(activatedKey).subscribe(actiovationResult => {
        this.helper.trace('Activation done');
        this.activatedKeyStat = actiovationResult;
      });
    }
  }






}
