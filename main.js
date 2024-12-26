$(document).ready(function () {
  $("#convertForm").on("submit", function (event) {
    event.preventDefault();
    $("#convertBtn").trigger("click");
  });

  $("#convertBtn").on("click", function () {
    const number = $("#number").val().trim();
    const conversion = $("#conversion").val();

    // Reset validation styles
    resetValidation();

    if (!number) {
      displayValidationError("#number", "Masukkan bilangan yang valid!");
      return;
    }

    let result, steps;

    switch (conversion) {
      case "decimal-to-binary":
        ({ result, steps } = decimalToBinary(parseInt(number)));
        break;
      case "binary-to-decimal":
        ({ result, steps } = binaryToDecimal(number));
        break;
      case "decimal-to-hex":
        ({ result, steps } = decimalToHex(parseInt(number)));
        break;
      case "hex-to-decimal":
        ({ result, steps } = hexToDecimal(number));
        break;
      case "decimal-to-octal":
        ({ result, steps } = decimalToOctal(parseInt(number)));
        break;
      case "octal-to-decimal":
        ({ result, steps } = octalToDecimal(number));
        break;
      default:
        alert("Jenis konversi tidak valid!");
        return;
    }

    displayResult(result, steps);
  });

  $("#swapBtn").on("click", function () {
    const currentConversion = $("#conversion").val();
    const swappedConversion = {
      "decimal-to-binary": "binary-to-decimal",
      "binary-to-decimal": "decimal-to-binary",
      "decimal-to-hex": "hex-to-decimal",
      "hex-to-decimal": "decimal-to-hex",
      "decimal-to-octal": "octal-to-decimal",
      "octal-to-decimal": "decimal-to-octal",
    };

    $("#conversion").val(swappedConversion[currentConversion]);
  });

  function decimalToBinary(number) {
    const steps = [];
    let result = "";
    let temp = number;
    while (temp > 0) {
      const remainder = temp % 2;
      steps.push(
        `\\[ \\frac{${temp}}{2} = ${Math.floor(
          temp / 2
        )}, \\text{ sisa } ${remainder} \\]`
      );
      result = remainder + result;
      temp = Math.floor(temp / 2);
    }
    return { result, steps };
  }

  function binaryToDecimal(binary) {
    const steps = [];
    const digits = binary.split("").reverse();
    let result = 0;

    digits.forEach((digit, index) => {
      const value = parseInt(digit) * Math.pow(2, index);
      steps.push(`\\[ ${digit} \\times 2^{${index}} = ${value} \\]`);
      result += value;
    });

    return { result, steps };
  }

  function decimalToHex(number) {
    const steps = [];
    let result = "";
    let temp = number;
    while (temp > 0) {
      const remainder = temp % 16;
      const hexChar =
        remainder < 10 ? remainder : String.fromCharCode(55 + remainder);
      steps.push(
        `\\[ \\frac{${temp}}{16} = ${Math.floor(
          temp / 16
        )}, \\text{ sisa } ${hexChar} \\]`
      );
      result = hexChar + result;
      temp = Math.floor(temp / 16);
    }
    return { result, steps };
  }

  function hexToDecimal(hex) {
    const steps = [];
    const digits = hex.split("").reverse();
    let result = 0;

    digits.forEach((digit, index) => {
      const value = parseInt(digit, 16) * Math.pow(16, index);
      steps.push(`\\[ ${digit} \\times 16^{${index}} = ${value} \\]`);
      result += value;
    });

    return { result, steps };
  }

  function decimalToOctal(number) {
    const steps = [];
    let result = "";
    let temp = number;
    while (temp > 0) {
      const remainder = temp % 8;
      steps.push(
        `\\[ \\frac{${temp}}{8} = ${Math.floor(
          temp / 8
        )}, \\text{ sisa } ${remainder} \\]`
      );
      result = remainder + result;
      temp = Math.floor(temp / 8);
    }
    return { result, steps };
  }

  function octalToDecimal(octal) {
    const steps = [];
    const digits = octal.split("").reverse();
    let result = 0;

    digits.forEach((digit, index) => {
      const value = parseInt(digit) * Math.pow(8, index);
      steps.push(`\\[ ${digit} \\times 8^{${index}} = ${value} \\]`);
      result += value;
    });

    return { result, steps };
  }

  function displayResult(result, steps) {
    $("#result").removeClass("hidden");
    $("#output").text(`Hasil: ${result}`);
    const stepsContainer = $("#steps");
    stepsContainer.empty();
    steps.forEach((step) => {
      stepsContainer.append(`<div>${step}</div>`);
    });

    updateMathJax();
  }

  function updateMathJax() {
    MathJax.typesetPromise();
  }

  function displayValidationError(inputSelector, errorMessage) {
    const inputElement = $(inputSelector);
    inputElement.addClass("border-red-500");
    const errorElement = $(
      `<p class="text-red-500 text-sm mt-1">${errorMessage}</p>`
    );
    inputElement.after(errorElement);
  }

  function resetValidation() {
    $(".border-red-500").removeClass("border-red-500");
    $(".text-red-500").remove();
  }
});
