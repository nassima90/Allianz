import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './shared/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { TokenStorage } from './shared/token.storage';
import { CommonModule } from "@angular/common";
import { UserComponent } from './user/user.component';
import {RouterModule, Routes} from '@angular/router'; 
import { AppRoutingModule } from './app.routing.module';
import { UserService } from './user/user.service';
import { HttpModule } from '@angular/http';
import { Interceptor } from './shared/app.interceptor';
import { AddUserComponent } from './user/add-user.component';
import { EditUserComponent } from './user/edit-user.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Logger } from './shared/logger';
import {LayoutModule} from '@angular/cdk/layout';
import {NgForm} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    LayoutModule
  ],
  providers: [AuthService,TokenStorage,UserService,Logger,{
    //activiting interceptor
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    //multi:true => This required setting tells Angular that HTTP_INTERCEPTORS is a token for a multiprovider
    //that injects an array of values , rather than a single value.
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
