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
const btnAdd = document.querySelector("#btnAdd");

const body = document.body;

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

document.addEventListener("click", (e) => {
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
      console.log(e.target.value);
      break;
    case "qtdComprar":
      target.addEventListener("input", () => {
        lockUnlockBtn("", qtdComprar, btnComprar);
      });
      break;
    case "btnComprar":
      console.log("Compra realizada");
      break;

    // Painel do admin
    case "novoIngresso":
    case "qtdAdd":
      target.addEventListener("input", () => {
        lockUnlockBtn(novoIngresso, qtdAdd, btnAdd);
      });
      break;
    case "btnAdd":
      console.log("Adicionou novo ingresso");
      break;
    case "edit":
      toggle(modalAdminEdit);
      document.body.classList.add("modal-block-body");
      break;
    case "delete":
      console.log("Deletar");
      break;
    case "modalClose":
      modalAdminEdit.classList.add("fade-out");
      setTimeout(() => {
        toggle(modalAdminEdit);
        modalAdminEdit.classList.remove("fade-out");
        document.body.classList.remove("modal-block-body");
      }, 200);
      break;
  }
});
