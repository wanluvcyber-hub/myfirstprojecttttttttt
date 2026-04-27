window.onload = ()=>{
    const orderId = localStorage.getItem('lastOrderId')
    if(orderId){
        loadOrder(orderId)
    }
}

async function loadOrder(id){
    try{
        const res = await fetch(`${BASE_URL}/orders/${id}`,{
            headers:{ Authorization: 'Bearer ' + getToken()}
        })

        const data = await res.json()
        const div = document.getElementById('receipt')
        let html = `
        <div class="order-details">
            <div class="order-row">
                <span class="order-row-label">หมายเลขออร์เดอร์:</span>
                <span class="order-row-value">#${data.id}</span>
            </div>
        </div>
        <div class="order-items">
            <h3>รายการสินค้า</h3>
        `

        data.OrderItems.forEach(item => {
            html += `
            <div class="item-line">
                <span>${item.Product.name}</span>
                <span>× ${item.quantity}</span>
                <span>${item.price * item.quantity} บาท</span>
            </div>
            `
        });
        html += `
        </div>
        <div class="order-details">
            <div class="order-row order-row-value" style="font-size: 18px;">
                <span>รวมทั้งสิ้น:</span>
                <span style="color: var(--kraken-purple)">${data.total} บาท</span>
            </div>
        </div>
        `
        div.innerHTML = html
    }catch(err){
        console.log(err)
        document.getElementById('receipt').innerHTML = '<p style="color: red;">โหลดข้อมูลไม่สำเร็จ</p>'
    }
}