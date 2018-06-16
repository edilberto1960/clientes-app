import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { resolve } from 'url';
import { reject } from 'q';
import { count, retry, map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
import { Producto, Cliente } from '../cliente';
import swal from 'sweetalert2';


export class InvoiceItem {

  id = '';
  cantidad = '';
  itemProducto = '';
  precio = '';
  total = 0;

  producto = {
    id: 7,
    nombre: 'Tostada',
    precio: '23'
  };

   invoiceItem: InvoiceItem;

 }





@Component({
  selector: 'app-invoice4',
  templateUrl: './invoice4.component.html',
  styles: []
})
export class Invoice4Component implements OnInit {

  productResult: Producto[];
  clientes: Cliente[];

  form: FormGroup;
  subscription: Subscription;

  cliente: Cliente = {
    apellido: 'Supplier Grains',
    createAt: '2018-01-01',
    email: 'vivere@gmail.coj',
    foto: '',
    id: 10,
    nombre: 'Cia General de Viveres',
  };

  customer_info = {
    apellido: '',
    createAt: '',
    email: '',
    foto: '',
    id: 0,
    nombre: '',

  };



  invoice2Save = {

    id: 1,
    createAt: '2018-05-29',
    descripcion: 'Hello',
    observacion: 'Observacion',
    cliente: {
      id: 1,
      nombre: 'Andres',
      apellido: 'Bustamante'
    },

      items: [
      {
        id: 2,
      cantidad: 10,
      producto: {
        id: 1,
        nombre: 'Tostada',
        precio: 12

      }
     },
     {
      id: 3,
    cantidad: 20,
    producto: {
      id: 2,
      nombre: 'Tortilla',
      precio: 20

    }
   }

    ]

};


  constructor(private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {
    this.createForm();

  //  this.subscription = this.observable()
  //   // .pipe( retry(3))
  //   .subscribe(

  //     number => console.log('Suscribe ', number),
  //     error  => console.error('Error en la execute ', error),
  //         () => console.log('El observador a terminado!')

  //   );

    // this.observable2();
    }

  ngOnInit() {
    console.log('la pagina se abre');
    
  }

  // ngOnDestroy() {
  //   console.log('la pagina se cierra');
  //   this.subscription.unsubscribe();
  // }

  get addItemArr(): FormArray {
    // tslint:disable-next-line:prefer-const
    return this.form.get('invoiceItems') as FormArray;
}



addItem(id) {
  console.log('Valor de id', id);
  // this.addItemArr.push(this.fb.group(new InvoiceItem));
   console.log('Length en addItemArr ', this.addItemArr.length);
   console.log('addItemArr ', this.addItemArr);
   console.log('Valor de id', id);
   let newItem = new InvoiceItem();
   newItem.itemProducto = this.productResult[id].nombre;
   newItem.producto.id = this.productResult[id].id;
   newItem.producto.nombre = this.productResult[id].nombre;
   newItem.producto.precio = this.productResult[id].precio;
   newItem.precio = this.productResult[id].precio;
   this.addItemArr.push(this.fb.group(newItem));
    console.log(this.addItemArr.length);


  // console.log('controls[0]', this.addItemArr.controls[0].controls.producto.value.nombre);
  }

  addCliente(id) {

    console.log('valor de id', id);
    console.log('valor de clientes', this.clientes);
    this.cliente = this.clientes[id];
    console.log('customer_info ', this.cliente);
    this.form.controls['cliente'].setValue(this.cliente);
    console.log('THIS INVOICE EN ADDCLIENTE: ', this.form);
    // this.clientes = [];
  }


  updateForm(data) {
let sub = 0;

console.log('lenght ', data.invoiceItems.length);

for ( let i = 0; i < data.invoiceItems.length; i++ ) {

  console.log('data en update ', data);
  console.log('data customer_info ', data.customer_info);
  // console.log('data invoiceItem ', data.invoiceItems[i].producto.nombre = 'Tortilla');
  console.log('data invoiceItem ', data.invoiceItems[i].producto.nombre);
  console.log(' data invoiceItem precio', data.invoiceItems[i].precio);
  console.log(' data invoiceItem Producto precio', data.invoiceItems[i].producto.precio);
  //   if (data.invoiceItems[i].precio > 0 ) {
  //      data.invoiceItems[i].producto.precio = data.invoiceItems[0].precio;
  // }

  data.invoiceItems[i].total = data.invoiceItems[i].cantidad * data.invoiceItems[i].precio;
       sub += data.invoiceItems[i].total;

     this.form.value.subTotal = sub;
     const tax = sub * (this.form.value.taxPercent / 100);
     this.form.value.tax = tax;
     this.form.value.total = sub + tax;

}



 }

  createForm() {

    this.form = this.fb.group({

      cliente: this.cliente,
      'createAt': new FormControl( '2018-05-29'),
      'descripcion': new FormControl ('Compra de Granos'),
      'observacion': new FormControl('Pago a 45 dias'),
      invoiceItems: this.fb.array([]),
      subTotal: [{value: 0, disabled: true}],
      taxPercent: [],
      tax: [0],
      total: [{value: 0, disabled: true}],


    });
      console.log('THIS FORM', this.form);
      this.form.valueChanges.subscribe(data => {
      console.log('Value of Data ', data);

});

      this.form.valueChanges.subscribe(data => this.updateForm(data));

  }

  save() {
    console.log('THIS INVOICE: ', this.form);
    // tslint:disable-next-line:prefer-const
    let data = JSON.stringify(this.form.value);
    console.log('-----Team in JSON Format-----');
    console.log(data);
    // tslint:disable-next-line:prefer-const
    let jsonData = JSON.parse(data);
    console.log('jsonData ', jsonData);
    // console.log(jsonData.invoiceItems[0].qty);

    this.createInvoice(jsonData);

  }

  search( value ) {
    console.log('Valor escogido ', value);
    this.cargarCliente(value);
    console.log('Valor de this.producto2', this.productResult);


 }

 searchCliente( value ) {
  console.log('Valor escogido ', value);
  this.searchClientes(value);
  console.log('Valor de this.producto2', this.clientes);

 }



 cargarCliente(term): void {
  this.activatedRoute.params.subscribe(params => {

    if (term) {
      this.clienteService.searchProduct(term).subscribe( (producto) => this.productResult = producto);

    }
  });
}

searchClientes(term): void {
  this.activatedRoute.params.subscribe(params => {

    if (term) {
      this.clienteService.searchClientes(term).subscribe( (clientes) => this.clientes = clientes);

    }
  });
}



  createInvoice(jsonData) {

    this.clienteService.createInvoice(jsonData)
    .subscribe(() => {
            swal('Nuevo cliente', `Factura creado con éxito!`, 'success')
    }
    );
  }

}





