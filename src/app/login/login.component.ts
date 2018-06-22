import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { TokenStorage } from '../shared/token.storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;

  username: string;
  password: string;
  public user:User;
  model: any = {}
  constructor(private router: Router,private formBuilder: FormBuilder, private authService: AuthService, private token: TokenStorage,private toastr: ToastrService) {
  }

 
  ngOnInit() {
    
  }
  login(): void {
    this.authService.attemptAuth(this.model.username, this.model.password).subscribe(
      data => {
        this.token.saveToken(data.token);
        
        this.router.navigate(['users']);
      }
    );
  }



}
