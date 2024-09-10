describe('Prueba de Cierre de Sesión', () => {
    let userData;

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

        // Verifica que la página haya cargado correctamente usando elementos visibles
        cy.contains('Contact List').should('be.visible'); // Verifica que el título 'Contact List' sea visible
        cy.contains('Add a New Contact').should('be.visible'); // Verifica que el botón para agregar un nuevo contacto sea visible
    });

    it('Debería cerrar la sesión correctamente', () => {
        // Simula el clic en el botón de cerrar sesión
        cy.get('button#logout').click();

        // Verifica que el usuario sea redirigido a la página de inicio de sesión
        cy.url().should('include', '/');

        // Verifica que el token haya sido eliminado de localStorage
        cy.window().then((window) => {
            expect(window.localStorage.getItem('token')).to.be.null;
        });
    });
});








