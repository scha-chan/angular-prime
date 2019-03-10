import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Produto } from '../domain/produto';

@Injectable()
export class ProdutoService {

    constructor(private http: HttpClient) {}

    getProdutosSmall() {
        return this.http.get<any>('assets/data/produtos-small.json')
            .toPromise()
            .then(res => <Produto[]> res.data)
            .then(data => data);
    }
}
