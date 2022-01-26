 {
        let val1 = document.getElementById("convertor")
        let result = document.getElementById("result")
        let resultCurr = document.getElementById("currRes")
        let valueCurr = document.getElementById("currVal")


        var requestURL = 'https://api.exchangerate.host/symbols';
        var request = new XMLHttpRequest();
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();

        request.onload = function() {
          var response = request.response.symbols;
          for( key in response){
            valueCurr.options[valueCurr.options.length] = new Option( key, response[key].code);
            resultCurr.options[resultCurr.options.length]= new Option( key, response[key].code);
        } 
      }
}


