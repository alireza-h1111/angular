import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {
  private defaultHeaders: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}

  // متد عمومی برای دریافت لیست داده‌ها
  getAll(url: string, headers?: HttpHeaders): Observable<T[]> {
    return this.http.get<T[]>(url, { headers: headers || this.defaultHeaders }).pipe(
      retry(3), // تلاش مجدد در صورت خطا
    );
  }

  // متد عمومی برای دریافت داده با شناسه خاص
  getById(url: string, id: number, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(`${url}/${id}`, { headers: headers || this.defaultHeaders }).pipe(
      retry(3),
    );
  }

  // متد عمومی برای ایجاد داده جدید
  create(url: string, item: T, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(url, item, { headers: headers || this.defaultHeaders })
  }

  // متد عمومی برای به‌روزرسانی داده
  update(url: string, id: number, item: T, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(`${url}/${id}`, item, { headers: headers || this.defaultHeaders });
  }

  // متد عمومی برای حذف داده
  delete(url: string, id: number, headers?: HttpHeaders): Observable<void> {
    return this.http.delete<void>(`${url}/${id}`, { headers: headers || this.defaultHeaders })
  }

  // متد عمومی برای مدیریت خطاها
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';

    if (error.error instanceof ErrorEvent) {
      // خطای سمت کلاینت
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // خطای سمت سرور
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
