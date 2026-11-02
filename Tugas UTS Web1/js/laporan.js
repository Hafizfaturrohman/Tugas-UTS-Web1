document.addEventListener("DOMContentLoaded", function () {
    wajibLogin();
    var riwayat = JSON.parse(localStorage.getItem("riwayat") || "[]");
    var total = riwayat.reduce(function (jumlah, item) { return jumlah + item.total; }, 0);
    document.getElementById("lapJumlah").textContent = riwayat.length;
    document.getElementById("lapTotal").textContent = formatRupiah(total);
    var tbody = document.getElementById("tabelLaporan");
    if (riwayat.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty">Belum ada pemesanan baru dari sesi ini.</td></tr>';
    } else {
        tbody.innerHTML = riwayat.map(function (item) {
            return `<tr><td>${item.nomorDO}</td><td>${item.nama}</td><td>${item.tanggal}</td><td>${formatRupiah(item.total)}</td><td><span class="badge pending">${item.status}</span></td></tr>`;
        }).join("");
    }
});
