import { handleEvents } from "./interaction.js";

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
