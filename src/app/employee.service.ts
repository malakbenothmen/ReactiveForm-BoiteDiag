import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Employee } from './Model/employeeModel';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  Url = 'http://localhost:3000/employees';
  private employeeCountSubject = new Subject<number>();
  employeeCount$ = this.employeeCountSubject.asObservable();

  GetallEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.Url).pipe(
      tap(employees => {
        this.employeeCountSubject.next(employees.length);
      })
    );;
  }

  GetEmployeebycode(id: any): Observable<Employee> {
    return this.http.get<Employee>(this.Url + '/' + id);
  }

  RemoveEmployeebycode(id: any) {
    return this.http.delete(this.Url + '/' + id);
  }

  CreateEmployee(employeedata: any)  {
    return this.http.post(this.Url, employeedata);
  }

  UpdateEmployee(id: any, employeedata: any) {
    return this.http.put(this.Url + '/' + id, employeedata);
  }

}
