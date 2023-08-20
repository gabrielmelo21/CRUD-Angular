import { Component } from '@angular/core';
import {ChatGptService} from "../services/chat-gpt-service.service";


@Component({
  selector: 'app-chat-gpt',
  templateUrl: './chat-gpt.component.html',
  styleUrls: ['./chat-gpt.component.css']
})
export class ChatGptComponent {

  response: string = "Enviar Request para api do ChatGpt...";
  msgError: boolean = false;


  constructor(private chatService: ChatGptService) {

  }




}
