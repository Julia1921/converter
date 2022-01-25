// //выведение в столбец четных чисел от 1 до 100 
// {
//     for(let i=1; i<=100; i++) {
//         if( i%2 == 0){
//         document.write(i + '<br>')
//         }
//     }
// }

// //сумма чисел от 1 до 100, с выводом в консоль итогового результата
// {
//     let result = 1
//     for(let i=0; i<=100; i++){
//         result += i;
//     }
//     console.log(result)
// }

// //сумма элементов массива
// {
//     let arr = [1, 2, 3, 4, 5];
//     let result = 1;
//     for(let i = 0; i < arr.length; i++){
//         result +=arr[i];
//     }
//     console.log(result)
// }

// //Вывод на экран свойств обекта и их знчений 
// {
//     let obj = {
//         green: 'зеленый',
//         red: 'красный',
//         blue: 'голубой',
//     }
//     for(let key in obj){
//         console.log(key + ' по русски это ' + obj[key] + ' цвет')
//     }
// }

// //из массива составлем стрку с добавлением эементовк каждому элементу массива
// {
//     let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9 ]
//     //при помощи методов массива
//         let str = arr.join('-')
//         console.log('-' + str + '-')
//     //при помощи цикла for
//     for(let i = 0; i < arr.length; i++){
//         str[i] = arr[i] + '-'
//     }
//     console.log('-' + str + '-')
// }

// //вывод выходных дней в жирном начертании, все остальные дни недели в обычном начертании
// {
//     let arr = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
//     for(let i = 0; i < arr.length; i++){
//         if(arr[i] == 'сб' || arr[i] == 'вс'){
//             document.write('<b>' + arr[i] + '</b>' + ' ')  
//         } else {
//             document.write(arr[i] + ' ')
//         }
//     }
// } 

// //счетчик итераций по услвию пока результат деления не станет меньше 50
// {
//     let count = 0;
//     let n = 1000;
//     for(let i = 2; n>50; count++ ){
//         n = n/2
//     }
//     console.log(count)
// }

// //получение ключей свойств объекта в массив
// {
//     let obj =  {js:'test', jq: 'hello', css: 'world'};
//     let arrNew = Object.keys(obj)
//     console.log(arrNew)
// }

// //Сделать заглавным первый символ строки
// {
//     let str = 'дана некая сторка';
//     str = str[0].toUpperCase() + str.substr(1)
//     console.log(str)
// }

// //Переворот строки в обратном направлении
// {
//     let str = '123456';
//     str = str.split('').reverse().join('');
//     console.log(str)
// }

// //функция возвращающая день недели по номеру 
// {
//     function daysOfTheWeek (num) {
//         let obj = {
//             1: 'пн',
//             2: 'вт',
//             3: 'ср',
//             4: 'чт',
//             5: 'пт',
//             6: 'сб',
//             7: 'вс',
//         }
//         return obj[num];
//     }
//    console.log(daysOfTheWeek(3))
// }

// //Добавление элемента в массив (какой порядковый номер элемента, столько символов и содержит элемент))
// {
//     let arr = []
//     for(let i = 1; i <= 3; i++){
//         arr.push('x'.repeat(i))
//     }
//     console.log(arr)
// }
// //Добавление элемента в массив (какой порядковый номер элемента, столько символов и содержит элемент, сами символы тоже соответсвуют порядковому номеру))

// {
//     let arr = []
//     for(let i = 1; i <= 3; i++){
//         arr.push(String(i).repeat(i))
//     }
//     console.log(arr)
// }

// //функцию, которая принимает число и возвращает количество цифр этого числа
// {
//     function digits(n) {
//     let num = n.toString()
//     console.log(num)

//     let s = num.split('')
//     console.log(s.length)
//   }
//   digits(55)
// }
// //  Напишите программу, которая бы вывела числа от одного до ста включительно по следующим правилам: 
// // если число делится на 3, то выведите "fizz", 
// // если число делится на 5, то выведите "buzz",
// // если число делится и на 3, и на 5, то выведите "fizzbuzz",
// // а если ни одно из этих условий не выполняется, то выведите число как обычно.
// {
//     for (let num = 1; num <= 100; num++) {
//         console.log((num%3 ? "" : "fizz") + (num%5 ? "" : "buzz") || num)
//     }
// }
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


// var requestURL = 'https://api.exchangerate.host/latest?base=USD&symbols=USD,EUR,RUB';
// var request = new XMLHttpRequest();
// request.open('GET', requestURL);
// request.responseType = 'json';
// request.send();

// request.onload = function() {
//   var response = request.response;
//   console.log(response);
// }