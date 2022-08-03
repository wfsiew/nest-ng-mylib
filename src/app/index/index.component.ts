import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { AppConstant } from 'src/app/shared/constants/app.constant';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

  isLoading = false;
  menu: string = '';
  isLogin = false;
  data: any = {};
  roles = '';
  role = '';
  subs: Subscription;

  readonly uiState = 'home.index';

  readonly ROLE = AppConstant.ROLE;

  readonly env = environment;

  constructor(
    private router: Router,
    private authService: AuthService,
    private msService: MessageService,
    private toastr: ToastrService
  ) {
    this.subs = this.msService.get().subscribe(res => {
      if (res.name === this.uiState) {
        location.reload();
      }
    });
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  load() {
    if (this.authService.hasValidToken()) {
      this.isLogin = true;
      this.isLoading = true;
      this.authService.getUserDetails().subscribe({
        next: (res: any) => {
          this.data = res;
          if (res.roles) {
            const roles: any[] = res.roles;
            const lr = roles.map((x) => x.name);
            this.roles = lr.join(', ');
            this.setRole(roles);
          }
          
          this.authService.saveUser(res);
          this.goto('books', 'available');
        },
        error: (error) => {

        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }

    else {
      this.isLogin = false;
      this.goto('books', 'available');
    }
  }

  setRole(groups: any[]) {
    if (this.hasRole(AppConstant.ROLE.STUDENT, groups)) {
      this.role = AppConstant.ROLE.STUDENT;
    }

    else if (this.hasRole(AppConstant.ROLE.LIBRARIAN, groups)) {
      this.role = AppConstant.ROLE.LIBRARIAN;
    }
  }

  hasRole(role: string, roles: any[]) {
    return roles.some((x, i) => {
      return x.name === role;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }

  goto(s: string, link: string) {
    this.menu = `${s}/${link}`;
    this.router.navigate([`/main/${s}/${link}`]);
    return false;
  }

  gotoLogin() {
    this.menu = 'login';
    this.router.navigate([`/login`]);
    return false;
  }
}
