function duplicateEncode(word){
    var str = "";
    for (var i = 0; i < word.length; i++) {
        console.log(word.replace(word[i], ""));
      if (word.replace(word[i], "").indexOf(word[i]) !== -1) 
        str += ")";
      else str += "(";
    }
    return str;
}

function sumArray(array) {
  if (array == null || array.length == 0 || array.length == 1) 
    return 0;
  
  var maxIndex = array.indexOf(array.max());
  var minIndex = array.indexOf(array.min());
  console.log(maxIndex);
  console.log(minIndex);
  var sum = 0;
  for (let i = 0; i < array.length; i++) {
    if (i != maxIndex && i != minIndex)
      sum += array[i];
  }
  
  return sum;
}

Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

console.log(sumArray([1, 1, 5, 6]));