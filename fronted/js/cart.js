window.onload = () => {
  loadCart()
}

async function loadCart(){
    try{
        const cart = await getCart()
        console.log(cart)
        renderCart(cart)
    }catch(err){
        console.log(err)
        alert('โหลดตะกร้าไม่สำเร็จ')
    }
}

function renderCart(items){
    const container = document.getElementById('cart-list')
    const totalEL = document.getElementById('total')
    const itemCountEl = document.getElementById('item-count')
    const subtotalEl = document.getElementById('subtotal')

    container.innerHTML = ''
    let total = 0
    let itemCount = 0

    if(items.length === 0){
        container.innerHTML = '<div class="empty-state"><h3>ตะกร้าว่าง</h3><p>ไม่มีสินค้าในตะกร้า</p></div>'
        totalEL.textContent = '0 บาท'
        subtotalEl.textContent = '0 บาท'
        itemCountEl.textContent = '0 รายการ'
        return
    }

    items.forEach(item=>{
        const div = document.createElement('div')
        const price = item.Product.price * item.quantity
        total += price
        itemCount += item.quantity

        div.className = 'cart-item'
        div.innerHTML = `
        <div class="cart-item-image">
            <img src="http://localhost:3000/${item.Product.image}" alt="${item.Product.name}">
        </div>
        <div class="cart-item-details">
            <div class="cart-item-name">${item.Product.name}</div>
            <div class="cart-item-price">${item.Product.price} บาท</div>
            <div class="quantity-control">
                <button onclick="decrease(${item.id})">−</button>
                <span>${item.quantity}</span>
                <button onclick="increase(${item.id})">+</button>
            </div>
        </div>
        <div class="cart-item-actions">
            <button class="btn-delete" onclick="handleDelete(${item.id})">ลบ</button>
        </div>
        `
        container.appendChild(div)
    })
    totalEL.textContent = `${total} บาท`
    subtotalEl.textContent = `${total} บาท`
    itemCountEl.textContent = `${itemCount} รายการ`
}

async function handleDelete(id){
    try{
        const res = await deleteCart(id)
        if(res.message){
            alert(res.message)
        }
        loadCart()
    }catch(err){
        console.log(err)
        alert('ลบสินค้าไม่สำเร็จ')
    }
}

async function handleCheckout(){
    const res = await checkout()

    if(res.orderId){
        localStorage.setItem('lastOrderId',res.orderId)
        window.location = 'receipt.html'
    }
}

async function increase(id){
    try{
        await increaseCart(id)
        loadCart()
    }catch(err){
        console.log(err)
        alert('เพิ่มจำนวนไม่สำเร็จ')
    }
}

async function decrease(id){
    try{
        await decreaseCart(id)
        loadCart()
    }catch(err){
        console.log(err)
        alert('ลดจำนวนไม่สำเร็จ')
    }
}