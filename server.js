const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const db = require("./database"); // seu arquivo de banco de dados

const app = express();
const PORT = 3000;

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json());

// ROTA DE CADASTRO
app.post("/cadastro", (req, res) => {
    const { nome, email, senha } = req.body;

    // Verificar campos vazios
    if (!nome || !email || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Verificar se e-mail já foi cadastrado
    db.get("SELECT email FROM users WHERE email = ?", [email], async (err, row) => {
        if (row) {
            return res.status(400).json({ error: "E-mail já cadastrado." });
        }

        // Criptografar a senha
        const hash = await bcrypt.hash(senha, 10);

        // Inserir no banco
        db.run(
            "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)",
            [nome, email, hash],
            (erro) => {
                if (erro) {
                    return res.status(500).json({ error: "Erro ao cadastrar usuário." });
                }

                return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
            }
        );
    });
});

// ROTA DE LOGIN
app.post("/login", (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: "Preencha todos os campos." });
    }

    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
        if (!user) {
            return res.status(400).json({ error: "E-mail não encontrado." });
        }

        // Comparar senha com o hash
        const senhaCorreta = await bcrypt.compare(senha, user.senha);

        if (!senhaCorreta) {
            return res.status(400).json({ error: "Senha incorreta." });
        }

        res.json({ message: "Login realizado com sucesso!" });
    });
});

// INICIAR SERVIDOR
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
