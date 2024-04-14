import {AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Column} from "../../shared/column";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSortModule, MatTableModule, MatMenuModule, MatIconModule, RouterLink, MatPaginatorModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> implements OnChanges {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() url: string = "";
  @Input() insurance:boolean=false;
  @Input() addButton:{label:string,icon:string}= {
    label: '',
    icon: ''
  };
  @Input() hidden:boolean=true;
  @Output() deleteRowEvent = new EventEmitter<number>();
  @Output() searchEvent = new EventEmitter<string>();
  // @Output() fetchDataEvent = new EventEmitter();
  searchKey:string=''
  @Input() tableColumns: Array<Column> = [];
  @Input() tableData!: Array<T>;
  displayedColumns: Array<String>=[]
  dataSource: MatTableDataSource<T> = new MatTableDataSource();
  constructor(private _liveAnnouncer: LiveAnnouncer) {
  }

  ngOnInit() {
    this.displayedColumns = this.tableColumns.map((c) => c.columnDef);
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  ngOnChanges(changes: any) {
    if(changes['tableData']){
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  filter(key:string){
    this.dataSource.filter = key;
  }

  search(){
    this.searchEvent.emit(this.searchKey)
  }

  delete(id:number){
    this.deleteRowEvent.emit(id)
  }
}
