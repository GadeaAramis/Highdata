import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from "@angular/common/http";
import { toODataString, State, DataResult, orderBy, process, SortDescriptor  } from "@progress/kendo-data-query";
import { Observable, BehaviorSubject, throwError  } from "rxjs";
import { map, tap, retry, catchError  } from "rxjs/operators";
import { Student } from '../Model/student';

export abstract class NorthwindService extends BehaviorSubject<Array<any>> {
    public loading: boolean = false;
  
    private BASE_URL = "https://localhost:44376/";
  
    constructor(private http: HttpClient, protected tableName: string) {
      super(new Array<any>());
    }
  
    public query(filterName:string): void {
        const tableName = "data?filter=";
        this.fetch(`${tableName}${filterName}`).subscribe((x) => super.next(x));
    }
  
    protected fetch(tableName: string): Observable<Student[]> {
        this.loading = true;

        return this.http.get<Student>(`${this.BASE_URL}${tableName}`).pipe(
            map((response) => <Student[]><unknown>response),
            tap(() => (this.loading = false),
            catchError(this.handleError))
        );
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }
  }

@Injectable()
export class StudentService extends NorthwindService {
  constructor(http: HttpClient) {
    super(http, "data");
  }
}