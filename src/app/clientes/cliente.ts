export class Cliente {
  id = 1 ;
  nombre = 'Cia General de Viveres';
  apellido = 'Granos';
  createAt = '2018-01-01';
  email = 'vivere@gmail.coj';

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
