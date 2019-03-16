import { Component, OnInit } from '@angular/core';
import { Produto } from './domain/produto';
import { ProdutoService } from './services/produtoservice';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {SelectItem} from 'primeng/api';
import { Router, CanActivate, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
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

    /**
    * Inicialização de um novo produto
    */
    produto: Produto = new PrimeProduto();

    /**
    * Define se é um produto novo
    */
    newProduto: boolean;

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
    * Lista de unidades de medida para seleção
    */
    unidadesMedida: SelectItem[];

    /**
    * Define a visibilidade do menu lateral
    */
    visibleSidebar;

    /**
    * Armazena as mensagens do formulário
    */
    msgs: any[];

    /**
    * Armazena a tradução do calendário
    */
    en: any;

    /**
    * Define o tipo de máscara do campo quantidade
    */
    maskQtd;

    /**
    * ID do item
    */
    id: number;

    private substractId: any;

    /**
    * Cria uma instância 
    */
    constructor(
        private produtoService: ProdutoService, 
        private router: Router,
        private route: ActivatedRoute,
        //private fb: FormBuilder, 
        private messageService: MessageService) { }

    /**
    * // TODO: comment ngOnInit
    * Este método inicializa o componente
    * @param null
    * @returns null
    */ 
    ngOnInit() {

        this.produtos = JSON.parse(localStorage.getItem('produtos'));
        this.unidadesMedida = JSON.parse(localStorage.getItem('unidadesMedida'));

        if (!this.produtos) {
            this.produtos = [];
        }

        this.substractId = this.route.params.subscribe(params => {
           this.id = params['id']; 
        });

        if (!this.id) {
            this.newProduto = true;
            this.produto.unidadeMedida = this.unidadesMedida[0].value;
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
                this.produto.unidadeMedida = this.unidadesMedida[0].value;
            }    
            this.breadcrumbs = [
                { 'label': 'Editar' }
            ];        
        }

        this.setMaskQtd();           
        
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

    /**
    * // TODO: comment validateFields
    * Este método valida os campos do cadastro
    * @param null
    * @returns null
    */    
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

    /**
    * // TODO: comment save
    * Este método chama a validação e salva os dados do formulário no localstorage
    * @param null
    * @returns null
    */ 
    save() {

        var valid = this.validateFields();

        if (valid){
            if (this.newProduto) {            
                this.produto.id = this.produtos.length + 1;
                this.produtos.push(this.produto);
            } else {
                this.produtos[this.findSelectedProdutoIndex()] = this.produto;
                console.log(this.findSelectedProdutoIndex());
            }
            this.produto = null;

            if (typeof(Storage) !== "undefined") {
                localStorage.setItem('produtos', JSON.stringify(this.produtos));
            }
            this.router.navigate(['/']);
        }        
    }   

    /**
    * // TODO: comment findSelectedProdutoIndex
    * Este método busca um object através do índice no array
    * @param null
    * @returns object
    */  
    findSelectedProdutoIndex(): number {
        return this.produtos.indexOf(this.produto);
    } 

    /**
    * // TODO: comment onChange
    * Este método é chamado no onChange do select no formulário
    * @param event object
    * @returns null
    */  
    onChange(event) {
        this.setMaskQtd();
    }

    /**
    * // TODO: comment setMaskQtd
    * Este método mostra a máscara inteira ou decimal no campo de quantidade conforme a unidade de medida
    * @param event object
    * @returns null
    */ 
    setMaskQtd() {
        if (this.produto.unidadeMedida.id == 3) {
            this.maskQtd = { prefix: '', thousands: '.', decimal: ',', align: 'left', precision:0 };
        } else {
            this.maskQtd = { prefix: '', thousands: '.', decimal: ',', align: 'left', precision:3 };
        } 
    }    
}
