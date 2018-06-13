import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from './cliente.service';
import { Producto, Items } from './cliente';
import { Invoice } from './invoice/invoice';

export class InvoiceItem {

  id = '';
  cantidad = '';
  idProd = 1;
  createAt = '';
  nombre= '';
  precio = '12';
  total = 0;
 }






@Component({
  selector: 'app-invoice2',
  templateUrl: './invoice2.component.html',
  styles: []
})
export class Invoice2Component implements OnInit {
  form: FormGroup;

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


  addItem() {
    let newItem = new InvoiceItem();
    newItem.nombre = this.producto.nombre;
    newItem.precio = this.producto.precio;
    this.addItemArr.push(this.fb.group(newItem));
    // this.addItemArr.push(this.fb.group(new InvoiceItem()));
    console.log(this.addItemArr.length);
    // console.log('addItemArr.controls[].controls ', this.addItemArr.controls['0'].controls);
    // console.log('addItemArr.controls ', this.addItemArr.controls);

    // for ( let i = 0 ; i <= this.addItemArr.length; i ++) {

    //   console.log('addItemArr.control in loop ', this.addItemArr.controls['i'].controls);
    //   console.log(i);
    // }

    // for ( let item of this.addItemArr.controls) {
    //   console.log('Item ', item.value.cantidad);
    //   console.log('Item ', item.value.producto.precio);
    //   console.log('Total ', item.value.cantidad * item.value.producto.precio);
    // }

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

    //    for (let itx of items.controls) {
          
    //         console.log('CANTIDAD ', itx.value.cantidad);
            
    //    }


    //    let sub = 0;

    //    for ( let item of this.addItemArr.controls) {
    //         console.log('Item ', item.value.cantidad);
    //         console.log('Item ', item.value.precio);
    //         console.log('Total ', item.value.cantidad * item.value.precio);
    //         item.value.total = item.value.cantidad * item.value.precio;
    //         sub += item.value.total;
    //         console.log('Subtotal ', sub);

    //     }
    //       this.form.value.subTotal = sub;
    //       const tax = sub * (this.form.value.taxPercent / 100);
    //       this.form.value.tax = tax;
    //       this.form.value.grantTotal = sub + tax;
    // }
    this.updateForm(items);
  }


  }


//   updateForm(data) {
//    const items = data.invoiceItems;
//    console.log('ITEMS EN UPDATEFORM', items);

//    let sub = 0;
//    for (let i of items) {
//      i.total = i.cantidad * i.precio;
//      sub += i.total;
//    }
//    this.form.value.subTotal = sub;
//    const tax = sub * (this.form.value.taxPercent / 100);
//    this.form.value.tax = tax;
//    this.form.value.grantTotal = sub + tax;
//  }

updateForm(data) {

  // const items = data.controls;
  // console.log('Valor de items' , items);

  let sub = 0;

  for ( let item of data.controls) {
       console.log('Item ', item.value.cantidad);
       console.log('Item ', item.value.precio);
       console.log('Total ', item.value.cantidad * item.value.precio);
       item.value.total = item.value.cantidad * item.value.precio;
       sub += item.value.total;
       console.log('Subtotal ', sub);

   }
     this.form.value.subTotal = sub;
     const tax = sub * (this.form.value.taxPercent / 100);
     this.form.value.tax = tax;
     this.form.value.grantTotal = sub + tax;

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



}
