const Database = require('../database/Database');

class ProductsController extends Database{
    
        async cadastrar (request, response){
            try{
        const dados = request.body

        await this.database.query(`
        Insert into products (name, color, voltage, description, caregory_id)
        values ($1, $2, $3, $4, $5) returning *`, 
        [dados.name, dados.amount, dados.color, dados.voltage, dados.description, dados.category_id])
        response.status(201).json({mensagem: "Produto cadastrado"})
            }
         catch(error){
            console.error('Erro ao cadastrar cliente:', error);
            response.status(500).json({mensagem:"Não possível cadastrar cliente!"})
            }
        }


        async listarTodos (request, response){
            try {
                const dados = request.body
                const products = await this.database.query(`Select * from products`)
                response.status(200).json(products.rows)
            } catch (error) {
                console.error('Erro ao cadastrar cliente:', error);
                response.status(500).json({mensagem:"Não possível listar os produtos"})
            }
        }
}

module.exports = new ProductsController();