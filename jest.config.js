module.exports = {
  bail: true, // Se um teste der erro ele para todos os testes
  coverageProvider: "v8",

  testMatch: [
    "<rootDir>/src/**/*.spec.js" // Ignora todos arquivos e vão direto nos arquivos de teste
//  "             **/*.teste.js pode ser usado assim tambem"
//  <rootDir>/src/ pede para ele ir direto para pasta src, ignorando o resto no caso o node_modules
  ]
}