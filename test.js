{
  //Переменные
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

 /*выполняется расчет конвертируемой валюты
  @param {number} amount Число которое конвертируется
  @param {number} valueCur Курс по отношению к рублю
  @param {number} resultCur Курс валюты, в которую необходимо конвертировать, по отношению к рублю
  @return {number} Число являющееся результатом математических действий
  */
  function exchange(amount, valueCur, resultCur) {
    return Math.round((amount / valueCur) * resultCur * 10000) / 10000;
  }

  /*
  Плучение id выбранного элемента и помещение этого значение в значение другого элемента
  @param {} el Выбранный элмент
  @param {} span Элемент в который нужно поместить значение
  */
  function getId(el, span) {
    span.textContent = el.id;
  }

  /*Поиск и отображение элементов в списке с назаваниями валют
  @param {string} input Текстовое значение элемента ввода, куда вводится искомое значение
  @param {string} id Id списка(элемента) в котором будут вестись поиски
  */
  function searchInDropdownList(input, id) {
    let item =[...document.getElementById(id).childNodes];
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
  
 /* Проверка на содержание значение в Local Storage, 
  если значение найдено, то оно помещается, в виде текстового значения, в кнопку
  @param {} element Элемент, значение которогобудет прверятся на нахождние в localStorage
  @param {} span Элемент в который необходимо поместить значение, в случае если оно найдено в localStorage
  @param {string} nameId Название ключа по которму будет проводится поиск значения в localStorage 
*/
  function chekLocalStorage(element, span, nameId) {
    if (localStorage.length > 0) {
      if ( element.id.includes(localStorage.getItem(nameId))) {
        getId(text, span);
      }
    }
  }
//Добавление обработчика, на отслеживание ввода в текстовое поле для конвертации значения
  result.addEventListener("input", () => {
    val.value = exchange(
      result.value,
      exchangeRates[spanTwo.textContent],
      exchangeRates[spanOne.textContent]
    );
  });

//Добавление обработчика, на отслеживание ввода в текстовое поле для конвертации значения
  val.addEventListener("input", () => {
    result.value = exchange(
      val.value,
      exchangeRates[spanOne.textContent],
      exchangeRates[spanTwo.textContent]
    );
    localStorage.setItem("inputOneText", val.value);
  });
//Поучение названий валют и заполнение этими значениями списка
  fetch("https://api.exchangerate.host/symbols")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let abbreviation = data.symbols; 
//Заполнение списка с названиями валют для раздела конверируемого значения
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
          localStorage.setItem("dropDownOneId", li.id); //Помещение выбранного значения в localStorage
        });
        dropdown_one.append(li);
        chekLocalStorage(li, spanOne, "dropDownOneId");  
      }
//Заполнение списка с названием валют для раздело вывода результата конвертаци 
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
          localStorage.setItem("dropDownTwoId", li.id); //Помещение выбранного значения в localStorage
        });
        dropdown_two.append(li);
        chekLocalStorage(li, spanTwo,"dropDownTwoId");
      }
    });

//Получение курса валют на текущий момент
  fetch("https://api.exchangerate.host/latest?base=RUB&places=4")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      exchangeRates = data.rates;
      //Проверка на ранее вводимые значения, если таковы имеются, вывод их в поле ввода
      if (localStorage.length > 0) {
        val.value = localStorage.getItem("inputOneText")
        result.value = exchange(val.value,exchangeRates[spanOne.textContent],exchangeRates[spanTwo.textContent])
      }

    });
  //Добавление обработчика для открытия списка с наименованиями валют
  resultCurr.addEventListener("click", () => {
    dropTwo.classList.toggle("active");
  });

  //Добавление обработчика для открытия списка с наименованиями валют
  valueCurr.addEventListener("click", () => {
    dropOne.classList.toggle("active");
  });
//добавление обработчика на отслеживание ввода в поле поиска наименования валют
  inputsSearchOne.addEventListener("input", () => {
    searchInDropdownList(inputsSearchOne.value, 'dropdown_one');
  });
//добавление обработчика на отслеживание ввода в поле поиска наименования валют
  inputsSearchTwo.addEventListener("input", () => {
    searchInDropdownList(inputsSearchTwo.value, 'dropdown_two');
  });
}
