export interface Cliente {
  login: string;
  idCliente: number;
  nome: string;
  cpf: string;
  endereco: Endereco;
  emails: Email[];
  telefones: Telefone[];
}

export interface Endereco {
  id?: number;
  cep: string;
  logradouro: string
  bairro: string
  cidade: string
  uf: string;
  complemento: string;
}

export interface CepWS{
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface Telefone {
  id?: number;
  ddd: number;
  numero: number;
  tipoTelefoneId: number;
}

export interface Email {
  id?: number;
  email: string;
}

export interface UF {
  id: number;
  sigla: string;
  desc: string;
}

export interface TipoTelefone {
  id: number;
  quantidadeDigitos: number;
  descricao: string;
}
