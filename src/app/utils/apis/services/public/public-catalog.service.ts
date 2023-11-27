import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { PageResult } from '../../dto/page-result';
import { EmployeeCatalogService } from '../employee/employee-catalog.service';

const API = `${environment.baseApi}/public/catalogs`

@Injectable({
  providedIn: 'root'
})
export class PublicCatalogService {

  constructor(private http: HttpClient, private empCatService: EmployeeCatalogService) { }

  search(params: any) {
    return this.empCatService.search(params)
    // return this.http.get<PageResult>(API, { params : params })
  }
}
