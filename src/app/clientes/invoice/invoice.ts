import { Cliente, Items } from '../cliente';


export class Invoice {
    id = '';
    createAt = '';
    descripcion = '';
    observacion = '';
    cliente: Cliente;
    items: Items[];
}