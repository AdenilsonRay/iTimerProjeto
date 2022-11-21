//#region Importacoes
import { Component, OnInit } from '@angular/core';

//import { HttpClient } from '@angular/common/http';

//Interno
//import { EventoService } from '@app/services/evento.service';
//import { Evento } from '@app/models/Evento';

//Externo
//import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
//import { ToastrService } from 'ngx-toastr';
//import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']

  //Forma de injetar um servico
  //providers:[EventoService]
})
//#endregion

export class EventosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}

