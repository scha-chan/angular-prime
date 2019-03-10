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

    displayDialog: boolean;

    produto: Produto = new PrimeProduto();

    selectedProduto: Produto;

    newProduto: boolean;

    produtos: Produto[];

    menus: MenuItem[];

    home: MenuItem;

    crumbs: MenuItem[];

    cols: any[];

    visibleSidebar;

    constructor(private produtoService: ProdutoService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.produtoService.getProdutosSmall().then(produtos => this.produtos = produtos);

        this.cols = [
            { field: 'nome', header: 'Nome do item' },
            { field: 'unidadeMedida', header: 'Unidade de medida' },
            { field: 'quantidade', header: 'Quantidade' },
            { field: 'preco', header: 'Preço' },
            { field: 'perecivel', header: 'Produto perecível?' },
            { field: 'dataValidade', header: 'Data de validade' },
            { field: 'dataFabricacao', header: 'Data de fabricação' }
        ];

        this.crumbs = [
            { 'label': 'Produtos' }
        ];

        this.home = {icon: 'pi pi-home'};

        this.menus = [
            { 'label': 'Listar',  'icon' : 'pi pi-fw pi-list'},
            { 'label': 'Cadastrar',  'icon' : 'pi pi-fw pi-pencil'}
        ];         
        //'routerLink' : ['/'],
    }

    showDialogToAdd() {
        this.newProduto = true;
        this.produto = new PrimeProduto();
        this.displayDialog = true;

        this.crumbs = [
            { 'label': 'Produtos' },
            { 'label': 'Adicionar' }
        ];

        this.home = {icon: 'pi pi-home'};
    }

    save() {
        const produtos = [...this.produtos];
        if (this.newProduto) {
            produtos.push(this.produto);
        } else {
            produtos[this.findSelectedProdutoIndex()] = this.produto;
        }
        this.produtos = produtos;
        this.produto = null;
        this.displayDialog = false;
    }

    delete() {
        const index = this.findSelectedProdutoIndex();
        this.produtos = this.produtos.filter((val, i) => i !== index);
        this.produto = null;
        this.displayDialog = false;
    }

    onRowSelect(event) {
        this.newProduto = false;
        this.produto = {...event.data};
        this.displayDialog = true;

        this.crumbs = [
            { 'label': 'Produtos' },
            { 'label': 'Editar' },
            { 'label': this.produto.nome }
        ];
    }

    findSelectedProdutoIndex(): number {
        return this.produtos.indexOf(this.selectedProduto);
    }

    confirm() {
        this.confirmationService.confirm({
            message: 'Você deseja mesmo excluir esse item?',
            accept: () => {
                this.delete();
            }
        });
    }
}
