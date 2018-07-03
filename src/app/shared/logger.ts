import { Injectable } from "@angular/core";

@Injectable()
export class Logger {

    log(msg:any){console.log(new Date() + ": " + JSON.stringify(msg));}
    error(msg:any){console.error(new Date() + ": " + JSON.stringify(msg));}
    warn(msg:any){console.warn(new Date() + ": " + JSON.stringify(msg));}

}