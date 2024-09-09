describe('Prueba de Cierre de Sesión', () => {
    beforeEach(() => {
        // Prepara el estado inicial: Iniciar sesión antes de cada prueba
        cy.visit('https://thinking-tester-contact-list.herokuapp.com/login');

        // Asegúrate de que la página haya cargado
        cy.url().should('include', '/login');
        
        // Espera explícita para asegurar que el campo de email esté presente
        cy.get('input[name="email"]', { timeout: 10000 }).should('be.visible').type('usuario@example.com');
        cy.get('input[name="password"]').should('be.visible').type('password');
        cy.get('button[type="submit"]').should('be.visible').click();

        // Verifica que el usuario haya iniciado sesión correctamente
        cy.url().should('include', '/contactList'); // Asegúrate de que la URL correcta esté presente
        cy.contains('Contact List').should('be.visible'); // Verifica que la lista de contactos sea visible
    });

    it('Debería cerrar la sesión correctamente', () => {
        // Simula el clic en el botón de cerrar sesión
        cy.get('button#logoutButton').should('be.visible').click();

        // Verifica que el usuario sea redirigido a la página de inicio de sesión
        cy.url().should('include', '/login');

        // Verifica que el token haya sido eliminado de localStorage (si aplica)
        cy.window().then((window) => {
            expect(window.localStorage.getItem('token')).to.be.null;
        });
    });
});
