function grader(arr){
    var total = 0;
    arr.forEach(function(ele){
        total = total + ele;
    })
    var average = total / arr.length;
}

grader([2, 3, 2, 3]);