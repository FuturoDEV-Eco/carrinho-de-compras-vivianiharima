const Database = require("../database/Database");

class OrderController extends Database {

    async cadastrar(request, response) {
        try {
        const dados = request.body;


        if(!dados.products || !dados.amount && dados.amount !== 0 || !dados.client_id || !dados.address){
            response.status(400).json({mensagem:"Produto, quantidade e dados do cliente são obrigatórios."})
        }
        
       

        let total = 0;

        for (let i = 0; i < dados.products.length; i++) {
            const item = dados.products[i];
            const produtoAtual = await this.database.query(`
                SELECT price FROM products 
                WHERE id = $1
            `, [item.product_id]);

            total = total + (produtoAtual.rows[0].price * item.amount);
        }

        // INSERIR o pedido 
        const meuPedido = await this.database.query(`
            INSERT INTO orders (client_id, address, observations, total)
            values ($1,$2,$3,$4)
            returning *
            `, [dados.client_id, dados.address, dados.observations, 1000])

        // INSERIR os items
        dados.products.forEach(async item => {
            const produtoAtual = await this.database.query(`
                SELECT price from products 
                where id = $1
                `, [item.product_id])

            this.database.query(`
                INSERT INTO orders_items (order_id, product_id, amount, price)
                values ($1,$2,$3,$4)
                returning *
                `, [
                meuPedido.rows[0].id,
                item.product_id,
                item.amount,
                produtoAtual.rows[0].price
            ])
        })
      
        response.status(201).json({mensagem: 'criado com sucesso'})

        }catch (error) {
            console.error('Erro ao listar produto:', error);
            response.status(500).json({mensagem: "Não foi possível cadastrar pedido"})
        }

    }
}

module.exports = new OrderController ();