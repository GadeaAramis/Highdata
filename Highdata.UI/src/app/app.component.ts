import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Student } from './Model/student';
import { StudentService } from './Service/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StudentService]
})

export class AppComponent {
  title = 'Highdata.UI';

  public view!: Observable<Student[]>;

  constructor(public service:StudentService){
    this.view = service;
    this.service.query("");
  }

  public onChange(value: string): void {
    this.service.query(value);
  }
}