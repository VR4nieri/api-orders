# api-orders
CRUD de pedidos com Node.js e banco de dados MongoDB local

## Descrição
API RESTful para gerenciamento de pedidos, permitindo criar, ler, atualizar, deletar e listar pedidos.  
Construída com **Node.js**, **Express** e **MongoDB** usando **Mongoose**.

---

## Tecnologias
- Node.js  
- Express  
- MongoDB (local)  
- Mongoose  
- VS Code (com extensão REST Client para testar endpoints)

---

## Estrutura do Projeto

```text
api-orders/
├── index.js          # Arquivo principal da API com toda a lógica
├── package.json      # Lista de dependências e scripts
├── package-lock.json # Controle de versões das dependências
└── test.http         # Arquivo para testar todos os endpoints direto no VS Code
```
## Instalação e Configuração

Clone o projeto:

git clone https://github.com/VR4nieri/api-orders.git
cd api-orders

Instale as dependências:

```text
npm install
```


Certifique-se de que o MongoDB está rodando localmente (porta padrão: 27017).

Executando a API
node index.js

A API estará disponível em:

http://localhost:3000
Arquivo test.http no VS Code

O arquivo test.http permite testar a API diretamente no VS Code, sem precisar usar Postman.

### Passos:

Instale a extensão REST Client no VS Code.

Abra o arquivo test.http dentro do projeto.

Clique em “Send Request” acima de cada requisição para executar e ver a resposta.

Endpoints da API
```Criar um novo pedido
POST http://localhost:3000/order
Content-Type: application/json

{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```


### Obter pedido por ID
GET http://localhost:3000/order/v10089015vdb-01

### Atualizar pedido
```PUT http://localhost:3000/order/v10089015vdb-01
Content-Type: application/json

{
  "valorTotal": 12000,
  "items": [
    {
      "productId": 2434,
      "quantity": 2,
      "price": 6000
    }
  ]
}
```
### Deletar pedido
DELETE http://localhost:3000/order/v10089015vdb-01

### Listar todos os pedidos
GET http://localhost:3000/order/list

## Observações

Para instalar as dependências, use npm install.

A API utiliza MongoDB local (porta 27017).

Mensagens de erro são claras, e códigos HTTP são adequados para cada operação.

Todos os endpoints podem ser testados rapidamente usando o test.http no VS Code.
