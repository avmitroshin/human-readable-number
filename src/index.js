module.exports = function toReadable (number) {

  function parseHundred (value) {
    let result = "";
    result += value[0] < "1" ? "" : VOC[value[0]] + " hundred";

    if (value[1] > "1") {
      result += `${value[1]}0` in VOC ? ` ${VOC[value[1]+"0"]}` : ` ${VOC[value[1]]}ty`;
    } else if (value[1] > "0"){
      result += value.slice(1) in VOC ? ` ${VOC[value.slice(1)]}` : ` ${VOC[value[2]]}teen`;
    }

    if (value[1] !== "1" ){
      result += VOC[value[2]] < 1 ? "" : ` ${VOC[value[2]]}`;
    }

    return result;
  }

  const VOC = {
    "0":  "",
    "1":  "one",
    "2":  "two",
    "3":  "three",
    "4":  "four",
    "5":  "five",
    "6":  "six",
    "7":  "seven",
    "8":  "eight",
    "9":  "nine",
    "10": "ten",
    "11": "eleven",
    "12": "twelve",
    "13": "thirteen",
    "15": "fifteen",
    "18": "eighteen",
    "20": "twenty",
    "30": "thirty",
    "40": "forty",
    "50": "fifty",
    "80": "eighty",
  }

  const rank = {
    "15": "quadrillion",
    "12": "trillion",
    "9":  "billion",
    "6":  "million",
    "3":  "thousand",
    "0":  ""
  }

  let value = ("000000000000000000".slice(number.toString().length) + number).toString();
  let result = "";

  if (number === 0) return "zero";

  for (let i = value.length - 3; i >= 0; i -= 3) {
    let regexp = new RegExp(`(.{3}).{${i}}$`);
    let hundreds = value.match(regexp)[1];
    result += +hundreds < 1 ? "" : parseHundred(hundreds) + ` ${rank[i]} `;
  }

  return result.trim();
}
