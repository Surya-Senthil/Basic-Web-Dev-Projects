function eval(expression){
  if(expression.indexOf("+") != -1)
    return parseFloat(expression.substring(0, expression.indexOf("+"))) + parseFloat(expression.substring(expression.indexOf("+") + 1)); 
  else if(expression.indexOf("-") != -1)
    return parseFloat(expression.substring(0, expression.indexOf("-"))) - parseFloat(expression.substring(expression.indexOf("-") + 1)); 
  else if(expression.indexOf("÷") != -1)
    return parseFloat(expression.substring(0, expression.indexOf("÷"))) / parseFloat(expression.substring(expression.indexOf("÷") + 1));
  else
    return parseFloat(expression.substring(0, expression.search(timesSymbol))) * parseFloat(expression.substring(expression.search(timesSymbol) + 1));
  }

let operator = false, period = false, oplast = false;
const prev = document.querySelector(".prev");
const curr = document.querySelector(".curr");
const buttons = document.querySelector(".calc__keys");
const timesSymbol = buttons.querySelector(".times").textContent;

buttons.addEventListener("click", function (e) {
  if (e.target.className == "AC") {
    operator = false;
    period = false;
    oplast = true;
    prev.textContent = "";
    curr.textContent = "";
  } 
  else if (e.target.className == "DEL") {
    let cut = curr.textContent.substring(curr.textContent.length-1); 
    if(cut == ".")
      period = false;
    else if(cut == "+" || cut == "-" || cut == "÷" || cut == timesSymbol){
      oplast = false;
      operator = false;
    }
  
    curr.textContent = curr.textContent.substring(
      0,
      curr.textContent.length - 1
    );
  } 
  else if(e.target.className == "equal"){
    if(curr.textContent.substring(curr.textContent.length-1).search(/[0-9$]/) != -1){
      if(!operator)
        prev.textContent = curr.textContent;
      else{
        operator = false;
        oplast = false;
        prev.textContent = curr.textContent;
        curr.textContent = eval(curr.textContent);
        period = curr.textContent.indexOf(".") != -1;
      }
    }
    
  } 
  else if(e.target.className == "period"){
    if(!period)
      curr.textContent += e.target.textContent;
    period = true;
  }  
  else if(e.target.className == "plus" || e.target.className == "minus" || e.target.className == "times" || e.target.className == "divide"){   
    if(!oplast && curr.textContent != ""){
      if(operator){
        prev.textContent = curr.textContent;
        curr.textContent = eval(curr.textContent);
      }
      curr.textContent += e.target.textContent;
    }
    oplast = true;
    period = false;
    operator = true;
  }
  else{
    curr.textContent += e.target.textContent;
    oplast = false;
  }
  
});
