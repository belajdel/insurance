import {Component} from '@angular/core';
import {BureauService} from "../../../core/services/bureau.service";
import {Bureau} from "../../../public/models/bureau.model";
import {Column} from "../../../public/shared/column";
import {DialogComponent} from "../../../public/components/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-bureau-tab',
  templateUrl: './bureau-tab.component.html',
  styleUrls: ['./bureau-tab.component.scss']
})
export class BureauTabComponent/* implements OnChanges*/ {

  tableColumns: Array<Column> = [
    {columnDef: 'id', header: 'No.', cell: (element: Record<string, any>) => `${element['id']}`},
    {columnDef: 'name', header: 'إسم المكتب', cell: (element: Record<string, any>) => `${element['name']}`},
    {columnDef: 'phone', header: 'رقم الهاتف', cell: (element: Record<string, any>) => `${element['phone']}`},
    {columnDef: 'address', header: 'العنوان', cell: (element: Record<string, any>) => `${element['address']}`},
    {columnDef: 'settings', header: 'الإجراءات', cell: (element: Record<string, any>) => `${element['settings']}`},
  ];
  addButton = {
    label: 'إضافة مكتب',
    icon: 'add_home_work'
  }
  bureaux: Array<Bureau> = [];

  constructor(private bureauService: BureauService,private dialog:MatDialog /*private router: Router,private _liveAnnouncer: LiveAnnouncer*/) {

  }



  fetchBureaux() {
    this.bureauService.getBureaux().subscribe((Response) => {
        this.bureaux = Response;
      }
      , (error) => {
        console.log("eroor is ", error)
      }
    );
  }

  ngOnInit(): void {
    this.fetchBureaux()
  }

  search(searchKey: string) {
    if (searchKey != "") {
      this.bureauService.SearchBureaux(searchKey).subscribe((Response) => {
          //this.bureaux=[]
          this.bureaux = Response;
        }
        , (error) => {
          console.log("error is ", error)
        }
      );
    } else {
      this.fetchBureaux()
    }
  }

  onDelete(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: "المكاتب",
        content: "هل تريد حذف هذا المكتب ؟",
      }, autoFocus: false, panelClass: 'choice-dialog-container'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.deleteRow(id)
      }
    })
  }

  deleteRow(id: number) {
    this.bureauService.DeletBureau(id).subscribe((Response) => {
        this.fetchBureaux()
      }, (error) => {
        console.log("eroor is ", error)
      }
    )
  }
}
