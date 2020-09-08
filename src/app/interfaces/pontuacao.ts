import { Desafio } from 'src/app/interfaces/desafio';
import { Usuario } from 'src/app/interfaces/usuario';
import { Moment } from 'moment';

export interface Pontuacao {
	id?: number;
    desafio?: Desafio;
    partida?: number;
    placar?: number;
    usuario?: Usuario;   
    data?: Moment;
    user? : number;    
}
