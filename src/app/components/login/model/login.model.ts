export interface Login {
  user: string;
  pass: string;
}

export interface LoginRetorno {
  usuario: string;
  perfil: PerfilUsuario;
}

export interface PerfilUsuario {
  id: number;
  perfil: string;
}
