import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { PageResult } from '../../dto/page-result';
import { of } from 'rxjs';

const API = `${environment.baseApi}/employee/catalogs`

@Injectable({
  providedIn: 'root'
})
export class EmployeeCatalogService {

  catalogs: any[] = []

  constructor(private http: HttpClient) {}

  save(catalog: any) {
    const {id, ...value} = catalog

    if(id > 0)
      return this.update(id, value)

    return this.create(value)
  }

  private create(value: any) {

    let result = value

    if(this.catalogs.length) {
      let id = this.catalogs[this.catalogs.length - 1].id
      result.id = id + 1
    } else {
      result.id = 1
    }

    this.catalogs.push(result)
    return of(this.catalogs)
  }

  private update(id: number, value: any) {
    let index = this.catalogs.findIndex(catalog => catalog.id == id)
    this.catalogs[index] = value
    this.catalogs[index].id = id
    return of(this.catalogs)
  }

  search(params: any) {
    let result: PageResult = { content: this.catalogs, page: {current: 0, size: 0, count: 0}}
    return of(result)
  }

  findById(id: number) {
    let index = this.catalogs.findIndex(catalog => catalog.id = id)
    let result: {info: any, images: []} = {info: {}, images: []}
    result.info = this.catalogs[index]
    return of(result)
  }

  uploadPhotos(id: number, photos: FileList) {

    var files = new FormData

    for (let i = 0; i < photos.length; i++) {
      files.append('files', photos[i], photos[i].name)
    }

    return this.http.post<any>(`${API}/${id}/uploads`, files)
  }

  /*
  constructor(private http: HttpClient) {}

  save(catalog: any) {
    const {id, ...value} = catalog

    if(id > 0)
      return this.update(id, value)

    return this.create(value)
  }

  private create(value: any) {
    return this.http.post<any>(API, value)
  }

  private update(id: number, value: any) {
    return this.http.put<any>(`${API}/${id}`, value)
  }

  search(params: any) {
    return this.http.get<PageResult>(API, { params: params })
  }

  findById(id: number) {
    return this.http.get<any>(`${API}/${id}`)
  }

  uploadPhotos(id: number, photos: FileList) {

    var files = new FormData

    for (let i = 0; i < photos.length; i++) {
      files.append('files', photos[i], photos[i].name)
    }

    return this.http.post<any>(`${API}/${id}/uploads`, files)
  }
  */
}
