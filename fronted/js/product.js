window.onload = () =>{
    loadProducts()
}

async function loadProducts(){
    try{
        //  มาจาก api.js
        const products = await getProducts()
        renderProducts(products)
    }catch(err){
        console.log(err)
        alert('โหลดสินค้าไม่สำเร็จ')
    }
}

// เเสดงสินค้า
function renderProducts(products){
    const container = document.getElementById('product-list')

    // เคลียร์ก่อน
    container.innerHTML = ''

    products.forEach(p=>{
        const div = document.createElement('div')
        div.className = 'product-card'

    div.innerHTML = `
    <img src="http://localhost:3000/${p.image}" width="100%" />
    <h3>${p.name}</h3>
    <p>ราคา: ${p.price} บาท</p>
    <button onclick="handleAddToCart(${p.id})">
        เพิ่มลงตะกร้า
    </button>
    `
        container.appendChild(div)
    })
}

// เพิ่มสินค้าลงตะกร้า
async function handleAddToCart(productId){
    try{
        // api.js
        const res = await addToCart(productId,1)

        if(res.id){
            alert("เพิ่มสินค้าลงตะกร้าสำเร็จ")
        }else{
            alert(res.message || "เกิดข้อผิดพลาด")
        }
    }catch(err){
        console.log(err)
        alert('เกิดข้อผิดพลาด')
    }
}

async function goCart(){
    window.location.href = "cart.html"
}

async function logout(){
    window.location.href = "login.html"
}
