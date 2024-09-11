describe('crear un usuario con un email ya existente', () => {

    const userData = {
        firstName : "TestUser",
        lastName : "TestLastname",
        email : "TestNewmail@mail.com",
        password : "P4ss-.-"
    };
    const newUserData ={
        firstName : "TestNewUser",
        lastName : "TestNewLastname",
        email : "TestNewmail@mail.com",
        password : "ñewP4ss-.-"
    };

    before(() => {
        // Regsitro el usuario
        cy.request({
            method: 'POST',
            url: 'https://thinking-tester-contact-list.herokuapp.com/users',
            body: userData,
            failOnStatusCode: false // Opcional, si no deseas fallar en el estado 4xx
        }).then((response) => {
            // Verifica si el estado es 201 (creación exitosa)
            expect(response.status).to.eq(201);

        })
    });

    it('Creo otro usuario con el mismo email', () => {
        // Realiza la solicitud PATCH para modificar los datos del usuario
        cy.request({
            method: 'POST',
            url: 'https://thinking-tester-contact-list.herokuapp.com/users',
            body: newUserData,
            failOnStatusCode: false
        }).then((response) => {

            // Verifica la respuesta
            expect(response.status).to.eq(400); // Código de status esperado
        });
    });
});
