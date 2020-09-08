import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { UsuarioFormComponent } from 'src/app/usuario/usuario-form.component';
import { UsuarioListComponent } from 'src/app/usuario/usuario-list.component';
import { UsuarioRoutingModule } from 'src/app/usuario/usuario-routing.module';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog/primeng-confirmdialog';
import { TableModule } from 'primeng/table/primeng-table';
import { SharedModule, MessageService } from 'primeng/api';


@NgModule({
    declarations: [
      
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        UsuarioFormComponent,
        UsuarioListComponent,
        UsuarioRoutingModule,
        MessageModule,
        MessagesModule,
        ConfirmDialogModule,
        TableModule,
        SharedModule
    ],
    providers: [MessageService],
    bootstrap: [UsuarioListComponent]
})
export class UsuarioModule { }
