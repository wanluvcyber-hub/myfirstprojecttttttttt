const BASE_URL = 'http://localhost:3000/api'

function getToken(){
  return localStorage.getItem('token')
}

async function login(email,password){
  const res = await fetch(`${BASE_URL}/auth/login`,{
    method : 'POST',
    headers :{
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify({email,password})
  })
  return res.json()
}

async function register(name,email,password){
  const res = await fetch(`${BASE_URL}/auth/register`,{
    method:"POST",
    headers:{
      'Content-Type':"application/json"
    },
    body: JSON.stringify({name,email,password})
  })
  return res.json()
}

async function getProducts(){
  const res = await fetch(`${BASE_URL}/products/getProducts`)
  return res.json()
}

async function deleteProduct(id){
  const res = await fetch(`${BASE_URL}/products/deleteProduct/${id}`,{
    method:'DELETE'
  })
  return res.json()
}

async function updateProduct(id, data){
  const res = await fetch(`${BASE_URL}/products/updateProduct/${id}`,{
    method:'PUT',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data)
  })
  return res.json()
}

async function addToCart(productId,quantity = 1){
  const res = await fetch(`${BASE_URL}/cart/add`,{
    method:"POST",
    headers:{
      'Content-Type':"application/json",
      'Authorization':'Bearer ' + getToken()
    },
    body: JSON.stringify({productId,quantity})
  })
  return res.json()
}

async function getCart(){
  const res = await fetch(`${BASE_URL}/cart/`,{
    headers:{
      'Authorization':'Bearer ' + getToken()
    }
  })
  return res.json()
}

async function deleteCart(id){
  const res = await fetch(`${BASE_URL}/cart/${id}`,{
    method:'DELETE',
    headers:{
      'Authorization':'Bearer ' + getToken()
    }
  })
  return res.json()
}

async function checkout(){
  const res = await fetch(`${BASE_URL}/cart/checkout`,{
    method : 'POST',
    headers :{
        'Authorization':'Bearer ' + getToken()
    }
  })
  return res.json()
}

async function increaseCart(id){
  const res = await fetch(`${BASE_URL}/cart/increase/${id}`,{
    method:'PUT',
    headers:{
      'Authorization':'Bearer ' + getToken()
    }
  })
  return res.json()
}

async function decreaseCart(id){
  const res = await fetch(`${BASE_URL}/cart/decrease/${id}`,{
    method:'PUT',
    headers:{
      'Authorization':'Bearer ' + getToken()
    }
  })
  return res.json()
}