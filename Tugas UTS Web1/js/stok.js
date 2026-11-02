document.addEventListener("DOMContentLoaded", function () {
    wajibLogin();
    var tabel = document.getElementById("tabelStok");
    var katalog = dataKatalogBuku.slice();
    var tambahan = JSON.parse(localStorage.getItem("stokTambahan") || "[]");
    katalog = katalog.concat(tambahan);

    function renderStok() {
        tabel.innerHTML = "";
        katalog.forEach(function (buku, index) {
            var baris = document.createElement("tr");
            baris.innerHTML = `
                <td><img class="book-cover" src="${buku.cover}" alt="Cover ${buku.namaBarang}" onerror="this.src='https://placehold.co/80x110?text=Buku'"></td>
                <td><strong>${buku.namaBarang}</strong><br><span class="muted">${buku.kodeBarang}</span></td>
                <td>${buku.jenisBarang}</td><td>${buku.edisi}</td>
                <td>${buku.stok}</td><td>${buku.harga}</td>
                <td><button class="btn btn-small" data-tambah="${index}">+ Keranjang</button></td>`;
            tabel.appendChild(baris);
        });
        document.getElementById("jumlahBuku").textContent = katalog.length;
    }
    renderStok();

    tabel.addEventListener("click", function (event) {
        var index = event.target.getAttribute("data-tambah");
        if (index === null) return;
        var buku = katalog[Number(index)];
        var keranjang = JSON.parse(localStorage.getItem("keranjang") || "[]");
        var ada = keranjang.find(function (item) { return item.kodeBarang === buku.kodeBarang; });
        if (ada) ada.jumlah += 1;
        else keranjang.push({ kodeBarang: buku.kodeBarang, namaBarang: buku.namaBarang, harga: rupiahKeAngka(buku.harga), jumlah: 1 });
        localStorage.setItem("keranjang", JSON.stringify(keranjang));
        alert(buku.namaBarang + " ditambahkan ke keranjang.");
    });

    document.getElementById("formStok").addEventListener("submit", function (event) {
        event.preventDefault();
        var baru = {
            kodeBarang: document.getElementById("kode").value.trim().toUpperCase(),
            namaBarang: document.getElementById("namaBuku").value.trim(),
            jenisBarang: document.getElementById("jenis").value,
            edisi: document.getElementById("edisi").value,
            stok: Number(document.getElementById("stokBaru").value),
            harga: formatRupiah(document.getElementById("harga").value),
            cover: "https://placehold.co/100x140?text=Buku"
        };
        if (katalog.some(function (b) { return b.kodeBarang === baru.kodeBarang; })) {
            alert("Kode buku sudah digunakan."); return;
        }
        katalog.push(baru);
        tambahan.push(baru);
        localStorage.setItem("stokTambahan", JSON.stringify(tambahan));
        renderStok();
        event.target.reset();
        tutupModal("modalStok");
        alert("Data stok berhasil ditambahkan.");
    });
});
