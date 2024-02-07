const UserCreateService = require("./UserCreateService")
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory") //Importa

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
})