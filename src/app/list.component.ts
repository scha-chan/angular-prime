import { Component, OnInit } from '@angular/core';
import { Produto } from './domain/produto';
import { ProdutoService } from './services/produtoservice';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

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
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ProdutoService, ConfirmationService]
})
export class ListComponent implements OnInit {

    displayDialog: boolean;

    produto: Produto = new PrimeProduto();

    selectedProduto: Produto;

    newProduto: boolean;

    produtos: Produto[];

    home: MenuItem;

    breadcrumbs: MenuItem[];

    cols: any[];

    unidadesMedida: any[];

    visibleSidebar;

    constructor(
        private produtoService: ProdutoService, 
        private confirmationService: ConfirmationService,
        private router: Router) { }

    ngOnInit() {

        //this.produtoService.getProdutosSmall().then(produtos => this.produtos = produtos);
        this.produtos = JSON.parse(localStorage.getItem('produtos'));
        this.unidadesMedida = JSON.parse(localStorage.getItem('unidadesMedida'));

        this.cols = [
            { field: 'nome', header: 'Nome do item' },
            { field: 'unidadeMedida', subfield : 'nome', header: 'Unidade de medida' },
            { field: 'quantidade', header: 'Quantidade' },
            { field: 'preco', header: 'Preço' },
            { field: 'perecivel', header: 'Produto perecível?' },
            { field: 'dataValidade', header: 'Data de validade' },
            { field: 'dataFabricacao', header: 'Data de fabricação' }
        ];

        this.breadcrumbs = [           
            { 'label': 'Listar' }
        ];

        this.home = {icon: 'pi pi-home', 'routerLink' : '/'};
    }   

    delete(item) {
        const index = this.produtos.indexOf(item);
        this.produtos = this.produtos.filter((val, i) => i !== index);
        this.produto = null;
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('produtos', JSON.stringify(this.produtos));
        }
    }

    onRowSelect(event) {
        this.newProduto = false;
        this.produto = {...event.data};
        this.displayDialog = true;       
    }

    findSelectedProdutoIndex(): number {
        return this.produtos.indexOf(this.selectedProduto);
    }

    confirmDelete(row) {
        this.confirmationService.confirm({
            message: 'Você deseja mesmo excluir esse item?',
            accept: () => {
                this.delete(row);
            }
        });
    }

    editar(item) {
        this.router.navigate(['editar/'+item.id]);
    }

    getCellData(row: any, col: any) {
        let value = row[col.field];
        if (col.field == 'unidadeMedida') {
            return row[col.field].nome
        }
        if (col.field == 'preco') {
            return 'R$ ' + row[col.field];
        }
        if (col.field == 'perecivel') {
            return row[col.field] == true ? 'Sim' : 'Não' ;
        }
        if (col.field == 'quantidade') {
            return row[col.field] + ' ' +row['unidadeMedida'].abbr ;
        }
       return row[col.field];
     }


}
