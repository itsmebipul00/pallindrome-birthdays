const inputDate = document.querySelector(".date");
const button = document.querySelector(".btn");
const output = document.querySelector(".output");


const showMessage = (msg) => output.innerHTML= msg

const reverseStr = (str) => str.split("").reverse().join("")

function isPallindrome(str){

    const reverse = reverseStr(str);
    if(str === reverse){
        return true;
    }
    return false;
}

function dateToString(date){
    const dateString = {day: "", month : "", year : ""};

    if(date.day <10)
    {
        dateString.day = "0" + date.day;
    }
    else{
        dateString.day = date.day.toString();
    }

    if(date.month <10)
    {
        dateString.month = "0" + date.month;
    }
    else{
        dateString.month = date.month.toString();
    }

    dateString.year = date.year.toString();

    return dateString;
}


function getallDates(date){

    const dateString = dateToString(date);

    const ddmmyyyy = dateString.day + dateString.month + dateString.year
    const mmddyyyy = dateString.month + dateString.day + dateString.year
    const yyyymmdd = dateString.year + dateString.month + dateString.day
    const ddmmyy = dateString.day + dateString.month + dateString.year.slice(-2)
    const mmddyy = dateString.month + dateString.day + dateString.year.slice(-2)
    const yymmdd = dateString.year.slice(-2) + dateString.month + dateString.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];

}

function checkPallindrome(date){

    const listOfPallins= getallDates(date)
    let isPal= false

    for(let i= 0; i<listOfPallins.length; i++){
        if(isPallindrome(listOfPallins[i])){
            isPal= true
            break
        }
    }
    return isPal
}

function IsLeapYear(year){
    if(year % 400 === 0)
    {
        return true;
    }
    if(year % 100 === 0)
    {
        return false;
    }
    if(year % 4 === 0)
    {
        return true;
    }
    return false;
}


function getNextDate(date){
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 2){
    
        if(IsLeapYear(year)){
        
            if(day > 29){
            
                day = 1;
                month++;
            }
        }
        else
        {
            if(day > 28){
            
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month - 1]){
        
            day = 1;
            month++;
        }
    }

    if(month > 12){
    
        month = 1;
        year++;
    }
    return {
        day:day,
        month:month,
        year: year,
    }
}


function nextPallindrome(date){
    let counter = 0;
    let nextDate = getNextDate(date);

    while(true){

        counter++

        const isNextPalindrome = checkPallindrome(nextDate)

        if(isNextPalindrome) break
        
        nextDate = getNextDate(nextDate);
    }

    return [counter, nextDate];
}

function getPreviousDate(date){
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if(month === 3){
    
        if(IsLeapYear(year)){
        
            if(day < 1){
            
                day = 29;
                month--;
            }
        }
        else{
        
            if(day < 1){
            
                day = 28;
                month--;
            }
        }

    }
    else{
    
        if(day < 1){
        
            month--;
            if(month < 1){
            
                month = 12;
                year--;
            }
            day = daysInMonth[month - 1];
        }
    }

    return {
        day:day,
        month:month,
        year: year,
    }
}


function previousPallindrome(date){
    let counter = 0;
    let previousDate = getPreviousDate(date);

    while(true){
    
        counter++;
        var isPreviousPalindrom = checkPallindrome(previousDate);
        if(isPreviousPalindrom) break;
        
        previousDate = getPreviousDate(previousDate);
    }

    return [counter,previousDate];
}

function clickHandler(){
    // console.log(inputDate.value)
    
    const dob= inputDate.value
    if(!dob){
        output.innerHTML='Please enter your date of birth'
    }else{
        const dateofBirth= dob.split('-');
        // console.log(dateofBirth)

        const date = {
            day : Number(dateofBirth[2]),
            month : Number(dateofBirth[1]),
            year : Number(dateofBirth[0])
        }

        const isPallindrome = checkPallindrome(date)

        if(isPallindrome){

           showMessage('Your birthday is a Pallindrome')
        }else{
            const [earlierBy, nextDate]= nextPallindrome(date)
            const [lateBy, previousDate]= previousPallindrome(date)
            if(earlierBy === 1){
                showMessage(`The next palindrome date is on ${nextDate.day}-${nextDate.month}-${nextDate.year}, you are early by ${earlierBy} day. Also the last palindrome date was on ${previousDate.day}-${previousDate.month}-${previousDate.year}, you are late by ${lateBy} days.`);
            }else if(lateBy === 1){
                showMessage(`The next palindrome date is on ${nextDate.day}-${nextDate.month}-${nextDate.year}, you are early by ${earlierBy} days. Also the last palindrome date was on ${previousDate.day}-${previousDate.month}-${previousDate.year}, you are late by ${lateBy} day.`);
            }else{
                showMessage(`The next palindrome date is on ${nextDate.day}-${nextDate.month}-${nextDate.year}, you are early by ${earlierBy} days. Also the last palindrome date was on ${previousDate.day}-${previousDate.month}-${previousDate.year}, you are late by ${lateBy} days.`);
            }
        }
    }

}




button.addEventListener("click", clickHandler);