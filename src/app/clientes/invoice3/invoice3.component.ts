import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Producto, Items, Cliente } from '../cliente';
import { Invoice } from '../invoice/invoice';
import { Invoice2Component } from '../invoice2.component';

export class InvoiceItem {

  id = '';
  cantidad = '';
  idProd = '';
  createAt = '';
  nombre= '';
  precio = '';
  total = 0;
 }



@Component({
  selector: 'app-invoice3',
  templateUrl: './invoice3.component.html',
  styles: []
})
export class Invoice3Component implements OnInit {
  form: FormGroup;
  producto2: Producto[];
  clientes: Cliente[];

  customer_info = {
    nombre: '',
    apellido: '',
    email: '',

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

  producto: any = {

    id: '1',
    nombre: 'Tostada',
    precio: '12'
   };


  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private fb: FormBuilder) {
              this.createForm();

              }


  ngOnInit(): void {
  }

  get addItemArr(): FormArray {
    // tslint:disable-next-line:prefer-const
    return this.form.get('invoiceItems') as FormArray;
}


addCliente(id) {

  console.log('valor de id', id);
  console.log('valor de clientes', this.clientes);
  this.customer_info = this.clientes[id];
  this.form.controls['customer_info'].setValue(this.customer_info);
  console.log('THIS INVOICE EN ADDCLIENTE: ', this.form);
  this.clientes = [];
  this.form.controls['searchCliente'].setValue('');
}



  addItem(id) {
    console.log('Valor de id', id);
    let newItem = new InvoiceItem();
    newItem.nombre = this.producto2[id].nombre;
    newItem.precio = this.producto2[id].precio;
    this.addItemArr.push(this.fb.group(newItem));
     console.log(this.addItemArr.length);
     this.producto2 = [];
     this.form.controls['search'].setValue('');
    }


  removeItem(item) {

    let i = this.addItemArr.controls.indexOf(item);
    console.log('Valor de i ', i);

    if ( i !==   -1) {
       this.addItemArr.controls.splice(i, 1);
       let items = this.form.get('invoiceItems') as FormArray;
       let data = {invoiceItems: items};
       console.log('VALOR DE ITEMS ', items);
       console.log('VALOR DE DATA ', data.invoiceItems);
       console.log('VALORES EN EL ITEM EN REMOVE ', items.controls);

       this.updateForm(items);
    }

  }

updateForm(data) {

  let sub = 0;

  for ( let item of data.controls) {
       console.log('Item cantidad', item.value.cantidad);
       console.log('Item precio ', item.value.precio);
       console.log('Valor de producto2 ', this.producto2);
       console.log('Total ', item.value.cantidad * item.value.precio);

       item.value.total = item.value.cantidad * item.value.precio;
       sub += item.value.total;
       console.log('Subtotal ', sub);

   }
     this.form.value.subTotal = sub;
     const tax = sub * (this.form.value.taxPercent / 100);
     this.form.value.tax = tax;
     this.form.value.grantTotal = sub + tax;
    //  document.getElementById('myAnchor').focus();
}



  createForm() {

    this.form = this.fb.group({
      search: new FormControl(''),
      searchCliente: new FormControl(''),
      customer_info: this.customer_info,
      invoiceItems: this.fb.array([]),
      subTotal: [{value: 0, disabled: true}],
      taxPercent: [],
      tax: [0],
      grantTotal: [{value: 0, disabled: true}],


    });
      console.log('THIS FORM', this.form);
      this.form.valueChanges.subscribe(data => {
      console.log('Value of Data ', data);
      
});
   
    this.form.valueChanges.subscribe(data => this.updateForm(this.form.get('invoiceItems') as FormArray));

  }

  search( value ) {
    console.log('Valor escogido ', value);
    this.cargarCliente(value);
    console.log('Valor de this.producto2', this.producto2);


 }

 searchCliente( value ) {
  console.log('Valor escogido ', value);
  this.searchClientes(value);
  console.log('Valor de this.producto2', this.clientes);

 }


 cargarCliente(term): void {
  this.activatedRoute.params.subscribe(params => {

    if (term) {
      this.clienteService.searchProduct(term).subscribe( (producto) => this.producto2 = producto);

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

save() {
  console.log('THIS INVOICE: ', this.form);
  let data = JSON.stringify(this.form.value);
  console.log('-----Team in JSON Format-----');
  console.log(data);
  let jsonData = JSON.parse(data);
  console.log('jsonData ', jsonData);
  console.log(jsonData.invoiceItems[0].qty);
  
  
}


}
