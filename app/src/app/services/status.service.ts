import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Status {
  message?: string,
  code: StatusCode
};

export enum StatusCode {
  NONE,
  PENDING,
  COMPLETED,
  FAILED,
}

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private readonly _orderStatus$ = new BehaviorSubject<Status>({ code: StatusCode.NONE });
  readonly orderStatus$ = this._orderStatus$.asObservable();
  get orderStatus() { return this._orderStatus$.getValue() };
  set orderStatus(value) { this._orderStatus$.next(value) }
  
  constructor() { }

  setPendingStatus(message: string) {
    const newStatus =  {
      message: message,
      code: StatusCode.PENDING
    }
    this._orderStatus$.next(newStatus);
  }

  setCompletedStatus(message: string) {
    const newStatus =  {
      message: message,
      code: StatusCode.COMPLETED
    }
    this._orderStatus$.next(newStatus);
  }
  
  setFailedStatus(message: string) {
    const newStatus =  {
      message: message,
      code: StatusCode.FAILED
    }
    this._orderStatus$.next(newStatus);
  }

  clearStatus() {
    const newStatus =  {
      code: StatusCode.NONE
    }
    this._orderStatus$.next(newStatus);
  }
}
