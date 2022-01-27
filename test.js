{
  let val = document.getElementById("convertor");
  let result = document.getElementById("result");
  let resultCurr = document.getElementById("currRes");
  let valueCurr = document.getElementById("currVal");
  let exchangeRates;

  function exchange(amount, valueCur, resultCur) {
    return Math.round((amount / valueCur) * resultCur * 10000) / 10000;
  }

  result.addEventListener("input", () => {
    val.value = exchange(
      result.value,
      exchangeRates[resultCurr.value],
      exchangeRates[valueCurr.value]
    );
  });
  val.addEventListener("input", () => {
    result.value = exchange(
      val.value,
      exchangeRates[valueCurr.value],
      exchangeRates[resultCurr.value]
    );
  });
  resultCurr.addEventListener("change", () => {
    result.value = exchange(
      val.value,
      exchangeRates[valueCurr.value],
      exchangeRates[resultCurr.value]
    );
  });
  valueCurr.addEventListener("change", () => {
    result.value = exchange(
      val.value,
      exchangeRates[valueCurr.value],
      exchangeRates[resultCurr.value]
    );
  });

  fetch("https://api.exchangerate.host/symbols")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let abbreviation = data.symbols;
      console.log(abbreviation)
      for (key in abbreviation) {
        valueCurr.options[valueCurr.options.length] = new Option(key, abbreviation[key].code);
        resultCurr.options[resultCurr.options.length] = new Option(key, abbreviation[key].code);
      }
    });
  fetch("https://api.exchangerate.host/latest?base=RUB&places=4")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      exchangeRates = data.rates;
    });
}
