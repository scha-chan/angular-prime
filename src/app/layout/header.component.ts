import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Menu } from 'src/app/interfaces/menu';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    providers: []
})
export class HeaderComponent implements OnInit {

    /**
    * Produto selecionado ao clicar na tabela
    */
    menuSelecionado: Menu;

    /**
    * Produto cadastrados
    */
    menu: Menu[];

    /**
    * Cria uma instância 
    */
    constructor(            
        private router: Router,
        private readonly layoutService: LayoutService
    
    ) { }

    /**
    * // TODO: comment ngOnInit
    * Este método inicializa o componente
    * @param null
    * @returns null
    */ 
    ngOnInit() {
        this.layoutService.getMenu().then(menu => this.menu = menu);      
    }   
   
   /**
    * // TODO: comment findSelectedProdutoIndex
    * Este método busca um object através do índice no array
    * @param null
    * @returns object
    */  
    // findSelectedMenuIndex(): number {
    //     return this.menu.filter((m,i) => i = this.menuSelecionado);
    // }  
}
