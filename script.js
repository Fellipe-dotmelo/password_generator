
const inputEl = document.querySelector("#password")
let passwordLength = 16

function generatePassword() {
  const chars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ1234567890?!@&*()[]"

  let password = ""

  for (let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)
  }
  inputEl.value = password
}

const copy = document.getElementById("copy")
const copy2 = document.getElementById("copy2")

copy.addEventListener("click", function () {
  const password = document.querySelector("#password").value

  // Verifica se a API de clipboard está disponível no navegador
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(password)
      .then(() => {
        alert("Senha copiada para o clipboard com sucesso!");
      })
      .catch((err) => {
        console.error("Falha ao copiar senha:", err);
      });
  } else {
    // Caso a API não esteja disponível, exibe uma mensagem de erro ou instruções para o usuário copiar manualmente.
    alert("A cópia automática não é suportada neste navegador. Copie a senha manualmente.");
  }
});

function reloadPage() {
  location.reload();
}

const generateButton = document.getElementById("generateButton")
generateButton.addEventListener("click", function () {
  reloadPage();
});

const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", function () {
  passwordLength = passwordLengthEl.value
  generatePassword()
})

generatePassword()