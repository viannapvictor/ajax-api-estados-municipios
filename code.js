

(async function() {
    const estados = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(resposta => resposta.json())
      .then(dados => dados);
  
    generateListEstado(estados, document.getElementById("estados"))
  })();
  
  function generateListEstado(estados, dom) {
    dadosOptions = `<option value =''> Selecione </option>`;
    dadosOptions += estados.map(estado =>
      `<option value ="${estado.id}"> ${estado.id} </option>`
    ).join("");
  
    dom.innerHTML = dadosOptions;
  }
  
  function generateListMunicipios(municipios, dom) {
    dadosOptions = `<option value =''> Selecione </option>`;
    dadosOptions += municipios.map(municipio =>
      `<option value ="${municipio.nome}"> ${municipio.nome} </option>`
    ).join("");
  
    dom.innerHTML = dadosOptions;
  }
  
  document.getElementById("estados").addEventListener("change", async function(e) {
    const value = e.target.value;
    if (value !== "") {
      const municipios = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + value + "/municipios")
        .then(resposta => resposta.json())
        .then(dados => {
          console.log(dados)
          return dados
        })
  
      const municipiosName = municipios.map(municipio => municipio);
  
      generateListMunicipios(municipiosName, document.getElementById("municipios"));
  
    }
  })