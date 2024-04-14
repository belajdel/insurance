import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {AssuranceObligatoireService} from "../../../core/services/assurance-obligatoire.service";



@Component({
  selector: 'app-pdf-oblig',
  templateUrl: './pdf-oblig.component.html',
  styleUrls: ['./pdf-oblig.component.css']
})
export class PdfObligComponent implements OnInit{
  initalValue1:number=0;
  taxe1:number=0.5;
  taxe2:number=0.5;
  taxe3:number=0.35;
  taxe4:number=2;
  total:number=0;

  constructor(private AssuranceObligatoireService:AssuranceObligatoireService,private router: Router,private activatedRoute:ActivatedRoute ){
  }
  data:any;
  id:number=0;
  date_now:any;
  ngOnInit(): void {
    this.getdata();
    this.date_now=this.getFormattedDate()
  }
  getFormattedDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getdata(){
    this.id = this.activatedRoute.snapshot.params['id'];
    this.AssuranceObligatoireService.getObligById(this.id).subscribe((Response)=>{
      this.data=Response;
      console.log(this.data)
    }
    ,(error)=>{console.log("eroor is ",error)}
    );
  }
  ngAfterViewInit(){
    //this.makePdf()

  }


  handleExport() {
    const invoiceContentElement=document.getElementById('invoice_container') as HTMLElement;
    html2canvas (invoiceContentElement, {}).then(canvas=>{
    // is convert the canvas into base64 string url
    const imgData=canvas.toDataURL('image/png');
    // page width
    const pageWidth=210;
    const pageHeight=297;
    // calcuate the image actual height to fit with canvas and pdf
    const height=canvas.height*pageWidth/canvas.width;
    // initialize the PDF
    const pdf=new jsPDF ("p", "mm","a4");
    // add the image into pdf
    pdf.addImage(imgData, 'PNG',0,0,pageWidth, height);
    pdf.save('invoice.pdf');
    })
    }



}



