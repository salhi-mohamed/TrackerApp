import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';

import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { GoogleCalendarIntegrationComponent } from './google-calendar-integration/google-calendar-integration.component';
import { InterfaceUpdateNewsComponent } from './interface-update-news/interface-update-news.component';
import { NewsDefineObjComponent } from './news-define-obj/news-define-obj.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ObjectivesComponent } from './objectives/objectives.component';
import { ListObjectivesComponent } from './list-objectives/list-objectives.component';
import { GoalDetailComponent } from './goal-detail/goal-detail.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SimpleDashboardComponent } from './simple-dashboard/simple-dashboard.component';
import { CalendarComponent } from './calendar/calendar.component';
import { EventListComponent } from './event-list/event-list.component';
import { ProfilePictureUploadComponent } from './profile-picture-upload/profile-picture-upload.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AboutUsComponent,
    FooterComponent,
    HomeComponent,
    SubscribeComponent,
    GoogleCalendarIntegrationComponent,
    InterfaceUpdateNewsComponent,
    NewsDefineObjComponent,
    SidebarComponent,
    ObjectivesComponent,
    ListObjectivesComponent,
    GoalDetailComponent,
    TaskFormComponent,
    TaskListComponent,
    SimpleDashboardComponent,
    CalendarComponent,
    EventListComponent,
    ProfilePictureUploadComponent,
    ProfileComponent,
    EditProfileComponent,
    NotFoundComponent,
    ConfirmDialogComponent,
    ContactFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FullCalendarModule,
    HttpClientModule

  ],
  providers: [
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }