import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;

import { AuthService } from './core/auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './core/auth.guard';
import { MeetComponent } from './meet/meet.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    AboutComponent,
    MeetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, AppRoutingModule // imports firebase/storage only needed for storage features
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
