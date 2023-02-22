export const schemas = {
    components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        schemas: {
            loginRequest: {
                type: "object",
                properties: {
                    email: {
                        type: "string",
                        example: "teste@teste.com.br",
                    },
                    password: {
                        type: "string",
                        example: "123456",
                    },
                },
            },
            loginResponse: {
                type: "object",
                properties: {
                    token: {
                        type: "string",
                        exemple: "token",
                    },
                },
            },

            registerRequest: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        example: "Teste",
                    },
                    username: {
                        type: "string",
                        example: "teste",
                    },
                    phonenumber: {
                        type: "string",
                        example: "11999999999",
                    },
                    email: {
                        type: "string",
                        example: "teste@teste.com.br"
                    },
                    password: {
                        type: "string",
                        example: "123456",
                    },
                },
            },

            genericResponse: {
                type: "object", // data type
                properties: {
                  message: {
                    type: "string", // data type
                    description: "Mensagem de sucesso", // desc
                    example: "Venda realizada com sucesso", // example of a completed value
                  },
                },
              },
              genericError: {
                type: "object", // data type
                properties: {
                  message: {
                    type: "string", // data type
                    description: "Mensagem de erro", // desc
                    example: "Generic Error", // example of a completed value
                  },
                },
              },
        },
    },
};
//
export default { schemas };