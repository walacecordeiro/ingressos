import { handleEvents } from "./interaction.js";
import { Ingressos } from "./businessRules.js";

//Painel usuário ou admin
const forms = document.querySelectorAll(".panel");
const sections = document.querySelectorAll(".section");

//Modal
const modalAdminEdit = document.querySelector(".modalAdminEdit");

//Inputs
const userPanel = document.querySelector("#userPanel");
const adminPanel = document.querySelector("#adminPanel");
const qtdComprar = document.querySelector("#qtdComprar");
const btnComprar = document.querySelector("#btnComprar");
const novoIngresso = document.querySelector("#novoIngresso");
const qtdAdd = document.querySelector("#qtdAdd");
const select = document.querySelector("#select");

//listas
const listaHTML = document.querySelector("#listaHTML");
const listaAdmin = document.querySelector("#listaAdmin");

const ingressos = new Ingressos();
const lista = ingressos.lista;

function newLi() {
  const newLi = document.createElement("li");
  return newLi;
}

for (let i = 0; i < select.children.length && i < lista.length; i++) {
  const newOption = document.createElement("option");
  const spanList = document.getElementsByTagName("span");

  if (select.children.length < lista.length) {
    select.append(newOption);
    listaHTML.append(newLi());
    listaAdmin.append(newLi());
  }

  select[i].textContent = lista[i].tipo;
  listaHTML.children[i].innerHTML = ` ${lista[i].tipo}
    <span>${(spanList.textContent = lista[i].quantidade)}</span>`;

  listaAdmin.children[i].innerHTML = `
    Tipo:<span>${lista[i].tipo}</span>Qantidade:<span>${lista[i].quantidade}</span>
    <div class="icons">
      <i class="edit fa-solid fa-pen-to-square"></i>
      <i class="delete fa-solid fa-trash"></i>
    </div>
  `;
}

document.addEventListener("click", (e) => {
  handleEvents(e, {
    forms,
    sections,
    modalAdminEdit,
    userPanel,
    adminPanel,
    qtdComprar,
    btnComprar,
    novoIngresso,
    qtdAdd,
  });
});
