// Fungsi umum yang dipakai pada beberapa halaman
function rupiahKeAngka(harga) {
    return Number(String(harga).replace(/[^\d]/g, "")) || 0;
}
function formatRupiah(angka) {
    return "Rp " + Number(angka).toLocaleString("id-ID");
}
function ambilPenggunaAktif() {
    return JSON.parse(localStorage.getItem("penggunaAktif") || "null");
}
function wajibLogin() {
    if (!ambilPenggunaAktif()) window.location.href = "login.html";
}
function keluar() {
    localStorage.removeItem("penggunaAktif");
    window.location.href = "login.html";
}
function tampilkanNama() {
    var user = ambilPenggunaAktif();
    var el = document.getElementById("namaPengguna");
    if (el && user) el.textContent = user.nama;
    var avatar = document.getElementById("inisial");
    if (avatar && user) avatar.textContent = user.nama.charAt(0).toUpperCase();
}
function setTahun() {
    var el = document.getElementById("tahun");
    if (el) el.textContent = new Date().getFullYear();
}
function bukaModal(id) {
    var modal = document.getElementById(id);
    if (modal) modal.classList.add("show");
}
function tutupModal(id) {
    var modal = document.getElementById(id);
    if (modal) modal.classList.remove("show");
}
function buatDO() {
    return "DO" + Date.now().toString().slice(-8);
}
document.addEventListener("DOMContentLoaded", function () {
    tampilkanNama();
    setTahun();
    document.querySelectorAll("[data-logout]").forEach(function (tombol) {
        tombol.addEventListener("click", keluar);
    });
    document.querySelectorAll(".modal-backdrop").forEach(function (backdrop) {
        backdrop.addEventListener("click", function (event) {
            if (event.target === backdrop) backdrop.classList.remove("show");
        });
    });
});
