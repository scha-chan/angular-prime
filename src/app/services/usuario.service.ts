import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/interfaces/usuario';


@Injectable()
export class UsuarioService {

    constructor(private http: HttpClient) {}

    public getUsuarios() {
        return this.http.get<any>('assets/data/usuarios.json')
            .toPromise()
            .then(res => <Usuario[]> res.data)
            .then(data => data);
    }
    public getUsuario(id) {
        
    }
}
