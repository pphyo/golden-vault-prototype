import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { EmployeeCategoryService } from '../employee/employee-category.service';

const API = `${environment.baseApi}/public/categories`

@Injectable({
  providedIn: 'root'
})
export class PublicCategoryService {

  constructor(private http: HttpClient, private empCat: EmployeeCategoryService) { }

  findAll() {
    return this.empCat.search()
    // return this.http.get<any[]>(API)
  }
}
