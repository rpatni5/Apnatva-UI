import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

import { Toaster, ToasterType } from './toaster';

@Injectable()
export class ToasterService {
  private subject = new Subject<Toaster>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
    // clear toaster messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear toaster messages
          this.clear();
        }
      }
    });
  }

  // subscribe to alerts
  getToaster(toasterId?: string): Observable<any> {
    return this.subject.asObservable().filter((x: Toaster) => x && x.toasterId === toasterId);
  }

  // convenience methods
  success(message: string) {
    this.toaster(new Toaster({ message, type: ToasterType.Success }));
  }

  error(message: string) {
    this.toaster(new Toaster({ message, type: ToasterType.Error }));
  }

  info(message: string) {
    this.toaster(new Toaster({ message, type: ToasterType.Info }));
  }

  warn(message: string) {
    this.toaster(new Toaster({ message, type: ToasterType.Warning }));
  }

  // main toaster method    
  toaster(toaster: Toaster) {
    this.keepAfterRouteChange = toaster.keepAfterRouteChange;
    this.subject.next(toaster);
  }

  // clear alerts
  clear(toasterId?: string) {
    this.subject.next(new Toaster({ toasterId }));
  }
}
