import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { API_URL } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL = API_URL;

  constructor(private http: HttpClient) {}

  // Método para realizar una solicitud POST a la URL baseURL + 'users/login'
  login(userData: any) {
    const url = `${this.baseURL}/users/login`;
    return this.http.post(url, userData);
  }

  register(userData: any) {
    const url = `${this.baseURL}/users/register`;
    return this.http.post(url, userData);
  }

  postWizard(formData: FormData) {
    const url = `${this.baseURL}/magos/register`;
    return this.http.post<any>(url, formData);
  }

  deleteWizard(id: any) {
    const url = `${this.baseURL}/magos/delete/${id}`;
    console.log(url);
    return this.http.delete(url);
  }

  updateUserWizard(userId: string, wizardId: string): Observable<any> {
    const body = { myWizardId: wizardId };
    const url = `${this.baseURL}/users`;
    return this.http.put<any>(`${url}/updateMyWizard/${userId}`, body);
  }

  deleteUserWizard(wizardId: string, userId: string) {
    const body = { wizardId: wizardId };
    const url = `${this.baseURL}/users`;
    return this.http.put<any>(`${url}/deleteMyWizard/${userId}`, body);
}

  
}


