

function showMsg(text,success = false){
    const el = document.getElementById('msg')
    el.textContent = text
    el.className = 'msg' + (success ? ' success': ' error')
    el.style.display = 'block'
}
// สลับ tab
function switchTab(tab) {
  const isLogin = tab === 'login'
  document.getElementById('loginForm').style.display = isLogin ? 'block' : 'none'
  document.getElementById('registerForm').style.display = isLogin ? 'none' : 'block'

  document.querySelectorAll('.tab').forEach((t, i) => {
    t.classList.toggle('active', isLogin ? i === 0 : i === 1)
  })

  document.getElementById('msg').textContent = ''
}

// login
async function handleLogin(){
    try{
        const email = document.getElementById('loginEmail').value
        const password = document.getElementById('loginPassword').value
        
        // res ตรงนี้เป็น Object
        const res  = await fetch(`${BASE_URL}/auth/login`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email,password})
        })

        const data = await res.json()

        if (data.token){
            localStorage.setItem('token',data.token)
     

        showMsg('เข้าสู่ระบบได้สำเร็จ',true)

        setTimeout(() =>{
            window.location.href = 'index.html'
        },1000)
        }else{
            showMsg(data.message || 'login ไม่สำเร็จ')
        }
    }catch(err){
        console.log(err)
        showMsg('error')
    }
}

async function handleRegister(){
    try{
        const name = document.getElementById('regName').value
        const email = document.getElementById('regEmail').value
        const password = document.getElementById('regPassword').value

    
    const res = await fetch(`${BASE_URL}/auth/register`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({name,email,password})
    })

    const data = await res.json()

    // ok ไว้ดู ว่าสำเร็จไหม
    if (res.ok){
        showMsg("สมัครสำเร็จ ไป login ต่อ",true)
        setTimeout(()=>switchTab('login'),1000)
    }else{
        showMsg(data.message || 'error')
    }
    }catch(error){
        console.log(err)
        showMsg('error')
    }
}

