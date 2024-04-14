
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Bureau} from "../../../public/models/bureau.model";
import {BureauService} from "../../../core/services/bureau.service";
import {User} from "../../../public/models/user.model";
import {FormField} from "../../../public/shared/form-field";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Card} from "../../../public/shared/card";
import {MyForm} from "../../../public/shared/my-form";
import {DialogComponent} from "../../../public/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
@Component({
  selector: 'app-bureau',
  templateUrl: './bureau.component.html',
  styleUrls: ['./bureau.component.scss']
})
export class BureauComponent {
  isLoading = false;
  showPassword = false;
  cards:Card[] =[
    {
      title:"معلومات عن المكتب",
      fields:[
        {
          type: "text",
          label: "إسم المكتب",
          hidden:false,
          readonly:false,
          formControlName: "officeName",
        },
        {
          type: "text",
          label: "عنوان المكتب",
          hidden:false,
          readonly:false,
          formControlName: "officeAddress",
        },
        {
          type: "tel",
          label: "رقم هاتف المكتب",
          hidden:false,
          readonly:false,
          errorsMessages:{
            minLength:'يجب أن يتكون رقم هاتف المكتب من 8 أرقام',
            maxLength:'يجب أن يتكون رقم هاتف المكتب من 8 أرقام'
          },
          formControlName: "officePhone",
        },
      ]
    },
    {
      title:"معلومات عن مدير المكتب",
      fields:[
        {
          type: "text",
          label: "إسم مستخدم المدير",
          hidden:false,
          readonly:false,
          formControlName: "directorUsername",
        },
        {
          type: this.showPassword ? "text" : "password",
          label: "كلمة مرور المدير",
          hidden:false,
          readonly:false,
          suffix_icon:this.showPassword ? "visibility" : "visibility_off" ,
          showPassword:()=>{
            this.showPassword=!this.showPassword
          },
          formControlName: "directorPassword",
        },
        {
          type: "tel",
          label: "رقم هاتف المدير",
          hidden:false,
          readonly:false,
          errorsMessages:{
            minLength:'يجب أن يتكون رقم هاتف المكتب من 8 أرقام',
            maxLength:'يجب أن يتكون رقم هاتف المكتب من 8 أرقام'
          },
          formControlName: "directorPhone",
        },
        {
          type: "text",
          label: "عنوان المدير",
          hidden:false,
          readonly:false,
          formControlName: "directorAddress",
        },
      ]
    },
    {
      title:"نسبة الربح",
      fields:[
        {
          type: "number",
          label: "إجباري",
          hidden:false,
          readonly:false,
          formControlName: "percentageObligatory",
        },
        {
          type: "number",
          label: "طرف ثالث",
          hidden:false,
          readonly:false,
          formControlName: "percentageThird",
        },
        {
          type: "number",
          label: "تأمين صحي",
          hidden:false,
          readonly:false,
          formControlName: "percentageHealth",
        },
        {
          type: "number",
          label: "مسافرين",
          hidden:false,
          readonly:false,
          formControlName: "percentageTravel",
        },
      ]
    }
  ]



  myForm:MyForm={
    formGroup:new FormGroup({
      officeName: new FormControl('',Validators.required),
      officeAddress: new FormControl('',Validators.required),
      officePhone: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      directorUsername: new FormControl('',Validators.required),
      directorPassword: new FormControl('',Validators.required),
      directorAddress: new FormControl('',Validators.required),
      directorPhone: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      percentageObligatory: new FormControl('',[Validators.required,Validators.min(0),Validators.max(100)]),
      percentageThird: new FormControl('',[Validators.required,Validators.min(0),Validators.max(100)]),
      percentageHealth: new FormControl('',[Validators.required,Validators.min(0),Validators.max(100)]),
      percentageTravel: new FormControl('',[Validators.required,Validators.min(0),Validators.max(100)]),
    }),
    cards:this.cards
  }

  ngOnInit(): void {
  }

  constructor(private bureauService:BureauService,private dialog:MatDialog,private router: Router ) {
  }

  onSubmit() {
    if (!this.myForm.formGroup.pristine && this.myForm.formGroup.valid) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          title: "المكاتب",
          content: "هل تريد إضافة هذا المكتب ؟",
        }, autoFocus: false, panelClass: 'choice-dialog-container'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == "true") {
          this.addOffice()
        }
      })
    }
  }

  addOffice() {

      this.isLoading = true
      const form = this.myForm.formGroup
      const request = {
        name: form.get("officeName")?.value,
        address: form.get("officeAddress")?.value,
        phone: form.get("officePhone")?.value,
        gain_precentage_oblig: form.get("percentageObligatory")?.value,
        gain_precentage_travel: form.get("percentageTravel")?.value,
        gain_precentage_third: form.get("percentageThird")?.value,
        gain_precentage_sante: form.get("percentageHealth")?.value,
        director: {
          username: form.get("directorUsername")?.value,
          password: form.get("directorPassword")?.value,
          phone: form.get("directorPhone")?.value,
          address: form.get("directorAddress")?.value,
        }
      }
      this.bureauService.createBureau(request).subscribe(data => {
        this.isLoading = false
        this.router.navigate(['/dashboard/offices'])
      })
    }/*else{
      this.isLoading = true
      setTimeout(()=>{
        this.isLoading = false
      },10000)
    }*/

}
