module.exports = class Folha_de_ponto {
  
  constructor(funcionario, data, hora) {
    this.funcionario = funcionario
    this.data = data
    this.hora = hora
  }

  
  consultar_frequencia() {
    
    return {
      "funcionario": this.funcionario,
      "data": this.data,
      "hora": this.hora
    }
  }
}
