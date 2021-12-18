import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";
import {Email, Telefone, UF} from "../../model/cliente.model";

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {
  // @ts-ignore
  @Input() transacao: any;
  // @ts-ignore
  @Input() email: Email[];
  // @ts-ignore
  formParent: FormGroup;
  listaEmail: Email[] = [];

  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    this.listaEmail = this.email;
    this.formParent = <FormGroup>this.controlContainer.control?.get('emails');
    this.formParent.get('listaEmail')?.setValue(this.listaEmail);
  }

  novoEmail() {
    this.listaEmail.push(
      {
        email: this.formParent.get('email')?.value
      });
    this.formParent.get('email')?.setValue('');
    this.formParent.get('listaEmail')?.setValue(this.listaEmail);
  }

  remover(i: number) {
    if(this.listaEmail.length === 1) {
      this.listaEmail = [];
    } else {
      this.listaEmail.splice(i,i+1);
    }
    this.formParent.get('listaEmail')?.setValue(this.listaEmail);
  }
}
