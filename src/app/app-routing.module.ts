import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewPageComponent } from "./home/new-page/new-page.component";

import {ChatGptComponent} from "./home/chat-gpt/chat-gpt.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'page', // Correção: Remova o '/' e use apenas 'page'
    component: NewPageComponent,
  },
  {
    path: 'chatGPT', // Correção: Remova o '/' e use apenas 'page'
    component: ChatGptComponent,
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
