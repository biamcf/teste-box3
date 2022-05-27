let form = document.getElementById("form");
let nomeInput = document.getElementById("nomeInput");
let telInput = document.getElementById("telInput");
let emailInput = document.getElementById("emailInput");
let dataInput = document.getElementById("dataInput");
let ativoInput = document.querySelector(".form-check-input");

let formEdit = document.getElementById("form-editar");
let idEdit = document.getElementById("id-edit");
let nomeInputEdit = document.getElementById("nomeInputEdit");
let telInputEdit = document.getElementById("telInputEdit");
let emailInputEdit = document.getElementById("emailInputEdit");
let dataInputEdit = document.getElementById("dataInputEdit");
let ativoInputEdit = document.querySelector(".switch-edit");

let botaoListagem = document.getElementById("botao-listagem");
let contatos = document.getElementById("contatos");
let add = document.getElementById("add");
let addEdit = document.getElementById("addEdit");

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

formEdit.addEventListener("submit", (e) => {
  e.preventDefault();
  editContato();

  addEdit.setAttribute("data-bs-dismiss", "modal");
  addEdit.click();

  (() => {
    addEdit.setAttribute("data-bs-dismiss", "");
  })();
});

let coletaDados = () => {
  
  const body = {
    "nome": nomeInput.value,
    "telefone": telInput.value,
    "email": emailInput.value,
    "ativo": ativoInput.checked ? true : false,
    "dataNascimento": dataInput.value
  }

  const header = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type' : 'Application/json',
    },
    body: JSON.stringify(body)
  }

  fetch("https://api.box3.work/api/Contato/40c99f12-dfc5-4642-8bd0-55186b33a719", header)
  .then(response => console.log(response.json()));

  listarContatos();
};

let listarContatos = () => {
  contatos.innerHTML = "";

  fetch("https://api.box3.work/api/Contato/40c99f12-dfc5-4642-8bd0-55186b33a719")
    .then(response => {
      return response.json();
    }).then(json => {
      console.log(json);
      json.forEach(contato => {
        contatos.innerHTML += `
        <div id=${contato.id}>
              <span class="fw-bold">${contato.nome}</span>
              <span class="fw-bold">${contato.telefone}</span>
              <span class="fw-bold">${contato.email}</span>
              <span class="fw-bold">${contato.ativo}</span>
              <span class="small text-secondary">${contato.dataNascimento}</span>
      
              <span class="options">
                <i onClick= "editarContato(this)" data-bs-toggle="modal" data-bs-target="#form-editar" class="fas fa-edit"></i>
                <i onClick ="deletarContato(this); listarContatos()" class="fas fa-trash-alt"></i>
              </span>
            </div>
        `;
      });
    });

  resetForm();
}

let resetForm = () => {
  nomeInput.value = "";
  telInput.value = "";
  dataInput.value = "";
  emailInput.value = "";
  dataInput.value = "";

  nomeInputEdit.value = "";
  telInputEdit.value = "";
  dataInputEdit.value = "";
  emailInputEdit.value = "";
  dataInputEdit.value = "";
};

botaoListagem.addEventListener("click", () => {
    listarContatos();
});

let deletarContato = (e) => {
  let id = e.parentElement.parentElement.id;

  const body = {
    "nome": nomeInput.value,
    "telefone": telInput.value,
    "email": emailInput.value,
    "ativo": ativoInput.checked ? true : false,
    "dataNascimento": dataInput.value
  }

  const header = {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type' : 'Application/json',
    },
    body: JSON.stringify(body)
  }

  const url = "https://api.box3.work/api/Contato/40c99f12-dfc5-4642-8bd0-55186b33a719/" + id;

  fetch(url, header)
    .then(response => console.log(response.json()));
};

let editarContato = (e) => {
  let contatoSelecionado = e.parentElement.parentElement;

  idEdit.value = e.parentElement.parentElement.id;

  nomeInputEdit.value = contatoSelecionado.children[0].innerHTML;
  telInputEdit.value = contatoSelecionado.children[1].innerHTML;
  emailInputEdit.value = contatoSelecionado.children[2].innerHTML;
  ativoInputEdit.value = contatoSelecionado.children[3].innerHTML;
  dataInputEdit.value = contatoSelecionado.children[4].innerHTML;
  
  // deletarContato(e);

};

function editContato() {
  let id = idEdit.value;

  const body = {
    "nome": nomeInputEdit.value,
    "telefone": telInputEdit.value,
    "email": emailInputEdit.value,
    "ativo": ativoInputEdit.checked ? true : false,
    "dataNascimento": dataInputEdit.value
  }

  const header = {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type' : 'Application/json',
    },
    body: JSON.stringify(body)
  }

  const url = "https://api.box3.work/api/Contato/40c99f12-dfc5-4642-8bd0-55186b33a719/" + id;

  fetch(url, header)
    .then(response => console.log(response.json()));

  listarContatos();
}