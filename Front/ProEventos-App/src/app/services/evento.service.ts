import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

//Esta sendo injetado o servico de root
@Injectable(
  //{providedIn: 'root'}
  )

export class EventoService {

  //Variaveis globais
  baseURL = 'https://localhost:5001/api/Eventos';

constructor(private http:HttpClient) { }

 getEventos(): Observable<Evento[]>{
  return this.http.get<Evento[]>(this.baseURL)
 }

 getEventosByTema(tema: string): Observable<Evento[]>{
  return this.http.get<Evento[]>(`${this.baseURL}/${tema}/tema`)
 }

 getEventoById(id: number): Observable<Evento>{
  return this.http.get<Evento>(`${this.baseURL}/${id}/tema`)
 }


}
