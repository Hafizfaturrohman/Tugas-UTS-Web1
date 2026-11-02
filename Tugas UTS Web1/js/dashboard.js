document.addEventListener("DOMContentLoaded", function () {
    wajibLogin();
    var jam = new Date().getHours();
    var sapaan = jam < 11 ? "Selamat pagi" : (jam < 15 ? "Selamat siang" : (jam < 18 ? "Selamat sore" : "Selamat malam"));
    document.getElementById("greeting").textContent = sapaan;
    document.getElementById("tanggalHariIni").textContent = new Date().toLocaleDateString("id-ID", { weekday:"long", year:"numeric", month:"long", day:"numeric" });
    document.getElementById("statKatalog").textContent = dataKatalogBuku.length;
    document.getElementById("statTransaksi").textContent = JSON.parse(localStorage.getItem("riwayat") || "[]").length;
    document.getElementById("statTracking").textContent = Object.keys(dataTracking).length + Object.keys(JSON.parse(localStorage.getItem("trackingTambahan") || "{}")).length;
});
