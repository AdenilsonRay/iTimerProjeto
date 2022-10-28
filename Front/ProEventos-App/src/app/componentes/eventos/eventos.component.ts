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

  //#region Variaveis
  public modalRef: BsModalRef ;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];

  //#endregion

  //#region Propriedades
  public larguraImagem: number = 150;
  public margenImagem: number = 2;
  public exibirImagem: boolean = true;
  private _filtroLista: string = '';
  //#endregion

  //#region Get´s Set´s
  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtraEventos(this.filtroLista): this.eventos;
  }
  //#endregion

  //#region Contrutor - injeta o servicoEvento que esta na pasta Se
  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr:ToastrService,
    private spinner: NgxSpinnerService
    ) {};


  //#endregion

  //#region Funcoes
  public ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }

  public alterarImagem():void {
    this.exibirImagem=!this.exibirImagem;
  }

  public filtraEventos(filtrarPor:string): Evento[] {
    filtrarPor=filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string;}) =>
        evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
  }

  public getEventos(): void {
      this.eventoService.getEventos().subscribe({

        //Recebendo os dados da funcao
        next:(_eventos: Evento[]) => {
          this.eventos = _eventos;
          this.eventosFiltrados = this.eventos
        },

        //Se der algum erro
        error:(error:any) => {
          this.spinner.hide();
          this.toastr.success('Eventos não carregados!.','Erro !');
          console.log(error)
        },

        //Ocultar o spinner
        complete:() => this.spinner.hide()
    });
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  public confirm(): void {
    this.modalRef.hide();
    this.toastr.success('O Evento foi deletado com sucesso.','Deletado!');
  }
  public decline(): void {
    this.modalRef.hide();
  }

  public showSuccess(){
    this.toastr.success('Hello word!','Toastr fun!');
  }

  //#endregion
}

