import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';

export class InvoiceItem {

  id = '';
  cantidad = '';
  idProd = '';
  createAt = '';
  nombre= '';
  precio = '';
  total = 0;

  producto = {

    nombre: 'Tostada',
    precio: 23
  };

 }





@Component({
  selector: 'app-invoice4',
  templateUrl: './invoice4.component.html',
  styles: []
})
export class Invoice4Component implements OnInit {

  form: FormGroup;

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

    }

  ngOnInit() {
  }

  get addItemArr(): FormArray {
    // tslint:disable-next-line:prefer-const
    return this.form.get('invoiceItems') as FormArray;
}

addItem(id) {
  console.log('Valor de id', id);
  this.addItemArr.push(this.fb.group(new InvoiceItem));
   console.log(this.addItemArr.length);
  //  console.log('controls[0]', this.addItemArr.controls[0].controls.producto.value.nombre);
  }

  updateForm(data) {
let data2 = [];
    this.form.valueChanges.subscribe(data1 => {
      console.log('Value of Data Update', data1);
     data2.push(data1.invoiceItems);
});

   console.log(data2);
   
 }

  createForm() {

    this.form = this.fb.group({
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

  save() {
    console.log('THIS INVOICE: ', this.form);
    // tslint:disable-next-line:prefer-const
    let data = JSON.stringify(this.form.value);
    console.log('-----Team in JSON Format-----');
    console.log(data);
    // tslint:disable-next-line:prefer-const
    let jsonData = JSON.parse(data);
    console.log('jsonData ', jsonData);
    console.log(jsonData.invoiceItems[0].qty);


  }


}
