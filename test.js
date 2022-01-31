{
  let val = document.getElementById("convertor");
  let result = document.getElementById("result");
  let resultCurr = document.getElementById("currRes");
  let valueCurr = document.getElementById("currVal");
  let dropdown_one = document.getElementById('dropdown_one')
  let dropdown_two = document.getElementById('dropdown_two')
  let spanOne = document.getElementById('spanOne')
  let spanTwo = document.getElementById('spanTwo')
  let exchangeRates;

  function exchange(amount, valueCur, resultCur) {
    return Math.round((amount / valueCur) * resultCur * 10000) / 10000;
  }
  function getId(el,span) {
    span.textContent = el.id
  }

  result.addEventListener("input", () => {
    val.value = exchange(
      result.value,
      exchangeRates[spanTwo.textContent],
      exchangeRates[spanOne.textContent]
    );
  });
  val.addEventListener("input", () => {
    result.value = exchange(
      val.value,
      exchangeRates[spanOne.textContent],
      exchangeRates[spanTwo.textContent]
    );
  });

  fetch("https://api.exchangerate.host/symbols")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let abbreviation = data.symbols;
      for (key in abbreviation) {
        let li = document.createElement('li')
        li.textContent = abbreviation[key].description
        li.id = abbreviation[key].code
        li.classList.add('dropdown_item')
        li.addEventListener('click', () => {
          getId(li, spanOne)
          result.value = exchange(
            val.value,
            exchangeRates[spanOne.textContent],
            exchangeRates[spanTwo.textContent]
          );

        })
        dropdown_one.append(li)
      }
      for (key in abbreviation) {
        let li = document.createElement('li')
        li.textContent = abbreviation[key].description
        li.id = abbreviation[key].code
        li.classList.add('dropdown_item')
        li.addEventListener('click', () => {
          getId(li, spanTwo)
          result.value = exchange(
            val.value,
            exchangeRates[spanTwo.textContent],
            exchangeRates[spanOne.textContent]
          );
        })
        dropdown_two.append(li)
      }

    });
  fetch("https://api.exchangerate.host/latest?base=RUB&places=4")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      exchangeRates = data.rates;
    });

    resultCurr.addEventListener('click', () => {
      dropdown_two.classList.toggle('active')
    })

    valueCurr.addEventListener('click', () => {
      dropdown_one.classList.toggle('active')
    })


}   
 
