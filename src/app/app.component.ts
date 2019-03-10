import { Component, OnInit } from '@angular/core';
import { Produto } from './domain/produto';
import { ProdutoService } from './services/produtoservice';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

export class PrimeProduto implements Produto {
    constructor(
            public nome?,
            public unidadeMedida?,
            public quantidade?,
            public preco?,
            public perecivel?,
            public dataValidade?,
            public dataFabricacao?
    ) {}
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ProdutoService, ConfirmationService]
})
export class AppComponent implements OnInit {

    menus: MenuItem[];

    home: MenuItem;

    visibleSidebar;

    constructor(private produtoService: ProdutoService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
      
        this.home = {icon: 'pi pi-home'};

        this.menus = [
            { 'label': 'Listar',  'icon' : 'pi pi-fw pi-list', 'routerLink': '/'},
            { 'label': 'Cadastrar',  'icon' : 'pi pi-fw pi-pencil', 'routerLink': '/cadastrar'}
        ];    

        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('unidadesMedida', JSON.stringify([
            {label:'Litro', value:{id:1, nome: 'Litro', abbr: 'lt'}},
            {label:'Quilograma', value:{id:2, nome: 'Quilograma', abbr: 'kg'}},
            {label:'Unidade', value:{id:3, nome: 'Unidade', abbr: 'un'}}
        ]));
        }

        
    }     
}
