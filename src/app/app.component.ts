import { Component, OnInit } from '@angular/core';
import { ProdutoService } from './services/produtoservice';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ProdutoService, ConfirmationService]
})
export class AppComponent implements OnInit {

    /**
    * Gera os menus
    */
    menus: MenuItem[];

    /**
    * Define se irá apresentar link para a home no breadcrumb
    */
    home: MenuItem;

    /**
    * Define a visibilidade do menu lateral
    */
    visibleSidebar;

    /**
    * Cria uma instância 
    */
    constructor(
        private produtoService: ProdutoService, 
        private confirmationService: ConfirmationService
    ) { }

    /**
    * // TODO: comment ngOnInit
    * Este método inicializa o componente
    * @param null
    * @returns null
    */ 
    ngOnInit() {
      
        this.home = {icon: 'pi pi-home'};

        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('unidadesMedida', JSON.stringify([
            {label:'Litro', value:{id:1, nome: 'Litro', abbr: 'lt'}},
            {label:'Quilograma', value:{id:2, nome: 'Quilograma', abbr: 'kg'}},
            {label:'Unidade', value:{id:3, nome: 'Unidade', abbr: 'un'}}
        ]));
        }

        
    }     
}
