import {Component, OnInit} from '@angular/core';
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
export class HomeComponent implements OnInit{

  response$: Observable<string> | undefined;
  isLoading: boolean = false;
  msgError: boolean = false;

  displayedColumns = ['nome', 'categoria', 'dificuldade', '_id']

  categoria2: string = "";
  nome2: string = "";
  dificuldade: string = "";
  dadosSalvos: boolean = false;
  responseDates: string = "";
  observable$: Observable<Interface[]> = of([]);



  constructor(public dialog: MatDialog, private  instanciaHomeServices: HomeServiceService) {
    this.loadList();
  }
  loadList(): void {
    // @ts-ignore
    this.observable$ = this.instanciaHomeServices.minhaLista().pipe(catchError(err => {
        this.onError("Erro ao carregar Cursos");
        return of([]);
      })
    );
  }
  ngOnInit(): void {
    this.loadList();
  }




// Aqui é uma atualização no websockt









  onError(errorMsg: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }




public atualizar(id: string, categoria: string, nome: string, dificuldade: string): any{

   // alert(`${id} - oque esta escrito nas caixas de texto -> ${categoria} , ${nome}, ${dificuldade}`)

  this.instanciaHomeServices.atualizarDados(id, categoria, nome, dificuldade).subscribe(
    response => {
      this.dadosSalvos = true;
      this.responseDates = JSON.stringify(response);
      this.loadList();
    },
    error => {
      // Aqui posso chamar outro dialog  para erro
      this.dadosSalvos = true;
      this.responseDates = JSON.stringify(error);

    }

    );

  }

public remover(id: string): any{

  this.instanciaHomeServices.remover(id).subscribe(
    response => {
      this.dadosSalvos = true;
      this.responseDates = JSON.stringify(response);
      this.loadList();
    },
    error => {
      // Aqui posso chamar outro dialog  para erro
      this.dadosSalvos = true;
      this.responseDates = JSON.stringify(error);
       this.loadList();

    }

  );




}



clickCel(row: string){
    //Ao clicar em uma celular, pegamos os dados dela e colocamos nos inputs
  var celObject = JSON.parse(JSON.stringify(row));
  this.categoria2  = celObject.categoria;
  this.nome2  = celObject.nome;
  this.dificuldade  = celObject.dificuldade;

}


  public add_dados(categoria: string, nome: string, dificuldade: string): any{

      this.instanciaHomeServices.addDados(categoria, nome, dificuldade).subscribe(
        response => {
          // Aqui posso chamar outro dialog para avisar que foi sucesso ao inserir dados

          this.dadosSalvos = true;
          this.responseDates = JSON.stringify(response);
          this.loadList();
        },
        error => {
          // Aqui posso chamar outro dialog  para erro
          this.dadosSalvos = true;
          this.responseDates = JSON.stringify(error);

        }
      );

  }













}
