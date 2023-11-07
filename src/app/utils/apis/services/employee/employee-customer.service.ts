import { Injectable } from '@angular/core';
import { PageResult } from '../../dto/page-result';
import { of } from 'rxjs';

// const API = `${environment.baseApi}/employee/customers`

@Injectable({
  providedIn: 'root'
})
export class EmployeeCustomerService {

  customers: any[] = []

  save(customer: any) {
    const {id, ...value} = customer

    if(id > 0)
      return this.update(id, value)

    return this.create(value)
  }

  private create(data: any) {
    let result = data
    if(this.customers.length) {
      let id = this.customers[this.customers.length - 1].id
      result.id = id + 1
    } else {
      result.id = 1
    }

    this.customers.push(result)
    return of(this.customers)
  }

  private update(id: number, data: any) {
    let index = this.customers.findIndex(customer => customer.id == id)
    this.customers[index] = data
    this.customers[index].id = id
    return of(this.customers)
  }

  search(params: any) {
    let result: PageResult = { content: this.customers, page: {current: 0, size: 0, count: 0}}
    return of(result)
  }

  findById(id: number) {
    let index = this.customers.findIndex(customer => customer.id == id)
    return of(this.customers[index])
  }

  findByIdForEdit(id: number) {
    return this.findById(id)
  }

  /*
  constructor(private http: HttpClient) { }

  save(customer: any) {
    const {id, ...value} = customer

    if(id > 0)
      return this.update(id, value)

    return this.create(value)
  }

  private create(data: any) {
    return this.http.post<any>(API, data)
  }

  private update(id: number, data: any) {
    return this.http.put<any>(`${API}/${id}`, data)
  }

  search(params: any) {
    return this.http.get<PageResult>(API, { params: params } )
  }

  findById(id: number) {
    return this.http.get<any>(`${API}/${id}`)
  }

  findByIdForEdit(id: number) {
    return this.http.get<any>(`${API}/${id}/edit`)
  }
  */
}
