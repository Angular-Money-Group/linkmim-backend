export const logout = {
    post: {
        tags: ["Auth"],
        summary: "Logout",
        description: "Logout",
        operationId: "logout",

        responses: {
            200: {
                description: "Logout realizado com sucesso",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/genericResponse",
                        },
                    },
                },
            },
        },
    },
}