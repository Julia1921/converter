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
            let response = data.symbols
            for( key in response){
              valueCurr.options[valueCurr.options.length] = new Option( key, response[key].code);
              resultCurr.options[resultCurr.options.length]= new Option( key, response[key].code);
            }           
          })
          fetch('https://api.exchangerate.host/latest?base=RUB&places=4')
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            let repo = data.rates
            console.log(repo)

            val.addEventListener('input', () => {
              result.value = (val.value/repo[valueCurr.value]*repo[resultCurr.value]).toFixed(4)
            })
            result.addEventListener('input', () => {
              val.value = (result.value/repo[resultCurr.value]*repo[valueCurr.value]).toFixed(4)
            })
            resultCurr.addEventListener('change', () => {
              result.value = (val.value/repo[valueCurr.value]*repo[resultCurr.value]).toFixed(4)
            })
            valueCurr.addEventListener('change', () => {
              result.value = (val.value/repo[valueCurr.value]*repo[resultCurr.value]).toFixed(4)
            })
          })
}        

