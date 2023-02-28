import { Request, Response } from "express";
import { query } from "../db/database";

export const getLinks = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user: any = await query("SELECT * FROM Usuários WHERE id=?", [id]);

        if (user.length === 0) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }

        const links: any = await query("SELECT Links.*, Usuários.* FROM Links JOIN Usuários ON Links.id = Usuários.linksId WHERE Links.id = ?", [id]);

        return res.status(200).json(links);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}
export const createLink = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { titulo, link } = req.body;
        const user: any = await query("SELECT * FROM Usuários WHERE id=?", [id]);

        if (user.length === 0) {
            return res.status(400).json({ message: "Usuário não encontrado" });
        }

        if(user.isPremium === 0) {
            const links: any = await query("SELECT Links.*, Usuários.* FROM Links JOIN Usuários ON Links.id = Usuários.linksId WHERE Links.id = ?", [id]);
            if(links.length >= 3) {
                return res.status(400).json({ message: "Você atingiu o limite de links gratuitos" });
            }
        }

        await query("INSERT INTO Links (Titulo, link, createdAt, isActive) VALUES (?, ?, ?, ?)", [titulo, link, new Date(), 1]).then(async (result: any) => {
            const idLink = result.insertId;
            await query("UPDATE Usuários SET linksId = ? WHERE id = ?", [idLink, id]);
        });

        return res.status(200).json({ message: "Link criado com sucesso" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

export const updateLink = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { titulo, link, isActive } = req.body;
        const links: any = await query("SELECT * FROM Links WHERE id=?", [id]);

        if (links.length === 0) {
            return res.status(400).json({ message: "Link não encontrado" });
        }

        if (titulo) {
            await query("UPDATE Links SET titulo=? WHERE id=?", [titulo, id]);
        }
        
        if (link) {
            await query("UPDATE Links SET link=? WHERE id=?", [link, id]);
        }
        
        if (isActive) {
            await query("UPDATE Links SET isActive=? WHERE id=?", [isActive, id]);
        }

        return res.status(200).json({ message: "Link atualizado com sucesso" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

export const deleteLink = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const links: any = await query("SELECT * FROM Links WHERE id=?", [id]);

        if (links.length === 0) {
            return res.status(400).json({ message: "Link não encontrado" });
        }

        await query("DELETE FROM Links WHERE id=?", [id]);

        return res.status(200).json({ message: "Link deletado com sucesso" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}