import { Tickets } from "./businessRules.js";
const tickets = new Tickets();

function lockUnlockBtn(input1, input2, btn) {
  if (input1.value !== "" && input2.value > 0 && input2.value !== "") {
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
      Tipo:<span>${list[i].type}</span>Quantidade:<span>${tickets.list[i].amount}</span>
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
  const select = document.querySelector("#select");

  for (let i = 0; i < list.length; i++) {
    select.children[i].innerHTML = `${list[i].type}`;

    userHTML.children[i].innerHTML = ` ${list[i].type}
  <span>${(spanList.textContent = list[i].amount)}</span>`;

    adminHTML.children[i].innerHTML = `
  Tipo:<span>${list[i].type}</span>Quantidade:<span>${list[i].amount}</span>
  <div class="icons">
  <i class="edit fa-solid fa-pen-to-square"></i>
  <i class="delete fa-solid fa-trash"></i>
  </div>
  `;
  }
}

function addContent(
  newTicket,
  qttNewTicket,
  select,
  options,
  userHTML,
  adminHTML
) {
  if (tickets.list.length > options.length) {
    const novoOption = document.createElement("option");
    novoOption.textContent = newTicket;
    select.appendChild(novoOption);

    const newLi = document.createElement("li");
    newLi.innerHTML = `${newTicket}<span>${qttNewTicket}</span>`;
    userHTML.appendChild(newLi);

    const newLiAdmin = document.createElement("li");
    newLiAdmin.innerHTML = `
    Tipo:<span>${newTicket}</span>Quantidade:<span>${qttNewTicket}</span>
    <div class="icons">
      <i class="edit fa-solid fa-pen-to-square"></i>
      <i class="delete fa-solid fa-trash"></i>
    </div>
  `;
    adminHTML.appendChild(newLiAdmin);
  }
}

function deleteContent(targetElement, ticketType, select, options, userHTML) {
  for (const i in options) {
    if (options[i].innerHTML === ticketType) {
      select.removeChild(options[i]);
      userHTML.removeChild(userHTML.children[i]);
      targetElement.remove(targetElement);
    }
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
    qttDemanded,
    btnPurchase,
    newTicket,
    qttNewTicket,
    select,
    option,
    userHTML,
    adminHTML,
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
    case "qttDemanded":
      target.addEventListener("input", () => {
        lockUnlockBtn("", qttDemanded, btnPurchase);
      });

      target.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          tickets.purchase(select.value, qttDemanded.value);
          updateContent(tickets.list);
        }
      });
      break;
    case "btnPurchase":
      tickets.purchase(select.value, qttDemanded.value);
      updateContent(tickets.list);
      break;

    // Painel do admin
    case "newTicket":
    case "qttNewTicket":
      target.addEventListener("input", () => {
        lockUnlockBtn(newTicket, qttNewTicket, btnAdd);
      });
      break;
    case "btnAdd":
      tickets.addTicketToList(newTicket, qttNewTicket);
      addContent(
        newTicket.value,
        qttNewTicket.value,
        select,
        option,
        userHTML,
        adminHTML
      );
      break;
    case "edit":
      const parentEl = e.target.closest("li");
      const firstSpan = parentEl.querySelector("span").textContent;
      const oldTypeValue = (modal.querySelector("p").textContent = firstSpan);
      updateTicket.value = oldTypeValue;
      toggle(modal);
      document.body.classList.add("modal-block-body");
      break;
    case "updateTicket":
    case "updateQttTicket":
      target.addEventListener("input", () => {
        lockUnlockBtn(updateTicket, updateQttTicket, btnUpdateTicket);
      });
      break;
    case "btnUpdateTicket":
      const OldTicketType =
        document.getElementById("OldTicketType").textContent;

      tickets.updateTicket(
        updateTicket.value,
        updateQttTicket.value,
        OldTicketType
      );
      updateQttTicket.value = "";
      lockUnlockBtn(updateTicket, updateQttTicket, btnUpdateTicket);
      modalClose(modal);
      updateContent(tickets.list);
      break;
    case "delete":
      const targetElement = e.target.closest("li");
      const ticketType = targetElement.querySelector("span").textContent;

      deleteContent(targetElement, ticketType, select, option, userHTML);

      tickets.deleteTicket(ticketType);
      break;
    case "modalClose":
      modalClose(modal);
      break;
  }
}
