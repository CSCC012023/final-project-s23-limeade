import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { PremiumSignupComponent } from './pages/premium-signup/premium-signup.component';
import { EventHomeComponent } from './pages/event-home/event-home.component';
import { EventInfoPageComponent } from './pages/event-info-page/event-info-page.component';
import { EventAddComponent } from './pages/event-add/event-add.component';
import { UsersearchComponent } from './pages/usersearch/usersearch.component';
import { StaffComponent } from './pages/staff/staff.component';
import { MyInvitesComponent } from './pages/my-invites/my-invites.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'premium-signup',
    component: PremiumSignupComponent,
  },
  {
    path: 'event-home',
    component: EventHomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'event-info-page',
    component: EventInfoPageComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'event-add',
    component: EventAddComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'user-search',
    component: UsersearchComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'staff',
    component: StaffComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'my-invites',
    component:MyInvitesComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
