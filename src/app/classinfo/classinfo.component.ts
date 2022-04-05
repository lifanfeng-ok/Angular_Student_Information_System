import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../student.service';
import {Course, Data, GPAinfo, SelectCourse, Student, Studentcourse , Failnumber, Excellentnumber} from '../stu';
import {ECharts} from 'echarts';

@Component({
  selector: 'app-classinfo',
  templateUrl: './classinfo.component.html',
  styleUrls: ['./classinfo.component.css']
})
export class ClassinfoComponent implements OnInit {

  constructor(public router: Router, private studentservice: StudentService, private route: ActivatedRoute) { }
  isCollapsed = true;
  class: string = this.route.snapshot.paramMap.get('class');
  course: Course[] = [];
  selectcourse: SelectCourse[] = [];
  students: Student[] = [];
  data: Data[] = [];
  failnumberdata: Failnumber = { stuid: null, name: '', class: '', failnumber: null} ;
  excellentnumberdata: Excellentnumber = {stuid: null, name: '', class: '', excellentnumber: null};
  failmax: number;
  excellentmax: number;
  selectcourse2: SelectCourse[] = [];
  studentcourses: Studentcourse[] = [];
  gpa: number;
  Gpainfo: GPAinfo[] = [];
  studentsnumber: number;
  Gradepoint = 0;
  creditsum = 0;
  GPA: number;
  loading = true;
  GPAdistribution: number[] = [0, 0, 0, 0, 0];
  GPAclassification: string[] = ['绩点位于3.5~5的人数', '绩点位于3~3.5的人数', '绩点位于2.5~3的人数', '绩点位于2~2.5的人数', '绩点<2的人数' ];
  failnumber: {[key: number]: number} = {};
  excellentnumber: {[key: number]: number} = {};
  failnumberList: number[] = [];
  excellentnumberList: number[] = [];
  chartOpt: ECharts;
  chartOption = {
    title: {
      text: '班级绩点分布情况',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}人 ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: this.GPAclassification
    },
    series: [
      {
        name: '绩点分布情况',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: this.data
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
  async getGPAdistribution() {
    await this.getallstudents();
    await this.getcourseinfo();
    await this.getselectinfo();
    for (const i in this.students) {
       if (this.students[i].class === this.class) {
         if (!this.failnumber.hasOwnProperty(this.students[i].stuid))  {
           this.failnumber[this.students[i].stuid] = 0;
           this.excellentnumber[this.students[i].stuid] = 0;
         }
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
       }
    this.studentsnumber = this.Gpainfo.length;
    for (const i in this.Gpainfo) {
      if (this.Gpainfo[i].GPA > 3.5) {
        this.GPAdistribution[0] = this.GPAdistribution[0] + 1;
      } else {
        if (this.Gpainfo[i].GPA > 3) {
          this.GPAdistribution[1] = this.GPAdistribution[1] + 1;
        }  else {
          if (this.Gpainfo[i].GPA > 2.5) {
            this.GPAdistribution[2] = this.GPAdistribution[2] + 1;
          }  else  {
            if (this.Gpainfo[i].GPA > 2) {
              this.GPAdistribution[3] = this.GPAdistribution[3] + 1;
            }   else {
              this.GPAdistribution[4] = this.GPAdistribution[4] + 1;
            }
          }
        }
      }
    }
    for (const i in this.GPAdistribution) {
      this.data.push({
        value: this.GPAdistribution[i],
        name: this.GPAclassification[i]
      });
    }
    for (const i in this.failnumber) {
       for (const j in this.selectcourse) {
         if (this.selectcourse[j].stuid === Number(i) && this.selectcourse[j].score < 60) {
           this.failnumber[i] += 1 ;
         }
         if (this.selectcourse[j].stuid === Number(i) && this.selectcourse[j].score > 90) {
           this.excellentnumber[i] += 1;
         }
       }
    }
    console.log(this.GPAdistribution);
    console.log(this.failnumber);
    console.log(this.excellentnumber);
    for (const k in this.failnumber) {
       this.failnumberList.push(this.failnumber[k]);
    }
    for (const i in this.excellentnumber) {
      this.excellentnumberList.push(this.excellentnumber[i]);
    }
    this.failnumberList.sort();
    this.excellentnumberList.sort();
    this.failmax = this.failnumberList[this.failnumberList.length - 1];
    this.excellentmax = this.excellentnumberList[this.excellentnumberList.length - 1];
    for (const j in this.failnumber) {
               if (this.failmax === this.failnumber[j] ) {
                 for (const k in this.students) {
                    if (Number(j) === this.students[k].stuid) {
                      this.failnumberdata = {
                        stuid: Number(j),
                      name: this.students[k].name,
                     class: this.students[k].class,
                      failnumber: this.failmax,
                      };
                    }
                 }
               }
             }
    for (const k in this.excellentnumber) {
        if (this.excellentmax === this.excellentnumber[k]) {
          for (const j in this.students) {
            if (this.students[j].stuid === Number(k)) {
              this.excellentnumberdata = {
                stuid: Number(k),
                name: this.students[j].name,
                class: this.students[j].class,
                excellentnumber: this.excellentmax
              };
            }
          }
        }
    }
    console.log(this.failnumberdata);
    console.log(this.excellentnumberdata);
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
    logout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('');
  }
  ngOnInit(): void {
    this.getGPAdistribution();
  }

}
