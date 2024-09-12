describe('Login con password incorrecto', () => {
  it('Debe dar status code 401 por usar un password incorrecto', () => {
    cy.readFile('cypress/fixtures/userData.json').then((userData) => {
      const loginData = {
        email: userData.email,  // Usa el email del JSON
        password: 'test1234' // password incorrecto para forzar el fallo
      };

      // Realiza la llamada a la API para hacer login
      cy.request({
        method: 'POST',
        url: 'https://thinking-tester-contact-list.herokuapp.com/users/login',
        body: loginData,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
    })
  })
})