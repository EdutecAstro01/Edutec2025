const form = document.getElementById("form-cadastro");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!nome || !sobrenome || !email || !senha) {
        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "rgb(255, 80, 80)";
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3000/cadastro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome: nome + " " + sobrenome,
                email,
                senha
            })
        });

        const data = await resposta.json();

        if (!resposta.ok) {
            mensagem.textContent = data.error;
            mensagem.style.color = "rgb(255, 80, 80)";
        } else {
            mensagem.textContent = "Cadastro realizado com sucesso!";
            mensagem.style.color = "rgb(80, 255, 120)";
            form.reset();
        }

    } catch (err) {
        mensagem.textContent = "Erro ao conectar ao servidor.";
        mensagem.style.color = "rgb(255, 80, 80)";
    }
});