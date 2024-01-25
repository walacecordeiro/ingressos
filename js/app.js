//Painel usuário ou admin
const estado = document.querySelector(".estado");
const forms = document.querySelectorAll(".panel");
const sections = document.querySelectorAll(".section");

//Inputs
const inputs = document.querySelectorAll(".input-group");
const select = document.querySelector("#select");
const qtdComprar = document.querySelector("#qtdComprar");
const btnComprar = document.querySelector("#btnComprar");
const novoIngresso = document.querySelector("#novoIngresso");
const qtdAdd = document.querySelector("#qtdAdd");
const btnAdd = document.querySelector("#btnAdd");

function lockUnlockBtn(input1, input2, btn) {
  if (input1.value !== "" && input2.value > 0) {
    btn.classList.remove("blockBtn");
    btn.disabled = false;
  } else {
    btn.classList.add("blockBtn");
    btn.disabled = true;
  }
}

inputs.forEach((elemento) => {
  elemento.addEventListener("input", (e) => {
    if (e.target instanceof HTMLSelectElement) {
      console.log(e.target.value);
    }

    if (e.target == qtdComprar) {
      lockUnlockBtn("", qtdComprar, btnComprar);
    }
    lockUnlockBtn(novoIngresso, qtdAdd, btnAdd);
  });
});

estado.addEventListener("click", (e) => {
  const childrens = estado.children;
  const alvo = e.target;

  for (let i = 0; i < childrens.length; i++) {
    if (childrens[i].contains(alvo)) {
      childrens[i].classList.toggle("hide");
      forms[i].classList.toggle("hide");
      sections[i].classList.toggle("hide");
    } else {
      childrens[i].classList.toggle("hide");
      forms[i].classList.toggle("hide");
      sections[i].classList.toggle("hide");
    }
  }
});
