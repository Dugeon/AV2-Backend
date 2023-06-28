const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const BancoDados = require('./banco_dados.js')
const Escola = require('./estoque.js')
const Financeiro = require('./financeiro.js')
const Folha_de_ponto = require('./folha_de_ponto.js')
const Funcionario = require('./funcionario.js')
const Produtos = require('./produtos.js')
const Usuario = require('./usuario.js')
const banco = new BancoDados()


app.use(express.json())
app.use(express.urlencoded({ extended: true })) 


app.get('/', function(req, res) {
  
  res.json({"MSG": "Bem vindo a Quitanda, favor Logar"})
  
});


const token_auth = 'j7wg2bXZsLfgqaINi7VaLw';


function AuthToken(req, res, next) {
  
  const authorizationHeader = req.headers.authorization;

  
  if (authorizationHeader) {
    
    const [authType, token] = authorizationHeader.split(' ');

    if (authType.startsWith('Bearer') && token === token_auth) {
      
      next();
      
    } 
    
    else {
      
      res.status(401).json({ error: 'Token inválido' });
      
    }
  } 
  
  else {
    
    res.status(401).json({ error: 'Token não fornecido' });
  
  }
}


app.post('/login', async function(req, res) {

  const { username, password } = req.body;

  usuario = req.body.username
  senha = req.body.password

  usuario_db = null
  
  usuario_db = await banco.executar_query(`SELECT usuario FROM usuarios WHERE usuario='${usuario}'`)

  
  if (usuario_db && usuario_db[0] && usuario_db[0].usuario === usuario) {

      senha_db = await banco.executar_query(`SELECT senha FROM usuarios WHERE usuario='${usuario}'`)
      
      if (senha_db[0].senha === senha) {    
          res.json({ token_auth }); 
      } 
      
      else {
          res.status(401).json({ error: 'Credenciais inválidas.' });
      }  
  }     
  else {
      res.status(401).json({ error: 'Credenciais inválidas.' });
  }
});


app.get('/produtos', AuthToken, async function(req, res) {

  produtos = await banco.executar_query(`select * from produtos`)
  
  res.json(produtos)
  
});


app.get('/produtos/:uid_produto', AuthToken, async function(req, res) {
  
  identificador = req.params.uid_produto
  
  list_produtos = await banco.executar_query(`select * from produtos where uid_produto=${identificador}`)
  
  res.json(list_produtos)
  
})


app.post('/cad_produto', AuthToken, async function(req, res) {

  cad_produto = req.body
  
  produto_cad = `insert into produtos (uid_produto, nome, quantidade, preco, descricao, categoria, tipo) values (${cad_produto.uid_produto},'${cad_produto.nome}', ${cad_produto.quantidade}, ${cad_produto.preco}, '${cad_produto.descricao}', '${cad_produto.categoria}', '${cad_produto.tipo}')`

  let inserir_produto = null
  
  inserir_produto = await banco.executar_query(produto_cad)

  if (inserir_produto != null) {
    
    res.json(req.body)
    
  } else {
    
    res.json({"erro": "Falha ao criar produto"})
    
  }
  
});


app.get('/usuarios', AuthToken, async function(req, res) {

  usuarios = await banco.executar_query(`select * from usuarios`)
  
  res.json(usuarios)
  
});


app.post('/cad_usuario', AuthToken, async function(req, res) {

  cad_usuario = req.body
  
  usuario_cad = `insert into usuarios (usuario, senha, acesso) values ('${cad_usuario.usuario}', '${cad_usuario.senha}', ${cad_usuario.acesso})`

  let inserir_usuario = null
  
  inserir_usuario = await banco.executar_query(usuario_cad)

  if (inserir_usuario != null) {
    
    res.json(req.body)
    
  } else {
    
    res.json({"erro": "Falha ao criar usuario"})
    
  }
  
});


app.get('/funcionarios', AuthToken, async function(req, res) {
  
  funcionarios = await banco.executar_query(`select * from funcionarios`)
  
  res.json(funcionarios)

});


app.get('/funcionarios/:cargo_funcionario', AuthToken, async function(req, res) {
  
  cargo = req.params.cargo_funcionario
  
  list_funcionarios = await banco.executar_query(`select * from funcionarios where cargo='${cargo}'`)
  
  res.json(list_funcionarios)
  
})

