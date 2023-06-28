/**
Um produto deverá ter:
- Identificador único
- Quantidade em estoque
- Descrição
- Nome
- Preço
- Categoria
- Tipo 
*/


module.exports = class Produtos {
  constructor(uid, nome, quantidade, preco, descricao, categoria, tipo) {
    this.uid = uid
    this.nome = nome
    this.quantidade = quantidade
    this.preco = preco
    this.descricao = descricao
    this.categoria = categoria
    this.tipo = tipo

    
  }

  atualizar_quantidade(quantidade){
    
    this.quantidade = quantidade
    
    return {
      "uid_produto": this.uid_produto,
      "nome": this.nome,
      "quantidade": this.quantidade,
      "preco": this.preco,
      "descricao": this.descricao,
      "categoria": this.categoria,
      "tipo": this.tipo
    }
  }

  obter_produto() {
    
    return {
      "uid_produto": this.uid_produto,
      "nome": this.nome,
      "quantidade": this.quantidade,
      "preco": this.preco,
      "descricao": this.descricao,
      "categoria": this.categoria,
      "tipo": this.tipo
    }
  }
}
