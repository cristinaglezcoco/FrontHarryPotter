import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  hideLogin: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
}
