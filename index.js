
// importando biblio
const express = require('express')
// conexao mysql
const mysql = require('mysql2')

// instanciando express
const app = express()
// definicao de porta
const port = 3000

// estabelecendo conexao mysql
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'm4y8$4q0L',
    database: 'sistema_noticias'
})

// estabelecendo conexao
connection.connect()

// criando serviço de hello world
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// busca categorias
app.get('/news-api/v1/categorias', (req, res) => {
    
    connection.query('SELECT id, nome FROM sistema_noticias.categoria', function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

// busca noticias
app.get('/news-api/v1/categorias/:categoriaId/noticias', (req, res) => {
    
    connection.query(`SELECT id, titulo FROM sistema_noticias.noticia WHERE id_categoria = ${req.params.categoriaId}`, function (err, rows, fields) {
        if (err) throw err
        res.send(rows)
    })
})

//busca uma noticia
app.get('/news-api/v1/categorias/:categoriaId/noticias/:noticiaId', (req, res) => {
    
    connection.query(`SELECT id, titulo, conteudo FROM sistema_noticias.noticia WHERE id_categoria = ${req.params.categoriaId} AND id = ${req.params.noticiaId}`, function (err, rows, fields) {
        if (err) throw err
        res.send(rows[0]) //sempre retorna array. selecioando o primeiro objeto
    })
})

// subindo servidor node
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// PADRAO ARQUITETURAS
// view - visual
// controller - controla fluxo
// model - busca no BD