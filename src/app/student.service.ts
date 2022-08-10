import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Stu} from './stu';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
 };
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentsUrl = 'http://123.56.134.7:5000/stubasicinfo';
  private studentsUrl2 = 'http://123.56.134.7:5000/get_stubasicinfo_byID';
  private studentUrl3 = 'http://123.56.134.7:5000/course_select_info';
  private studentUrl4 = 'http://123.56.134.7:5000/get_course_select_info_byStuid';
  private studentUrl5 = 'http://123.56.134.7:5000/get_course_select_info_byCourseid';
  private studentUrl6 = 'http://123.56.134.7:5000/courseinfo';
  private studentUrl7 = 'http://123.56.134.7:5000/get_courseinfo_byID';
  constructor(private http: HttpClient , private messageservice: MessageService) { }
  private log(message1: string) {
    this.messageservice.add(`StudentService:${message1}`);
  }
  getcourseinfobyId(id: string): Observable<any> {
    const courseID = {
      courseid: id
    };
    return this.http.post(this.studentUrl7, courseID, httpOptions).pipe(
      tap(_ => this.log('通过ID获取课程信息'))
    );
  }
  getcourseinfo(): Observable<any> {
    return this.http.get(this.studentUrl6).pipe(
      tap(_ => this.log('获取课程信息'))
    );
  }
  getSelectinfobyCourseid(id: string): Observable<any> {
    const courseID = {
      courseid: id
    };
    return this.http.post(this.studentUrl5, courseID, httpOptions).pipe(
      tap(_ => this.log('通过课程号获取选课信息'))
    );
  }
  getSelectinfobyID(id: number): Observable<any> {
    const ID = {
      stuid: id
    };
    return this.http.post(this.studentUrl4, ID, httpOptions).pipe(
      tap(_ => this.log('通过学号获取学生选课信息'))
    );
  }
  getStudents(): Observable<any> {
    return this.http.get(this.studentsUrl).pipe(
      tap(_ => this.log('获取所有学生信息') )
    );
  }
  getstudentbyID(id: number): Observable<any> {
    const ID = {
      stuid: id
    };
    return this.http.post(this.studentsUrl2, ID, httpOptions).pipe(
      tap(_ => this.log('通过ID获取学生信息 and test')
    )) ;
  }
  getSelectinfo(): Observable<any> {
    return this.http.get(this.studentUrl3).pipe(
      tap(_ => this.log('获取学生选课信息111'))
    ); }
  getUser(stu: Stu): Observable<any> {
    const loginUser = {
      stuid: stu.stuid,
      password: stu.password
    };
    return this.http.post('http://123.56.134.7:5000/login', loginUser, httpOptions).pipe(
      tap(_ => this.log('获取登录信息'))
    ); }
    // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //
  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);
  //
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }



  }

