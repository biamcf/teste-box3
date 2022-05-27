let form = document.getElementById("form");
let nomeInput = document.getElementById("nomeInput");
let telInput = document.getElementById("telInput");
let emailInput = document.getElementById("emailInput");
let dataInput = document.getElementById("dataInput");

let ativoInput = document.querySelector("form-check-input");

let contatos = document.getElementById("contatos");
let add = document.getElementById("add");

let dados = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  coletaDados();
});

let coletaDados = () => {
  dados.push({
    nome: nomeInput.value,
    telefone: telInput.value,
    email: emailInput.value,
    ativo: ativoInput.value,
    data: dataInput.value
  });
  localStorage.setItem("data", JSON.stringify(dados));
  console.log("Dados");
  console.log(dados);
};