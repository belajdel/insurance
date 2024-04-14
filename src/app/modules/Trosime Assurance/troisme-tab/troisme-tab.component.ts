import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ThirdInsuranceService} from "../../../core/services/third-insurance.service";
import {ThirdInsurance} from "../../../public/models/third-insurance.model";
import {TokenStorageService} from "../../../core/services/token-storage.service";
import { Role } from 'src/app/public/enum/Role';

@Component({
  selector: 'app-troisme-tab',
  templateUrl: './troisme-tab.component.html',
  styleUrls: ['./troisme-tab.component.css']
})
export class TroismeTabComponent implements OnInit {
  constructor(private thirdInsuranceService: ThirdInsuranceService, private router: Router,private tokenStorageService:TokenStorageService) {
  }

  public thirdInsurances: ThirdInsurance[] = [];
  protected actualUser=this.tokenStorageService.getUser()
  protected readonly Role = Role
  fetchThirdInsurances() {
    if (this.actualUser.role == Role.User) {
      this.thirdInsuranceService.getThirdInsurancesByUser(this.actualUser.id).subscribe((Response) => {
          this.thirdInsurances = Response;
        }
        , (error) => {
          console.log("error is ", error)
        }
      );
    }
    else if (this.actualUser.role == Role.Director) {
      this.thirdInsuranceService.getThirdInsurancesByBureau(this.actualUser.bureauId).subscribe((Response) => {
          this.thirdInsurances = Response;
        }
        , (error) => {
          console.log("error is ", error)
        }
      );
    }
    else{
      this.thirdInsuranceService.getThirdInsurances().subscribe((Response) => {
          this.thirdInsurances = Response;
        }
        , (error) => {
          console.log("eroor is ", error)
        }
      );
    }
  }

  query: string = "";

  search() {
    if (this.query != "") {
      this.thirdInsuranceService.SearchThirdInsurances(this.query).subscribe((Response) => {
          this.thirdInsurances = Response;
        }
        , (error) => {
          console.log("error is ", error)
        }
      );
    } else {
      this.fetchThirdInsurances()
    }
  }

  ngOnInit() {
    this.fetchThirdInsurances()
  }

  delete(id: number) {
    this.thirdInsuranceService.DeletThirdInsurance(id).subscribe((Response) => {
        this.fetchThirdInsurances()
      }, (error) => {
        console.log("eroor is ", error)
      }
    )
  }

  generatePDF(id:number){
    this.thirdInsuranceService.PDFThirdInsurance(id).subscribe((Response)=>{
        const blob = new Blob([Response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      },(error)=>{console.log("eroor is ",error)}
    )
  }
}
