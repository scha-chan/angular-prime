import { Component, OnInit } from '@angular/core';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem, SharedModule} from 'primeng/api';
import {SelectItem} from 'primeng/api';
import { Router, CanActivate, ActivatedRouteSnapshot, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import {Message} from 'primeng//api';
import {MessageService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as moment from 'moment';

export class UsuarioFormComponent implements Usuario {
    constructor() {}
}

@Component({
    selector: 'app-usuario-form',
    templateUrl: './usuario-form.component.html',
    styleUrls: ['./usuario.component.css'],
    providers: [UsuarioService, MessageService]
})
export class FormComponent implements OnInit {

    /**
    * Inicialização de um novo produto
    */
    usuario: Usuario;

    /**
    * Define se é um produto novo
    */
    newUser: boolean;

    /**
    * Produto cadastrados
    */
    usuarios: Usuario[];
    
    /**
    * Armazena as mensagens do formulário
    */
    msgs: any[];

    /**
    * Armazena a tradução do calendário
    */
    en: any;

    /**
    * ID do item
    */
    id: number;

    private substractId: any;

    public home: MenuItem;
    public breadcrumbs: MenuItem[];

    /**
    * Cria uma instância 
    */
    constructor(
        private usuarioService: UsuarioService, 
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

        this.usuarios = JSON.parse(localStorage.getItem('usuarios'));     

        if (!this.usuarios) {
            this.usuarios = [];
        }

        this.substractId = this.route.params.subscribe(params => {
           this.id = params['id']; 
        });

        if (!this.id) {
            this.newUser = true;      
            this.breadcrumbs = [
                { 'label': 'Cadastrar' }
            ];
        } else {
            this.newUser = false;
            if (this.usuarios.length) {
                var usuario = this.usuarios.filter(obj => {
                  return obj.id === this.id
                });
                if (usuario) {
                    this.usuario = usuario[0];
                    this.usuario.dataNascimento = moment(this.usuario.dataNascimento).toDate();       
                               
                }      
            }    
            this.breadcrumbs = [
                { 'label': 'Editar' }
            ];        
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

    /**
    * // TODO: comment validateFields
    * Este método valida os campos do cadastro
    * @param null
    * @returns null
    */    
    validateFields() {
        var valid = true;
        if (!this.usuario.nome) {
            valid = false;
            this.messageService.add({severity:'warning', summary:'Aviso', detail:'Preencha o nome!'});
        }
        if (!this.usuario.email) {
            valid = false;
            this.messageService.add({severity:'warning', summary:'Aviso', detail:'Preencha o email!'});
        }
        if (!this.usuario.telefone && !this.usuario.celular) {
            valid = false;
            this.messageService.add({severity:'warning', summary:'Aviso', detail:'Preencha um telefone para contato!'});
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
            if (this.newUser) {            
                this.usuario.id = this.usuarios.length + 1;
                this.usuarios.push(this.usuario);
            } else {
                this.usuarios[this.findSelectedProdutoIndex()] = this.usuario;
                console.log(this.findSelectedProdutoIndex());
            }
            this.usuario = null;

            if (typeof(Storage) !== "undefined") {
                localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
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
        return this.usuarios.indexOf(this.usuario);
    } 

    /**
    * // TODO: comment onChange
    * Este método é chamado no onChange do select no formulário
    * @param event object
    * @returns null
    */  
    onChange(event) {
        this.setMask();
    }

    /**
    * // TODO: comment setMaskQtd
    * Este método mostra a máscara inteira ou decimal no campo de quantidade conforme a unidade de medida
    * @param event object
    * @returns null
    */ 
    setMask() {
        return { prefix: '', thousands: '.', decimal: ',', align: 'left', precision:0 };        
    }    
}
