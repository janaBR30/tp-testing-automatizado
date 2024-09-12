describe('Registro de Usuario a través de la API', () => {
    it('Debe mostrar un error si la contraseña es menor a 7 caracteres', () => {
        // Genera un email único usando un timestamp
        const uniqueEmail = `usuario_invalido_${Date.now()}@mail.com`;
        
        // Define los datos del nuevo usuario con una contraseña menor a 7 caracteres
        const userData = {
            firstName: 'Test',
            lastName: 'User',
            email: uniqueEmail,
            password: '1234' // Contraseña de menos de 7 caracteres
        };

        // Realiza una llamada a la API para registrar el usuario
        cy.request({
            method: 'POST',
            url: 'https://thinking-tester-contact-list.herokuapp.com/users',
            body: userData,
            failOnStatusCode: false // No falla el test en caso de código de estado 4xx o 5xx
        }).then((response) => {
            // Verifica si el estado es 400 (bad request)
            expect(response.status).to.eq(400);

            // Verifica si la respuesta contiene el mensaje de error correcto
            expect(response.body).to.have.property('message').and.to.include(
                'User validation failed: password: Path `password` (`1234`) is shorter than the minimum allowed length (7).'
            );

            // Imprime la respuesta para ver qué propiedades están disponibles
            cy.log(JSON.stringify(response.body)); // Para depuración
        });
    });
});
