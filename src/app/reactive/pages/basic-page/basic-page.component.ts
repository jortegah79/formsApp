import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
  name: '',
  price: 0,
  inStorage: 0
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit {

  /* public myForm=new FormGroup({
     name:new FormControl(''),
     price:new FormControl(0),
     inStorage:new FormControl(0),
   });*/
  productos: Object[] = [];


  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this.myForm.reset(rtx5090);
  }

  isValidField(field: string): boolean | null {

       return this.myForm.controls[field].errors
               && this.myForm.controls[field].touched;

  }

  getFieldError(field: string): string | null {

    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {

        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} carácteres.`;

      }
    }
    return "";
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;

    }
    this.productos.push(this.myForm.value);
    console.table(this.productos)
    this.myForm.reset(rtx5090);
  }
}
