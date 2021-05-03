import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { RestApiService } from 'src/app/_services/rest-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationService } from 'src/app/_services/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm;
  adminExist = true;

  constructor(
    private auth: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private restApi: RestApiService,
  ) { }

  ngOnInit(): void {


    this.registerForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, ValidationService.emailValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      name: new FormControl('', Validators.required)
    });

    this.restApi.get('assets/adminExists')
    .then((data: any) => {
      this.adminExist = data.status as boolean;
    })
    .catch((err) => {
      this.adminExist = false;
    });
  }

  register() {

        if(this.registerForm.dirty && this.registerForm.valid) {
          this.auth.registerAndLogin(
            String(this.registerForm.value.email).toLowerCase(),
            this.registerForm.value.password,
            this.registerForm.value.password,
            {
              first_name: this.registerForm.value.name.split(" ")[0],
              last_name: this.registerForm.value.name.split(" ")[1],
            }
          )
          .then((data: any) => {
              this.router.navigate(['/admin']);
          }, (err) => {
            console.log(err.error.message);
            let snackBarRef = this.snackBar.open(err.error.message, 'Close', {
              verticalPosition: 'top'
            });
          });
        } else {
          this.snackBar.open("Please provide valid information to signup", 'Close', {
            verticalPosition: 'top'
          });
        }

  }

}
