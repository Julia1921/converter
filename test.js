{
  let val = document.getElementById("convertor");
  let result = document.getElementById("result");
  let resultCurr = document.getElementById("currRes");
  let valueCurr = document.getElementById("currVal");
  let dropdown_one = document.getElementById("dropdown_one");
  let dropdown_two = document.getElementById("dropdown_two");
  let spanOne = document.getElementById("spanOne");
  let spanTwo = document.getElementById("spanTwo");
  let dropOne = document.querySelector(".drop_one");
  let dropTwo = document.querySelector(".drop_two");
  let inputsSearchOne =  document.getElementById("search_word_one");
  let inputsSearchTwo =  document.getElementById("search_word_two");
  let exchangeRates;

  // localStorage.clear()
  function exchange(amount, valueCur, resultCur) {
    return Math.round((amount / valueCur) * resultCur * 10000) / 10000;
  }
  function getId(el, span) {
    span.textContent = el.id;
  }
  function searchInDropdownList(input, selector) {
    let item =[...document.getElementById(selector).childNodes];
    for (const i of item) {
        if (
          i.textContent.toLowerCase().includes(input.toLowerCase()) ||
          i.id.includes(input.toUpperCase())
        ) {
          i.classList.remove('active')
        } else {
          i.classList.add('active')
        }
      };
  }
  

  function chekLocalStorage(text, span, nameId) {
    if (localStorage.length > 0) {
      if ( text.id.includes(localStorage.getItem(nameId))) {
        getId(text, span);
      }
    }
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
    localStorage.setItem("inputOneText", val.value);
  });

  fetch("https://api.exchangerate.host/symbols")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let abbreviation = data.symbols;
      for (key in abbreviation) {
        let li = document.createElement("li");
        li.textContent = abbreviation[key].description;
        li.id = abbreviation[key].code;
        li.classList.add("dropdown_item");
        li.addEventListener("click", () => {
          getId(li, spanOne);
          dropOne.classList.toggle("active");
          result.value = exchange(
            val.value,
            exchangeRates[spanOne.textContent],
            exchangeRates[spanTwo.textContent]
          );
          localStorage.setItem("dropDownOneId", li.id);
        });
        dropdown_one.append(li);
        chekLocalStorage(li, spanOne, "dropDownOneId");  
      }
      for (key in abbreviation) {
        let li = document.createElement("li");
        li.textContent = abbreviation[key].description;
        li.id = abbreviation[key].code;
        li.classList.add("dropdown_item");
        li.addEventListener("click", () => {
          getId(li, spanTwo);
          dropTwo.classList.toggle("active");
          result.value = exchange(
            val.value,
            exchangeRates[spanOne.textContent],
            exchangeRates[spanTwo.textContent]
          );
          localStorage.setItem("dropDownTwoId", li.id);
        });
        dropdown_two.append(li);
        chekLocalStorage(li, spanTwo,"dropDownTwoId");
      }
    });
  fetch("https://api.exchangerate.host/latest?base=RUB&places=4")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      exchangeRates = data.rates;
      if (localStorage.length > 0) {
        val.value = localStorage.getItem("inputOneText")
        result.value = exchange(val.value,exchangeRates[spanOne.textContent],exchangeRates[spanTwo.textContent])
      }

    });

  resultCurr.addEventListener("click", () => {
    dropTwo.classList.toggle("active");
  });

  valueCurr.addEventListener("click", () => {
    dropOne.classList.toggle("active");
  });

  inputsSearchOne.addEventListener("input", () => {
    searchInDropdownList(inputsSearchOne.value, 'dropdown_one');
  });
  inputsSearchTwo.addEventListener("input", () => {
    searchInDropdownList(inputsSearchTwo.value, 'dropdown_two');
  });
}
