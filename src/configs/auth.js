module.exports = {
    jwt: {
        secret: process.env.AUTH_SECRET || df846bc0514af8ef87,
        expiresIn: "3d"
    }
}