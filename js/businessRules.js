export class Tickets {
  constructor() {
    this.list = [
      { type: "Pista", amount: 100 },
      { type: "Cadeira Superior", amount: 200 },
      { type: "Cadeira Inferior", amount: 400 },
    ];
    this.selectedOption = this.list[0].type;
    this.qttDemanded = 0;
  }

  purchase() {
    const selectedOption = this.list.find(
      (ingresso) => ingresso.type === this.selectedOption
    );

    const selectedOptionSP =
      selectedOption.amount > 1 ? "disponíveis" : "disponível";

    if (selectedOption && this.qttDemanded > 0 && !isNaN(this.qttDemanded)) {
      if (selectedOption.amount <= 0) {
        alert("Este ingresso não está mais disponível");
      } else if (
        selectedOption.amount > 0 &&
        this.qttDemanded > selectedOption.amount
      ) {
        alert(
          `Você deseja comprar ${
            this.qttDemanded
          } tickets para ${selectedOption.type.toLocaleLowerCase()} mas temos apenas ${
            selectedOption.amount
          } ${selectedOptionSP}`
        );
      } else {
        selectedOption.amount -= this.qttDemanded;
        alert("Compra realizada com sucesso!");
      }
    } else {
      console.log("Adicione uma quantidade ao pedido");
    }
  }

  addTicketToList(
    type,
    amount,
    select,
    options,
    userHTML,
    adminHTML
  ) {
    this.list.push({
      type: type.value,
      amount: parseInt(amount.value),
    });

    if (this.list.length > options.length) {
      const novoOption = document.createElement("option");
      novoOption.textContent = type.value;
      select.appendChild(novoOption);

      const novoLi = document.createElement("li");
      novoLi.innerHTML = `${type.value}<span>${amount.value}</span>`;
      userHTML.appendChild(novoLi);

      const novoLiAdmin = document.createElement("li");
      novoLiAdmin.innerHTML = `
      Tipo:<span>${type.value}</span>Qantidade:<span>${amount.value}</span>
      <div class="icons">
        <i class="edit fa-solid fa-pen-to-square"></i>
        <i class="delete fa-solid fa-trash"></i>
      </div>
    `;
      adminHTML.appendChild(novoLiAdmin);
    }
  }
}
