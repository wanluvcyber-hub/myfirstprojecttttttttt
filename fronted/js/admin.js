// ========================================
// ADMIN PAGE - PRODUCT MANAGEMENT
// ========================================

window.onload = () => {
  loadProducts()
}

// Load all products
async function loadProducts(){
    const products = await getProducts()
    renderProducts(products)
}

// Render products list
function renderProducts(products){
    const container = document.getElementById('products-list')
    const empty = document.getElementById('empty-message')

    container.innerHTML = ''

    if(products.length === 0){
        empty.style.display = 'block'
        return
    }

    empty.style.display = 'none'

    products.forEach(p=>{
        const div = document.createElement('div')
        div.style.borderBottom = '1px solid #eee'
        div.style.padding = '10px'
        
            div.innerHTML = `
      <img src="http://localhost:3000/${p.image}" width="60">
      <b>${p.name}</b> - ${p.price} บาท

      <button onclick="editProduct(${p.id}, '${p.name}', ${p.price}, ${p.stock})">
        แก้ไข
      </button>

      <button onclick="handleDelete(${p.id})">
        ลบ
      </button>
    `
        container.appendChild(div)
    })
}

async function handleSubmit(){
  const id = document.getElementById('product-id').value
  const name = document.getElementById('name').value
  const price = document.getElementById('price').value
  const stock = document.getElementById('stock').value
  const image = document.getElementById('image').files[0]

  // 👉 ถ้ามี id = แก้ไข
  if(id){
    await updateProduct(id,{ name, price, stock })
    alert('แก้ไขแล้ว')
    resetForm()
    loadProducts()
    return
  }

  // 👉 ถ้าไม่มี id = เพิ่ม
  const formData = new FormData()
  formData.append('name',name)
  formData.append('price',price)
  formData.append('stock',stock)
  if(image) formData.append('image',image)

  const res = await fetch(`${BASE_URL}/products`,{
    method:'POST',
    body:formData
  })

  if(res.ok){
    alert('เพิ่มสินค้า')
    resetForm()
    loadProducts()
  }
}

// Edit product - fill form with product data
async function editProduct(id,name,price,stock) {
    // Fill form with product data
    document.getElementById('product-id').value = id
    document.getElementById('name').value = name
    document.getElementById('price').value = price
    document.getElementById('stock').value = stock
    
    // Update UI for edit mode
    document.getElementById('form-title').textContent = '✏️ แก้ไขสินค้า'
    document.getElementById('btn-submit').textContent = '💾 บันทึก'
    document.getElementById('btn-cancel').style.display = 'flex'
  }

// Delete product with confirmation
async function handleDelete(id) {
  if (!confirm('⚠️ ลบสินค้านี้ใช่ไหม?')) return
  
  try {
    await deleteProduct(id)
    alert('✅ ลบสินค้าสำเร็จ')
    loadProducts()
  } catch (err) {
    console.log(err)
    alert('❌ ไม่สามารถลบสินค้า')
  }
}

function resetFrom(){
    document.getElementById('product-id').value = ''
    document.getElementById('name').value = ''
    document.getElementById('price').value = ''
    document.getElementById('stock').value = ''
    document.getElementById('image').value = ''

    document.getElementById('form-title').textContent = 'เพิ่มสินค้าใหม่'
    document.getElementById('btn-submit').textContent = 'เพิ่มส้นค้า'
    document.getElementById('btn-cancel').style.display = 'none'
}

function logout(){
    localStorage.removeItem('token')
    window.location.href = 'login.htmls'
}