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