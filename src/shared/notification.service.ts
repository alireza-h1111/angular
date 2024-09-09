import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {}

  showError(message: string): void {
    // نمایش پیام خطا با استفاده از alert
    alert(message);
  }
}
