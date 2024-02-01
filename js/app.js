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
const qttDemanded = document.querySelector("#qttDemanded");
const btnPurchase = document.querySelector("#btnPurchase");
const newTicket = document.querySelector("#newTicket");
const qttNewTicket = document.querySelector("#qttNewTicket");
const select = document.querySelector("#select");
const option = document.querySelector("#select").children;

//lists
const userHTML = document.querySelector("#userHTML");
const adminHTML = document.querySelector("#adminHTML");

const tickets = new Tickets();
const list = tickets.list;

initialContent({ select, userHTML, adminHTML, list });

document.addEventListener("click", (e) => {
  e.preventDefault();
  handleEvents(e, {
    forms,
    sections,
    modal,
    userPanel,
    adminPanel,
    qttDemanded,
    btnPurchase,
    newTicket,
    qttNewTicket,
    select,
    option,
    userHTML,
    adminHTML,
  });
});
