 {
        let val1 = document.getElementById("convertor")
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
          fetch('https://api.exchangerate.host/latest?base=RUB')
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            let repo = data.rates
            console.log(repo)
          })

}        

