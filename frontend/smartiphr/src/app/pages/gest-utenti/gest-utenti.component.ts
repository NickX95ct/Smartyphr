import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatPaginator, MatTableDataSource } from "@angular/material";
import { Dipendenti } from "src/app/models/dipendenti";
import { DipendentiService } from "src/app/service/dipendenti.service";

@Component({
  selector: "app-gest-utenti",
  templateUrl: "./gest-utenti.component.html",
  styleUrls: ["./gest-utenti.component.css"],
})
export class GestUtentiComponent implements OnInit {
  displayedColumns: string[] = ["cognome", "nome", "email", "user", "action"];
  dataSource: MatTableDataSource<Dipendenti>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public utentiService: DipendentiService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.utentiService.getDipendenti().then((result) => {
      let utenti: Dipendenti[] = result;

      this.dataSource = new MatTableDataSource<Dipendenti>(utenti);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
