import { Component } from '@angular/core';
import {Debt} from "../../../public/models/debt.model";
import {DebtService} from "../../../core/services/debt.service";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../../core/services/token-storage.service";

@Component({
  selector: 'app-demande-payment',
  templateUrl: './demande-payment.component.html',
  styleUrls: ['./demande-payment.component.css']
})
export class DemandePaymentComponent {
  debt=new Debt()
  show:boolean=false
  recentPaidedAmount:number=0

  constructor (private debtService:DebtService,private router:Router,private tokenStorageService:TokenStorageService) {}
  calculer_reste(){
    this.debt.remainingAmount=this.debt.total-(this.debt.paidAmount+this.recentPaidedAmount)
  }

  getRecenetPaidAmount(){
    const data={
      startDate:this.debt.startDate,
      endDate:this.debt.endDate,
    }
    this.debtService.SearchPaidDebtsBetween(data).subscribe(
      (data) => {
        this.recentPaidedAmount = data
        this.debt.remainingAmount=this.debt.total-this.recentPaidedAmount
      },
      (err) => {
        console.log(err)
      }
    )
  }


  ngOnInit() {
    this.debt.startDate=history.state?.startDate
    this.debt.endDate=history.state?.endDate
    this.debt.total=history.state?.total
    this.getRecenetPaidAmount()

  }

  addPayment(){
    this.debt.bureauId=this.tokenStorageService.getUser().bureauId
    this.debtService.createDebt(this.debt).subscribe({
      next: () => {
        this.show=true
        this.router.navigate(['/RapportTous'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
