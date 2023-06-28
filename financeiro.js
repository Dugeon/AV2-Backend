/** Gestão financeira do TinocoFrut.
- Comprar
- Vender
- Nota Fiscal
- Relatório de Compra
- Relatório de Vendas */

module.exports = class Vendas {
  
  constructor(produto, quantidade) {
    this.produto = produto
    this.quantidade = quantidade
 }

  
  atualizar_vendas(quantidade){

    this.quantidade = quantidade
        
    return {
      "produto": this.produto,
      "quantidade": this.quantidade
    }
  }

  
  listar_vendas() {
    
    return {
      "produto": this.produto,
      "quantidade": this.quantidade
    }
  }
}

module.exports = class Compras {
  
  constructor(produto, quantidade) {
    this.produto = produto
    this.quantidade = quantidade
 }

  
  atualizar_compras(quantidade){

    this.quantidade = quantidade
        
    return {
      "produto": this.produto,
      "quantidade": this.quantidade
    }
  }

  
  listar_compras() {
    
    return {
      "produto": this.produto,
      "quantidade": this.quantidade
    }
  }
}