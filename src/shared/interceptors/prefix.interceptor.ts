import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialService } from '../../auth/credential.service';

@Injectable()
export class PrefixInterceptor implements HttpInterceptor {

  private readonly apiPrefix: string = 'https://api.example.com'; // پیشوند پیش‌فرض برای API

  constructor(private credentialService: CredentialService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // اضافه کردن پیشوند به URL درخواست
    const urlWithPrefix = `${this.apiPrefix}${req.url}`;
    
    // گرفتن توکن از سرویس CredentialService
    const token = this.credentialService.getTokenFromLocalStorage();
    
    // ایجاد هدر جدید با توکن احراز هویت (اگر موجود باشد)
    let headers = req.headers;
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    
    // ایجاد درخواست جدید با URL جدید و هدرهای به‌روز شده
    const modifiedReq = req.clone({
      url: urlWithPrefix,
      headers: headers
    });

    // ارسال درخواست اصلاح‌شده به ادامه زنجیره
    return next.handle(modifiedReq);
  }
}
