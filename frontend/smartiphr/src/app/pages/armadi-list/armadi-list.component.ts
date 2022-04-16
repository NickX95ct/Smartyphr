import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { DialogArmadioComponent } from 'src/app/dialogs/dialog-armadio/dialog-armadio.component';
import { Camere } from 'src/app/models/camere';
import { User } from 'src/app/models/user';
import { CamereService } from 'src/app/service/camere.service';
import { MessagesService } from 'src/app/service/messages.service';
import { UsersService } from 'src/app/service/users.service';


@Component({
  selector: 'app-armadi-list',
  templateUrl: './armadi-list.component.html',
  styleUrls: ['./armadi-list.component.css']
})
export class ArmadiListComponent implements OnInit {
  piano: string = "2p";

  displayedColumns: string[] = [
    "camera",
    "armadioCheck",
    "dataArmadioCheck",
    "firmaArmadio",
    "action",
  ];
  dataSourceCamere: MatTableDataSource<Camere>;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;


  constructor(
    public dialog: MatDialog,
    private camereService: CamereService,
    private messageService: MessagesService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.camereService.getByPiano(this.piano)
    .pipe(
      map( (x: Camere[])=>
          x.filter(c=> c.forPatient === true).sort((o1, o2)=> o1.order - o2.order)),
      map( (x: Camere[])=>
          x.map( c => {
            return {
              ...c,
              geometryObject: JSON.parse(c.geometry)
            };
          })),
    )
    .subscribe(
      (camere: Camere[]) => {
        camere.forEach(async (c: Camere)=> {
          if (c.firmaArmadio !== undefined) {
            c.userSanificazione = await this.userService.getById(c.firmaArmadio);
          }
        });

        this.dataSourceCamere = new MatTableDataSource<Camere>(camere);
        this.dataSourceCamere.paginator = this.paginator;
      },

      err => {
        console.error("Error loading camere: ", err);
        this.messageService.showMessageError("Errore nel recuperare lista delle camere");
      }
    );

  }

  verifica(camera: Camere) {
    console.log("Verifica armadio:", camera);
    this.dialog.open(DialogArmadioComponent, {
      data: { camera: camera },
      width: "1024px",
    })
  }

}
