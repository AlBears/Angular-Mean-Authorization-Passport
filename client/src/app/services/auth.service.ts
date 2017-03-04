import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    authToken: any;
    user: User;

    constructor(private http: Http){}

    registerUser(user: User): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/users/register', user, { headers })
            .map(res => res.json());
    }

    authenticateUser(user: User): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:3000/users/authenticate', user, { headers })
            .map(res => res.json());
    }

    storeUserData(token: any, user: User): void {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }

    logout(): void {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
    }
}