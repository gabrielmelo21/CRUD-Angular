import {Component} from '@angular/core';
import {Interface} from "../models/interface";
import {HomeServiceService} from "../services/home-service.service";
import {catchError, finalize, map, Observable, of} from "rxjs";

import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../Shared/components/error-dialog/error-dialog.component";
import {ChatGptService} from "../services/chat-gpt-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  response$: Observable<string> | undefined;
  isLoading: boolean = false;
  msgError: boolean = false;

  displayedColumns = ['nome', 'categoria', 'dificuldade']

  categoria2: string = "";
  nome2: string = "";
  dificuldade: string = "";
  dadosSalvos: boolean = false;
  responseDates: string = "";
  observable$: Observable<Interface[]>;


  constructor(public dialog: MatDialog, private  instanciaHomeServices: HomeServiceService) {


    // @ts-ignore
    this.observable$ = this.instanciaHomeServices.minhaLista()
      .pipe(
        map(result =>{

        }),
        catchError(err => {this.onError("Erro ao carregar Cursos");
          return of([]);})
      );


  }












  onError(errorMsg: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }





  public add_dados(categoria: string, nome: string, dificuldade: string): any{

      this.instanciaHomeServices.addDados(categoria, nome, dificuldade).subscribe(
        response => {
          // Aqui posso chamar outro dialog para avisar que foi sucesso ao inserir dados

          this.dadosSalvos = true;
          this.responseDates = JSON.stringify(response);
        },
        error => {
          // Aqui posso chamar outro dialog  para erro
          this.dadosSalvos = true;
          this.responseDates = JSON.stringify(error);

        }
      );

  }













}
