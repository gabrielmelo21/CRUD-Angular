import {Component, OnInit} from '@angular/core';
import {Interface} from "../models/interface";
import {HomeServiceService} from "../services/home-service.service";
import {catchError, finalize, map, Observable, of} from "rxjs";

import {MatDialog} from "@angular/material/dialog";
import {ErrorDialogComponent} from "../../Shared/components/error-dialog/error-dialog.component";
import {MatSnackBar} from "@angular/material/snack-bar";

import { AngularFireStorage } from "@angular/fire/compat/storage"
import {SocialAuthService} from "@abacritt/angularx-social-login";

import { JwtHelperService } from '@auth0/angular-jwt';

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
  imgURL: string = "https://camo.githubusercontent.com/b7b7dca15c743879821e7cfc14e8034ecee3588e221de0a6f436423e304d95f5/68747470733a2f2f7a7562652e696f2f66696c65732f706f722d756d612d626f612d63617573612f33363664616462316461323032353338616531333332396261333464393030362d696d6167652e706e67";

  public jwt :string = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMzYWZlN2E5YmRhNDZiYWU2ZWY5N2U0NmM5NWNkYTQ4OTEyZTU5NzkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2OTMwMDE3NjQsImF1ZCI6IjY4MTM3MTEwMjQzNi1lbTcyZTZrcnFnN3E5dTcwcHB0bnJkbW4xcGs4cWE5bC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwODcyODEyNTY3NDc4MjYyNDAyNSIsImVtYWlsIjoiZ2FicmllbC51c2VyMDAwMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiNjgxMzcxMTAyNDM2LWVtNzJlNmtycWc3cTl1NzBwcHRucmRtbjFwazhxYTlsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IkdhYnJpZWwgTWVsbyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRjRVhRMmlUMkl5ekVZMno5MWVLX0FrSUhnUUN0aHVIRnpRUFJ6dUpyMmd4SEU9czk2LWMiLCJnaXZlbl9uYW1lIjoiR2FicmllbCIsImZhbWlseV9uYW1lIjoiTWVsbyIsImlhdCI6MTY5MzAwMjA2NCwiZXhwIjoxNjkzMDA1NjY0LCJqdGkiOiI1ZWQyMmE5NTRhNjY1OWRlMzA0Y2JlZmVhYTBkYzcyNmQ0ZDYyODc1In0.gaN-95ZjeCH1vUGBCZ7tiJ9wxbO5KlWqY7QVdsJOVjDttUSOzMauaivmEIGYslUzpNM14_8OA-mzM4vsGY3cbzk87mW2FwLNc-T8V2fF3L1B6GRnOpeytVt2J5Ny46Fx-ibMD1p0pP0IIek604cklmy77scDuXzRftBny2_dEqkmeGqiADuNp2k7ezxY7UzqveAB5rsUotO9IGCikjawUTvI3jqUc_KceFQQtCrDUtaHPi__gf0HxxFJZuLoSQZM7A9fG77x74i1aNYg5cD3LpA_VE3V79L0AxOSxQ7jZZL9hLgPTWdJ7NwZAJffNOHmleBrrWRZJMs8h5Ib7QqEWQ";









  user:any;
  loggedIn = localStorage.getItem("loggedIn");

  token: string | null = localStorage.getItem('access_token');
  userName: any;
  userEmail: any;
  userImg: any;
  constructor(
    public dialog: MatDialog,
    private  instanciaHomeServices: HomeServiceService,
    private _snackBar: MatSnackBar,
    private fireStorage: AngularFireStorage,
    private authService: SocialAuthService,
    private jwtHelper: JwtHelperService
  ) {
    this.loadList();


    //this.sessionVar = localStorage.getItem("teste");



if (this.loggedIn != "logado"){
   this.authService.authState.subscribe((user) => {
     //this.user = user;
     //if(user != null){
       localStorage.setItem('loggedIn', "logado");
       this.loggedIn = localStorage.getItem("loggedIn");
     //}
     console.log(this.user);
     alert(this.loggedIn);

     // cria a variavel session com JWT do user
     const userJWT = this.user.idToken;
     localStorage.setItem('access_token', userJWT);

   });
 }else{
   //alert("a variavel ja foi criada" + this.loggedIn);
   //alert(this.token);
 }



 if (this.token) {
      //decodifica o jwt do usuario - caso ele esteja logado
      const jwt_object =  this.jwtHelper.decodeToken(this.token);

      this.userName = jwt_object.name;
      this.userEmail = jwt_object.email;
      this.userImg = jwt_object.picture;


    }






  }//end construtor



 deslogar(){
   localStorage.setItem('loggedIn', "deslogado");
   this.loggedIn = localStorage.getItem("loggedIn");


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




  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2 * 1000 // 2 segundos em milissegundos
    });
  }




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
      this.openSnackBar("Dados Atualizados com Sucesso.", "Fechar");
    },
    error => {
      // Aqui posso chamar outro dialog  para erro
      this.dadosSalvos = true;
      this.responseDates = JSON.stringify(error);
      this.openSnackBar("Erro ao atualizar dados.", "Fechar");

    }

    );

  }

public remover(id: string): any{

  this.instanciaHomeServices.remover(id).subscribe(
    response => {
      this.dadosSalvos = true;
      this.responseDates = JSON.stringify(response);
      this.loadList();
      this.openSnackBar("Dado Removido com Sucesso", "Fechar");
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

          this.openSnackBar("Dado adicionado com sucesso.", "Fechar");
        },
        error => {
          // Aqui posso chamar outro dialog  para erro
         // this.dadosSalvos = true;
        // this.responseDates = JSON.stringify(error);

          this.openSnackBar("Erro ao adicionar dado.", "Fechar");

        }
      );

  }


  async onFileChange(event: any) {
    const file = event.target.files[0];
    if (file){
       const path = file.name;
       const uploadTask = await this.fireStorage.upload(path,file);
       const url = await uploadTask.ref.getDownloadURL();

       this.imgURL = url;
    }
  }




}
