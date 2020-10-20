import { Component, OnInit } from '@angular/core';
import { DataDbService } from '../../services/data-db.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private dbData: DataDbService) {
    this.contactForm = this.createFormGroup();
   }

  contactForm: FormGroup;

  emailPattern: any = '^[^@]+@[^@]+\.[a-zA-Z]{2,}$';

  createFormGroup(): any {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      telefono: new FormControl(''),
      mensaje: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  ngOnInit(): void {
  }

  onResetForm(): any {
    this.contactForm.reset();
  }

  onSaveForm(): void {
    if (this.contactForm.valid) {
      this.dbData.saveMessage(this.contactForm.value);
      this.onResetForm();
      console.log('Valid');
    }else {
      console.log('Not Valid');
    }
  }

  // tslint:disable: typedef
  get nombre() { return this.contactForm.get('nombre'); }
  get email() { return this.contactForm.get('email'); }
  get telefono() { return this.contactForm.get('telefono'); }
  get mensaje() { return this.contactForm.get('mensaje'); } //

}