const { hash, compare} = require("bcryptjs")
const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")

const UserRepository = require("../repositories/UserRepository")

class UsersController {
    async create (request, response) {
    const {name, email, password} = request.body

    const userRepository = new UserRepository()
    
    const checkUsersExists = await userRepository.findByEmail(email)

    if (checkUsersExists){
        throw new AppError("Este e-mail já está em uso.")
    }

    const hashedPassword = await hash(password, 8)

    await userRepository.create({name, email, password: hashedPassword})

    return response.status(201).json();
    
    }

    async update (request, response) {
        const {name, email, password, old_password} = request.body //requisição do Usuario na Pagina
        //const { id } =  request.params //vai pegar como parametro na URL
        const user_id = request.user.id;

        const database = await sqliteConnection(); // Estabelece conexão com o Banco de Dados
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id]) //Pega usuário pelo ID
        
        if (!user) { // Trada o erro caso o usuário não exista
            throw new AppError("Usuário não encontrado")
        }

        // Trada o erro caso o novo e-mail já exista
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Este e-mail já está em uso")
        }

        user.name = name ?? user.name; // esse ?? funciona como "é esse ou esse", caso não tenha um novo name, constinua sendo o user.name antigo
        user.email = email ?? user.email;

        if( password && !old_password){ //Trata erro caso não informe a senha antiga
            throw new AppError("Você precisa informar a senha antiga")
        }

        if(password && old_password){ // Usa o "Compare" do bcryptjs para conferir se a senha bate
            const checkOldPassword = await compare(old_password, user.password)

            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere")
            }

            user.password = await hash(password, 8) //Altera a senha
        }

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, user.password, user_id]
        );

        return response.json();
    }

    async delete(request, response) {
        const  { id } = request.params
    
        await knex("users").where({id}).delete()
    
        return response.json()
      }
}


module.exports = UsersController