import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-valutazione-tecniche',
  templateUrl: './valutazione-tecniche.component.html',
  styleUrls: ['./valutazione-tecniche.component.css']
})
export class ValutazioneTecnicheComponent implements OnInit {
  @Input() data;
  @Input() disable: boolean;

  constructor() { }

  ngOnInit() {
  }

}
