import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor() { }

  private readonly _authTokenStorage: string = "authToken";

  setTokenToLocalStorage(token: string): void {
    localStorage.setItem(this._authTokenStorage, token);
  }

  getTokenFromLocalStorage():string{
    return localStorage.getItem(this._authTokenStorage) as string;
  }

  removeTokenFromLocalStorage(): void {
    localStorage.removeItem(this._authTokenStorage);
  }
}
