import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';
import { Observable } from 'rxjs/internal/Observable';
import { take } from 'rxjs/internal/operators/take';

@Injectable() //Renovido o root e adicionado no app.module em providers
export class LoteService {

  //Variaveis globais
  baseURL = 'https://localhost:5001/api/Lotes';
  cepURL = 'https://cdn.apicep.com/file/apicep';

constructor(private http:HttpClient) { }

public getCep(cep: string): any {

  //Estes nao foram incluidos pelo professor so por mim
  return this.http
              .get(`${'https://cdn.apicep.com/file/apicep/'}${cep}.json`)
              .pipe(take(1));
 }




 public getLotesByEventoId(eventoId: number): Observable<Lote[]>{
  return this.http
              .get<Lote[]>(`${'https://localhost:5001/api/Lotes'}/${eventoId}`)
              .pipe(take(1));
 }

 public saveLote(eventoId:number, lotes:Lote): Observable<Lote[]>{
  return this.http
              .put<Lote[]>(`${this.baseURL}/${eventoId}`,lotes)
              .pipe(take(1));
 }

 public deleteLote(eventoId:number, loteId:number): Observable<any>{
  return this.http
              .delete<string>(`${this.baseURL}/${eventoId}/${loteId}`)
              .pipe(take(1));
 }
}
