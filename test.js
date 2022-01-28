{
  let val = document.getElementById("convertor");
  let result = document.getElementById("result");
  let resultCurr = document.getElementById("currRes");
  let valueCurr = document.getElementById("currVal");
  let exchangeRates;
  let dropdownList = document.querySelector('.dropdown_list')
  let span = document.querySelector('span')



  function exchange(amount, valueCur, resultCur) {
    return Math.round((amount / valueCur) * resultCur * 10000) / 10000;
  }
  function getId(el) {
    span.textContent = el.id
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
      exchangeRates[span],
      exchangeRates[span]
    );
  });
  // resultCurr.addEventListener("change", () => {
  //   result.value = exchange(
  //     val.value,
  //     exchangeRates[valueCurr.value],
  //     exchangeRates[resultCurr.value]
  //   );
  // });
  // valueCurr.addEventListener("change", () => {
  //   result.value = exchange(
  //     val.value,
  //     exchangeRates[valueCurr.value],
  //     exchangeRates[resultCurr.value]
  //   );
  // });

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
        li.setAttribute('onclick', 'getId(this)')
        dropdownList.append(li)
        console.log(li)
        // valueCurr.options[valueCurr.options.length] = new Option(key, abbreviation[key].code);
        // resultCurr.options[resultCurr.options.length] = new Option(key, abbreviation[key].code);
      }
    });
  fetch("https://api.exchangerate.host/latest?base=RUB&places=4")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      exchangeRates = data.rates;
    });

    let btnDropdown = document.getElementById('btn_dropdown')

    btnDropdown.addEventListener('click', () => {
      dropdownList.classList.toggle('active')
    })


}   
 
