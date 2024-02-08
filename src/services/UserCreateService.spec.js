const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory") //Importa
const AppError = require("../utils/AppError")

describe("UserCreateService", () => {

  it("user should be create", async () => {
    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }
  
  const userRepositoryInMemory = new UserRepositoryInMemory() // Instancia
  const userCreateService = new UserCreateService(userRepositoryInMemory) // Passa aqui
  const userCreated = await userCreateService.execute(user)  
  
  console.log(userCreated)
  expect(userCreated).toHaveProperty("id")
  }) 

  it("user not should be create with exists email", async() => {
    const user1 = {
      name: "User Teste 1",
      email: "user@teste.com",
      password: "123"
    }

    const user2 = {
      name: "User Teste 2",
      email: "user@teste.com",
      password: "456"
    }

    const userRepository = new UserRepositoryInMemory()
    const userCreateService = new UserCreateService(userRepository)

    await userCreateService.execute(user1)
    await expect(userCreateService.execute(user2)).rejects.toEqual( new AppError("Este e-mail já está em uso."))
  })
})