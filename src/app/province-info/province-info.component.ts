import { Component, OnInit } from '@angular/core';
import {Course, Data, GPAinfo, SelectCourse, Student, Studentcourse} from '../stu';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../student.service';
import ECharts = echarts.ECharts;

@Component({
  selector: 'app-province-info',
  templateUrl: './province-info.component.html',
  styleUrls: ['./province-info.component.css']
})
export class ProvinceInfoComponent implements OnInit {

  constructor(public router: Router, private studentservice: StudentService, private route: ActivatedRoute) { }
  course: Course[] = [];
  selectcourse: SelectCourse[] = [];
  selectcourse2: SelectCourse[] = [];
  studentcourses: Studentcourse[] = [];
  students: Student[] = [];
  Gradepoint = 0;
  creditsum = 0;
  gpa: number;
  GPA: number;
  j = 0;
  f = 0;
  isCollapsed = true;
  province: string = this.route.snapshot.paramMap.get('province');
  major: string[] = ['金融学', '国际经济与贸易', '信息管理与信息系统', '市场营销学', '会计学'];
  numberofmajor: number[] = [0, 0, 0, 0, 0];
  gpadistribution: {[key: string]: number[]} = {金融学: [], 国际经济与贸易: [], 信息管理与信息系统: [], 市场营销学: [], 会计学: []};
  loading = true;
  maxgpa: number[] = [];
  mingpa: number[] = [];
  array = [1, 2, 3, 4];
  tabs = ['金融学', '国际经济与贸易', '信息管理与信息系统', '市场营销学', '会计学'];
  data: Data[] = [];
  Gpainfo: {[key: string]: GPAinfo[]} = {金融学: [], 国际经济与贸易: [], 信息管理与信息系统: [], 市场营销学: [], 会计学: [] };
  Gpainfo2: {[key: string]: GPAinfo} = {金融学: {
    stuid: null, major: '', name: '', class: '', GPA: null,
    }, 国际经济与贸易: { stuid: null, major: '', name: '', class: '', GPA: null, },
    信息管理与信息系统: { stuid: null, major: '', name: '', class: '', GPA: null, },
    市场营销学: { stuid: null, major: '', name: '', class: '', GPA: null, },
    会计学: { stuid: null, major: '', name: '', class: '', GPA: null, } };
  Gpainfo3: {[key: string]: GPAinfo} = {金融学: {
      stuid: null, major: '', name: '', class: '', GPA: null,
    }, 国际经济与贸易: { stuid: null, major: '', name: '', class: '', GPA: null, },
    信息管理与信息系统: { stuid: null, major: '', name: '', class: '', GPA: null, },
    市场营销学: { stuid: null, major: '', name: '', class: '', GPA: null, },
    会计学: { stuid: null, major: '', name: '', class: '', GPA: null, } };
  chartOpt: ECharts;
  color = ['#003300', '#663300', '#339933', '#CC3333', '#CCCC00'];
  radioValue = 'A';
  chartOption = {
    color: this.color,
    title: {
      text: '各专业人数',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 'right',
      data: this.major
    },
    series: [
      {
        name: '各专业人数',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: this.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  onChartInit(event) {
    this.chartOpt = event;
    this.chartOpt.showLoading();
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
  async getmajornumber() {
    await this.getallstudents();
    await this.getcourseinfo();
    await this.getselectinfo();
    for (const i in this.students) {
        if (this.students[i].native_place === this.province) {
             for (const j in this.major) {
               if (this.students[i].major === this.major[j]) {
                 this.numberofmajor[j] += 1;
               }
             }
        }
    }
    for (const i in this.major) {
      this.data.push( {
        value : this.numberofmajor[i],
        name : this.major[i]
      });
    }
    for (const i in this.students) {
       if (this.students[i].native_place === this.province) {
             for (const j in this.major) {
                 if (this.students[i].major === this.major[j]) {
                   for (const k in this.selectcourse) {
                     if (this.students[i].stuid === this.selectcourse[k].stuid) {
                       this.selectcourse2.push({
                         courseid : this.selectcourse[k].courseid,
                         score : this.selectcourse[k].score,
                         stuid : this.selectcourse[k].stuid
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
                   this.gpadistribution[this.major[j]].push(this.gpa);
                   this.Gpainfo[this.major[j]].push({
                     stuid : this.students[i].stuid,
                     name : this.students[i].name,
                     major : this.students[i].major,
                     class : this.students[i].class,
                     GPA : this.gpa
                   });
                   this.selectcourse2 = [];
                   this.studentcourses = [];
                    }
                 }
             }
       }
    console.log(this.gpadistribution);
    console.log(this.numberofmajor);
    console.log(this.Gpainfo);
    for (const i in this.gpadistribution) {
        this.gpadistribution[i] = this.bubbleSort(this.gpadistribution[i]);
        this.maxgpa[this.j] = this.gpadistribution[i][this.gpadistribution[i].length - 1];
        this.mingpa[this.j] = this.gpadistribution[i][0];
        this.j += 1 ;
    }
    for (const i in this.Gpainfo) {
      for (const k in this.Gpainfo[i]) {
        if (this.Gpainfo[i][k].GPA === this.maxgpa[this.f]) {
          this.Gpainfo2[i] = {
            stuid: this.Gpainfo[i][k].stuid,
            name:  this.Gpainfo[i][k].name,
            major: this.Gpainfo[i][k].major,
            class: this.Gpainfo[i][k].class,
            GPA: this.Gpainfo[i][k].GPA
          };
        }
        if (this.Gpainfo[i][k].GPA === this.mingpa[this.f]) {
          this.Gpainfo3[i] = {
            stuid: this.Gpainfo[i][k].stuid,
            name:  this.Gpainfo[i][k].name,
            major: this.Gpainfo[i][k].major,
            class: this.Gpainfo[i][k].class,
            GPA: this.Gpainfo[i][k].GPA
          };
        }
      }
      this.f += 1;
    }
    // @ts-ignore
    this.chartOpt.setOption(this.chartOption);
    this.chartOpt.hideLoading();
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
  bubbleSort(arr: number[]) {
    let temp: number;
    let tag = true;
    for (let j = 0; tag === true; j++) {
      tag = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1]) {
          temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          tag = true;
        }
      }
    }
    return arr;
  }
  logout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('');
  }
  ngOnInit(): void {
    this.getmajornumber();
  }

}
