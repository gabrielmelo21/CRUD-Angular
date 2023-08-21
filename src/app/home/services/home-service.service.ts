import { Injectable } from '@angular/core';
import {Interface} from "../models/interface";
import {HttpClient} from "@angular/common/http";
import {catchError, delay, first, Observable, of, tap} from "rxjs";

@Injectable({
  // o root significa que as instancias que criamos no contructor, irão ser globais
  // podendo usar em todos arquivos
  providedIn: 'root'
})
export class HomeServiceService {


private readonly API = 'api/courses';

 constructor(private httpClient: HttpClient) { }
  //como podemos aplicar filtros de listagem
  // por exemplo Order By id
  minhaLista(): Observable<Object>{
    return this.httpClient.get<Interface[]>(this.API);
  }
  addDados(categoria: string, nome: string, dificuldade: string): Observable<any> {
    const data = {
      categoria: categoria,
      nome: nome,
      dificuldade: dificuldade
    };

    return this.httpClient.post<any>(this.API + "/add", data);
  }

  atualizarDados(id: any , categoria: string, nome: string, dificuldade: string  ): Observable<any>{
       //cursos: Interface
    //realmente vamos precisar de um objeto com cursos = como o interface no caso


    const data = {
      categoria: categoria,
      nome: nome,
      dificuldade: dificuldade
    };


    return this.httpClient.put<any>(this.API + `/atualizar/${id}`, data);
  }



  remover(id: any): Observable<any>{
    return this.httpClient.delete<any>(this.API + `/deletar/${id}`);
  }

}
