import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoadingType } from './loading-type';
import { startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loadinSubject = new Subject<LoadingType>();

  getLoading() {
    return this.loadinSubject
      .asObservable()
      .pipe(startWith(LoadingType.STOPPED));
  }

  start() {
    this.loadinSubject.next(LoadingType.LOADING);
  }

  stop() {
    this.loadinSubject.next(LoadingType.STOPPED);
  }
}
