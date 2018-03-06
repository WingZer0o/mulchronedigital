import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/Subject";

@Injectable()
export class UserRegisterEmitter {
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    public changeEmitted$ = this.emitChangeSource.asObservable();
    // Service message commands
    public emitChange(change: any): void {
        this.emitChangeSource.next(change);
    }
}
