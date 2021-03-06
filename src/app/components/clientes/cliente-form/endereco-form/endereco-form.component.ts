import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from "@angular/forms";
import {CepWS, Endereco, UF} from "../../model/cliente.model";
import {ClienteService} from "../../service/cliente.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-endereco-form',
  templateUrl: './endereco-form.component.html',
  styleUrls: ['./endereco-form.component.css']
})
export class EnderecoFormComponent implements OnInit {
  // @ts-ignore
  @Input() transacao: any;
  // @ts-ignore
  @Input() endereco: Endereco | undefined;
  // @ts-ignore
  formParent: FormGroup;
  ufs: UF[] = [];
  isDetalhar = false;
  sub = new Subscription();
  returnWs: any;

  constructor(private controlContainer: ControlContainer,
              private clienteService: ClienteService) {
  }

  ngOnInit(): void {
    this.isDetalhar = this.transacao === '2';
    this.ufs = [];
    this.formParent = <FormGroup>this.controlContainer.control?.get('endereco');
    this.preencheUF()
    this.preencheEndereco();
  }

  private preencheUF() {
    this.ufs.push({id: 12, sigla: 'AC', desc: 'Acre'})
    this.ufs.push({id: 27, sigla: 'AL', desc: 'Alagoas'})
    this.ufs.push({id: 13, sigla: 'AM', desc: 'Amazonas'})
    this.ufs.push({id: 16, sigla: 'AP', desc: 'Amapá'})
    this.ufs.push({id: 29, sigla: 'BA', desc: 'Bahia'})
    this.ufs.push({id: 23, sigla: 'CE', desc: 'Ceará'})
    this.ufs.push({id: 53, sigla: 'DF', desc: 'Distrito Federal'})
    this.ufs.push({id: 32, sigla: 'ES', desc: 'Espírito Santo'})
    this.ufs.push({id: 52, sigla: 'GO', desc: 'Goiás'})
    this.ufs.push({id: 21, sigla: 'MA', desc: 'Maranhão'})
    this.ufs.push({id: 31, sigla: 'MG', desc: 'Minas Gerais'})
    this.ufs.push({id: 50, sigla: 'MS', desc: 'Mato Grosso do Sul'})
    this.ufs.push({id: 51, sigla: 'MT', desc: 'Mato Grosso'})
    this.ufs.push({id: 15, sigla: 'PA', desc: 'Pará'})
    this.ufs.push({id: 25, sigla: 'PB', desc: 'Paraíba'})
    this.ufs.push({id: 26, sigla: 'PE', desc: 'Pernambuco'})
    this.ufs.push({id: 22, sigla: 'PI', desc: 'Piauí'})
    this.ufs.push({id: 41, sigla: 'PR', desc: 'Paraná'})
    this.ufs.push({id: 33, sigla: 'RJ', desc: 'Rio de Janeiro'})
    this.ufs.push({id: 24, sigla: 'RN', desc: 'Rio Grande do Norte'})
    this.ufs.push({id: 11, sigla: 'RO', desc: 'Rondônia'})
    this.ufs.push({id: 14, sigla: 'RR', desc: 'Roraima'})
    this.ufs.push({id: 43, sigla: 'RS', desc: 'Rio Grande do Sul'})
    this.ufs.push({id: 42, sigla: 'SC', desc: 'Santa Catarina'})
    this.ufs.push({id: 28, sigla: 'SE', desc: 'Sergipe'})
    this.ufs.push({id: 35, sigla: 'SP', desc: 'São Paulo'})
    this.ufs.push({id: 17, sigla: 'TO', desc: 'Tocantins'})

  }

  private preencheEndereco() {
    if(this.endereco !== undefined && this.endereco !== null){
      this.formParent.get('cep')?.setValue(this.endereco.cep);
      this.formParent.get('bairro')?.setValue(this.endereco.bairro);
      this.formParent.get('logradouro')?.setValue(this.endereco.logradouro);
      this.formParent.get('cidade')?.setValue(this.endereco.cidade);
      this.formParent.get('uf')?.setValue(this.endereco.uf);
      this.formParent.get('complemento')?.setValue(this.endereco.complemento);
    }


  }

  buscarCep() {
      this.clienteService.buscarCep(this.formParent.get('cep')?.value).subscribe(value =>{
        // @ts-ignore
        if(value.erro){
          alert('CEP não encontrado');
        }
        this.preencheEnderecoWs(value)

      } );
  }

  preencheEnderecoWs(cep: any) {
    this.formParent.get('cep')?.setValue(cep.cep);
    this.formParent.get('bairro')?.setValue(cep.bairro);
    this.formParent.get('logradouro')?.setValue(cep.logradouro);
    this.formParent.get('cidade')?.setValue(cep.localidade);
    this.formParent.get('uf')?.setValue(cep.uf);
    this.formParent.get('complemento')?.setValue(cep.complemento);
  }
}
