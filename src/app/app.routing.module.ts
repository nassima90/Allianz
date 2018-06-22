import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserComponent } from "./user/user.component";
import { LoginComponent } from "./login/login.component";
import { EditUserComponent } from "./user/edit-user.component";
import { AddUserComponent } from "./user/add-user.component";


const routes: Routes = [
  { path: 'users', component: UserComponent } ,
   { path:'login',component:LoginComponent},
   { path: 'edit/:id', component:   EditUserComponent },
   { path: 'add', component:   AddUserComponent },
   { path: 'logout', component:  LoginComponent }
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(routes)
    ],
    exports: [
      RouterModule
    ],
    declarations: []
  })
  export class AppRoutingModule { }
  