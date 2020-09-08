import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from 'src/app/interfaces/menu';

@Injectable()
export class LayoutService {

    constructor(private http: HttpClient) {}

    getMenu() {
        return this.http.get<any>('assets/data/menu.json')
            .toPromise()
            .then(res => <Menu[]> res.data)
            .then(data => data);
    }
}
