
  const inputEl = document.querySelector("#password")

  const upperCaseCheckEl = document.querySelector("#uppercase-check")
  const numberCheckEl = document.querySelector("#number-check")
  const simbolCheckEl = document.querySelector("#simbol-check")
  const securityIndicatorBarEl = document.querySelector(
    "#security-indicator-bar"
  )


  let passwordLength = 16

  function generatePassword() {
    let chars = "abcdefghjkmnopqrstuvwxyz"

    
    const upperCaseChars = "ABCDEFGHJKLMNOPQRSTUVWXYZ"
    const numbersChars = "1234567890"
    const simbolsChars = "?!@&*()[]"

    if(upperCaseCheckEl.checked){
      chars += upperCaseChars
    }
    if(numberCheckEl.checked){
      chars += numbersChars
    }
    if(simbolCheckEl.checked){
      chars += simbolsChars
    }

    let password = ""

    for (let i = 0; i < passwordLength; i++) {
      const randomNumber = Math.floor(Math.random() * chars.length)
      password += chars.substring(randomNumber, randomNumber + 1)
    }
    inputEl.value = password
    
    calculateQuality()
    calculateFontSize()
  }

  function calculateQuality(){
    const percent = Math.round(
       (passwordLength / 64) * 25 +
        (upperCaseCheckEl.checked ? 15:0) +
          (numberCheckEl.checked ? 25:0) +
            (simbolCheckEl.checked ? 35:0)
    )

      securityIndicatorBarEl.style.width = `${percent}%`

      if (percent > 69) {
        //safe
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.add("safe")
      }
      else if(percent > 50){
        //warning
        securityIndicatorBarEl.classList.remove("critical")
        securityIndicatorBarEl.classList.add("warning")
        securityIndicatorBarEl.classList.remove("safe")
      }
      else{
        //critical
        securityIndicatorBarEl.classList.add("critical")
        securityIndicatorBarEl.classList.remove("warning")
        securityIndicatorBarEl.classList.remove("safe")
      }

      if(percent >=100){
        securityIndicatorBarEl.classList.add("completed")
      }else{
        securityIndicatorBarEl.classList.remove("completed")
      }
  }

  function calculateFontSize(){
    if(passwordLength > 45){
      inputEl.classList.remove("font-sm")
      inputEl.classList.remove("font-xs")
      inputEl.classList.add("font-xxs")
    }else if(passwordLength > 32){
      inputEl.classList.remove("font-sm")
      inputEl.classList.add("font-xs")
      inputEl.classList.remove("font-xxs")
    }else if(passwordLength > 22){
      inputEl.classList.add("font-sm")
      inputEl.classList.remove("font-xs")
      inputEl.classList.remove("font-xxs")
    }else{
      inputEl.classList.remove("font-sm")
      inputEl.classList.remove("font-xs")
      inputEl.classList.remove("font-xxs")
    }
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

  const generateButton = document.getElementById("renew")
  generateButton.addEventListener("click", generatePassword);

  const passwordLengthEl = document.querySelector("#password-length")
  passwordLengthEl.addEventListener("input", function () {
    passwordLength = passwordLengthEl.value
    document.querySelector("#password-length-text").innerText = passwordLength
    
    generatePassword()
  })

  upperCaseCheckEl.addEventListener("click", generatePassword)
  numberCheckEl.addEventListener("click", generatePassword)
  simbolCheckEl.addEventListener("click", generatePassword)

  generatePassword()