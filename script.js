const warningMessage = document.querySelector(".warningMessage")
const fieldCep = document.querySelector("#cep")

const warning = (message, opacity) => {
  warningMessage.style.opacity = `${opacity}`;
  warningMessage.innerHTML = `${message}`
  fieldCep.focus()
};

const fillForm = result => {
  for (const campo in result) {
    if (document.querySelector("#" + campo)) {
      document.querySelector("#" + campo).value = result[campo]
    }
  }
}

const clearForm = () => {
  const allField = document.querySelectorAll(".input-container > input")
  for (let i = 1; i < allField.length; i++) {
    allField[i].value = ""
  }
}

const isNumber = number => /^[0-9]+$/.test(number)
const validCep = cep => cep.length == 8 && isNumber(cep)

const searchCep = async () => {
  clearForm()
  warning("none", 0)

  const cep = fieldCep.value.replace("-", "")
  const url = `https://viacep.com.br/ws/${cep}/json/`

  if (cep == "") {
    warning('Preencha o campo!', 1)
  } else if (validCep(cep)) {
    const data = await fetch(url)
    const fullAddress = await data.json()
    fullAddress.hasOwnProperty("erro") ? warning("Cep não encontrado!", 1) : fillForm(fullAddress)
  }else{
    warning("ERRO! Cep inválido.", 1)
  }
}

document.getElementById("search").addEventListener("click", (e) => {
  e.preventDefault()
  searchCep()
})