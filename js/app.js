import { handleEvents, initialContent } from "./interaction.js";
import { Tickets } from "./businessRules.js";

//Painel usuário ou admin
const forms = document.querySelectorAll(".panel");
const sections = document.querySelectorAll(".section");

//Modal
const modal = document.querySelector(".modal");

//Inputs
const userPanel = document.querySelector("#userPanel");
const adminPanel = document.querySelector("#adminPanel");
const qtdComprar = document.querySelector("#qtdComprar");
const btnComprar = document.querySelector("#btnComprar");
const newTicket = document.querySelector("#newTicket");
const qtdAdd = document.querySelector("#qtdAdd");
const select = document.querySelector("#select");
const option = document.querySelector("#select").children;

//lists
const userHTML = document.querySelector("#userHTML");
const adminHTML = document.querySelector("#adminHTML");

const tickets = new Tickets();
const list = tickets.list;

initialContent({ select, userHTML, adminHTML, list });

document.addEventListener("click", (e) => {
  handleEvents(e, {
    forms,
    sections,
    modal,
    userPanel,
    adminPanel,
    qtdComprar,
    btnComprar,
    newTicket,
    qtdAdd,
    select,
    option,
    userHTML,
    adminHTML,
  });
});
