document.addEventListener("DOMContentLoaded", function () {
    wajibLogin();
    var form = document.getElementById("formTracking");
    var hasil = document.getElementById("hasilTracking");
    var input = document.getElementById("nomorDO");
    var params = new URLSearchParams(window.location.search);
    if (params.get("do")) input.value = params.get("do");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var nomor = input.value.trim();
        var tambahan = JSON.parse(localStorage.getItem("trackingTambahan") || "{}");
        var semua = Object.assign({}, dataTracking, tambahan);
        var data = semua[nomor];
        if (!data) {
            hasil.innerHTML = '<div class="notice" style="background:#fff0f1;color:#b52f48">Nomor Delivery Order tidak ditemukan. Periksa kembali nomor DO.</div>';
            return;
        }
        var selesai = data.status === "Dikirim" || data.status === "Selesai";
        var progress = selesai ? 100 : (data.status === "Dalam Perjalanan" ? 65 : 25);
        hasil.innerHTML = `
            <div class="card">
                <div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">
                    <div><small class="muted">NOMOR DELIVERY ORDER</small><h2 style="margin:5px 0;color:#172554">${data.nomorDO}</h2></div>
                    <span class="badge ${selesai ? '' : 'pending'}">${data.status}</span>
                </div>
                <div class="progress"><span style="width:${progress}%"></span></div>
                <p class="muted" style="font-size:12px">${progress}% proses pengiriman (simulasi)</p>
                <div class="stats" style="grid-template-columns:repeat(2,1fr)">
                    <div><small class="muted">Nama Pemesan</small><strong style="display:block;margin-top:5px">${data.nama}</strong></div>
                    <div><small class="muted">Ekspedisi</small><strong style="display:block;margin-top:5px">${data.ekspedisi}</strong></div>
                    <div><small class="muted">Tanggal Kirim</small><strong style="display:block;margin-top:5px">${data.tanggalKirim}</strong></div>
                    <div><small class="muted">Jenis Paket</small><strong style="display:block;margin-top:5px">${data.paket}</strong></div>
                    <div><small class="muted">Total Pembayaran</small><strong style="display:block;margin-top:5px">${data.total}</strong></div>
                </div>
                <h3 style="font:700 16px Manrope;color:#172554">Riwayat Perjalanan</h3>
                <div class="timeline">${data.perjalanan.map(function (p) {
                    return `<div class="timeline-item"><strong>${p.waktu}</strong><p>${p.keterangan}</p></div>`;
                }).join("")}</div>
            </div>`;
    });
    if (input.value) form.requestSubmit();
});
