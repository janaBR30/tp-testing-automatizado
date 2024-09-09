describe('Prueba de Cierre de Sesión', () => {
    before(() => {
        // Registra un nuevo usuario antes de las pruebas
        const uniqueEmail = `usuario_${Date.now()}@example.com`;

        cy.request('POST', 'https://thinking-tester-contact-list.herokuapp.com/users', {
            firstName: 'Test',
            lastName: 'User',
            email: uniqueEmail,
            password: 'password'
        }).then((response) => {
            expect(response.status).to.eq(201); // Asegura que el registro fue exitoso
        });
    });

    beforeEach(() => {
        cy.visit('https://thinking-tester-contact-list.herokuapp.com/login');

        // Inicia sesión con las credenciales registradas
        cy.get('#email').type('usuario@example.com');
        cy.get('#password').type('password');
        cy.get('#submit').click();

        cy.url().should('include', '/contactList'); // Asegúrate de que el login fue exitoso
    });

    it('Debería cerrar la sesión correctamente', () => {
        cy.get('button#logoutButton').click();
        cy.url().should('include', '/login');
        cy.window().then((window) => {
            expect(window.localStorage.getItem('token')).to.be.null;
        });
    });
});

