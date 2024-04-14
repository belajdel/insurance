import {Component, EventEmitter, Output} from '@angular/core';
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {SideNavService} from "../../../core/services/side-nav.service";
import {SideNavToggle} from "../../shared/side-nav-toggle";
import {CommonModule} from "@angular/common";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: 'app-side-navbar',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, RouterLink, MatIconModule, MatDividerModule, RouterLinkActive],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent {
  @Output() onToggleSideNav : EventEmitter<SideNavToggle>=new EventEmitter();
  collapsed=false
  screenWidth = 0

  constructor(private authService:AuthService,private tokenStorageService:TokenStorageService,private router:Router,readonly sideNavService:SideNavService) {

  }



  ngOnInit(): void {

    this.sideNavService.NavbarData=this.sideNavService.NavbarData.filter((data)=>data.access)
    this.screenWidth=window.innerWidth

  }


 logout(){
     this.authService.logout().subscribe((res)=>{
       this.tokenStorageService.deleteToken()
       this.router.navigate(['/login']);
     })

  }

  toggleCollapse(){
    this.collapsed = !this.collapsed
    this.onToggleSideNav.emit({screenWidth:this.screenWidth,collapsed:this.collapsed})
  }
  sideNavClosed(){
    this.collapsed=false
    this.onToggleSideNav.emit({screenWidth:this.screenWidth,collapsed:this.collapsed})
  }
}
