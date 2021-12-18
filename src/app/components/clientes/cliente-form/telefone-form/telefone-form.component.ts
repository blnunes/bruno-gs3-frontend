import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormGroup, Validators} from "@angular/forms";
import {Telefone, TipoTelefone} from "../../model/cliente.model";

@Component({
  selector: 'app-telefone-form',
  templateUrl: './telefone-form.component.html',
  styleUrls: ['./telefone-form.component.css']
})
export class TelefoneFormComponent implements OnInit {
  // @ts-ignore
  @Input() transacao: any;
  // @ts-ignore
  @Input() telefones: Telefone[] | undefined;
  defaultMask = '9999-9999'
  ddds: any[] = []
  tiposTelefone: TipoTelefone[] = [];
  listaTelefone: Telefone[] = [];
  // @ts-ignore
  formParent: FormGroup;

  constructor(private controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    if(this.telefones !== undefined){
      this.listaTelefone = this.telefones;
    }
    this.formParent = <FormGroup>this.controlContainer.control?.get('telefone');
    this.preencheDDDS();
    this.preencheTipoTelefone();
    this.formParent.get('listaTelefone')?.setValue(this.listaTelefone);

  }

  validaForm(): boolean {
    return this.formParent.get('ddd')?.value === null ||
      this.formParent.get('numero')?.value === '' ||
      this.formParent.get('tipoTelefoneId')?.value === null
  }

  novoTelefone() {
    if(this.listaTelefone !== null) {
      this.listaTelefone.push(
        {
          ddd: this.formParent.get('ddd')?.value,
          numero: this.formParent.get('numero')?.value,
          tipoTelefoneId: this.formParent.get('tipoTelefoneId')?.value
        });
    } else{
      this.listaTelefone = [ {
        ddd: this.formParent.get('ddd')?.value,
        numero: this.formParent.get('numero')?.value,
        tipoTelefoneId: this.formParent.get('tipoTelefoneId')?.value
      }]
    }
    this.formParent.get('numero')?.setValue('');
    this.formParent.get('ddd')?.setValue('');
    this.formParent.get('listaTelefone')?.setValue(this.listaTelefone);


  }

  preencheDDDS() {
    this.ddds.push({id: 11})
    this.ddds.push({id: 12})
    this.ddds.push({id: 13})
    this.ddds.push({id: 14})
    this.ddds.push({id: 15})
    this.ddds.push({id: 16})
    this.ddds.push({id: 17})
    this.ddds.push({id: 18})
    this.ddds.push({id: 19})
    this.ddds.push({id: 21})
    this.ddds.push({id: 22})
    this.ddds.push({id: 24})
    this.ddds.push({id: 27})
    this.ddds.push({id: 28})
    this.ddds.push({id: 31})
    this.ddds.push({id: 32})
    this.ddds.push({id: 33})
    this.ddds.push({id: 34})
    this.ddds.push({id: 35})
    this.ddds.push({id: 37})
    this.ddds.push({id: 38})
    this.ddds.push({id: 41})
    this.ddds.push({id: 42})
    this.ddds.push({id: 43})
    this.ddds.push({id: 44})
    this.ddds.push({id: 45})
    this.ddds.push({id: 46})
    this.ddds.push({id: 47})
    this.ddds.push({id: 48})
    this.ddds.push({id: 49})
    this.ddds.push({id: 51})
    this.ddds.push({id: 53})
    this.ddds.push({id: 54})
    this.ddds.push({id: 55})
    this.ddds.push({id: 61})
    this.ddds.push({id: 62})
    this.ddds.push({id: 63})
    this.ddds.push({id: 64})
    this.ddds.push({id: 65})
    this.ddds.push({id: 66})
    this.ddds.push({id: 67})
    this.ddds.push({id: 68})
    this.ddds.push({id: 69})
    this.ddds.push({id: 71})
    this.ddds.push({id: 73})
    this.ddds.push({id: 74})
    this.ddds.push({id: 75})
    this.ddds.push({id: 77})
    this.ddds.push({id: 79})
    this.ddds.push({id: 81})
    this.ddds.push({id: 82})
    this.ddds.push({id: 83})
    this.ddds.push({id: 84})
    this.ddds.push({id: 85})
    this.ddds.push({id: 86})
    this.ddds.push({id: 87})
    this.ddds.push({id: 88})
    this.ddds.push({id: 89})
    this.ddds.push({id: 91})
    this.ddds.push({id: 92})
    this.ddds.push({id: 93})
    this.ddds.push({id: 94})
    this.ddds.push({id: 95})
    this.ddds.push({id: 96})
    this.ddds.push({id: 97})
    this.ddds.push({id: 98})
    this.ddds.push({id: 99})
  }

  private preencheTipoTelefone() {
    this.tiposTelefone.push({id: 1, quantidadeDigitos: 8, descricao: "Residencial"});
    this.tiposTelefone.push({id: 2, quantidadeDigitos: 8, descricao: "Comercial"});
    this.tiposTelefone.push({id: 3, quantidadeDigitos: 9, descricao: "Celular"});
  }

  selectItem() {
    this.formParent.get('numero')?.clearValidators();
    if (this.formParent.get('tipoTelefoneId')?.value === '3') {
      this.defaultMask = '99999-9999'
      this.formParent.get('numero')?.setValidators([Validators.minLength(9), Validators.maxLength(9)]);
    } else {
      this.defaultMask = '9999-9999'
      this.formParent.get('numero')?.setValidators([Validators.minLength(8), Validators.maxLength(8)]);
    }
  }

  remover(i: number){
    if(this.listaTelefone.length === 1) {
      this.listaTelefone = [];
    } else {
      this.listaTelefone.splice(i,i+1);
    }
    this.formParent.get('listaTelefone')?.setValue(this.listaTelefone);
  }
}
