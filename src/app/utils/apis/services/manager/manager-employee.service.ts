import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { PageResult } from '../../dto/page-result';

// const API = `${environment.baseApi}/manager/employees`

@Injectable({
  providedIn: 'root'
})
export class ManagerEmployeeService {

  employees: any[] = [
    {
      id: 1,
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin',
      phone: '0910002000',
      nrcNumber: '1/KaKaKa(N)100200',
      assignAt: '2023-11-04',
      retireAt: '',
      role: 'Admin'
    }
  ]

  search(form: any) {
    let result: PageResult = { content: this.employees, page: {current: 0, size: 0, count: 0}}
    if(form.id || form.name || form.phone) {
      result.content = this.employees.filter(emp => emp.id == form.id || emp.name == form.name || emp.phone == form.phone)
    }
    return of(result)
  }

  save(form: any) {
    const {id, ...value} = form

    if(id > 0) {
      return this.update(id, value)
    }
    return this.create(value)
  }

  private create(value: any) {
    let id = this.employees[this.employees.length - 1].id
    let result: any
    result = value
    result.id = id + 1
    result.password = value.phone
    this.employees.push(result)
    return of(this.employees)
  }

  private update(id: number, value: any) {
    let index = this.employees.findIndex(emp => emp.id == id)
    this.employees[index] = value
    this.employees[index].id = id
    return of(this.employees)
  }

  findById(id: number) {
    let index = this.employees.findIndex(employee => employee.id = id)
    return of(this.employees[index])
  }

  /*
  constructor(private http: HttpClient) { }

  search(form: any) {
    return this.http.get<PageResult>(API, { params: form })
  }

  save(form: any) {
    const {id, ...value} = form

    if(id > 0) {
      return this.update(id, value)
    }
    return this.create(value)
  }

  private create(value: any) {
    return this.http.post<any>(API, value)
  }

  private update(id: number, value: any) {
    return this.http.put<any>(`${API}/${id}`, value)
  }

  findById(id: number) {
    return this.http.get<any>(`${API}/${id}`)
  }
  */
}
