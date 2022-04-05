import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StudentService} from '../student.service';
import {Student, Data, Year, SelectCourse, Course, Courseinfo} from '../stu';
import { EChartOption, EChartsLoadingOption, ECharts } from 'echarts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public router: Router, private studentservice: StudentService) { }
  isCollapsed = true;
  students: Student[] = [];
  selectcourse: SelectCourse[] = [];
  course: Course[] = [];
  course2: Course;
  courseinfo: Courseinfo[] = [];
  DisplayData: any ;
  DisplayData2: any ;
  loading = true;
  data: Data[] = [];
  datalist: number[] = [];
  datalist2: string[] = [];
  datalist3: number[] = [];
  province2: string[] = [];
  yeardata: Year[] = [];
  GPAlist: number[] = [];
  j = 0;
  yearnumber: number[][] = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]] ;
  major: string[] = ['金融学', '国际经济与贸易', '信息管理与信息系统', '市场营销学', '会计学'];
  province: {[key: string]: number} = {};
  courseGpa: {[key: string]: number} = {};
  coursenumber: {[key: string]: number} = {};
  numbermale: number[] = [0, 0, 0, 0, 0];
  numberfemale: number[] = [0, 0, 0, 0, 0];
  sexratio: number[] = [0, 0 , 0, 0 , 0];
  colors = ['#003366', '#99CC33', '#675bba'];
  colors2 = ['#0000FF', '#9933CC', '#000000', '#990066', '#9999CC'];
  chartOpt: ECharts;
  chartOpt2: ECharts;
  chartOpt3: ECharts;
  chartOpt4: ECharts;
  chartOption: EChartOption = {
    color: this.colors2,
    title: {
      text: '学生出生年份分布',
      left: 'center'
    },
    legend: {left: 'left'},
    tooltip: {},
    dataset: {
      dimensions: ['product', '1996年', '1997年', '1998年', '1999年', '2000年'],
      source: this.yeardata,
    },
    xAxis: {type: 'category'},
    yAxis: {},
    series: [
      {type: 'bar'},
      {type: 'bar'},
      {type: 'bar'},
      {type: 'bar'},
      {type: 'bar'}
    ]
  };
  chartOption2: EChartOption = {
  title: {
    text: '学生籍贯分布',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    // top: 'middle',
    type: 'scroll',
    right: 10,
    top: 20,
    bottom: 20,
    data: this.province2,
  },
  series: [
    {
      type: 'pie',
      radius: '65%',
      center: ['50%', '50%'],
      selectedMode: 'single',
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
  chartOption4 = {
    color: this.colors,
    title: {
      text: '各专业性别比',
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
      data: ['男生人数', '女生人数', '性别比'],
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
        name: '人数',
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
        name: '性别比',
        position: 'left',
        axisLine: {
          lineStyle: {
            color: this.colors[2]
          }
        },
        axisLabel: {
          formatter: '{value} '
        }
      }
    ],
    series: [
      {
        name: '男生人数',
        type: 'bar',
        data: this.numbermale
      },
      {
        name: '女生人数',
        type: 'bar',
        data: this.numberfemale
      },
      {
        name: '性别比',
        type: 'line',
        yAxisIndex: 1,
        data: this.sexratio
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
  getdatayear(studentsdata) {
     for (const i in studentsdata) {
       if (studentsdata[i].birthday.slice(0, 4) === '1996') {
              for ( const j in this.major) {
                 if (studentsdata[i].major === this.major[j]) {
                    this.yearnumber[0][j] += 1;
                    break;
                 }
              }
       }
       if (studentsdata[i].birthday.slice(0, 4) === '1997') {
         for ( const j in this.major) {
           if (studentsdata[i].major === this.major[j]) {
             this.yearnumber[1][j] += 1;
             break;
           }
         }
       }
       if (studentsdata[i].birthday.slice(0, 4) === '1998') {
         for ( const j in this.major) {
           if (studentsdata[i].major === this.major[j]) {
             this.yearnumber[2][j] += 1;
             break;
           }
         }
       }
       if (studentsdata[i].birthday.slice(0, 4) === '1999') {
         for ( const j in this.major) {
           if (studentsdata[i].major === this.major[j]) {
             this.yearnumber[3][j] += 1;
             break;
           }
         }
       }
       if (studentsdata[i].birthday.slice(0, 4) === '2000') {
         for ( const j in this.major) {
           if (studentsdata[i].major === this.major[j]) {
             this.yearnumber[4][j] += 1;
             break;
           }
         }
       }
     }
     for (const i in this.major) {
       this.yeardata.push(
         {
           product:  this.major[i],
           '1996年': this.yearnumber[0][this.j],
           '1997年': this.yearnumber[1][this.j],
           '1998年': this.yearnumber[2][this.j],
           '1999年': this.yearnumber[3][this.j],
           '2000年': this.yearnumber[4][this.j]
         });
       this.j = this.j + 1;
     }
  }
  getProvinceinfo(studentsdata) {
     for (const i in studentsdata) {
          if (!this.province.hasOwnProperty(studentsdata[i].native_place))  {
            this.province[studentsdata[i].native_place] = 0;
     }
          this.province[studentsdata[i].native_place] = this.province[studentsdata[i].native_place] + 1;
  }
     for ( const k in this.province) {
         this.data.push( {
           value: this.province[k],
           name: k
         });
         this.province2.push(k);
       }
  }
  getsex_proportion(studentsdata) {
     for (const i in studentsdata) {
       if (studentsdata[i].sex === '男') {
         for (const j in this.major) {
           if (studentsdata[i].major === this.major[j]) {
             this.numbermale[j] += 1;
           }
         }
       } else {
          for (const k in this.major) {
            if (studentsdata[i].major === this.major[k]) {
              this.numberfemale[k] += 1 ;
            }
          }
       }
     }
     console.log(this.numbermale);
     console.log(this.numberfemale);
     for (const j in this.major) {
       this.sexratio[j] = this.numbermale[j] / this.numberfemale[j];
     }
     console.log(this.sexratio);
  }

  logout() {
    sessionStorage.removeItem('user');
    this.router.navigateByUrl('');
  }
  getStudents(): void {
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
        this.DisplayData = this.students;
        this.DisplayData2 = this.students;
        this.getdatayear(this.students);
        this.getProvinceinfo(this.students);
        this.getsex_proportion(this.students);
        this.chartOpt.setOption(this.chartOption, true);
        this.chartOpt2.setOption(this.chartOption2, true);
        this.chartOpt.hideLoading();
        this.chartOpt2.hideLoading();
        // @ts-ignore
        this.chartOpt4.setOption(this.chartOption4);
        this.chartOpt4.hideLoading();
        this.loading = false;
      } ); }
  ngOnInit(): void {
    this.getStudents();
  }

}
