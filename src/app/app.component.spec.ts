import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { EditUserComponent } from './user/edit-user.component';
import { AddUserComponent } from './user/add-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { TokenStorage } from './shared/token.storage';
import { UserService } from './user/user.service';
import { Logger } from './shared/logger';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Interceptor } from './shared/app.interceptor';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app.routing.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {NgForm} from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,UserComponent,LoginComponent,EditUserComponent,AddUserComponent,LoginComponent
      ],
      providers: [AuthService,TokenStorage,UserService,Logger,{
        //activiting interceptor
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        //multi:true => This required setting tells Angular that HTTP_INTERCEPTORS is a token for a multiprovider
        //that injects an array of values , rather than a single value.
        multi: true
      }],
      imports: [BrowserModule,ReactiveFormsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        AppRoutingModule,
        HttpModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(), RouterTestingModule.withRoutes([ { path: 'users', component: UserComponent } ,
      { path:'login',component:LoginComponent},
      { path: 'edit/:id', component:   EditUserComponent },
      { path: 'add', component:   AddUserComponent },
      { path: 'logout', component:  LoginComponent }])] 
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
