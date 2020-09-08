import { Usuario } from 'src/app/interfaces/usuario';
import { Moment } from 'moment';

export interface Ranking {
	id?: number;
    posicao?: number;
    partidas?: number;
    vitorias?: number;
    derrotas?: number;
    usuario?: Usuario;   
    data?: Moment;   
}
