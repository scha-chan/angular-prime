import { Component, OnInit } from '@angular/core';
import { Produto } from './domain/produto';
import { ProdutoService } from './services/produtoservice';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {SelectItem} from 'primeng/api';
import { Router, CanActivate, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
//import {Validators,FormControl,FormGroup,FormBuilder} from '@angular/forms';
import {Message} from 'primeng//api';
import {MessageService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';

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
    providers: [ProdutoService, MessageService]
})
export class FormComponent implements OnInit {

    displayDialog: boolean;

    produto: Produto = new PrimeProduto();

    selectedProduto: Produto;

    newProduto: boolean;

    produtos: Produto[];

    home: MenuItem;

    submitted: boolean;

    breadcrumbs: MenuItem[];

    unidadesMedida: SelectItem[];

    visibleSidebar;

    msgs: any[];

    en: any;

    maskQtd;

    id: number;
    private sub: any;

    constructor(
        private produtoService: ProdutoService, 
        private router: Router,
        private route: ActivatedRoute,
        //private fb: FormBuilder, 
        private messageService: MessageService) { }

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
            this.breadcrumbs = [
                { 'label': 'Cadastrar' }
            ];
        } else {
            this.newProduto = false;
            if (this.produtos.length) {
                var produto = this.produtos.filter(obj => {
                  return obj.id.toString() === this.id.toString()
                });
                if (produto) {
                    this.produto = produto[0];
                    this.produto.dataFabricacao = new Date(this.produto.dataFabricacao);
                    this.produto.dataValidade = new Date(this.produto.dataValidade);
                }                
            } else {
                this.produto.unidadeMedida = this.unidadesMedida[1];
            }    
            this.breadcrumbs = [
                { 'label': 'Editar' }
            ];        
        }
        if (this.produto.unidadeMedida.id == 3) {
            this.maskQtd = '';
        } else {
            /* Deveria ser utilizada a máscara do Ng2InputMaskModule, 
            mas, não deu tempo de configura-lo :( */
            this.maskQtd = '#.###.##9,9##';
        }            
        
        this.home = {icon: 'pi pi-home', 'routerLink' : '/'};

        this.en = {
            firstDayOfWeek: 0,
            dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            dayNamesMin:  ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
            monthNames: [ "Janeiro","Fevereiro","Março","April","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
            monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dec" ],
            today: 'Today',
            clear: 'Clear',
            dateFormat: 'dd/mm/yy'
        };        
        
    } 

    validateFields() {
        var valid = true;
        if (!this.produto.nome) {
            valid = false;
            this.messageService.add({severity:'warning', summary:'Aviso', detail:'Preencha o nome!'});
        }
        if (!this.produto.quantidade) {
            valid = false;
            this.messageService.add({severity:'warning', summary:'Aviso', detail:'Preencha a quantidade!'});
        }
        if (!this.produto.preco) {
            valid = false;

            this.messageService.add({severity:'warning', summary:'Aviso', detail:'Preencha o preço!'});
        }
        if (!this.produto.dataFabricacao) {
            valid = false;
            this.messageService.add({severity:'warning', summary:'Aviso', detail:'Preencha a data de fabricação!'});
        }
        if (!this.produto.dataValidade) {
            valid = false;
            this.messageService.add({severity:'warning', summary:'Aviso', detail:'Preencha a data de validade!'});           
        }
        return valid;
    }

    save() {

        /* Não consegui configurar a ferramenta de validação por isso está manual :(  
            Faltou tempo para testar as possibilidades
        */
        var valid = this.validateFields();

        if (valid){
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
    }    

    findSelectedProdutoIndex(): number {
        return this.produtos.indexOf(this.selectedProduto);
    } 

    validateInputQtd() {           
        if (this.produto.unidadeMedida.id == 3) {
            this.produto.quantidade = this.produto.quantidade.replace(/[^0-9]/g, '');
        } else {
            this.produto.quantidade = this.produto.quantidade.replace(/[^0-9.,]/g, '');
        }
    } 
    validateInputPreco() {    
        this.produto.preco = this.produto.preco.replace(/[^0-9.,]/g, '');
    }   

    onSubmit(value: string) {
        this.submitted = true;
        this.messageService.add({severity:'info', summary:'Success', detail:'Cadastrado com sucesso!'});
    }

    
}
