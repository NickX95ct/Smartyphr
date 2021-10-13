import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { DialogMessageErrorComponent } from 'src/app/dialogs/dialog-message-error/dialog-message-error.component';
import { Presenze } from "src/app/models/presenze";
import {PresenzeService } from "src/app/service/presenze.service";

@Component({
  selector: 'app-presenze',
  templateUrl: './presenze.component.html',
  styleUrls: ['./presenze.component.css']
})
export class PresenzeComponent implements OnInit {

  @Output() showItemEmiter = new EventEmitter<{
    presenze: Presenze;
    button: string;
  }>();
  @Input() buttons: string[];
  @Input() showInsert: boolean;

  displayedColumns: string[] = [
    "cognome",
    "nome",
    "data",
    "mansione",
    "turno",
    "cf",
    "accettata",
    "action",
  ];



  dataSource: MatTableDataSource<Presenze>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  public presenze: Presenze[];

  constructor(
    public dialog: MatDialog,
    public presenzeService: PresenzeService
  ) {
    this.presenzeService.getPresenze().then((result) => {
      this.presenze = result;

      this.dataSource = new MatTableDataSource<Presenze>(this.presenze);
      this.dataSource.paginator = this.paginator;
    });

}





ngOnInit() {}

  ngAfterViewInit() {}



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  call(presenze: Presenze, item: string) {
    this.showItemEmiter.emit({ presenze: presenze, button: item });


  }


}