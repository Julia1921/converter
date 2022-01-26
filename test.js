 {
        let val = document.getElementById("convertor")
        let result = document.getElementById("result")
        let resultCurr = document.getElementById("currRes")
        let valueCurr = document.getElementById("currVal")

        
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
          fetch('https://api.exchangerate.host/latest?base=RUB&places=4')
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            let exchangeRates = data.rates
            function formula() {
              result.value = Math.round((val.value/exchangeRates[valueCurr.value]*exchangeRates[resultCurr.value])*10000)/10000
            }
            function inversionFormula() {
              val.value = Math.round((result.value/exchangeRates[resultCurr.value]*exchangeRates[valueCurr.value])*10000)/10000
            }

            result.addEventListener('input', inversionFormula)
            val.addEventListener('input', formula)
            resultCurr.addEventListener('change', formula)
            valueCurr.addEventListener('change', formula)
            // resultCurr.addEventListener('change', () => {
            //   result.value = (val.value/exchangeRates[valueCurr.value]*exchangeRates[resultCurr.value]).toFixed(4)
            // })
            // valueCurr.addEventListener('change', () => {
            //   result.value = (val.value/exchangeRates[valueCurr.value]*exchangeRates[resultCurr.value]).toFixed(4)
            // })
          })
}        

