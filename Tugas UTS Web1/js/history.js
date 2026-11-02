document.addEventListener("DOMContentLoaded", function () {
    wajibLogin();
    var riwayat = JSON.parse(localStorage.getItem("riwayat") || "[]");
    var tbody = document.getElementById("tabelHistory");
    if (!riwayat.length) {
        tbody.innerHTML = '<tr><td colspan="5" class="empty">History transaksi masih kosong. Silakan lakukan pemesanan buku.</td></tr>';
    } else {
        tbody.innerHTML = riwayat.slice().reverse().map(function (item) {
            return `<tr><td>${item.nomorDO}</td><td>${item.nama}</td><td>${item.ekspedisi}</td><td>${formatRupiah(item.total)}</td><td><a class="btn btn-light btn-small" href="tracking.html?do=${item.nomorDO}">Lihat DO</a></td></tr>`;
        }).join("");
    }
});
