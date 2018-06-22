import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './user.service';
import { User } from '../shared/user';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent {
    public id:number;
    user: any;
    angForm: FormGroup;
    title = 'Edit User';
    constructor(private route: ActivatedRoute, private router: Router, private service: UserService, private formBuilder: FormBuilder,private toast:ToastrService) {
      this.createForm();
     }
  
     createForm() {
      this.angForm = this.formBuilder.group({
        configKey: ['', Validators.required ],
        configValue: ['', Validators.required ],
        configDescription: ['', Validators.required ]
     });
    }
  
    updateUser(configParam) {
    
  
   this.route.params.subscribe(params => {
   this.user = this.service.updateUser(this.user,params['id']).subscribe(res => {
        this.user = res;
      });
    });

   //this.dialogRef.close();
    this.toast.success("Utilisateur modifié avec succès");
    this.router.navigate(['users']);
  
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = this.service.editUser(params['id']).subscribe(res => {
        this.user = res;
     
      });
    });
  }
  }
  