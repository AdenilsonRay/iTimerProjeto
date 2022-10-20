import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  constructor(private http:HttpClient) { }

  //**Variaveis
  public eventos: any = [];
  larguraImagem: number = 150;
  margenImagem: number = 2;
  exibirImagem: boolean = true;
  eventosFiltrados: any = [];

  //**Propriedades
  private _filtroLista: string = '';

  public get filtroLista(): string {
    return this._filtroLista;
  }
  public set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtraEventos(this.filtroLista): this.eventos;
  }

  //**Funcoes
  ngOnInit() {
    this.getEventos();
  }

  filtraEventos(filtrarPor:string): any {
    filtrarPor=filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: { tema: string; local: string;}) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
       evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
  }

  public getEventos(): void {
      this.http.get('https://localhost:5001/api/Eventos').subscribe(
        response => {
          this.eventos = response
          this.eventosFiltrados = this.eventos
        },
        error => console.log(error)
      );
  }

  public alterarImagem(){
    this.exibirImagem=!this.exibirImagem;
  }
}