app.put('/estoque/compra/:uid', AuthToken, async function(req, res) {

  uid = req.params.uid
  est_compra = req.body

  
  db_quantidade_prod = await banco.executar_query(`select quantidade from produtos where uid_produto='${uid}'`)

  let quantidade_prod_str = db_quantidade_prod[0].quantidade.toString();

  let quantidade_prod_int = parseInt(quantidade_prod_str)

  att_quantidade_prod = quantidade_prod_int + est_compra.quantidade

  compra_est = `UPDATE produtos SET quantidade = ${att_quantidade_prod} WHERE uid_produto = ${uid};`
  
  let att_est_compra = null
  
  att_est_compra = await banco.executar_query(compra_est)

  compras = `insert into compras (uid_compra, produto, quantidade) values ('${uid}', '${est_compra.uid_produto}', ${est_compra.quantidade})`
    
  let att_compras = null
  
  att_compras = await banco.executar_query(compras)

  
  if (att_est_compra != null && att_compras != null) {
    
    res.json({"Sucesso": "Compra concluida"})
    
  } 
  
  else {
    
    res.json({"erro": "Falha ao realizar venda."})
    
  }
});


app.get('/compras', AuthToken, async function(req, res) {
  
  compras = await banco.executar_query(`select * from compras`)
  
  res.json(compras)

});


app.put('/estoque/venda/:uid_venda', AuthToken, async function(req, res) {

  
  uid = req.params.uid_venda
  est_venda = req.body

  db_quantidade_prod = await banco.executar_query(`SELECT quantidade FROM produtos WHERE uid_produto='${est_venda.uid_produto}'`)

  let quantidade_prod_int = parseInt(db_quantidade_prod[0].quantidade)

  att_quantidade_prod = quantidade_prod_int - est_venda.quantidade
  
  
  venda_est = `UPDATE produtos SET quantidade = ${att_quantidade_prod} WHERE uid_produto = ${est_venda.uid_produto};`
    
  let att_est_venda = null

  att_est_venda = await banco.executar_query(venda_est)

  vendas = `insert into vendas (uid_venda, produto, quantidade) values ('${uid}', '${est_venda.uid_produto}', ${est_venda.quantidade})`
    
  let att_vendas = null
  
  att_vendas = await banco.executar_query(vendas)

  db_nome_prod = await banco.executar_query(`select nome from produtos where uid_produto='${est_venda.uid_produto}'`)

  let nome_prod_str = db_nome_prod[0].nome.toString();
  
  db_preco_prod = await banco.executar_query(`select preco from produtos where uid_produto='${est_venda.uid_produto}'`)

  let preco_prod_float = parseFloat(db_preco_prod[0].preco)

  let fiscal_total = preco_prod_float * est_venda.quantidade
  
  let fiscal = {}

  fiscal.nome = nome_prod_str
  fiscal.quantidade = est_venda.quantidade
  fiscal.preco = preco_prod_float
  fiscal.total = fiscal_total.toFixed(2)

  
  if (att_est_venda != null && att_vendas != null ) {
  
    res.json(fiscal)
    
  } 
  
  else {
    
    res.json({"erro": "Falha ao realizar a venda."})
    
  }
  
});


app.get('/vendas', AuthToken, async function(req, res) {
  
  vendas = await banco.executar_query(`select * from vendas`)
  
  res.json(vendas)

});


app.get('/estoque', AuthToken, async function(req, res) {
  
  estoque = await banco.executar_query(`select * from estoque`)
  
  res.json(estoque)

});


app.delete('/produto/:uid', AuthToken, async function(req, res) {
  
  uid = req.params.uid

  delete_est = `DELETE from estoque WHERE produto = ${uid};`
    
  let att_est_delete = null
  
  att_est_delete = await banco.executar_query(delete_est)

  delete_prod = `DELETE from produtos WHERE uid_produto = ${uid};`
    
  let att_prod_delete = null
  
  att_prod_delete = await banco.executar_query(delete_prod)

  if (att_est_delete != null && att_prod_delete != null) {
    
    res.json({"MSG": "Deletado com sucesso"})
    
  } 
  
  else{

    res.json({"erro": "Falha ao deletar."})
    
  }
  
});


app.listen(port, () => {
  // Code.....
})