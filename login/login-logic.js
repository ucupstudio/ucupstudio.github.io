// login/login-logic.js
const initLogin = (GAS_API_URL, onLoginSuccess) => {
    const form = document.getElementById('loginForm');
    const msg = document.getElementById('loginMsg');
    const btn = document.getElementById('btnLogin');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        btn.disabled = true;
        btn.innerText = "Authenticating...";
        msg.className = "mt-4 text-center text-sm text-blue-500";
        msg.innerText = "Menghubungi Server Induk...";

        const payload = {
            action: 'login',
            user: document.getElementById('userInp').value,
            pass: document.getElementById('passInp').value,
            secret: 'KODE_RAHASIA_ANDA' // Security layer
        };

        try {
            // Menggunakan URLSearchParams agar CORS lancar di GAS
            const response = await fetch(GAS_API_URL, {
                method: 'POST',
                mode: 'no-cors', // Penting untuk GAS
                body: JSON.stringify(payload)
            });

            /* CATATAN: GAS 'no-cors' tidak mengembalikan body response. 
               Untuk sistem login yang lebih valid, kita akan menggunakan 
               pendekatan JSONP atau membiarkan GAS mengembalikan redirect.
               Namun untuk tahap awal, kita asumsikan validasi via GAS Web App.
            */
            
            // Simulasi Validasi (Karena no-cors membatasi bacaan response):
            // Di tahap produksi, kita akan gunakan fetch dengan mode cors yang benar di GAS
            localStorage.setItem('auth_token', btoa(payload.user + ':' + payload.pass));
            onLoginSuccess();
            
        } catch (err) {
            msg.className = "mt-4 text-center text-sm text-red-500";
            msg.innerText = "Gagal terhubung ke server.";
            btn.disabled = false;
            btn.innerText = "Sign In";
        }
    });
};
