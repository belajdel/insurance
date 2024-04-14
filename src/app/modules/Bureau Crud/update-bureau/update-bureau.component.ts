import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AssuranceObligatoireService} from "../../../core/services/assurance-obligatoire.service";
import {Bureau} from "../../../public/models/bureau.model";
import {User} from "../../../public/models/user.model";
import {BureauService} from "../../../core/services/bureau.service";
import {UserService} from "../../../core/services/user.service";
import {MyForm} from "../../../public/shared/my-form";
import {Card} from "../../../public/shared/card";
import {DialogComponent} from "../../../public/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-update-bureau',
  templateUrl: './update-bureau.component.html',
  styleUrls: ['./update-bureau.component.scss']
})
export class UpdateBureauComponent {
  constructor(private bureauService: BureauService, private userService: UserService, private router: Router, private dialog: MatDialog) {
  }

  isLoading = false;
  bureau: Bureau = history.state?.data;
  director = new User();

  cards: Card[] = [
    {
      title: "معلومات عن المكتب",
      fields: [
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
      title: "معلومات عن مدير المكتب",
      fields: [
        {
          type: "text",
          label: "إسم مستخدم المدير",
          readonly: true,
          hidden:false,
          formControlName: "directorUsername",
        },
        /*{
          label: "كلمة مرور المدير",
          type: "password",
          readonly:true,
          formControlName: "directorPassword",
        },*/
        {
          type: "tel",
          label: "رقم هاتف المدير",
          hidden:false,
          readonly:true,
          errorsMessages: {
            minLength:'يجب أن يتكون رقم هاتف المكتب من 8 أرقام',
            maxLength:'يجب أن يتكون رقم هاتف المكتب من 8 أرقام'
          },
          formControlName: "directorPhone",
        },
        {
          type: "text",
          label: "عنوان المدير",
          hidden:false,
          readonly: true,
          formControlName: "directorAddress",
        },
      ]
    },
    {
      title: "نسبة الربح",
      fields: [
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


  myForm: MyForm = {
    formGroup: new FormGroup({
      officeName: new FormControl(this.bureau.name, Validators.required),
      officeAddress: new FormControl(this.bureau.address, Validators.required),
      officePhone: new FormControl(this.bureau.phone, [Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      directorUsername: new FormControl('', Validators.required),
      //directorPassword: new FormControl('',Validators.required),
      directorAddress: new FormControl('', Validators.required),
      directorPhone: new FormControl('', [Validators.required,Validators.minLength(8),Validators.maxLength(8)]),
      percentageObligatory: new FormControl(this.bureau.gain_precentage_oblig, Validators.required),
      percentageThird: new FormControl(this.bureau.gain_precentage_third, Validators.required),
      percentageHealth: new FormControl(this.bureau.gain_precentage_sante, Validators.required),
      percentageTravel: new FormControl(this.bureau.gain_precentage_travel, Validators.required),
    }),
    cards: this.cards
  }

  fetchData() {
    this.userService.getUserById(this.bureau.directorId).subscribe((Response) => {
      this.myForm.formGroup.get('directorUsername')?.setValue(Response.username)
      this.myForm.formGroup.get('directorAddress')?.setValue(Response.address)
      this.myForm.formGroup.get('directorPhone')?.setValue(Response.phone)
    })
  }

  ngOnInit(): void {
    this.fetchData()
  }


  onSubmit() {
    if (!this.myForm.formGroup.pristine && this.myForm.formGroup.valid) {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          title: "المكاتب",
          content: "هل تريد تعديل هذا المكتب ؟",
        }, autoFocus: false, panelClass: 'choice-dialog-container'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == "true") {
          this.updateOffice()
        }
      })
    }
  }

  updateOffice() {

      this.isLoading = true
    const form = this.myForm.formGroup
      this.bureau.name = form.get('officeName')?.value
      this.bureau.address = form.get('officeAddress')?.value
      this.bureau.phone = form.get('officePhone')?.value
      this.bureau.gain_precentage_oblig = form.get('percentageObligatory')?.value
      this.bureau.gain_precentage_third = form.get('percentageThird')?.value
      this.bureau.gain_precentage_sante = form.get('percentageHealth')?.value
      this.bureau.gain_precentage_travel = form.get('percentageTravel')?.value
      this.bureauService.UpdateBureau(this.bureau).subscribe(data => {
        this.isLoading = false
        this.router.navigate(['/dashboard/offices'])
      })
    }
}
