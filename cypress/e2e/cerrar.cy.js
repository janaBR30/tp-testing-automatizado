describe('Prueba de Cierre de Sesión', () => {
    beforeEach(() => {
        // Simula el ingreso del usuario
        cy.visit('https://thinking-tester-contact-list.herokuapp.com/login');
        
        // Asegúrate de que los campos existan y estén visibles
        cy.get('#email').should('be.visible').type('usuario@example.com');
        cy.get('#password').should('be.visible').type('password');
        
        // Enviar el formulario
        cy.get('#submit').should('be.visible').click();

        // Espera a que la página se cargue y redirija correctamente
        cy.url().should('include', '/contactList');
        cy.contains('Contact List').should('be.visible');
    });

    it('Debería cerrar la sesión correctamente', () => {
        // Simula el clic en el botón de cerrar sesión
        cy.get('button#logout').click();

        // Espera a que la página se redirija a la página de inicio de sesión
        cy.url().should('include', '/login');

        // Verifica que el token haya sido eliminado de localStorage
        cy.window().then((window) => {
            expect(window.localStorage.getItem('token')).to.be.null;
        });
    });
});






