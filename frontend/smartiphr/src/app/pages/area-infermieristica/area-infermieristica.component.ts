import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogCartellaClinicaComponent } from 'src/app/dialogs/dialog-cartella-clinica/dialog-cartella-clinica.component';
import { DialogCartellaInfermeristicaComponent } from 'src/app/dialogs/dialog-cartella-infermeristica/dialog-cartella-infermeristica.component';
import { Paziente } from 'src/app/models/paziente';

@Component({
  selector: 'app-area-infermieristica',
  templateUrl: './area-infermieristica.component.html',
  styleUrls: ['./area-infermieristica.component.css']
})
export class AreaInfermieristicaComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  show(event: { paziente: Paziente; button: string }) {

    var dialogRef = undefined;
    console.log("show: ", event);

    switch (event.button) {
      case "CC":
        console.log("Cartella Clinica");
        dialogRef = this.dialog.open(DialogCartellaClinicaComponent, {
          data: event.paziente
        });
        break;
      case "CI":
        console.log("Cartella Infermeristica");
        dialogRef = this.dialog.open(DialogCartellaInfermeristicaComponent, {
          data: event.paziente
        });
        break;
      default:
        break;
    }

    if (dialogRef != undefined)
      dialogRef.afterClosed().subscribe((result) => {
        console.log("The dialog was closed");
        //  this.animal = result;
      });
  }
}
