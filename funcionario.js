/** Recursos Humanos
- Funcionário
- Cargo
- Salário
- Carga Horária
- Folha de Ponto
- Setor */

module.exports = class Funcionario {
  constructor(nome, carga_horaria, cargo, salario, setor) {
    this.nome = nome
    this.carga_horaria = carga_horaria
    this.cargo = cargo
    this.salario = salario
    this.setor = setor
  }
  
  atualizar_salario(novo_salario) {
    this.salario = novo_salario
    return {
      "nome": this.nome,
      "cpf": this.cpf,
      "cargo": this.cargo,
      "salario": this.salario
    }
  }

  obter_funcionario() {
    return {

      "nome": this.nome,
      "carga_horaria": this.carga_horaria,
      "cargo": this.cargo,
      "salario": this.salario,
      "setor": this.setor
    }
  }
}
