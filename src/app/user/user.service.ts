import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../shared/user';
import { Observable } from 'rxjs/Observable';
import { RequestOptions } from '@angular/http';
import "rxjs/add/operator/map";
import { Headers, Http} from '@angular/http';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
 
  constructor(private http: HttpClient) {}
  
  creds: String;
  updatedUser: string;
  private userUrl = 'http://localhost:8080/config/user';
 // private userUrl = '/api';

   //Fetch ConfigParam by id
   public getUserById(userId: string){
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let cpParams = new URLSearchParams();
    cpParams.set('id', userId);			
    let options = new RequestOptions({ headers: cpHeaders, params: cpParams });
    return this.http.get(this.userUrl);
      }	
     //create a new ConfigParam
     public createUser(user) {
        return this.http.post<User>(this.userUrl, user);
      }
      public updateUser(user:User,id) {
  
        //   alert(user.email);
          //  alert(this.userUrl+"/"+id);
           return this.http.put<User>(this.userUrl + "/"+ user.id,user);
         
         }
  
     public editUser(id){
          return this
                   .http
                   .get(this.userUrl + "/" + id)
                   .map(res => {
                     return res;
                   }); 
         }
  
  public deleteUser(user) {
    return this.http.delete(this.userUrl + "/"+ user.id);
  }

  getUsers() {
   
        
    return this.http.get<User[]>(this.userUrl);
     // .map(res => res.json());
}

private extractData(res: Response) {
	let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.message || error);
    }

  }