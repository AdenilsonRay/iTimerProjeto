import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  //#region Variaveis
  public modalRef: BsModalRef ;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public eventoId:number;

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
    private spinner: NgxSpinnerService,
    private router: Router
    ) {};


  //#endregion

  //#region Funcoes
  public ngOnInit(): void {
    this.spinner.show();
    this.carregarEventos();
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

  public carregarEventos(): void {
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

  public openModal(event: any, template: TemplateRef<any>, eventoId:number) {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {

    this.modalRef.hide();

    //Exibe o spinner
    this.spinner.show();

    //O componente chama o servico passa e retorna algo
    this.eventoService.deleteEvento(this.eventoId).subscribe({

      //Recebe o retorno
      next: (result:any) => {

        //Pasando o recebido para o console da pagina
        console.log(result);

        //Informa no toast o sucesso da chamada
        this.toastr.success('O Evento foi deletado com sucesso.','Deletado');

        //Carrega lista de eventos
        this.carregarEventos();
      },

      //Se retornar erros em vez de acerto receber em 'error'
      error: (error: any) => {

        //Exibe no console da pagina
        console.error(error);

        //Informa no toast
        this.toastr.success('Erro ao tentar deletar o evento ${this.eventoId}','Erro');
      },

      //Este substitui o mesmo em cada momento acima e o 'Complete:' por so ter ele.
    }).add(() => this.spinner.hide());

  }

  public decline(): void {
    this.modalRef.hide();
  }

  public showSuccess(){
    this.toastr.success('Hello word!','Toastr fun!');
  }

  public detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }
  //#endregion
}
