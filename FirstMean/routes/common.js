module.exports = {

getNextMonth : function(month)  {
    var nextMonth; 
    if(month == 12){
    nextMonth = 1;
    }
    else{
    nextMonth = month + 1; 
    }
    if (nextMonth<10){
         nextMonth="0" + nextMonth;
    };
    return nextMonth;
},

getNextMonthYear : function(month, year)  {
    var nextMonthYear; 
    if(month == 12){
        nextMonthYear = year + 1;
    }
    else{
        nextMonthYear = year; 
    }
    return nextMonthYear;
} 
}
