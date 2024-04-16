if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

var totalAmount = "0,00"

function ready() {
/* FUNÇÃO DE REMOVER ITEM DO CARRINHO*/
    const removeProductButtons = document.getElementsByClassName("remove-product-button")
    for (var i = 0; i < removeProductButtons.length; i++) {
        removeProductButtons[i].addEventListener("click", removeProduct)
    }

    /* FUNÇÃO DE ALTERAR QUANTIDADE NO CARRINHO*/
    const qtdInputs = document.getElementsByClassName("product-qtd-input")
    for ( var i = 0; i < qtdInputs.length; i++) {
        qtdInputs[i].addEventListener("change", updateTotal)
    }
    /* FUNÇÃO DE ADCIONAR ITEM NO CARRINHO*/
        const addtocartButtons = document.getElementsByClassName("button-hover-background")
    for (var i = 0; i < addtocartButtons.length; i++) {
        addtocartButtons[i].addEventListener("click", addproducttoCart)
    }
    /* BOTÃO DE "FINALIZAR COMPRA"*/
    const purchaseButton = document.getElementsByClassName("purchase-button")[0]
    purchaseButton.addEventListener("click", makePurchase)
}


function makePurchase() {
    if (totalAmount === "0,00") {
        alert("Seu carrinho está vazio")
    }   else {
        alert(
            `
                Obrigado pela sua compra!
                Valor do pedido: R$${totalAmount}
                Volte sempre :)
                  
            `

        )
    }

    document.querySelector(".cart-table tbody").innerHTML = ""
    updateTotal()
}


function checkInputisnull(event) {
    if (event.target.value === "0") {
        event.target.parentElement.parentElement.remove()
    }
    
    updateTotal()
}



function addproducttoCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[0].src
    const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText

    const productCartName = document.getElementsByClassName("cart-product-title")
    for (var i = 0; i < productCartName.length; i++) {
        if (productCartName[i].innerText === productTitle) {
            productCartName[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
            
            updateTotal()
            return  
        }
    }

    
    let newCarProduct = document.createElement("tr")
    newCarProduct.classList.add("cart-product")

    newCarProduct.innerHTML = 
    `
    <td class="product-iden">
        <img class="cart-product-image" src="${productImage}" alt="${productTitle}">
        <strong class="cart-product-title">${productTitle}</strong>
    </td>
    <td >
        <span class="cart-product-price">${productPrice}</span>
    </td>
    <td>
        <input class="product-qtd-input" type="number" value="1" min="0">
        <button class="remove-product-button" type="button">Remover</button>
    </td>
    `

    const tableBody = document.querySelector(".cart-table tbody")
    tableBody.append(newCarProduct)

    updateTotal()
    newCarProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkInputisnull)
    newCarProduct. getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
    
}



function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
}



/* FUNÇÃO DE PREÇO TOTAL*/
function updateTotal() {
totalAmount = 0
const cartProduct = document.getElementsByClassName("cart-product")
for (var i = 0; i < cartProduct.length; i++) {
    const productPrice = cartProduct[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".")
    const productQtd = cartProduct[i].getElementsByClassName("product-qtd-input")[0].value

    totalAmount += productPrice * productQtd
}
totalAmount = totalAmount.toFixed(2)
totalAmount = totalAmount.replace(".", ",")
document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
}
