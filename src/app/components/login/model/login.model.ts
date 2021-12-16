export interface Login {
  user: string;
  pass: string;
}

export interface LoginRetorno {
  user: string;
  perfil: PerfilUsuario;
}

export interface PerfilUsuario {
  id: number;
  perfil: string;
}
