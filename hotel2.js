//Object data set

var data = [
    {dish: "Idly", id:"Item1", price: 10},
    {dish: "Dosa", id:"Item2", price: 25},
    {dish: "Chapati", id:"Item3", price: 15},
    {dish:"Puri", id:"Item4",price: 12},
    {dish:"Meals", id:"Item5", price:80},
    {dish:"Paratto", id:"Item6", price:10},
    {dish:"Biryani",id:"Item7",price:100}
]


let billing = document.getElementById("btn")
let button = document.createElement("button")
button.id = "addBtn"
button.innerHTML = "Add to Bill"
button.setAttribute("onclick", "addtoCart()")

billing.appendChild(button)

//creating elements inside the menu



for(i=0; i<data.length; i++)
{
    let menu = document.getElementById("Menu")
    let paratag = document.createElement("p")
    let checkbox = document.createElement("input")
    let quant = document.createElement("input")

    quant.type = "number"
    checkbox.type = "checkbox"
    checkbox.id =   `Item${i+1}`
    quant.id = `quantItem${i+1}`
    quant.className = "quant"
    checkbox.className = "check"

    checkbox.value = `${data[i].dish}`

    paratag.innerHTML = `${data[i].dish}: ${data[i].price}`
    paratag.appendChild(checkbox)
    paratag.appendChild(quant)
    menu.appendChild(paratag)

// menu style

paratag.style.fontSize = "20px"
checkbox.style.width= "30px"
quant.style.width = "40px"

}

var selectedDish = []

var z=0

function addtoCart()

{

selectedDish = []
    let check = document.getElementsByClassName("check")
    let quantity = document.getElementsByClassName("quant")
    for(i=0;i<check.length; i++)
    {
        if((check[i].checked)&&(quantity[i].value !=""))
        {
             var choosen = data.filter(item=> item.dish == check[i].value)
             choosen[0].quantity = Number(quantity[i].value)
             choosen[0].totalCost = choosen[0].quantity * choosen[0].price
             selectedDish.push(choosen[0])
        }
    }

//creating table

if(z>0)
{
    document.getElementById("tableData").remove()
    document.getElementById("totalPrice").remove()

}

let billDetails =  document.getElementById("bill")
let billTable = document.createElement("table")
billTable.id = "tableData"
let billTablehead = document.createElement("thead")
billDetails.appendChild(billTable)
billTable.appendChild(billTablehead)
var tableBody = document.createElement("tbody")
billTable.appendChild(tableBody)
var total = document.createElement("div")
var tableHead = ["Dish","Price per Quantity","Quantity", "Total","ID"]


for(j=0; j< tableHead.length; j++)
{
var billHead = document.createElement("th")
billHead.innerHTML =`${tableHead[j]}`
billTablehead.appendChild(billHead)
}


for(k=0; k<selectedDish.length; k++)
{
var tableRow = document.createElement("tr")
tableBody.appendChild(tableRow)
var tableColumn1 = document.createElement("td")
var tableColumn2 = document.createElement("td")
var tableColumn3 = document.createElement("td")
var tableColumn4 = document.createElement("td")
var tableColumn5 = document.createElement("td")
var removeRow = document.createElement("td")
var removeBtn = document.createElement("button")
removeBtn.innerHTML = "Remove"

removeBtn.id = `${k+1}`
removeBtn.className="btn"
removeBtn.onclick = function() {clean(this.id)}
tableRow.id=`${k+1}`

tableColumn1.innerHTML = `${selectedDish[k].dish}`
tableColumn2.innerHTML = `${selectedDish[k].price}`
tableColumn3.innerHTML = `${selectedDish[k].quantity}`
tableColumn4.innerHTML = `${selectedDish[k].price * selectedDish[k].quantity}`
tableColumn5.innerHTML = `${selectedDish[k].id}`

tableRow.appendChild(tableColumn1)
tableRow.appendChild(tableColumn2)
tableRow.appendChild(tableColumn3)
tableRow.appendChild(tableColumn4)
tableRow.appendChild(tableColumn5)
tableRow.appendChild(removeRow)
removeRow.appendChild(removeBtn)
}
var totalPrice = document.getElementById("total")
totalSpan = document.createElement("span")
totalSpan.id = "totalPrice"
totalPrice.appendChild(totalSpan)
var Summed = 0
function clean(clicked)
{
    let check = document.getElementsByClassName("check")

    for(i=0;i<selectedDish.length;i++)
    {
    if(clicked == i+1)
    {
        var selected = document.getElementById(i+1)
        selected.remove()

        var newId = "Item"+clicked
        removedArr = selectedDish.filter(item=> item.id != newId)
        selectedDish.splice(0)
        for(k=0;k<removedArr.length;k++)
        {
        selectedDish.push(removedArr[k])
        }
        var adjusted = 0

// Total Price adjusted for the removed items.
        
       for(i=0;i<selectedDish.length;i++)
        {
          adjusted += (selectedDish[i].totalCost)
        }
        totalSpan.innerHTML = `Total(Rs.)`+adjusted
    }
    }
}

//Total Price without anything removed.

for(i=0;i<selectedDish.length;i++)
{
 Summed += (selectedDish[i].totalCost)
}
totalSpan.innerHTML = `Total(Rs.)`+Summed
z++
}
