describe('Prueba de Cierre de Sesión', () => {
    beforeEach(() => {
        // Prepara el estado inicial: Iniciar sesión antes de cada prueba
        cy.visit('https://thinking-tester-contact-list.herokuapp.com/login');
        
        // Simula el ingreso del usuario
        cy.get('input[name="email"]').type('usuario@example.com');
        cy.get('input[name="password"]').type('password');
        cy.get('button[type="submit"]').click();

        // Verifica que el usuario haya iniciado sesión correctamente
        cy.url().should('include', '/dashboard');
    });

    it('Debería cerrar la sesión correctamente', () => {
        // Simula el clic en el botón de cerrar sesión
        cy.get('button#logoutButton').click();

        // Verifica que el usuario sea redirigido a la página de inicio de sesión
        cy.url().should('include', '/login');

        // Verifica que el token haya sido eliminado de localStorage (si aplica)
        cy.window().then((window) => {
            expect(window.localStorage.getItem('token')).to.be.null;
        });
    });
});