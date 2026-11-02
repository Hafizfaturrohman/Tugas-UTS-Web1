document.addEventListener("DOMContentLoaded", function () {
    wajibLogin();
    var keranjang = JSON.parse(localStorage.getItem("keranjang") || "[]");
    var tabel = document.getElementById("tabelKeranjang");
    var totalEl = document.getElementById("totalBelanja");

    function renderKeranjang() {
        tabel.innerHTML = "";
        var total = 0;
        if (keranjang.length === 0) {
            tabel.innerHTML = '<tr><td colspan="5" class="empty">Keranjang masih kosong. Silakan pilih buku di halaman katalog.</td></tr>';
        }
        keranjang.forEach(function (item, index) {
            var subtotal = item.harga * item.jumlah;
            total += subtotal;
            var tr = document.createElement("tr");
            tr.innerHTML = `<td>${item.namaBarang}<br><small class="muted">${item.kodeBarang}</small></td>
                <td>${formatRupiah(item.harga)}</td>
                <td><input aria-label="Jumlah" type="number" min="1" max="99" value="${item.jumlah}" data-jumlah="${index}" style="width:65px;padding:7px;border:1px solid #ddd;border-radius:6px"></td>
                <td>${formatRupiah(subtotal)}</td><td><button class="btn btn-danger btn-small" data-hapus="${index}">Hapus</button></td>`;
            tabel.appendChild(tr);
        });
        totalEl.textContent = formatRupiah(total);
        return total;
    }
    renderKeranjang();

    tabel.addEventListener("change", function (event) {
        var index = event.target.getAttribute("data-jumlah");
        if (index !== null) {
            keranjang[Number(index)].jumlah = Math.max(1, Number(event.target.value) || 1);
            localStorage.setItem("keranjang", JSON.stringify(keranjang));
            renderKeranjang();
        }
    });
    tabel.addEventListener("click", function (event) {
        var index = event.target.getAttribute("data-hapus");
        if (index !== null) {
            keranjang.splice(Number(index), 1);
            localStorage.setItem("keranjang", JSON.stringify(keranjang));
            renderKeranjang();
        }
    });

    document.getElementById("formCheckout").addEventListener("submit", function (event) {
        event.preventDefault();
        var total = renderKeranjang();
        if (keranjang.length === 0) { alert("Keranjang masih kosong."); return; }
        var nama = document.getElementById("pemesan").value.trim();
        var email = document.getElementById("emailPemesan").value.trim();
        var alamat = document.getElementById("alamat").value.trim();
        var ekspedisi = document.getElementById("ekspedisi").value;
        var pembayaran = document.getElementById("pembayaran").value;
        var nomorDO = buatDO();
        var transaksi = {
            nomorDO: nomorDO, nama: nama, email: email, alamat: alamat,
            ekspedisi: ekspedisi, pembayaran: pembayaran, tanggal: new Date().toLocaleDateString("id-ID"),
            total: total, status: "Pesanan diterima",
            items: keranjang
        };
        var riwayat = JSON.parse(localStorage.getItem("riwayat") || "[]");
        riwayat.push(transaksi);
        localStorage.setItem("riwayat", JSON.stringify(riwayat));
        var trackingBaru = JSON.parse(localStorage.getItem("trackingTambahan") || "{}");
        trackingBaru[nomorDO] = {
            nomorDO: nomorDO, nama: nama, status: "Pesanan diterima", ekspedisi: ekspedisi,
            tanggalKirim: new Date().toISOString().slice(0,10), paket: "REGULER", total: formatRupiah(total),
            perjalanan: [{ waktu: new Date().toLocaleString("id-ID"), keterangan: "Pesanan diterima dan sedang diproses." }]
        };
        localStorage.setItem("trackingTambahan", JSON.stringify(trackingBaru));
        localStorage.removeItem("keranjang");
        alert("Pemesanan berhasil! Nomor Delivery Order Anda: " + nomorDO);
        window.location.href = "tracking.html?do=" + nomorDO;
    });
});
