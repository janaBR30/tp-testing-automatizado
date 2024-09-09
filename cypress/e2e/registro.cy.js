describe('Registro de Usuario a través de la API', () => {
    it('Debe registrar un nuevo usuario con éxito y redirigir a la lista de contactos', () => {
        // Genera un email único usando un timestamp
        const uniqueEmail = `nuevo_usuario_${Date.now()}@mail.com`;
        
        // Define los datos del nuevo usuario
        const userData = {
            firstName: 'Test',
            lastName: 'User',
            email: uniqueEmail,
            password: 'contraseña123'
        };

        // Realiza una llamada a la API para registrar el usuario
        cy.request({
            method: 'POST',
            url: 'https://thinking-tester-contact-list.herokuapp.com/users',
            body: userData,
            failOnStatusCode: false // Opcional, si no deseas fallar en el estado 4xx
        }).then((response) => {
            // Verifica si el estado es 201 (creación exitosa)
            expect(response.status).to.eq(201);
            // Imprime la respuesta para ver qué propiedades están disponibles
            cy.log(JSON.stringify(response.body)); // Para depuración

            // Verifica si la respuesta contiene las propiedades 'user' y 'token'
            expect(response.body).to.have.property('user');
            expect(response.body).to.have.property('token');

            // Guarda el token para autenticación futura
            const token = response.body.token;

            // Realiza la llamada a la página de la lista de contactos
            cy.visit('https://thinking-tester-contact-list.herokuapp.com/contactList', {
                onBeforeLoad: (win) => {
                    // Agrega el token al almacenamiento local
                    win.localStorage.setItem('token', token);
                }
            });

            // Verifica si la página fue cargada correctamente
            cy.url().should('include', '/contactList'); // Verifica que la URL contenga '/contactList'
            cy.contains('Contact List').should('be.visible'); // Verifica que el título 'Contact List' sea visible
            cy.contains('Add a New Contact').should('be.visible'); // Verifica que el botón para agregar un nuevo contacto sea visible
        });
    });
});





  