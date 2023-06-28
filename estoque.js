/** No estoque deverá ser considerado os seguintes atributos:
- Setor
- Corredor
- Prateleira
- Produto  */

module.exports = class Estoque {
  
  constructor(setor, corredor, prateleira, produto) {
    this.setor = setor
    this.corredor = corredor
    this.prateleira = prateleira
    this.produto = produto    
  }

  
  ataulizar_estoque(setor, corredor, prateleira){
    
    this.setor = setor
    this.corredor = corredor
    this.prateleira = prateleira
    
    return {
      "setor": this.setor,
      "corredor": this.corredor,
      "prateleira": this.prateleira,
      "produto": this.produto
      }
  }

  
  obter_estoque() {
    
    return {
      "setor": this.setor,
      "corredor": this.corredor,
      "prateleira": this.prateleira,
      "produto": this.produto
    }
  }
}
