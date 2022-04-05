import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Stu } from '../stu';
@Injectable()


export  class LoginAuth implements  CanActivate {

  constructor(public  router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const userStr = sessionStorage.getItem('user');
      const user: Stu = JSON.parse(userStr);
      if (user && user.stuid) {
        console.log('路由守卫验证通过!');
        return true;
      } else {
        console.log('路由守卫验证失败!');
        alert('请先登录');
        this.router.navigateByUrl('');
        return false;
      }
    }
}


