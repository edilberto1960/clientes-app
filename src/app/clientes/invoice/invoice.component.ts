import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClienteService } from '../cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../cliente';

export class InvoiceItem {
  // stt = '';
  // name = '';
  // unit = '';
  qty = '';
  cost = '';
  total = 0;
  // constructor( name, cost) {
  // this.name = name;
  // this.cost = cost;
  // }
}



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: []
})
export class InvoiceComponent implements OnInit {

  producto: Producto[];

  form: FormGroup;
  customer_info = {
    name: 'Mr. John Doe',
    web_link: 'John Doe Designs Inc.',
    address1: '1 Infinite Loop',
    address2: 'Cupertino, California, US',
    postal: '90210'
  };
  company_info = {
    name: 'Metaware Labs',
    web_link: 'www.metawarelabs.com',
    address1: '123 Yonge Street',
    address2: 'Toronto, ON, Canada',
    postal: 'M5S 1B6'
  };


  invoice2 = {

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

  
  public invoice = {items: [],
    customer_info: this.customer_info,
    company_info: this.company_info
  };


  constructor(private fb: FormBuilder,
              private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
              console.log('PASAMOS POR CONSTRUCTOR');
              
              this.createForm();
              // this.addItem();

// this.form.controls['invoiceItems'].valueChanges
//           .subscribe( data => {
//             console.log(data);
//             console.log('EVAL', this.form.controls['invoiceItems'].get('0').get('name'));
//           });

  }

  myFunc() {
   // console.log('YOU HAS CHANGED', JSON.stringify(this.form.value));

  }


  get invoiceItems3(): FormArray {
       console.log('GET INVOICE ITEMS: ');
    // return this.form.get('invoiceItems2') as FormArray;
    return null;
  }

  addItem() {
    // let item = new InvoiceItem();
    console.log('PUSH INVOICE ITEMS');
    
    // this.invoiceItems3.push(this.fb.group(new InvoiceItem()));

  }

  addItemProd(prod: any) {
    console.log('Prod', prod);
    // let item = new InvoiceItem(prod.nombre, prod.precio);
    //item.name = prod.nombre;
    //item.cost = parseFloat(prod.precio).toFixed(2);
    // this.invoiceItems.push(this.fb.group(new InvoiceItem(prod.nombre, prod.precio)));


  }

  
  removeItem(item) {

    let i = this.invoiceItems3.controls.indexOf(item);
    console.log('Valor de i ', i);

    if ( i !==   -1) {
    	this.invoiceItems3.controls.splice(i, 1);
      let items = this.form.get('invoiceItems2') as FormArray;
      let data = {invoiceItems2: items};
      console.log('VALOR DE ITEMS ', items);
      
      console.log('VALOR DE DATA ', data.invoiceItems2.controls);
      
    	this.updateForm(data);
    }
  }


  updateForm(data) {
     console.log('THIS DATA', data);

    const items = data.invoiceItems2;
    console.log('ITEMS EN UPDATEFORM', items);
    
    let sub = 0;
    for (let i of items) {
      // console.log('Valor de I ', i);
     i.total = i.qty * i.cost;
     sub += i.total;
    }
    this.form.value.subTotal = sub;
    const tax = sub * (this.form.value.taxPercent / 100);
    this.form.value.tax = tax;
    this.form.value.grantTotal = sub + tax;
  }


  createForm() {
     console.log('CREATE FORM');

    this.form = this.fb.group({
      invoiceName: [{name: 'ED'}, Validators.required ],
      // customer_info: this.customer_info,
      // company_info: this.company_info,
      // 'search': new FormControl(''),
      invoiceItems2: this.fb.array([]),
      // subTotal: [{value: 0, disabled: true}],
      // taxPercent: [],
      // tax: [0],

      // grantTotal: [{value: 0, disabled: true}],
    });
console.log('UPDATE');
console.log('THIS FORM', this.form);
console.log('INVOICE ITEM2 ', this.form.get('invoiceItem2') as FormArray);


// this.form.valueChanges.subscribe(data => this.updateForm(data));
this.form.valueChanges.subscribe(data => {
console.log('Value of Data ', data);

});

  }




  ngOnInit() {
  }

  buscar(termino: string) {
    // console.log(termino);
    this.cargarCliente(termino);
  }

  cargarCliente(term): void {
    this.activatedRoute.params.subscribe(params => {

      if (term) {
        this.clienteService.searchProduct(term).subscribe( (producto) => this.producto = producto);

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
