describe('Modificacion de datos de usuario', () => {
    let userData;
    let authToken;

    const updateData = {
        "firstName": "NewUser",
        "lastName": "WithNewLastname",
        "email": "luci@gmail.com",
        "password": "123456789"
    };

    before(() => {
        // Carga los datos del archivo JSON
        cy.fixture('userData.json').then((data) => {
            userData = data;
        });
    });

    beforeEach(() => {
        // Simula el ingreso del usuario
        cy.visit('https://thinking-tester-contact-list.herokuapp.com/login');

        // Asegúrate de que los campos existan y estén visibles
        cy.get('#email').should('be.visible').type(userData.email);
        cy.get('#password').should('be.visible').type(userData.password);

        // Enviar el formulario
        cy.get('#submit').should('be.visible').click();

        // Después de enviar el formulario, obtenemos el token
        cy.request({
            method: 'POST',
            url: 'https://thinking-tester-contact-list.herokuapp.com/users/login',
            body: {
                email: userData.email,
                password: userData.password
            },
            failOnStatusCode: false
        }).then((response) => {
            // Verificamos la respuesta y asignamos el token
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
            authToken = response.body.token;
        });
    });

    it('modifica el usuario cargado', () => {
        // Realiza la solicitud PATCH para modificar los datos del usuario
        cy.request({
            method: 'PATCH',
            url: 'https://thinking-tester-contact-list.herokuapp.com/users/me',
            headers: {
                'Authorization': `Bearer ${authToken}` // Usa el token para autenticar la solicitud
            },
            body: updateData,
            failOnStatusCode: false
        }).then((response) => {

            // Verifica la respuesta
            expect(response.status).to.eq(200); // Código de status esperado
            expect(response.body).to.have.property('_id'); // Verifica que existe la propiedad _id
            expect(response.body.firstName).to.eq(updateData.firstName); // Verifica que el nombre fue actualizado
            expect(response.body.lastName).to.eq(updateData.lastName); // Verifica que el apellido fue actualizado
            expect(response.body.email).to.eq(updateData.email); // Verifica que el email fue actualizado
        });
    });
});
