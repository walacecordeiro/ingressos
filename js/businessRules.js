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

  purchase(type, amount) {
    this.selectedOption = type;
    this.qttDemanded = amount;

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
          } ingressos para ${selectedOption.type.toLocaleLowerCase()} mas temos apenas ${
            selectedOption.amount
          } ${selectedOptionSP}`
        );
      } else {
        selectedOption.amount -= this.qttDemanded;
        alert("Compra realizada com sucesso!");
      }
    } else {
      alert("Adicione uma quantidade ao pedido");
    }
  }

  addTicketToList(type, amount) {
    this.selectedOption = type;
    this.qttDemanded = amount;

    this.list.push({
      type: type.value.trim(),
      amount: parseInt(amount.value),
    });
  }

  updateTicket(valueType, valueAmount, OldTicketType) {
    this.selectedOption = valueType.trim();
    this.qttDemanded = parseInt(valueAmount);

    const existingTicketIndex = this.list.findIndex(
      (ticket) => ticket.type === OldTicketType
    );

    console.log(existingTicketIndex);

    if (existingTicketIndex !== -1) {
      this.list[existingTicketIndex].type = this.selectedOption;
      this.list[existingTicketIndex].amount = this.qttDemanded;
    }

    console.log(this.list);
  }

  deleteTicket(ticketType) {
    const existingTicketIndex = this.list.findIndex(
      (ticket) => ticket.type === ticketType
    );

    if (existingTicketIndex !== -1) {
      this.list.splice(existingTicketIndex, 1)
    }

  }
}
