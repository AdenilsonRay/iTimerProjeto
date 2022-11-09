//#region Importacoes
//import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';

//Interno
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/Evento';

//Externo
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

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

