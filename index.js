/**
 * API para gerenciamento de pedidos
 * Tecnologias: Node.js, Express e MongoDB (Mongoose)
 * Funcionalidades: Criar, Obter, Atualizar, Deletar e Listar pedidos
 */

const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ===========================================
// Conexão com MongoDB local
// ===========================================
mongoose.connect("mongodb://localhost:27017/ordersdb")
  .then(() => console.log("MongoDB conectado com sucesso"))
  .catch(err => console.log("Erro ao conectar no MongoDB:", err));

// ===========================================
// Definição do Schema e Modelo de Pedido
// ===========================================
const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  value: { type: Number, required: true },
  creationDate: { type: Date, required: true },
  items: [
    {
      productId: { type: Number, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ]
});

const Order = mongoose.model("Order", orderSchema);

// ===========================================
// Endpoints
// ===========================================

/**
 * Criar um novo pedido
 * Método: POST
 * URL: /order
 * Body esperado (JSON):
 * {
 *   "numeroPedido": "string",
 *   "valorTotal": number,
 *   "dataCriacao": "ISO date string",
 *   "items": [
 *     {
 *       "idItem": number,
 *       "quantidadeItem": number,
 *       "valorItem": number
 *     }
 *   ]
 * }
 */
app.post("/order", async (req, res) => {
  try {
    const data = req.body;

    const order = new Order({
      orderId: data.numeroPedido,
      value: data.valorTotal,
      creationDate: new Date(data.dataCriacao),
      items: data.items.map(item => ({
        productId: Number(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem
      }))
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao criar pedido" });
  }
});

/**
 * Obter pedido pelo número
 * Método: GET
 * URL: /order/:id
 * Params:
 *   id -> número do pedido (orderId)
 */
app.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) return res.status(404).json({ message: "Pedido não encontrado" });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar pedido" });
  }
});

/**
 * Atualizar pedido existente
 * Método: PUT
 * URL: /order/:id
 * Params:
 *   id -> número do pedido (orderId)
 * Body esperado (JSON):
 * {
 *   "valorTotal": number, // opcional
 *   "items": [            // opcional
 *     {
 *       "productId": number,
 *       "quantity": number,
 *       "price": number
 *     }
 *   ]
 * }
 */
app.put("/order/:id", async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) return res.status(404).json({ message: "Pedido não encontrado" });

    if (req.body.valorTotal) order.value = req.body.valorTotal;
    if (req.body.items) {
      order.items = req.body.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      }));
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar pedido" });
  }
});

/**
 * Deletar pedido
 * Método: DELETE
 * URL: /order/:id
 * Params:
 *   id -> número do pedido (orderId)
 */
app.delete("/order/:id", async (req, res) => {
  try {
    const deleted = await Order.deleteOne({ orderId: req.params.id });
    if (deleted.deletedCount === 0) return res.status(404).json({ message: "Pedido não encontrado" });
    res.json({ message: "Pedido deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar pedido" });
  }
});

/**
 * Listar todos os pedidos
 * Método: GET
 * URL: /order/list
 */
app.get("/order/list", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar pedidos" });
  }
});

// ===========================================
// Inicializar servidor
// ===========================================
app.listen(3000, () => {
  console.log("API rodando em http://localhost:3000");
});
