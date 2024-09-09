import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../notification.service'; // سرویس اطلاع‌رسانی برای نمایش پیام‌ها

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {
  
  constructor(private notificationService: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let userFriendlyMessage = 'An unexpected error occurred. Please try again later.';

        if (error.error instanceof ErrorEvent) {
          // خطای سمت کلاینت
          userFriendlyMessage = 'A client-side error occurred: ${error.error.message}';
        } else {
          // خطای سمت سرور
          userFriendlyMessage = 'Server error occurred. Please contact support if the problem persists.';
        }

        // ارسال پیام به سرویس اطلاع‌رسانی
        this.notificationService.showError(userFriendlyMessage);

        return throwError(() => new Error(userFriendlyMessage)); // برگرداندن خطا برای مدیریت بیشتر
      })
    );
  }
}