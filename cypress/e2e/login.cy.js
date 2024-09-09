describe('Login de Usuario a través de la API', () => {
    it('Debe hacer login con éxito usando el email registrado', () => {
        // Lee los datos del usuario del archivo JSON
        cy.readFile('cypress/fixtures/userData.json').then((userData) => {
            const loginData = {
                email: userData.email,  // Usa el email del JSON
                password: userData.password // Asegúrate de que la contraseña sea la correcta
            };

            // Realiza la llamada a la API para hacer login
            cy.request({
                method: 'POST',
                url: 'https://thinking-tester-contact-list.herokuapp.com/users/login',
                body: loginData,
                failOnStatusCode: false
            }).then((response) => {
                // Verifica si el estado es 200 (login exitoso)
                expect(response.status).to.eq(200);

                // Verifica si la respuesta contiene las propiedades 'user' y 'token'
                expect(response.body).to.have.property('user');
                expect(response.body).to.have.property('token');

                const token = response.body.token;

                // Realiza la llamada a la página de la lista de contactos
                cy.visit('https://thinking-tester-contact-list.herokuapp.com/contactList', {
                    onBeforeLoad: (win) => {
                        win.localStorage.setItem('token', token); // Agrega el token al almacenamiento local
                    }
                });

                cy.url().should('include', '/contactList');
                cy.contains('Contact List').should('be.visible');
                cy.contains('Add a New Contact').should('be.visible');
            });
        });
    });
});









