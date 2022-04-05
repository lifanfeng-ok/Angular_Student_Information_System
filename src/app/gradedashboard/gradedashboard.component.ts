import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StudentService} from '../student.service';
import { EChartOption, EChartsLoadingOption, ECharts } from 'echarts';
import {Student, Data, Year, SelectCourse, Course, Courseinfo, Studentcourse, GPAinfo, ColumnItem} from '../stu';
@Component({
  selector: 'app-gradedashboard',
  templateUrl: './gradedashboard.component.html',
  styleUrls: ['./gradedashboard.component.css']
})
export class GradedashboardComponent implements OnInit {

  constructor(public router: Router, private studentservice: StudentService) { }
  isCollapsed = true;
  course: Course[] = [];
  selectcourse: SelectCourse[] = [];
  selectcourse2: SelectCourse[] = [];
  studentcourses: Studentcourse[] = [];
  students: Student[] = [];
  DisplayData2: any ;
  DisplayData3: any ;
  Gradepoint = 0;
  creditsum = 0;
  GPA: number;
  gpa: number;
  Gpainfo: GPAinfo[] = [];
  visible = false;
  searchValue = '';
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
    filterFn: (list: string[], item: GPAinfo) => list.some(name => item.major.indexOf(name) !== -1)
  };
  column2: ColumnItem = {
    name : '平均学分绩点',
    sortOrder: null,
    sortFn: (a: GPAinfo, b: GPAinfo) => a.GPA - b.GPA
  };
  search() {
    this.reset();
    this.visible = false;
    this.DisplayData2 = this.DisplayData2.filter((item: GPAinfo) => item.name.indexOf(this.searchValue) !== -1);
  }
  reset(): void {
    this.DisplayData2 = this.DisplayData3;
  }
  getallstudents() {
    return new Promise((resolve) => {
      this.studentservice.getStudents().subscribe(
        (res) => {
          res.data.forEach(row => {
            this.students.push( {
                birthday : row.birthday,
                class : row.class,
                major : row.major,
                name : row.name,
                native_place : row.native_place,
                sex : row.sex,
                stuid : row.stuid,
                time_of_enrollment : row.time_of_enrollment
              }
            );
          });
          resolve(res);
        }
      );
    });
  }
  getselectinfo() {
    return new Promise((resolve) => {
      this.studentservice.getSelectinfo().subscribe(
        (res) => {
          res.data.forEach(row => {
            this.selectcourse.push( {
                courseid : row.courseid,
                score : row.score,
                stuid : row.stuid
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
  async getallGPA() {
    await this.getallstudents();
    await this.getselectinfo();
    await this.getcourseinfo();
    for (const i in this.students) {
      for (const j in this.selectcourse) {
        if (this.students[i].stuid === this.selectcourse[j].stuid) {
          this.selectcourse2.push({
            courseid : this.selectcourse[j].courseid,
            score : this.selectcourse[j].score,
            stuid : this.selectcourse[j].stuid
          });
        }}
      for (const m in this.selectcourse2) {
        for (const n in this.course) {
          if (this.course[n].courseid === this.selectcourse2[m].courseid) {
            this.studentcourses.push( {
              Courseid: this.selectcourse2[m].courseid,
              coursename: this.course[n].coursename,
              credit: this.course[n].credit,
              type: this.course[n].type,
              score: this.selectcourse2[m].score,
              gradepoint: this.selectcourse2[m].score / 10 - 5
            });
            break;
          }
        }
      }
      this.gpa = this.getGPA(this.studentcourses);
      this.Gpainfo.push({
        stuid : this.students[i].stuid,
        name : this.students[i].name,
        major : this.students[i].major,
        class : this.students[i].class,
        GPA : this.gpa
      });
      this.selectcourse2 = [];
      this.studentcourses = [];
    }
    this.DisplayData2 = this.Gpainfo;
    this.DisplayData3 = this.Gpainfo;
    this.loading = false;
  }
  getGPA(data): number {
    for (const i in data) {
      if (data[i].score < 60) {
        this.creditsum = this.creditsum + data[i].credit;
      } else {
        this.Gradepoint = this.Gradepoint + ((data[i].score) / 10 - 5) * data[i].credit;
        this.creditsum = this.creditsum + data[i].credit;
      }
    }
    this.GPA = this.Gradepoint / this.creditsum;
    this.Gradepoint = 0;
    this.creditsum = 0;
    return this.GPA;
  }
  logout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('');
  }
  ngOnInit(): void {
    this.getallGPA();
  }

}
