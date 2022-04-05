import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StudentService} from '../student.service';
import {Course, Coursedetail, SelectCourse, Student} from '../stu';
import {ColumnItem} from '../stu';
@Component({
  selector: 'app-scorequery',
  templateUrl: './scorequery.component.html',
  styleUrls: ['./scorequery.component.css']
})
export class ScorequeryComponent implements OnInit {
  constructor(public router: Router, private studentservice: StudentService) { }
  isCollapsed = true;
  courseinfo: SelectCourse[] = [];
  student: Student[] = [];
  coursedetail: Coursedetail[] = [];
  course: Course[] = [];
  DisplayData: any ;
  DisplayData2: any ;
  searchValue = '';
  searchValue2 = '';
  searchValue3 = '';
  searchValue4 = '';
  searchValue5 = '';
  visible = false;
  visible2 = false;
  visible3 = false;
  visible4 = false;
  visible5 = false;
  loading = true;
  column1: ColumnItem = {
    name : '专业',
    filterMultiple : true,
    listOfFilter: [
      { text: '金融学', value: '金融学'},
      { text: '国际经济与贸易', value: '国际经济与贸易'},
      { text: '信息管理与信息系统', value: '信息管理与信息系统'},
      { text: '市场营销学', value: '市场营销学'},
      { text: '会计学', value: '会计学'}
    ],
    filterFn: (list: string[], item: Student) => list.some(name => item.major.indexOf(name) !== -1)
  };
  search() {
    this.reset();
    this.visible = false;
    this.DisplayData = this.DisplayData.filter((item: Coursedetail) => item.courseid.indexOf(this.searchValue) !== -1);
  }
  search2() {
    this.reset();
    this.visible = false;
    this.DisplayData = this.DisplayData.filter((item: Coursedetail) => item.coursename.indexOf(this.searchValue2) !== -1);
  }
  search3() {
    this.reset();
    this.visible = false;
    this.DisplayData = this.DisplayData.filter((item: Coursedetail) => item.name.indexOf(this.searchValue3) !== -1);
  }
  search4() {
    this.reset();
    this.visible = false;
    this.DisplayData = this.DisplayData.filter((item: Coursedetail) => item.class.indexOf(this.searchValue4) !== -1);
  }
  reset(): void {
    this.DisplayData = this.DisplayData2;
  }
  getSelectinfo() {
    return new Promise((resolve) => {
      this.studentservice.getSelectinfo().subscribe(
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
      }
    );
  }
  getStudents() {
    return new Promise((resolve) => {
        this.studentservice.getStudents().subscribe(
          (res) => {
            res.data.forEach(row => {
              this.student.push( {
                birthday: row.birthday,
                class: row.class,
                major: row.major,
                name: row.name,
                native_place: row.native_place,
                sex: row.sex,
                stuid: row.stuid,
                time_of_enrollment: row.time_of_enrollment,
                }
              );
            });
            resolve(res);
          }
        );
      }
    );
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
                  type: row.type
                }
              );
            });
            resolve(res);
          }
        );
      }
    );
  }
  async getCoursedetail() {
    await this.getStudents();
    await this.getSelectinfo();
    await this.getcourseinfo();
    for (const i in this.courseinfo) {
      for (const j in this.student) {
        if (this.student[j].stuid === this.courseinfo[i].stuid) {
          for (const k in this.course) {
            if (this.course[k].courseid === this.courseinfo[i].courseid){
              this.coursedetail.push( {
                courseid: this.courseinfo[i].courseid,
                coursename: this.course[k].coursename,
                name: this.student[j].name,
                major: this.student[j].major,
                class: this.student[j].class,
                score: this.courseinfo[i].score,
                stuid: this.courseinfo[i].stuid,
              });
              break;
            }
          }
        }
      }
    }
    this.DisplayData = this.coursedetail;
    this.DisplayData2 = this.coursedetail;
    this.loading = false;
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('');
  }
  ngOnInit(): void {
    this.getCoursedetail();
  }
}
