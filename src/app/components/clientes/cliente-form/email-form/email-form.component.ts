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
  @Input() email: Email[] | undefined;
  // @ts-ignore
  formParent: FormGroup;
  listaEmail: Email[] = [];

  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    if(this.email !== undefined){
      this.listaEmail = this.email;
    } else {
      this.listaEmail = [];
    }
    this.formParent = <FormGroup>this.controlContainer.control?.get('emails');
    this.formParent.get('listaEmail')?.setValue(this.listaEmail);
  }

  novoEmail() {
    if(this.listaEmail !== null){
      this.listaEmail.push(
        {
          email: this.formParent.get('email')?.value
        });
    } else {
      this.listaEmail = [{email: this.formParent.get('email')?.value}]
    }
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
