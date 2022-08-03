import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { GeneralForm } from 'src/app/shared/classes/general.form';
import { environment } from 'src/environments/environment';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends GeneralForm implements OnInit, OnDestroy {

  nextUrl: any;
  viewpwd = false;
  subscription!: Subscription;

  readonly env = environment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private msService: MessageService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    super();
    this.mform = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      remember_client: [false]
    });
  }

  ngOnInit() {
    var currentPath = this.route.snapshot.routeConfig?.path === 'login';
    this.subscription = this.route.queryParams.subscribe(params => {
      if (params['next']) {
        this.nextUrl = params['next'];
        
        if (this.authService.hasValidToken() && currentPath) {
          this.router.navigate(['/main/home']);
        }

        else if (this.authService.hasValidToken() && !currentPath) {
          this.router.navigate([this.nextUrl]);
        }
      }
    });

    if (this.authService.hasValidToken()) {
      this.router.navigate(['/main/home']);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    const fm = this.mform.value;
    this.authService.authenticate(fm.username, fm.password).subscribe({
      next: token => this.onSuccess(token),
      error: error => this.onError(error)
    });
  }

  onTogglePassword() {
    this.viewpwd = !this.viewpwd;
  }

  onSuccess(res: string) {
    this.msService.send('home.index', { reload: true });
    if (this.nextUrl) {
      this.router.navigateByUrl(this.nextUrl)
        .catch(() => { this.router.navigate(['/main']); });
    }

    else {
      this.router.navigate(['/main/home']);
    }
  }

  onError(error: any) {
    if (error && error.error.message) {
      const err = error.error.message;
      if (err === 'Invalid Credentials') {
        this.toastr.error('Invalid Username or Password', 'Login Failed', {
          positionClass: 'toast-top-center'
        });
      }
    }

    if (error && error.error.error) {
      const err = error.error.error;
      if (err === 'Internal Server Error') {
        this.toastr.error('Server Error', 'Login Failed', {
          positionClass: 'toast-top-center'
        });
      }
    }
  }
}
