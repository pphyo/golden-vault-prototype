import { Injectable } from '@angular/core';
import { SignInResult } from '../dto/signin-result';
import { Observable, of, throwError } from 'rxjs';
import { ManagerEmployeeService } from './manager/manager-employee.service';

// const API = `${environment.baseApi}/public/signin`

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private manEmployeeService: ManagerEmployeeService) {

  }

  singIn(form: any): Observable<SignInResult> {
    let result = this.manEmployeeService.employees.filter(emp => form.email == emp.email && form.password == emp.password).pop()

    if(result) {
      return of({
        id: result.id,
        name: result.name,
        email: result.email,
        role: result.role,
        token: ''
      })
    }

    return throwError(() => 'No member found with this information!')
  }

  //constructor(private http: HttpClient) { }
//
  // singIn(form: any): Observable<SignInResult> {
  //   return this.http.post<SignInResult>(`${API}`, form)
  // }
}
