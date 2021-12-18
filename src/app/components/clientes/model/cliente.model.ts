export interface Cliente {
  idCliente: number
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
