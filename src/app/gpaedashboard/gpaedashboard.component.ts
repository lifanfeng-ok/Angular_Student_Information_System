import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StudentService} from '../student.service';
import { EChartOption, EChartsLoadingOption, ECharts } from 'echarts';
import {Student, Data, Year, SelectCourse, Course, Courseinfo, Studentcourse, GPAinfo, ColumnItem} from '../stu';

@Component({
  selector: 'app-gpaedashboard',
  templateUrl: './gpaedashboard.component.html',
  styleUrls: ['./gpaedashboard.component.css']
})
export class GPAedashboardComponent implements OnInit {

  constructor(public router: Router, private studentservice: StudentService) { }
  isCollapsed = true;
  course: Course[] = [];
  course2: Course;
  GPAlist: number[] = [];
  datalist: number[] = [];
  datalist2: string[] = [];
  datalist3: number[] = [];
  courseinfo: Courseinfo[] = [];
  courseGpa: {[key: string]: number} = {};
  coursenumber: {[key: string]: number} = {};
  selectcourse: SelectCourse[] = [];
  selectcourse2: SelectCourse[] = [];
  studentcourses: Studentcourse[] = [];
  students: Student[] = [];
  Gradepoint = 0;
  creditsum = 0;
  GPA: number;
  gpa: number;
  Gpainfo: GPAinfo[] = [];
  major: string[] = ['金融学', '国际经济与贸易', '信息管理与信息系统', '市场营销学', '会计学'];
  majorGPA: number[] = [0 , 0 , 0, 0, 0];
  majornum: number[] = [0 , 0, 0 , 0, 0];
  GPAdistribution: number[] = [0, 0, 0, 0, 0];
  GPAclassification: string[] = ['绩点位于3.5~5的人数', '绩点位于3~3.5的人数', '绩点位于2.5~3的人数', '绩点位于2~2.5的人数', '绩点<2的人数' ];
  chartOpt: ECharts;
  chartOpt2: ECharts;
  chartOpt3: ECharts;
  chartOpt4: ECharts;
  data: Data[] = [];
  colors = ['#003366', '#675bba', '#675bba'];
  colors2 = ['#003333', '#CC9966' ];
  i = 0;
  FailNumber: {[key: string]: number} = {金融学: 0, 国际经济与贸易: 0, 信息管理与信息系统: 0, 市场营销学: 0, 会计学: 0};
  Failnumber: number[] = [];
  chartOption = {
    title: {
      text: '各专业平均绩点',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['bar']},
        restore: {show: true},
      }
    },
    legend: {
      data: ['专业平均绩点', '专业人数'],
      right: '15%',
    },
    xAxis: [
      {
        type: 'category',
        data: this.major,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '专业平均绩点',
        min: 0,
        max: 5,
        axisLabel: {
          formatter: '{value} '
        }
      },
      {
        type: 'value',
        name: '专业人数',
        min: 0,
        max: 300,
        axisLabel: {
          formatter: '{value} 人'
        }
      }
    ],
    series: [
      {
        name: '专业平均绩点',
        type: 'line',
        data: this.majorGPA
      },
      {
        name: '专业人数',
        type: 'line',
        yAxisIndex: 1,
        data: this.majornum
      }
    ]
  };
  chartOption2 = {
    title: {
      text: '学院绩点分布情况',
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
  chartOption3 = {
    color: this.colors2,
    title: {
      text: '学院各专业挂科情况',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    toolbox: {
      feature: {
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line']},
        restore: {show: true},
      }
    },
    legend: {
      data: [ '挂科人数', '专业人数'],
      left: 'left'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'value'
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        data: this.major
      }
    ],
    series: [
      {
        name: '专业人数',
        type: 'bar',
        label: {
          show: true
        },
        data: this.majornum,
      },
      {
        name: '挂科人数',
        type: 'bar',
        label: {
          show: true,
        },
        data: this.Failnumber
      }
    ]
  };
  chartOption4: EChartOption = {
    color: this.colors,
    title: {
      text: '平均绩点前10的课程',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999'
        }
      }
    },
    toolbox: {
      feature: {
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    legend: {
      data: ['平均绩点', '选课人数'],
      left: 'left'
    },
    xAxis: [
      {
        type: 'category',
        data: this.datalist2 ,
        axisPointer: {
          type: 'shadow'
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '平均绩点',
        axisLabel: {
          formatter: '{value} '
        }
      },
      {
        type: 'value',
        name: '选课人数',
        axisLabel: {
          formatter: '{value} 人'
        }
      }
    ],
    series: [
      {
        name: '平均绩点',
        type: 'bar',
        data: this.datalist
      },
      {
        name: '选课人数',
        type: 'line',
        yAxisIndex: 1,
        data: this.datalist3
      }
    ]
  };
  onChartInit(event) {
    this.chartOpt = event;
    this.chartOpt.showLoading();
  }
  onChartInit2(event) {
    this.chartOpt2 = event;
    this.chartOpt2.showLoading();
  }
  onChartInit3(event) {
    this.chartOpt3 = event;
    this.chartOpt3.showLoading();
  }
  onChartInit4(event) {
    this.chartOpt4 = event;
    this.chartOpt4.showLoading();
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
  async getstudents2() {
    await this.getselectinfo();
    await this.getcourseinfo();
    for (const i in this.selectcourse) {
      for (const j in this.course) {
        if (this.course[j].courseid === this.selectcourse[i].courseid) {
          this.course2 = this.course[j];
        }
      }
      this.courseinfo.push({
        courseid: this.selectcourse[i].courseid,
        coursename: this.course2.coursename,
        credit: this.course2.credit,
        score: this.selectcourse[i].score,
        type: this.course2.type,
        stuid: this.selectcourse[i].stuid
      });
    }
    for (const i in this.courseinfo) {
      if (!this.courseGpa.hasOwnProperty(this.courseinfo[i].coursename)) {
        this.courseGpa[this.courseinfo[i].coursename] = 0;
        this.coursenumber[this.courseinfo[i].coursename] = 0;
      }
      if (this.courseinfo[i].score > 60) {
        this.courseGpa[this.courseinfo[i].coursename] = this.courseGpa[this.courseinfo[i].coursename] +
          (this.courseinfo[i].score / 10 - 5);
        this.coursenumber[this.courseinfo[i].coursename] =  this.coursenumber[this.courseinfo[i].coursename] +
          1; } else {
        this.coursenumber[this.courseinfo[i].coursename] = this.coursenumber[this.courseinfo[i].coursename] +
          1; }
    }
    for (const i in this.courseGpa) {
      this.courseGpa[i] = this.courseGpa[i] / this.coursenumber[i];
    }
    for (const i in this.courseGpa) {
      this.GPAlist.push(this.courseGpa[i]);
    }
    // console.log(this.GPAlist);
    this.GPAlist.sort();
    this.GPAlist = this.GPAlist.slice(this.GPAlist.length - 10, this.GPAlist.length);
    for (const i in this.GPAlist) {
      for (const j in this.courseGpa) {
        if (this.GPAlist[i] === this.courseGpa[j]) {
          this.datalist.push(this.GPAlist[i]);
          this.datalist2.push(j);
          this.datalist3.push(this.coursenumber[j]);
          break;
        }
      }
    }
    this.chartOpt4.setOption(this.chartOption4);
    this.chartOpt4.hideLoading();
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
    for (const i in this.Gpainfo) {
      for (const j in this.major) {
        if (this.Gpainfo[i].major === this.major[j]) {
          this.majorGPA[j] = this.majorGPA[j] + this.Gpainfo[i].GPA ;
          this.majornum[j] = this.majornum[j] + 1 ;
          break;
        }
      }
    }
    for (const i in this.majorGPA) {
      this.majorGPA[i] = this.majorGPA[i] / this.majornum[i];
    }
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
    while ( this.i <= 999) {
      for (const j in this.selectcourse) {
        if (this.students[this.i].stuid === this.selectcourse[j].stuid) {
          if (this.selectcourse[j].score < 60) {
            this.FailNumber[this.students[this.i].major] += 1;
            break;
          }
        }
      }
      this.i += 1;
    }
    for (const i in this.FailNumber) {
      this.Failnumber.push(this.FailNumber[i]);
    }
    // @ts-ignore
    this.chartOpt.setOption(this.chartOption);
    this.chartOpt.hideLoading();
    // @ts-ignore
    this.chartOpt2.setOption(this.chartOption2, true);
    this.chartOpt2.hideLoading();
    // @ts-ignore
    this.chartOpt3.setOption(this.chartOption3);
    this.chartOpt3.hideLoading();
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
    this.getstudents2();
  }

}
