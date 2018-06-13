import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente, Invoice, Items, Producto } from './cliente';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {
  // tslint:disable-next-line:no-inferrable-types
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private urlForm: string = 'http://localhost:8080/api/form';
  private urlSearchProd: string = 'http://localhost:8080/api/factura/cargar-productos';
  private urlSearchCliente: string = 'http://localhost:8080/api/cargar-clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as Cliente[])
    );

  }



  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
  }

  createInvoice(factura: Object): Observable<Object> {
    console.log('Factura ', factura);

    return this.http.post<Object>(this.urlForm, factura, {headers: this.httpHeaders});
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }

  searchProduct(name): Observable<Producto[]> {
    return this.http.get(`${this.urlSearchProd}/${name}`).pipe(
      map(response => response as Producto[])
    );

  }

  searchClientes(name): Observable<Cliente[]> {
    return this.http.get(`${this.urlSearchCliente}/${name}`).pipe(
      map(response => response as Cliente[])
    );

  }

}
