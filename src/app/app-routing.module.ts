import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AboutComponent } from './about/about.component';
import { MeetComponent } from './meet/meet.component';
import { AuthGuard } from './core/auth.guard';

const routes: Routes = [
  { path: 'login', component: UserProfileComponent },
  { path: 'about', component: AboutComponent,  canActivate: [AuthGuard] },
  { path: 'meet/:id', component: MeetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  clicked = false;
}

