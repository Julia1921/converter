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
            for( key in response){
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

            val.addEventListener('input', () => {
              result.value = (val.value/exchangeRates[valueCurr.value]*exchangeRates[resultCurr.value]).toFixed(4)
            })
            result.addEventListener('input', () => {
              val.value = (result.value/exchangeRates[resultCurr.value]*exchangeRates[valueCurr.value]).toFixed(4)
            })
            resultCurr.addEventListener('change', () => {
              result.value = (val.value/exchangeRates[valueCurr.value]*exchangeRates[resultCurr.value]).toFixed(4)
            })
            valueCurr.addEventListener('change', () => {
              result.value = (val.value/exchangeRates[valueCurr.value]*exchangeRates[resultCurr.value]).toFixed(4)
            })
          })
}        

