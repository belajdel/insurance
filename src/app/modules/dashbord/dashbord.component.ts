import { Component } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../core/services/token-storage.service";
import {Role} from "../../public/enum/Role";
import { UserService } from 'src/app/core/services/user.service';
import {SideNavToggle} from "../../public/shared/side-nav-toggle";


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class dashbordComponent {
  //user:any="موظف"
  //user:any="مالي"
  user=this.tokenStorageService.getUser().role
  protected readonly Role = Role;
  isLoading = false;
  //user:any="مدير مكتب"
  isSideNavCollapsed= false;
  screenWidth=0;

  constructor(private authService:AuthService,private tokenStorageService:TokenStorageService,private router:Router,private service: UserService ) { }

  /*logout(){
    this.isLoading = true;
    this.authService.logout().subscribe((res)=>{
      this.tokenStorageService.deleteToken()
      this.isLoading = false;
      this.router.navigate(['/login']);
    })
  }*/

  actualUser=this.tokenStorageService.getUser()

  onToggleSideNav(data:SideNavToggle){
    this.screenWidth=data.screenWidth
    this.isSideNavCollapsed=data.collapsed
  }

}
