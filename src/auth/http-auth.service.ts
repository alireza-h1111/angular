import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from '../shared/generic.service';
import { CredentialService } from '../auth/credential.service'; 
import { User } from '../enums/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl: string = '/user'; // فقط قسمت انتهایی URL

  constructor(
    private genericService: GenericService<User>,
    private credentialService: CredentialService
  ) {}

  // ثبت‌نام
  registerUser(user: User): Observable<any> {
    return this.genericService.create(`${this.apiUrl}/register`, user);
  }

  // ورود
  loginUser(user: User): Observable<any> {
    return this.genericService.create(`${this.apiUrl}/login`, user);
  }

  // خروج
  logoutUser(): void {
    // پاک کردن توکن از لوکال استورج
    this.credentialService.removeTokenFromLocalStorage();
  }
}
