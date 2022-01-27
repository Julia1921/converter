 {
        let val = document.getElementById("convertor")
        let result = document.getElementById("result")
        let resultCurr = document.getElementById("currRes")
        let valueCurr = document.getElementById("currVal")
        let exchangeRates

        let exchange = function exchange (amount, valueCur, resultCur){
          return ( Math.round((amount/valueCur*resultCur)*10000)/10000)
        };
        // result.addEventListener('input', res(result.value,exchangeRates[resultCurr.value],exchangeRates[valueCurr.value]))
        // val.addEventListener('input', res(val.value, exchangeRates[valueCurr.value], exchangeRates[resultCurr.value]))
        // resultCurr.addEventListener('change', res(val.value, exchangeRates[valueCurr.value], exchangeRates[resultCurr.value]))
        // valueCurr.addEventListener('change', res(val.value, exchangeRates[valueCurr.value], exchangeRates[resultCurr.value]))


         fetch('https://api.exchangerate.host/symbols')
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            let abbreviation = data.symbols
            for( key in abbreviation){
              valueCurr.options[valueCurr.options.length] = new Option( key, abbreviation[key].code);
              resultCurr.options[resultCurr.options.length]= new Option( key, abbreviation[key].code);
            }           
          })
          exchangeRates = fetch('https://api.exchangerate.host/latest?base=RUB&places=4')
          .then((response) => {
            return response.json()
          })
          .then((data) => {
          })
          console.log(exchangeRates)
  
}        



            // function formula() {
            //   result.value = Math.round((val.value/exchangeRates[valueCurr.value]*exchangeRates[resultCurr.value])*10000)/10000
            // }
            // function inversionFormula() {
            //   val.value = Math.round((result.value/exchangeRates[resultCurr.value]*exchangeRates[valueCurr.value])*10000)/10000
            // }


