const Database = require('../database/Database');

class ProductController extends Database{
    
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

        async listarProduto(request, response){
            try {
                const id = request.params.id
                const produtos = await this.database.query(`select p.*, c.name 
                from products p
                inner join categories c on p.category_id
                where p.id = $1`, [id])
                if(produtos.rows[0]=== 0){
                    response.status(404).json({mensagem: "ID não encontrado"})
                }
                    response.status(200).json(produtos.rows[0])
            } catch (error) {
                console.error('Erro ao listar produto:', error);
                response.status(500).json({mensagem: "Não foi possível listar o produto"})
            }
        }
}

module.exports = new ProductController();