import {Component, OnInit,  ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../student.service';
import {ColumnItem, SelectCourse, Student, Studentcourse, Course} from '../stu';

@Component({
  selector: 'app-studentgrades',
  templateUrl: './studentgrades.component.html',
  styleUrls: ['./studentgrades.component.css'],
})
export class StudentgradesComponent implements OnInit {

  constructor( public router: Router,
               private studentservice: StudentService, private route: ActivatedRoute ) { }
  isCollapsed = true;
  courseinfo: SelectCourse[] = [];
  displaycourseinfo: SelectCourse[] = [];
  studentcourses: Studentcourse[] = [];
  searchValue = '';
  searchValue2 = '';
  visible = false;
  visible2 = false;
  course: Course[] = [];
  id: number = Number(this.route.snapshot.paramMap.get('id'));
  DisplayData: any ;
  DisplayData2: any ;
  Gradepoint = 0;
  creditsum = 0;
  GPA: number;
  student: Student = {
    birthday : '' ,
    class : '' ,
    major : '' ,
    name  : '' ,
    native_place : '' ,
    sex : '' ,
    stuid : null ,
    time_of_enrollment : '' ,
  };
  loading = true;
  courseid: string;
   len: number;
  column1: ColumnItem = {
    name : '课程类型',
    filterMultiple : true,
    listOfFilter: [
      { text: '必修课', value: '必修课'},
      { text: '选修课', value: '选修课'},
    ],
    filterFn: (list: string[], item: Studentcourse) => list.some(name => item.type.indexOf(name) !== -1)
  };
  column2: ColumnItem = {
    name : '成绩',
    sortOrder: null,
    sortFn: (a: Studentcourse, b: Studentcourse) => a.score - b.score
  };
 search() {
    this.reset();
    this.visible = false;
    this.DisplayData = this.DisplayData.filter((item: Studentcourse) => item.Courseid.indexOf(this.searchValue) !== -1);
  }
  search2() {
    this.reset();
    this.visible2 = false;
    this.DisplayData = this.DisplayData.filter((item: Studentcourse) => item.coursename.indexOf(this.searchValue2) !== -1);
  }
  reset() {
    this.DisplayData = this.DisplayData2;
  }
  logout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('');
  }
    getcouresinfobyID() {
     return new Promise((resolve) => {
        this.studentservice.getSelectinfobyID(this.id).subscribe(
          (res) => {
            res.data.forEach(row => {
              this.courseinfo.push( {
                  courseid : row.courseid,
                  score : row.score,
                  stuid : row.stuid,
                }
              );
            });
            resolve(res);
          }
        );
      });
  }
  getcourseinfo() {
    return new Promise((resolve) => {
      this.studentservice.getcourseinfo().subscribe(
        (res) => {
          res.data.forEach(row => {
            this.course.push( {
                courseid : row.courseid,
                coursename : row.coursename,
                credit : row.credit,
                type : row.type
              }
            );
          });
          resolve(res);
        }
      );
    });
  }
  async getdetail() {
       await this.getcouresinfobyID();
       await this.getcourseinfo();
       for (const i in this.courseinfo) {
         for (const j in this.course) {
           if (this.course[j].courseid === this.courseinfo[i].courseid) {
             this.studentcourses.push( {
                 Courseid: this.courseinfo[i].courseid,
                 coursename: this.course[j].coursename,
                 credit: this.course[j].credit,
                 type: this.course[j].type,
                 score: this.courseinfo[i].score,
                 gradepoint: this.courseinfo[i].score / 10 - 5
             });
             break;
           }
         }
       }
       this.DisplayData = this.studentcourses;
       this.DisplayData2 = this.studentcourses;
       this.getGPA();
       this.loading = false;
  }
  getGPA(): number {
     for (const i in this.DisplayData2) {
          if (this.DisplayData2[i].score < 60) {
            this.creditsum = this.creditsum + this.DisplayData2[i].credit;
          } else {
            this.Gradepoint = this.Gradepoint + ((this.DisplayData2[i].score) / 10 - 5) * this.DisplayData2[i].credit;
            this.creditsum = this.creditsum + this.DisplayData2[i].credit;
          }
     }
     this.GPA = this.Gradepoint / this.creditsum;
     return this.GPA;
  }
  getStudentbyID() {
    this.studentservice.getstudentbyID(this.id).subscribe(
      res => this.student = {
        birthday : res.data.birthday,
        class : res.data.class,
        major : res.data.major,
        name : res.data.name,
        native_place : res.data.native_place,
        sex : res.data.sex,
        stuid : res.data.stuid,
        time_of_enrollment : res.data.time_of_enrollment
      }
    );
    console.log('获取信息成功');
 }
        ngOnInit(): void {
    this.getStudentbyID();
    this.getdetail();
}}



