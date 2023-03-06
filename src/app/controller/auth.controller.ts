import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { query } from "../db/database";
import { generateTokens } from "../utils/autenticateToken.utils";

export const register = async (req: Request, res: Response) => {
  const { username, nome, email, phonenumber, password } = req.body;
  
    if (!username || !nome || !email || !phonenumber || !password) {
      return res.status(422).json({ message: "Preencha todos os campos" });
    }
    
    const user: any = await query("SELECT * FROM Usuários WHERE username=?", [
      username,
    ]);

    if (user.length > 0) {
      return res
      .status(400)
      .json({ message: "Não foi possivel cadastrar o usuario" });
    }
    
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);    
    const createdAt = new Date();
    await query(
      "INSERT INTO Usuários (username, nome, email, phonenumber, password, createdAt) VALUES (?, ?, ?, ?, ?, ?)",
      [username, nome, email, phonenumber, hash, createdAt]
      )
      .then((result) => {
        return res
        .status(201)
        .json({ message: "Usuário criado com sucesso" });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ message: err });
      });
      try {
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  };
  
  export const login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
    if (!username || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    let user: any = await query("SELECT * FROM Usuários WHERE username=?", [
      username,
    ]);

    if (user.length === 0) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    user = JSON.parse(JSON.stringify(user[0]));
    
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(400).json({ message: "Senha incorreta" });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // tempo de vida de 7 dias
    });

    return res.status(200).json({ accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const refreshAccessToken = (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.sendStatus(401);
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET!,
    (err: any, payload: any) => {
      if (err) {
        return res.sendStatus(403);
      }
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m",
      });
      res.json({ accessToken });
    }
  );
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Logout realizado com sucesso" });
};

export default { register, refreshAccessToken, logout, login };
