export class Cliente {
  id = 1 ;
  nombre = '';
  apellido = '';
  createAt = '';
  email = '';

  }

  export class Invoice {

    id: number;
    createAt: Date;
    descripcion: 'Hello';
    observacion: string;

  }

  export class Items {

    id = 1;
    cantidad = '';
    producto = '';
    producto2: Producto = {
    id: 1,
    createAt: '',
    nombre: 'Dulces',
    precio: '20'
    };
  }



  export class Producto {

    id = 1;
    createAt = '';
    nombre= '';
    precio = '12';
  }
