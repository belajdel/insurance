import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  buerau:any;
  user_name:any
  numero_strcture:any
  todayDate:any
  afterDate:any
  numero_serie:any
  numero_card:any
  show:boolean=false

  total:any;
  payer:any;
  rester:any

  user:any="مالية"
  constructor () {}
  calculer_rester(){
    this.rester=this.total-this.payer
  }
  ngOnInit() {
    // Initialization logic that doesn't depend on the DOM
  }
  search(){
    this.show=true
  }
}
