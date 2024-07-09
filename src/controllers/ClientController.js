
const Database = require('../database/Database');


class ClientController extends Database {

    async cadastrar(request, response){
       try {
        const dados = request.body
       
        await this.database.query(`
        Insert into clients(name, email, cpf, contact)
        values ($1, $2, $3, $4) returning *`, 
        [dados.name, dados.email, dados.cpf, dados.contact])
        response.status(201).json({mensagem:"Cliente cadastrado com sucesso!"})
    } catch (error) {
        console.error('Erro ao cadastrar cliente:', error);
        response.status(500).json({mensagem:"Não possível cadastrar cliente!"})
       } 
    }
}


module.exports = new ClientController()