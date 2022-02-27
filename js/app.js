const bill = document.getElementById("inp-bill")
const tipBtns = document.querySelectorAll(".btn")
const tipCustom = document.querySelector(".inp-tip")
const people = document.getElementById("inp-people")
const error = document.querySelector(".error-svg")
const results = document.querySelectorAll(".valor")
const restart = document.querySelector(".reset")


bill.addEventListener("input", setBillValue)
tipBtns.forEach(btn =>{
    btn.addEventListener("click", handleClick)
})
tipCustom.addEventListener("input", setTipCustomValue)
people.addEventListener("input", setPeople)
restart.addEventListener("click", reset)

bill.addEventListener("click", function(e){
    
})

let billValue = 0.0 //valor por default
let tipValue = 0.15
let peopleValue = 1

function validateFloat(s){
    var rgx =  /^[0-9]*\.?[0-9]*$/
    return s.match(rgx)
}

function validateInt(s){
    var rgx = /^[0-9]*/
    return s.match(rgx)
}

function setBillValue(){
    if(bill.value.includes(".")){
        bill.value = bill.value.replace(",", ".")
    }

    if(!validateFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.length-1)
    }
    
    billValue = parseFloat(bill.value)
    
    calculateTip()
}

function handleClick(){
    tipBtns.forEach(btn => {
        //clear active state
        btn.classList.remove("btn-active")

        //set active state
        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add("btn-active")
            tipValue = parseFloat(btn.innerHTML)/100
        }
    })

    tipCustom.value = ''
    
    calculateTip()
}

function setTipCustomValue(){
    //validation
    if(!validateInt(tipCustom.value)){
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1)
    }

    tipValue = parseFloat(tipCustom.value/100)

    //clear active state
    tipBtns.forEach(btn => {
        btn.classList.remove("btn-active")
    })
    if(tipCustom.value !== ""){
        calculateTip()
    }
}

function setPeople(){
    if(!validateInt(people.value)){
        people.value = people.value.substring(0, people.value.length-1)
    }

    peopleValue = parseFloat(people.value)

    if(peopleValue<=0){
        error.classList.add("show-error-svg")
    }
    else{
        error.classList.remove("show-error-svg")
    }

    calculateTip()
}

function calculateTip(){
    if (peopleValue >= 1){
        let tipAmount = billValue * tipValue / peopleValue
        let total = billValue * (tipValue + 1) / peopleValue
        results[0].innerHTML = "$" + tipAmount.toFixed(2)
        results[1].innerHTML = "$" + total.toFixed(2)
    }
}

function reset(){
    bill.value = ""
    setBillValue()

    tipBtns[2].click()

    people.value = ""
    setPeople()
}