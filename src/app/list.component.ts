import { Component, OnInit } from '@angular/core';
import { Produto } from './domain/produto';
import { ProdutoService } from './services/produtoservice';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DecimalPipe } from '@angular/common';

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
    providers: [ProdutoService, ConfirmationService, DatePipe, DecimalPipe]
})
export class ListComponent implements OnInit {

    /**
    * Produto selecionado ao clicar na tabela
    */
    selectedProduto: Produto;

    /**
    * Produto cadastrados
    */
    produtos: Produto[];

    /**
    * Define se irá apresentar link para a home no breadcrumb
    */
    home: MenuItem;

    /**
    * Gera os breadcrumbs
    */
    breadcrumbs: MenuItem[];

    /**
    * Colunas da tabela
    */
    cols: any[];

    /**
    * Define a visibilidade do menu lateral
    */
    visibleSidebar;

    /**
    * Cria uma instância 
    */
    constructor(
        private produtoService: ProdutoService, 
        private confirmationService: ConfirmationService,
        private router: Router,
        private datePipe: DatePipe,
        private decimalPipe: DecimalPipe) { }

    /**
    * // TODO: comment ngOnInit
    * Este método inicializa o componente
    * @param null
    * @returns null
    */ 
    ngOnInit() {

        //this.produtoService.getProdutosSmall().then(produtos => this.produtos = produtos);
        this.produtos = JSON.parse(localStorage.getItem('produtos'));

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

    /**
    * // TODO: comment delete
    * Este método remove um item do localstorage e da coleção
    * @param item object
    * @returns null
    */  
    delete(item) {
        const index = this.produtos.indexOf(item);
        this.produtos = this.produtos.filter((val, i) => i !== index);
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem('produtos', JSON.stringify(this.produtos));
        }
    } 

    /**
    * // TODO: comment edit
    * Este método redireciona para a tela de edição
    * @param item object
    * @returns null
    */  
    edit(item) {
        this.router.navigate(['editar/'+item.id]);
    }  

   /**
    * // TODO: comment findSelectedProdutoIndex
    * Este método busca um object através do índice no array
    * @param null
    * @returns object
    */  
    findSelectedProdutoIndex(): number {
        return this.produtos.indexOf(this.selectedProduto);
    }

    /**
    * // TODO: comment confirmDelete
    * Este método apresenta uma janela de confirmação e executa a remoção do item caso escolha 'sim'
    * deve ser utilizado ao tentar remover um item da listagem
    * @param row object
    * @returns string
    */ 
    confirmDelete(row) {
        this.confirmationService.confirm({
            message: 'Você deseja mesmo excluir esse item?',
            accept: () => {
                this.delete(row);
            }
        });
    } 

    /**
    * // TODO: comment getCellData
    * Este método formata os campos do objeto para serem exibidos corretamente
    * @param row object
    * @param col object
    * @returns string
    */ 
    getCellData(row: any, col: any) {
        let value = row[col.field];
        if (col.field == 'unidadeMedida') {
            return row[col.field].nome
        }
        if (col.field == 'preco') {
            return this.getFormattedPrice(row[col.field]);
        }
        if (col.field == 'perecivel') {
            return row[col.field] == true ? 'Sim' : 'Não' ;
        }
        if (col.field == 'quantidade') {
            let quantidade = row[col.field];
            if (row['unidadeMedida'].id != 3) {
                quantidade = this.getFormattedDecimal(quantidade);
            }            
            return quantidade + ' ' +row['unidadeMedida'].abbr ;
        }
        if (col.field == 'dataValidade') {
            let date = new Date(row[col.field]);
            return  this.datePipe.transform(date, 'dd/MM/yyyy'); ;
        } 
        if (col.field == 'dataFabricacao') {
            let date = new Date(row[col.field]);
            return  this.datePipe.transform(date, 'dd/MM/yyyy'); ;
        } 
       return row[col.field];
     }

    /**
    * // TODO: comment getFormattedPrice
    * Este método converte o preço para o formato moeda em reais
    * @param price decimal
    * @returns string
    */ 
    getFormattedPrice(price: number) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
    }

    /**
    * // TODO: comment getFormattedDecimal
    * Este método converte o decimal para o formato brasileiro e aplica 3 casas decimais
    * @param value number
    * @returns string
    */ 
    getFormattedDecimal (value) {
        value = this.decimalPipe.transform(value, '3.3-5');
        return value.replace(new RegExp(',', 'g'),'-').replace('.',',').replace(new RegExp('-', 'g'),'.')
    }

}
