    const UserCreateService = require("./UserCreateService")
    
    it("user should be create", () => {
      const user = {
        name: "User Test",
        email: "user@test.com",
        password: "123"
      }

    const userCreateService = new UserCreateService
    const userCreated =  userCreateService.execute(user)  //tinha await

    expect(userCreated).toHaveProperty("id")
    }) 