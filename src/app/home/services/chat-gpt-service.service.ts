import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatGptService{
  constructor(private http: HttpClient) { }
  private apiKey =  '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';
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}` // Substitua pelo seu token de API
    })
  };
  getChatResponse2(prompt: string,  messages: any[] = []): Observable<any> {

    messages.push({ role: 'system', content: 'You: ' + prompt });

    const data = {
      model: 'gpt-3.5-turbo',
      temperature:0.8,
      max_tokens: 100,
      messages: messages
    };

    return this.http.post(this.apiUrl, data, this.httpOptions);
  }



  /**
   *
   *
   *
   *  messages: any[] = []
   *
   *
   *
   *
   *
   *
   *
   *
   *
  getChatResponse(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const requestBody = {
      prompt: prompt,
      max_tokens: 100 // Número máximo de tokens na resposta
    };

    return this.http.post(this.apiUrl, requestBody, { headers: headers }).pipe(
      catchError(error => {
        console.error('API Error:', error);
        return error;
      })
    );

  }


  **/

}
