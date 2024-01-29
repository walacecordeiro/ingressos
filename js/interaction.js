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

function modalClose(modalAdminEdit) {
  modalAdminEdit.classList.add("fade-out");
  setTimeout(() => {
    toggle(modalAdminEdit);
    modalAdminEdit.classList.remove("fade-out");
    document.body.classList.remove("modal-block-body");
  }, 200);
}

export function handleEvents(
  e,
  {
    forms,
    sections,
    modalAdminEdit,
    userPanel,
    adminPanel,
    qtdComprar,
    btnComprar,
    novoIngresso,
    qtdAdd,
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
    case "updateIngresso":
    case "updateQtd":
      target.addEventListener("input", () => {
        lockUnlockBtn(updateIngresso, updateQtd, btnUpdate);
      });
      break;
    case "btnUpdate":
      modalClose(modalAdminEdit);
      console.log("Atualizado com sucesso");
      break;
    case "delete":
      console.log("Deletar");
      break;
    case "modalClose":
      modalClose(modalAdminEdit);
      break;
  }
}
