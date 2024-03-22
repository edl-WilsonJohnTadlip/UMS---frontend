import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private successMessage: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {}

  // Success Message Methods
  setSuccessMessage(message: string): void {
    this.successMessage.next(message);
    // Clear the success message after the specified duration
    setTimeout(() => {
      this.clearSuccessMessage();
    }, 3000);
  }

  getSuccessMessage(): Observable<string> {
    return this.successMessage.asObservable();
  }

  clearSuccessMessage(): void {
    this.successMessage.next('');
  }

  // Error Message Methods
  setErrorMessage(message: string): void {
    this.errorMessage.next(message);
    // Set a timeout to clear the error message after 3 seconds
    setTimeout(() => {
      this.clearErrorMessage();
    }, 3000);
  }

  getErrorMessage(): Observable<string> {
    return this.errorMessage.asObservable();

  }

  clearErrorMessage(): void {
    this.errorMessage.next('');
  }
}
