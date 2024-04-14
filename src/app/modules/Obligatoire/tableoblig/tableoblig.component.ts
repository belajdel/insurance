import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Router} from '@angular/router';
import {AssuranceObligatoireService} from "../../../core/services/assurance-obligatoire.service";
import {AssuranceObligatoire} from "../../../public/models/Assurance-obligatoire.model";
import {Role} from "../../../public/enum/Role";
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {Column} from "../../../public/shared/column";
import {Bureau} from "../../../public/models/bureau.model";
import {DialogComponent} from "../../../public/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-tableoblig',
  templateUrl: './tableoblig.component.html',
  styleUrls: ['./tableoblig.component.scss']
})
export class TableobligComponent implements OnInit {
  constructor(private AssuranceObligatoireService: AssuranceObligatoireService, private router: Router, private tokenStorageService: TokenStorageService,private dialog:MatDialog) {
  }

  tableColumns: Array<Column> = [
    {columnDef: 'id', header: 'No.', cell: (element: Record<string, any>) => `${element['id']}`},
    {columnDef: 'name', header: 'إسم المأمن', cell: (element: Record<string, any>) => `${element['name']}`},
    {columnDef: 'phone', header: 'رقم الهاتف', cell: (element: Record<string, any>) => `${element['phone_number']}`},
    {columnDef: 'endDate', header: 'تاريخ الإنتهاء', cell: (element: Record<string, any>) => `${element['endDate']}`},
    {columnDef: 'total', header: 'المبلغ الإجمالي', cell: (element: Record<string, any>) => `${element['total']}`},
    {columnDef: 'settings', header: 'الإجراءات', cell: (element: Record<string, any>) => `${element['settings']}`},
  ];
  addButton = {
    label: 'إضافة تأمين إجباري',
    icon: 'add_circle'
  }
  obligs: Array<AssuranceObligatoire> = [];

  //protected data: AssuranceObligatoire[] = []
  protected readonly Role = Role
  protected actualUser = this.tokenStorageService.getUser()

  fetchObligs() {
    if (this.actualUser.role == Role.User) {
      this.AssuranceObligatoireService.getObligsByUser(this.actualUser.id).subscribe((Response) => {
          this.obligs = Response;
        }
        , (error) => {
          console.log("eroor is ", error)
        }
      );
    }
    else if (this.actualUser.role == Role.Director) {
      this.AssuranceObligatoireService.getObligsByBureau(this.actualUser.bureauId).subscribe((Response) => {
          this.obligs = Response;
        }
        , (error) => {
          console.log("eroor is ", error)
        }
      );
    }
    else {
      this.AssuranceObligatoireService.getObligs().subscribe((Response) => {
          this.obligs = Response;
        }
        , (error) => {
          console.log("eroor is ", error)
        }
      );
    }


  }

  search(searchKey: string) {
    //console.log(this.query)
    if (searchKey != "") {
      this.AssuranceObligatoireService.SearchOblig(searchKey).subscribe((Response) => {
          this.obligs = Response;
        }
        , (error) => {
          console.log("error is ", error)
        }
      );
    } else {
      this.fetchObligs()
    }
  }

  ngOnInit() {
    this.fetchObligs();
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "تأمين إجباري",
        content: "هل تريد حذف هذا التأمين الإجباري ؟",
      }, autoFocus: false, panelClass: 'choice-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.deleteRow(id)
      }
    })
  }

  deleteRow(id: number) {
    this.AssuranceObligatoireService.DeletOblig(id).subscribe((Response) => {
        this.fetchObligs()
      }, (error) => {
        console.log("eroor is ", error)
      }
    )

  }


}
