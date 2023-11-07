import { Injectable } from '@angular/core';
import { of } from 'rxjs';

// const API = `${environment.baseApi}/employee/categories`

@Injectable({
  providedIn: 'root'
})
export class EmployeeCategoryService {

  categories: any[] = []

  save(form: any) {
    const {id, ...value} = form

    if(id)
      return this.update(id, value)

    return this.create(value)
  }

  private create(data: any) {
    let result = data
    if(this.categories.length) {
      let id = this.categories[this.categories.length - 1].id
      result.id = id + 1
    } else {
      result.id = 1
    }

    result.items = 0
    this.categories.push(result)
    return of(this.categories)
  }

  private update(id: number, data: any) {
    let index = this.categories.findIndex(category => category.id == id)
    this.categories[index].name = data.name
    this.categories[index].deleted = data.deleted
    return of(this.categories)
  }

  search() {
    return of(this.categories)
  }

  /*
  constructor(private http: HttpClient) {}

  save(form: any) {
    const {id, ...value} = form

    if(id)
      return this.update(id, value)

    return this.create(value)
  }

  private create(data: any) {
    return this.http.post<any>(API, data)
  }

  private update(id: number, data: any) {
    return this.http.put<any>(`${API}/${id}`, data)
  }

  search() {
    return this.http.get<any[]>(API)
  }
  */
}
