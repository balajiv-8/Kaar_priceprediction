import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }
  private isLoading = new Subject<boolean>();

  getIsLoading() {
    return this.isLoading.asObservable();
  }
  setIsLoading(value: boolean) {
    this.isLoading.next(value);
  }
}
