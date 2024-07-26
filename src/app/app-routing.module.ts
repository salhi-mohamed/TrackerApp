import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { GoogleCalendarIntegrationComponent } from './google-calendar-integration/google-calendar-integration.component';
import { InterfaceUpdateNewsComponent } from './interface-update-news/interface-update-news.component';
import { NewsDefineObjComponent } from './news-define-obj/news-define-obj.component';
import { ObjectivesComponent } from './objectives/objectives.component';
import { ListObjectivesComponent } from './list-objectives/list-objectives.component';
import { GoalDetailComponent } from './goal-detail/goal-detail.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { EventListComponent } from './event-list/event-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ProfilePictureUploadComponent } from './profile-picture-upload/profile-picture-upload.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactFormComponent } from './contact-form/contact-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'subscribe', component: SubscribeComponent },
  { path: 'google-calendar', component: GoogleCalendarIntegrationComponent },
  { path: 'news-interface', component: InterfaceUpdateNewsComponent },
  { path: 'news-define-obj', component: NewsDefineObjComponent },
  { path: 'objectives', component: ObjectivesComponent, canActivate: [AuthGuard] },
  { path: 'list-obj', component: ListObjectivesComponent, canActivate: [AuthGuard] },
  { path: 'goal/:id', component: GoalDetailComponent, canActivate: [AuthGuard] },
  { path: 'task-form', component: TaskFormComponent, canActivate: [AuthGuard] },
  { path: 'task-list', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'event-list', component: EventListComponent, canActivate: [AuthGuard] },
  { path: 'manage-time', component: CalendarComponent },
  { path: 'UPP', component: ProfilePictureUploadComponent },
  { path: 'viewProfile', component: ProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'contact', component: ContactFormComponent, },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent } // This must be the last route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }