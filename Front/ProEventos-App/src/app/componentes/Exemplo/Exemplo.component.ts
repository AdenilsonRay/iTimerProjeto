import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Exemplo',
  templateUrl: './Exemplo.component.html',
  styleUrls: ['./Exemplo.component.scss']
})
export class ExemploComponent implements OnInit {

  constructor() { }

  y : number = 0;

  ngOnInit() {
    this.nomex(2)
  }

  nomex(x:number): void {
    this.y = x*2;
  }


}
