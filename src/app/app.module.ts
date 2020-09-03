import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {SidebarModule} from 'primeng/sidebar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { AppRoutingModule } from './app-routing.module';
import { FormComponent } from './form.component';
import { ListComponent } from './list.component';
import {DropdownModule} from 'primeng/dropdown';
import {SpinnerModule} from 'primeng/spinner';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {InputMaskModule} from 'primeng/inputmask';
//import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {CalendarModule} from 'primeng/calendar';
import { AppComponent } from './app.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { UsuarioComponent } from './usuario/usuario.component';
import { DesafioComponent } from './desafio/desafio.component';
import { ResultadoComponent } from './resultado/resultado.component';

@NgModule({
    declarations: [
        AppComponent,
        FormComponent,
        ListComponent,
        UsuarioComponent,
        DesafioComponent,
        ResultadoComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        TableModule,
        HttpClientModule,
        InputTextModule,
        DialogModule,
        ButtonModule,
        DropdownModule,
        BreadcrumbModule,
        MenuModule,
        SidebarModule,
        ConfirmDialogModule,
        AppRoutingModule,
        SpinnerModule,
        ToggleButtonModule,
        InputMaskModule,
        MessagesModule,
        MessageModule,
        CalendarModule,
        CurrencyMaskModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
