import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../student.service';
import { EChartOption, EChartsLoadingOption, ECharts } from 'echarts';
import {Student, Coursedetail2, Data, Year, SelectCourse, Course, Courseinfo, Studentcourse, GPAinfo, ColumnItem} from '../stu';
@Component({
  selector: 'app-courseinfo',
  templateUrl: './courseinfo.component.html',
  styleUrls: ['./courseinfo.component.css']
})
export class CourseinfoComponent implements OnInit {

  constructor(public router: Router, private studentservice: StudentService, private route: ActivatedRoute) { }
  isCollapsed = true;
  courseid: string = this.route.snapshot.paramMap.get('courseid');
  course: Course[] = [];
  selectcourse: SelectCourse[] = [];
  students: Student[] = [];
  coursedetail: Coursedetail2[] = [];
  major: string[] = ['金融学', '国际经济与贸易', '信息管理与信息系统', '市场营销学', '会计学'];
  selectnumber: number[] = [0, 0, 0, 0, 0];
  majoraverage: number[] = [0, 0, 0, 0, 0];
  scorearray: number[] = [] ;
  scoredistribution: {[key: string]: number[]} = {金融学: [], 国际经济与贸易: [], 信息管理与信息系统: [], 市场营销学: [], 会计学: []};
  maxscore: number ;
  minscore: number ;
  maxscore1: number[] = [];
  minscore1: number[] = [];
  average: number ;
  coursename: string;
  loading = true;
  sum = 0;
  j = 0;
  chartOpt: ECharts;
  colors = ['#5793f3', '#d14a61', '#675bba', '#D7DA8B'];
  chartOption = {
    color: this.colors,
    title: {
      text: '各专业在本门课的成绩分析图',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid: {
      right: '20%'
    },
    toolbox: {
      feature: {
        dataView: {show: true, readOnly: false},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    legend: {
      data: ['选课人数', '平均分', '最高分', '最低分'],
      left: 'left'
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        data: this.major
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '选课人数',
        position: 'right',
        axisLine: {
          lineStyle: {
            color: this.colors[0]
          }
        },
        axisLabel: {
          formatter: '{value} 人'
        }
      },
      {
        type: 'value',
        name: '分数',
        min: 0,
        max: 100,
        position: 'left',
        axisLine: {
          lineStyle: {
            color: this.colors[2]
          }
        },
        axisLabel: {
          formatter: '{value} 分'
        }
      }
    ],
    series: [
      {
        name: '选课人数',
        type: 'bar',
        data:  this.selectnumber,
      },
      {
        name: '平均分',
        type: 'line',
        yAxisIndex: 1,
        data: this.majoraverage,
      },
      {
        name: '最高分',
        type: 'line',
        yAxisIndex: 1,
        data: this.maxscore1,
      },
      {
        name: '最低分',
        type: 'line',
        yAxisIndex: 1,
        data: this.minscore1,
      },
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
  async getcoursedetailinfo() {
        await this.getallstudents();
        await this.getcourseinfo();
        await this.getselectinfo();
        for (const i in this.selectcourse) {
            if (this.courseid === this.selectcourse[i].courseid) {
                for ( const j in this.students) {
                   if (this.selectcourse[i].stuid === this.students[j].stuid) {
                       for (const k in this.course) {
                          if (this.selectcourse[i].courseid === this.course[k].courseid) {
                            this.coursedetail.push( {
                              stuid : this.selectcourse[i].stuid,
                              major : this.students[j].major,
                              courseid : this.selectcourse[i].courseid,
                              coursename : this.course[k].coursename,
                              score : this.selectcourse[i].score
                            });
                          }
                       }
                   }
                }
            }
        }
        for (const m in this.coursedetail) {
            for (const j in this.major) {
               if (this.coursedetail[m].major === this.major[j]) {
                  this.selectnumber[j] += 1 ;
                  this.majoraverage[j] += this.coursedetail[m].score;
                  this.scoredistribution[this.major[j]].push(this.coursedetail[m].score);
               }
            }
            this.sum += this.coursedetail[m].score;
            this.scorearray.push(this.coursedetail[m].score);
        }
        for (const k in this.majoraverage) {
          this.majoraverage[k] = this.majoraverage[k] / this.selectnumber[k];
        }
        for (const i in this.scoredistribution) {
             this.scoredistribution[i] = this.bubbleSort(this.scoredistribution[i]);
             this.maxscore1[this.j] = this.scoredistribution[i][this.scoredistribution[i].length - 1];
             this.minscore1[this.j] = this.scoredistribution[i][0];
             this.j += 1;
        }
        this.coursename = this.coursedetail[0].coursename;
        this.average = this.sum / this.scorearray.length;
        this.scorearray = this.bubbleSort(this.scorearray);
        this.minscore = this.scorearray[0];
        this.maxscore = this.scorearray[this.scorearray.length - 1];
        this.loading = false;
    // @ts-ignore
        this.chartOpt.setOption(this.chartOption);
        this.chartOpt.hideLoading();
  }
  logout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('');
  }
  ngOnInit(): void {
    this.getcoursedetailinfo();
  }

}
