import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { InvitationServiceService } from 'src/app/services/invitation-service.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css'],
})
export class LoginformComponent {
  userForm: any;
  error: string = '';
  @Input() returnUrl:string = '';
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private invitesNotis: InvitationServiceService,
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.error = '';
    if (this.userForm.invalid) {
      return;
    }
    this.api
      .signIn(this.userForm.value.username, this.userForm.value.password)
      .subscribe(
        (next) => {
          this.api.loggedIn = true;
          this.api.userId = next._id;
          this.api.type = next.type;
          this.invitesNotis.initiate();
          this.router.navigateByUrl(this.returnUrl);
        },
        (error) => {
          this.error = error.error.error;
        },
      );
  }
}
