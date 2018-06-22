import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { User } from '../shared/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {

  user: User = new User();

  constructor(private router: Router, private userService: UserService,private toast:ToastrService) {

  }

  createUser(): void {
   this.userService.createUser(this.user)
        .subscribe( data => {
        //  alert("User created successfully.");
        this.toast.success("Ustilisateur ajouté avec succcès");
        });
        
        this.router.navigate(['users']);
  };

}
