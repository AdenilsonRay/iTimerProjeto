import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';
import { take } from 'rxjs/operators'

//Esta sendo injetado o servico de root
@Injectable(
  //{providedIn: 'root'}
  )

export class EventoService {

  //Variaveis globais
  baseURL = 'https://localhost:5001/api/Eventos';
  cepURL = 'https://cdn.apicep.com/file/apicep';
  public eventos: Evento[] = [];
constructor(private http:HttpClient) { }

//O 'take(1)' obriga a funcao ser finalizada apos usada uma vez.
 public getCep(cep: string): any {
  return this.http.get(`${'https://cdn.apicep.com/file/apicep/'}${cep}.json`).pipe(take(1));
 }


 public getEventos(): Observable<Evento[]>{
  return this.http.get<Evento[]>('https://localhost:5001/api/Eventos').pipe(take(1)); //Desescrever o observable remover da memoria descarregar.
 }

 public getEventosByTema(tema: string): Observable<Evento[]>{
  return this.http.get<Evento[]>(`${'https://localhost:5001/api/Eventos'}/${tema}/tema`).pipe(take(1));
 }

 public getEventoById(id: number): Observable<Evento>{
  return this.http.get<Evento>(`${'https://localhost:5001/api/Eventos'}/${id}`).pipe(take(1));
 }





 public post(evento:Evento): Observable<Evento>{
  return this.http.post<Evento>(this.baseURL, evento).pipe(take(1));
 }

 public put(evento:Evento): Observable<Evento>{
  return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento).pipe(take(1));
 }

 public deleteEvento(id:number): Observable<any>{
  return this.http.delete<any>(`${'https://localhost:5001/api/Eventos'}/${id}`).pipe(take(1));
 }

}

