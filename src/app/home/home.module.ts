import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { AppMaterialModule } from "../Shared/app-material/app-material.module";
import { NewPageComponent } from './new-page/new-page.component';
import { SharedModule } from "../Shared/shared.module";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {GoogleSigninButtonModule} from "@abacritt/angularx-social-login";
@NgModule({
  declarations: [
    HomeComponent,
    NewPageComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        AppMaterialModule,
        SharedModule,
        MatInputModule,
        FormsModule,
        MatSnackBarModule,
        GoogleSigninButtonModule

    ]
})
export class HomeModule { }
