const jsonServer = require('json-server');
const express = require("express");
const fs = require("fs");
const app =express();

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8080;
server.use(middlewares);
//server.use('/api/v1', middlewares)
server.use(jsonServer.bodyParser); //coloquei parar ver se mantém os dados
//server.use('/api/v1', router)
server.use(router);
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`JSON Server is running in ${port}`);
});


//rotas
app.get("/conversao",(req,res)=>{
    res.send(conversao());
});

app.get("/delete",(req,res)=>{
  zeradados();
  res.send("dados apagados");
});

app.listen(port,()=>{
  console.log("servidor online");
})


//funcoes
function conversao(){
   let dadosJoson = fs.readFileSync("./db.json",{encoding: 'utf-8'});
   let dadosrecebidos = JSON.parse(dadosJoson);
  
  const dados = [];
  for(let ele of  dadosrecebidos["entrada"]){
    for(let el in ele){
      if(el != "id"){
          dados.push(el)
      }
  }
  }
 
   return dados;
}

function zeradados(){
  const dados = [{
    "entrada": [
        {
          "id": 1,
          "teste": "teste"
        }
      ]
    }];
  fs.writeFileSync("./db.json",JSON.stringify(dados[0]),{encoding: 'utf-8'});
}

