module.exports = class Usuario {
  
  constructor(usuario, senha, acesso) {
    this.usuario = usuario
    this.senha = senha
    this.acesso = acesso
  }

  
  atualizar_senha(nova_senha) {
    
    this.senha = nova_senha
    
    return {
      "usuario": this.usuario,
      "senha": this.senha,
      "acesso": this.acesso
    }
  }

  
  obter_usuario() {
    
    return {
      "usuario": this.usuario,
      "senha": this.senha,
      "acesso": this.acesso
    }
  }
}