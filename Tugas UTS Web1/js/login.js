document.addEventListener("DOMContentLoaded", function () {
    var formLogin = document.getElementById("formLogin");
    formLogin.addEventListener("submit", function (event) {
        event.preventDefault();
        var email = document.getElementById("email").value.trim();
        var password = document.getElementById("password").value;
        var akun = dataPengguna.find(function (user) {
            return user.email === email && user.password === password;
        });
        if (akun) {
            localStorage.setItem("penggunaAktif", JSON.stringify(akun));
            alert("Login berhasil. Selamat datang, " + akun.nama + "!");
            window.location.href = "dashboard.html";
        } else {
            alert("email/password yang anda masukkan salah");
        }
    });

    document.getElementById("formDaftar").addEventListener("submit", function (event) {
        event.preventDefault();
        var nama = document.getElementById("daftarNama").value.trim();
        var email = document.getElementById("daftarEmail").value.trim();
        var password = document.getElementById("daftarPassword").value;
        if (dataPengguna.some(function (u) { return u.email === email; })) {
            alert("Email sudah terdaftar pada data contoh.");
            return;
        }
        var akunBaru = { id: Date.now(), nama: nama, email: email, password: password, role: "User" };
        dataPengguna.push(akunBaru);
        localStorage.setItem("akunTambahan", JSON.stringify(dataPengguna));
        alert("Pendaftaran berhasil. Silakan login menggunakan akun baru.");
        tutupModal("modalDaftar");
        document.getElementById("formDaftar").reset();
    });

    document.getElementById("formLupa").addEventListener("submit", function (event) {
        event.preventDefault();
        var email = document.getElementById("lupaEmail").value.trim();
        var akun = dataPengguna.find(function (u) { return u.email === email; });
        alert(akun ? "Petunjuk demo: password akun ini adalah " + akun.password : "Email tidak ditemukan.");
        tutupModal("modalLupa");
    });
});
