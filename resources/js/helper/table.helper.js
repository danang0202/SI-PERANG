export const filterDataRiwayatPengajuanUser = (data, keyword, dateRange, statusArr) => {
    try {
        let filteredData = data;
        if (keyword) {
            filteredData = filteredData.filter((item) =>
                item.no_pengajuan && item.no_pengajuan.toLowerCase().includes(keyword.toLowerCase())
            );
        }

        const [startDate, endDate] = dateRange;
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setHours(23, 59, 59, 999);
            filteredData = filteredData.filter((item) => {
                const createdAt = new Date(item.created_at);
                return createdAt >= start && createdAt <= end;
            });
        }
        if (statusArr.length > 0) {
            filteredData = filteredData.filter((item) =>
                statusArr.includes(item.status)
            );
        }
        return filteredData;
    } catch (error) {
        console.log('Error filter data riwayat  pengajuan user');
        return [];
    }
}

export function filterBarangs(barangs, keyword, selectedJenisBarang = [], selectedSatuanBarang = []) {
    let filteredData = barangs.filter((barang) =>
        barang.nama.toLowerCase().includes(keyword.toLowerCase()) ||
        barang.kode.toLowerCase().includes(keyword.toLowerCase())
    );

    if (selectedJenisBarang.length > 0) {
        filteredData = filteredData.filter((barang) => selectedJenisBarang.includes(barang.jenis_barang.nama));
    }

    if (selectedSatuanBarang.length > 0) {
        filteredData = filteredData.filter((barang) => selectedSatuanBarang.includes(barang.satuan_barang.nama));
    }

    return filteredData;
}

export function filterUsers(users, keyword, selectedTimKerja) {
    if (users) {
        let filteredData = users;
        if (keyword) {
            filteredData = users.filter((item) =>
                (item.nama && item.nama.toLowerCase().includes(keyword.toLowerCase())) ||
                (item.nip && item.nip.toLowerCase().includes(keyword.toLowerCase())) ||
                (item.email && item.email.toLowerCase().includes(keyword.toLowerCase()))
            );
        }
        if (selectedTimKerja.length > 0) {
            filteredData = filteredData.filter((item) => {
                console.log(item.tim_kerjas);

                return item.tim_kerjas && item.tim_kerjas.some((tim) => selectedTimKerja.includes(tim.nama));
            });
        }

        return filteredData;
    }

    return [];
}

export function filterTimKerja(timKerjas, keyword) {
    if (timKerjas) {
        let filteredData = timKerjas;
        if (keyword) {
            filteredData = timKerjas.filter((item) =>
                (item.nama.toLowerCase().includes(keyword.toLowerCase())) ||
                (item.nama_ketua.toLowerCase().includes(keyword.toLowerCase())) ||
                (item.nip_ketua.includes(keyword.toLowerCase()))

            );
        }
        return filteredData;
    }

    return [];
}

