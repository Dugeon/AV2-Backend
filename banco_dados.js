module.exports = class BancoDados {
  
  sqlite3 = require('sqlite3').verbose()
  quitanda = null
  
  constructor() {
    // Verificar se o banco já existe
    // Se não existir, crie o banco, crie as tabelas
    // insira dados, faça uma busca
    this.quitanda = new this.sqlite3.Database('./quitanda.db', this.sqlite3.OPEN_READWRITE, (error) => {
      if(error && error.code == 'SQLITE_CANTOPEN'){
        this.criar_banco()
      } else if (error) {
        console.log(error)
      }
    })
  }

  criar_banco() {
    this.quitanda = new this.sqlite3.Database('quitanda.db', (error) => {
      if (error) {
        console.log(error)
        exit(1)
      }
      
    })
    
    this.criar_tabela(this.quitanda)
  }

  criar_tabela(banco) {
    banco.exec(`
      create table usuarios (
        usuario text not null,
        senha text not null,
        acesso int not null
      );

      
      create table produtos (
        uid_produto int primary key not null, 
        nome text not null,
        quantidade int not null,
        preco float not null,
        descricao text not null,
        categoria text not null,
        tipo text not null
      );

      
      create table estoque (
        setor text not null,
        corredor text not null,
        prateleira text not null,
        produto int not null,
        FOREIGN KEY (produto) REFERENCES produtos(uid_produto)
      );


      create table financeiro (
        produto int not null,
        quantidade int not null,
        FOREIGN KEY (produto) REFERENCES produtos(uid_produto)
        
      );


      create table funcionarios (
        nome text not null,
        carga_horaria int not null,
        cargo text not null,
        salario float not null,
        setor text not null
      );


      create table vendas (
        uid_venda int primary key not null,
        produto int not null,
        quantidade int not null,
        FOREIGN KEY (produto) REFERENCES produtos(uid_produto)
      );

      create table compras (
        uid_compras int primary key not null,
        produto int not null,
        quantidade int not null,
        FOREIGN KEY (produto) REFERENCES produtos(uid_produto)
      );


      -- Inserir dados na tabela "usuarios"
      insert into usuarios (usuario, senha, acesso)
      values
          ('barbosa', '1234', 1),
          ('danyely', '2345', 0),
          ('naiara', '3456', 0),
          ('wagner', '4567', 1),
          ('tinoco', '0987', 2);

      
      -- Inserção de dados na tabela "frutas"
      INSERT INTO produtos (uid_produto, nome, quantidade, preco, descricao, categoria, tipo)
      VALUES
          (1, 'Maçã', 10, 1.99, 'Maçã vermelha e doce', 'Frutas', 'Fresca'),
          (2, 'Banana', 15, 1.99, 'Banana madura e saborosa', 'Frutas', 'Fresca'),
          (3, 'Laranja', 8, 2.49, 'Laranja suculenta e cítrica', 'Frutas', 'Fresca'),
          (4, 'Abacaxi', 5, 4.99, 'Abacaxi tropical e refrescante', 'Frutas', 'Fresca'),
          (5, 'Morango', 20, 3.99, 'Morango fresco e delicioso', 'Frutas', 'Fresca');


      -- Inserção de dados na tabela "estoque"
      INSERT INTO estoque (setor, corredor, prateleira, produto)
      VALUES
          ('Quitanda', 'Corredor A', 'Prateleira 1', 1),
          ('Quitanda', 'Corredor A', 'Prateleira 2', 2),
          ('Quitanda', 'Corredor A', 'Prateleira 3', 3),
          ('Quitanda', 'Corredor B', 'Prateleira 1', 4),
          ('Quitanda', 'Corredor B', 'Prateleira 2', 5);


      -- Inserção de dados na tabela "financeiro"
      INSERT INTO financeiro (produto, quantidade)
      VALUES
          (1, 10),
          (2, 15),
          (3, 8),
          (4, 5),
          (5, 20);


      -- Inserção de dados na tabela "funcionarios"
      INSERT INTO funcionarios (nome, carga_horaria, cargo, salario, setor)
      VALUES
          ('Tinoco', 40, 'Gerente', 2000.00, 'ADM'),
          ('Wagner', 30, 'Vendedor', 1200.00, 'Salão'),
          ('Barbosa', 40, 'Vendedor', 1200.00, 'Salão');

      INSERT INTO vendas (uid_venda, produto, quantidade)
      VALUES
          (1, 1, 20),
          (2, 3, 5),
          (3, 2, 1);
          
    `
    , (error) => {
        console.log(error)
        console.log("Banco de dados criado.")
      banco.all(`select uid_produto, nome, quantidade, preco, descricao, categoria, tipo from produtos`, (error, result) => {
        console.log(error)
        console.log(result)
      })       
    })
  }

  executar_query(query) {
    let banco = new this.sqlite3.Database('./quitanda.db')
    return new Promise( (resolve, reject) => {
      banco.all(query, (error, response) => {
        if (error) {
          reject(error)
        } else {
          resolve(response)
        }
      })  
    } 
    )
  }
  
  
}
