if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}
else{
    ready()
}

function ready(){
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
        //console.log(removeCartItemButtons)
        for(var i = 0; i < removeCartItemButtons.length ; i++){
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
        }
        
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
        for(var i = 0; i < quantityInputs.length ; i++){
            console.log(i)
            var inputs = quantityInputs[i]
            inputs.addEventListener('change', quantityChanged)
        }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(var i = 0; i < addToCartButtons.length ; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

    document.getElementsByClassName('btn3')[0].addEventListener('click', sendBtnClicked)
    btn3.onclick = sendBtnClicked
}

function sendBtnClicked(){
    alert('Your question has been sent to the support team!')
    console.log('send button toggle')
}

function purchaseClicked(){
    alert ('Thank you for your purchase')

    var cartItems = document.getElementsByClassName("cart-item")[0]
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    var inputs = event.target
    if(isNaN(inputs.value) || inputs.value <= 0){
        inputs.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var subTotal = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    console.log(title, price, imageSrc, subTotal)
    addItemToCart(title, price, imageSrc, subTotal)
    
}

function addItemToCart(title, price, imageSrc, subTotal){
    var cartRow = document.createElement('tr')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-item')[0]
    
    var cartItemNames = cartItems.getElementsByClassName('cart-title')
    for (var i = 0; i < cartItemNames.length; i++){
        if (cartItemNames[i].innerText == title){
            alert('This item is already added to the cart!')
            return
        }
    }

    var cartRowContents = `
    <tr class="cart-row">
        <td>
            <div class="cart-info">
                <img src="${imageSrc}" >
                <div>
                    <p class="cart-title">${title}</p>
                    <small  class="cart-price cart-column">${price}</small>
                    <br>
                    <a><button class="btn-danger">Remove</button></a>
                </div>
            </div>
        </td>
        <td ><input class="cart-quantity-input" type="number" value="1"></td>
        <td  class = "sub-total-price">${subTotal}</td>
    </tr>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    updateCartTotal()
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}






function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-item')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0;

    for(var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price*quantity)
        var sub = price*quantity
        var subTotal = Math.round(sub * 100) / 100
        document.getElementsByClassName('sub-total-price')[i].innerText ='$' + subTotal
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText ='$' + total
} 