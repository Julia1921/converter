 {
        let val1 = document.getElementById("convertor")
        let result = document.getElementById("result")
        let resultCurr = document.getElementById("currRes")
        let valueCurr = document.getElementById("currVal")

        val1.value = 1

        function count() {
            var requestURL = `https://api.exchangerate.host/latest?base=${valueCurr.value}&symbols=USD,EUR,RUB&amount=${val1.value}`;
            var request = new XMLHttpRequest();
            request.open('GET', requestURL);
            request.responseType = 'json';
            request.send();
    
            request.onload = function() {
                var response = request.response.rates;
                result.value = response[resultCurr.value]
            }
        }
}
