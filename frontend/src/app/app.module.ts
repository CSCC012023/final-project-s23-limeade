import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginformComponent } from './components/loginform/loginform.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './pages/profile/profile.component';
import { PremiumSignupComponent } from './pages/premium-signup/premium-signup.component';
import { PaymentFormComponent } from './components/payment-form/payment-form.component';
import { EventHomeComponent } from './pages/event-home/event-home.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { LargeEventCardComponent } from './components/large-event-card/large-event-card.component';
import { EventInfoPageComponent } from './pages/event-info-page/event-info-page.component';
import { EventAddComponent } from './pages/event-add/event-add.component';
import { EventAddFormComponent } from './components/event-add-form/event-add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    LoginformComponent,
    SignupFormComponent,
    ProfileComponent,
    PremiumSignupComponent,
    PaymentFormComponent,
    EventHomeComponent,
    EventCardComponent,
    LargeEventCardComponent,
    EventInfoPageComponent,
    EventAddComponent,
    EventAddFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
