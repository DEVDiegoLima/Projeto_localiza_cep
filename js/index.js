document.addEventListener("DOMContentLoaded", () => {
  const btnBuscarCEP = document.getElementById("btnBuscarCEP");

  btnBuscarCEP.addEventListener("click", () => {
    const cepInput = document.getElementById("cepInput").value;
    const informationCep = document.querySelector(".informationCep");

    // Verificar se o cepInput está vazio
    if (cepInput.trim() === "") {
      informationCep.style.display = "none";
      return;
    }

    const viaCepUrl = `https://viacep.com.br/ws/${cepInput}/json/`;

    fetch(viaCepUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro ao buscar CEP. Status: ${res.status}`);
        }

        return res.json();
      })
      .then((data) => {
        // Atualizar a informação do CEP
        updateCepInformation(data);
        // Exibir informationCep
        informationCep.style.display = "block";
      })
      .catch((error) => {
        console.error(error.message);
      });
  });

  function updateCepInformation(data) {
    const informationCep = document.querySelector(".informationCep");

    informationCep.innerHTML = `
          <h3>Localidade: <span>${data.localidade}</span></h3>
          <h3>Logradouro: <span>${data.logradouro}</span></h3>
          <h3>Bairro: <span>${data.bairro}</span></h3>
        `;
  }
});
