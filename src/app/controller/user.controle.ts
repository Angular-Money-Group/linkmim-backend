import { Request, Response } from "express";
import { query } from "../db/database";
import  bcrypt  from "bcrypt";

export const getUserInfo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user: any = await query("SELECT * FROM Usuários WHERE id=?", [id]);
        if (user.length === 0) {
        return res.status(400).json({ message: "Usuário não encontrado" });
        }
        delete user[0].password;
        delete user[0].isPremium;

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

export const updateUserInfo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nome, username, email, phonenumber, password } = req.body;
        const user: any = await query("SELECT * FROM Usuários WHERE id=?", [id]);
        if (user.length === 0) {
        return res.status(400).json({ message: "Usuário não encontrado" });
        }
        if (nome) {
        await query("UPDATE Usuários SET nome=? WHERE id=?", [nome, id]);
        }
        if (username) {
        await query("UPDATE Usuários SET username=? WHERE id=?", [username, id]);
        }
        if (email) {
        await query("UPDATE Usuários SET email=? WHERE id=?", [email, id]);
        }
        if (phonenumber) {
        await query("UPDATE Usuários SET phonenumber=? WHERE id=?", [
            phonenumber,
            id,
        ]);
        }
        if (password) {
        const salt = await bcrypt.genSalt(32);
        const hash = await bcrypt.hash(password, salt);
        await query("UPDATE Usuários SET password=? WHERE id=?", [hash, id]);
        }
        return res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user: any = await query("SELECT * FROM Usuários WHERE id=?", [id]);
        if (user.length === 0) {
        return res.status(400).json({ message: "Usuário não encontrado" });
        }
        await query("DELETE FROM Usuários WHERE id=?", [id]);
        return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}

export const getPremium = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user: any = await query("SELECT * FROM Usuários WHERE id=?", [id]);
        if (user.length === 0) {
        return res.status(400).json({ message: "Usuário não encontrado" });
        }
        await query("UPDATE Usuários SET isPremium=1 WHERE id=?", [id]);
        return res.status(200).json({ message: "Usuário agora é premium" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }
}