import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Subject } from "rxjs";
import { DialogCartellaClinicaComponent } from "src/app/dialogs/dialog-cartella-clinica/dialog-cartella-clinica.component";
import { DialogCartellaInfermeristicaComponent } from "src/app/dialogs/dialog-cartella-infermeristica/dialog-cartella-infermeristica.component";
import { DinamicButton } from "src/app/models/dinamicButton";
import { Paziente } from "src/app/models/paziente";
import { MessagesService } from "src/app/service/messages.service";
import { PazienteService } from "src/app/service/paziente.service";

@Component({
  selector: "app-area-infermieristica",
  templateUrl: "./area-infermieristica.component.html",
  styleUrls: ["./area-infermieristica.component.css"],
})
export class AreaInfermieristicaComponent implements OnInit {
  pazienti: Paziente[];
  customButtons: DinamicButton[];
  eventsSubject: Subject<Paziente[]> = new Subject<Paziente[]>();

  constructor(
    public dialog: MatDialog,
    public messageService: MessagesService,
    public pazienteService: PazienteService
  ) {
    this.pazienteService.getPazienti().then((paz: Paziente[]) => {
      this.pazienti = paz;

      this.eventsSubject.next(this.pazienti);
    });
  }

  ngOnInit() {
    this.customButtons = [];
    console.log("Init Area Infermeristica");

    this.customButtons.push({
      images: "../../../assets/medico.png",
      label: "",
      tooltip: "Cartella Clinica",
      cmd: (paziente: Paziente) =>
        this.dialog.open(DialogCartellaClinicaComponent, {
          data: { paziente: paziente, readonly: true },
        }),
      // css: "mat-raised-button raised-button action-button",
    });

    this.customButtons.push({
      images: "../../../assets/areaInfermeristica.png",
      label: "",
      tooltip: "Cartella Infermeristica",
      cmd: (paziente: Paziente) =>
        this.dialog.open(DialogCartellaInfermeristicaComponent, {
          data: { paziente: paziente, readonly: false },
          width: "1024px",
        }),
      // css: "mat-raised-button raised-button action-button",
    });

    this.pazienteService.getPazienti().then((paz: Paziente[]) => {
      this.pazienti = paz;

      this.eventsSubject.next(this.pazienti);
    });
  }
}
