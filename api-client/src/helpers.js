export const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais, o que torna o CPF inválido
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Calcula o primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = (resto === 10 || resto === 11) ? 0 : resto;

    // Verifica se o primeiro dígito verificador está correto
    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Calcula o segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = (resto === 10 || resto === 11) ? 0 : resto;

    // Verifica se o segundo dígito verificador está correto
    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
        return false;
    }

    // Se todas as verificações passaram, o CPF é válido
    return true;
}

export const validarEmail = (email) => {
    // Expressão regular para validar o formato do email
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Testa se o email corresponde ao padrão da expressão regular
    return regex.test(email);
}

export const validarTelefone = (telefone) => {
    // Expressão regular para validar o formato do telefone (DD) 9XXXX-XXXX
    var regex = /^\(\d{2}\) 9?\d{4}-\d{4}$/;
    
    // Testa se o telefone corresponde ao padrão da expressão regular
    return regex.test(telefone);
}

export const validarDataNascimento = (dataDeNasc) => {
    const partesData = dataDeNasc.split("-");
    const dia = parseInt(partesData[2], 10);
    const mes = parseInt(partesData[1], 10) - 1;
    const ano = parseInt(partesData[0], 10);
    const now = new Date();

    if(ano < 1900 || ano > now.getFullYear()) {
        return false;
    }

    if(ano === now.getFullYear() && (mes > now.getMonth() || (mes === now.getMonth() && dia > now.getDate()))) {
        return false;
    }

    return true;
}

// Função para verificar se um número de cartão de crédito é válido usando o algoritmo de Luhn
export const isValidCardNumber = (cardNumber) => {
    // Remove todos os caracteres não numéricos do número do cartão
    const cleanCardNumber = cardNumber.replace(/\D/g, '');
    
    // Verifica se o número do cartão tem pelo menos 13 dígitos e passa pela fórmula de Luhn
    if (/^\d{13,}$/.test(cleanCardNumber)) {
      let sum = 0;
      let alternate = false;
      for (let i = cleanCardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanCardNumber.charAt(i));
        if (alternate) {
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
        }
        sum += digit;
        alternate = !alternate;
      }
      return sum % 10 === 0;
    }
    return false;
  }