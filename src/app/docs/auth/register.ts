export const register = {
    post: {
        tags: ["Auth"],
        summary: "Register",
        description: "Register",
        operationId: "register",
        requestBody: {
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/registerRequest",
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
                            $ref: "#/components/schemas/genericResponse",
                        },
                    },
                },
            },
            400: {
                description: "Não foi possivel cadastrar o usuario",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/genericError",
                        },
                    },
                },
            },
            422 :{
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
            500: {
                description: "Erro interno do servidor",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/genericError",
                        },
                    },
                },
            }
        }
    }
};

export default { register };