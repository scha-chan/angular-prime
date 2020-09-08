import { Usuario } from 'src/app/interfaces/usuario';
import { Moment } from 'moment';

export interface Desafio {
	id?: number;
    desafiante?: Usuario;
    desafiado?: Usuario;
    dataDesafio?: Moment;
    dataSolicitacao?: Moment;
    observacao?: string;
    situacao?: string;    
}
