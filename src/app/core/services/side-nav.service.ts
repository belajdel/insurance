import { Injectable } from '@angular/core';
import {TokenStorageService} from "./token-storage.service";
import {Role} from "../../public/enum/Role";

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  constructor(private tokenStorageService:TokenStorageService) {
  }

  private actualRole=this.tokenStorageService.getUser().role
  private readonly Role=Role
  admin_access=this.actualRole===this.Role.Admin
  user_access=this.actualRole===this.Role.User
  director_access=this.actualRole===this.Role.Director
  finance_access=this.actualRole===this.Role.Finance
  all_access=this.admin_access||this.director_access||this.finance_access||this.user_access
  NavbarData=[
    {
      routerLink:'/dashboard/home',
      Label:"الرئيسية",
      Icon:'dashboard',
      access:  this.all_access

    },
    {
      routerLink:'/dashboard/offices',
      Label:"المكاتب",
      Icon:'maps_home_work',
      access:this.admin_access
    },
    {
      routerLink:'/dashboard/users',
      Label:"المستخدمين",
      Icon:'manage_accounts',
      access:this.admin_access || this.director_access
    },
    {
      routerLink:'/dashboard/obligatoryInsurances',
      Label:"تأمين إجباري",
      Icon:'priority_high',
      access:this.admin_access || this.director_access
    },
    {
      routerLink:'/dashboard/travelInsurances',
      Label:"تأمين المسافرين",
      Icon:'flight',
      access:this.admin_access || this.director_access
    },
    {
      routerLink:'/dashboard/healthInsurances',
      Label:"تأمين صحي",
      Icon:'medical_information',
      access:this.admin_access || this.director_access
    },
    {
      routerLink:'/dashboard/thirdInsurance',
      Label:"تأمين طرف ثالث",
      Icon:'emoji_transportation',
      access:this.admin_access || this.director_access
    },
  ]
  ngOnInit(){
  }
}
