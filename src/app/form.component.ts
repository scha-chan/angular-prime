import { Component, OnInit } from '@angular/core';
import { Produto } from './domain/produto';
import { ProdutoService } from './services/produtoservice';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {SelectItem} from 'primeng/api';
import { Router, CanActivate, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';

export class PrimeProduto implements Produto {
    constructor(
            public id?,
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
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ProdutoService]
})
export class FormComponent implements OnInit {

    displayDialog: boolean;

    produto: Produto = new PrimeProduto();

    selectedProduto: Produto;

    newProduto: boolean;

    produtos: Produto[];

    home: MenuItem;

    breadcrumbs: MenuItem[];

    unidadesMedida: SelectItem[];

    visibleSidebar;

    id: number;
    private sub: any;

    constructor(
        private produtoService: ProdutoService, 
        private router: Router,
        private route: ActivatedRoute) { }

    ngOnInit() {

        this.produtos = JSON.parse(localStorage.getItem('produtos'));
        this.unidadesMedida = JSON.parse(localStorage.getItem('unidadesMedida'));

        if (!this.produtos) {
            this.produtos = [];
        }

        this.sub = this.route.params.subscribe(params => {
           this.id = params['id']; 
        });

        if (!this.id) {
            this.newProduto = true;
            this.produto.unidadeMedida = this.unidadesMedida[1];
        } else {
            this.newProduto = false;
            if (this.produtos.length) {
                var produto = this.produtos.filter(obj => {
                  return obj.id.toString() === this.id.toString()
                });
                if (produto) {
                    this.produto = produto[0];
                }
            } else {
                this.produto.unidadeMedida = this.unidadesMedida[1];
            }
            
        }
        
        this.breadcrumbs = [
            { 'label': 'Cadastrar' }
        ];

        this.home = {icon: 'pi pi-home', 'routerLink' : '/'};
        
    } 

    save() {
        if (this.newProduto) {            
            this.produto.id = this.produtos.length + 1;
            this.produtos.push(this.produto);
        } else {
            this.produtos[this.findSelectedProdutoIndex()] = this.produto;
        }
        this.produto = null;

        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('produtos', JSON.stringify(this.produtos));
        }
        this.router.navigate(['/']);
    }    

    findSelectedProdutoIndex(): number {
        return this.produtos.indexOf(this.selectedProduto);
    } 

    validateInputQtd() {    
        this.produto.quantidade = this.produto.quantidade.replace(/[^0-9.,]/g, '');
    } 
    validateInputPreco() {    
        this.produto.preco = this.produto.preco.replace(/[^0-9.,]/g, '');
    }   
}
