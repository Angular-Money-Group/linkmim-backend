export const login = {
    post: {
        tags: ["Auth"],
        summary: "Login",
        description: "Login",
        operationId: "login",
        requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/loginRequest",
                },
              },
            },
        },
        responses: {
            200: {
                description: "Login realizado com sucesso",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/loginResponse",
                        },
                    },
                },
            },
            400: {
                description: "Preencha todos os campos",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/genericError",
                        },
                    },
                },
            },
            401: {
                description: "Usuário não encontrado",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/genericError",
                        },
                    },
                },
            },
        }
    }
};

export default { login };
