import { Tickets } from "./businessRules.js";
const tickets = new Tickets();

function lockUnlockBtn(input1, input2, btn) {
  if (input1.value !== "" && input2.value > 0) {
    btn.classList.remove("blockBtn");
    btn.disabled = false;
  } else {
    btn.classList.add("blockBtn");
    btn.disabled = true;
  }
}

function toggle(alvo) {
  if (alvo instanceof NodeList) {
    for (let i = 0; i < alvo.length; i++) {
      alvo[i].classList.toggle("hide");
    }
    return;
  }
  alvo.classList.toggle("hide");
}

function modalClose(modal) {
  modal.classList.add("fade-out");
  setTimeout(() => {
    toggle(modal);
    modal.classList.remove("fade-out");
    document.body.classList.remove("modal-block-body");
  }, 200);
}

function newLi() {
  const newLi = document.createElement("li");
  return newLi;
}

export function initialContent({ select, userHTML, adminHTML, list }) {
  for (let i = 0; i < select.children.length && i < list.length; i++) {
    const newOption = document.createElement("option");
    const spanList = document.getElementsByTagName("span");

    if (select.children.length < list.length) {
      select.append(newOption);
      userHTML.append(newLi());
      adminHTML.append(newLi());
    }

    select[i].textContent = list[i].type;
    userHTML.children[i].innerHTML = ` ${list[i].type}
      <span>${(spanList.textContent = tickets.list[i].amount)}</span>`;

    adminHTML.children[i].innerHTML = `
      Tipo:<span>${list[i].type}</span>Qantidade:<span>${tickets.list[i].amount}</span>
      <div class="icons">
        <i class="edit fa-solid fa-pen-to-square"></i>
        <i class="delete fa-solid fa-trash"></i>
      </div>
    `;
  }
}

function updateContent(list) {
  const userHTML = document.querySelector("#userHTML");
  const spanList = document.getElementsByTagName("span");
  const adminHTML = document.querySelector("#adminHTML");

  for (let i = 0; i < list.length; i++) {
    userHTML.children[i].innerHTML = ` ${list[i].type}
  <span>${(spanList.textContent = list[i].amount)}</span>`;

    adminHTML.children[i].innerHTML = `
  Tipo:<span>${list[i].type}</span>Qantidade:<span>${list[i].amount}</span>
  <div class="icons">
  <i class="edit fa-solid fa-pen-to-square"></i>
  <i class="delete fa-solid fa-trash"></i>
  </div>
  `;
  }
}

export function handleEvents(
  e,
  {
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
  }
) {
  const target = e.target;

  switch (target.id || target.classList[0]) {
    // Painel do usuário
    case "adminPanel":
    case "userPanel":
      toggle(userPanel);
      toggle(adminPanel);
      toggle(forms);
      toggle(sections);
      break;
    case "select":
      tickets.selectedOption = e.target.value;
      break;
    case "qtdComprar":
      target.addEventListener("input", () => {
        tickets.qttDemanded = parseInt(e.target.value);
        lockUnlockBtn("", qtdComprar, btnComprar);
      });
      break;
    case "btnComprar":
      tickets.purchase();
      updateContent(tickets.list);
      break;

    // Painel do admin
    case "newTicket":
    case "qtdAdd":
      target.addEventListener("input", () => {
        lockUnlockBtn(newTicket, qtdAdd, btnAdd);
      });
      break;
    case "btnAdd":
      tickets.addTicketToList(
        newTicket,
        qtdAdd,
        select,
        option,
        userHTML,
        adminHTML
      );
      break;
    case "edit":
      toggle(modal);
      document.body.classList.add("modal-block-body");
      break;
    case "updateIngresso":
    case "updateQtd":
      target.addEventListener("input", () => {
        lockUnlockBtn(updateIngresso, updateQtd, btnUpdate);
      });
      break;
    case "btnUpdate":
      modalClose(modal);
      console.log("Atualizado com sucesso");
      break;
    case "delete":
      console.log("Deletar");
      break;
    case "modalClose":
      modalClose(modal);
      break;
  }
}
