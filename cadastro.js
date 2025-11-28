document.getElementById("formCadastro").addEventListener("submit", async (event) => {
    event.preventDefault(); // impede refresh da página

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Enviar para o backend
    try {
        const resposta = await fetch("http://localhost:3000/cadastro", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome, email, senha })
        });

        const data = await resposta.json();

        if (!resposta.ok) {
            alert(data.error); // mostra o erro do backend
            return;
        }

        alert("Cadastro concluído com sucesso!");
        window.location.href = "login.html"; // redireciona para login

    } catch (erro) {
        alert("Erro ao conectar com o servidor.");
        console.error(erro);
    }
});
