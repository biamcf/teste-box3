let form = document.getElementById("form");
let nomeInput = document.getElementById("nomeInput");
let telInput = document.getElementById("telInput");
let emailInput = document.getElementById("emailInput");
let dataInput = document.getElementById("dataInput");

let ativoInput = document.querySelector(".form-check-input");

let contatos = document.getElementById("contatos");
let add = document.getElementById("add");

let dados = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  coletaDados();
  add.setAttribute("data-bs-dismiss", "modal");
  add.click();
  (() => {
    add.setAttribute("data-bs-dismiss", "");
  })();
});

let coletaDados = () => {
  dados.push({
    nome: nomeInput.value,
    telefone: telInput.value,
    email: emailInput.value,
    ativo: ativoInput.checked ? true : false,
    data: dataInput.value
  });

  localStorage.setItem("data", JSON.stringify(dados));

  criarContato();
  console.log(dados);
};

let criarContato = () => {
  contatos.innerHTML = "";

  dados.map((x, y) => {
    console.log(x);
    return (contatos.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.nome}</span>
          <span class="fw-bold">${x.telefone}</span>
          <span class="fw-bold">${x.email}</span>
          <span class="fw-bold">${x.ativo}</span>
          <span class="small text-secondary">${x.data}</span>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

}

let resetForm = () => {
  nomeInput.value = "";
  dataInput.value = "";
  emailInput.value = "";
  dataInput.value = "";
};