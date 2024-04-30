export default {
    Parse(log) {
        const rows = log.split('\n');
        const raw_fields = rows[6].split('\t');
        raw_fields.shift();
        const fields = raw_fields.map((a, i) => ({
            key: `${a}`,
            dataKey: `${a}`,
            title: `${a}`,
            width: 150,
        }))
        for (let i = 0; i <= 7; i++) rows.shift()
        return { fields, rows }
    },
    GetData(fields, rows, start, end) {
        const data = [];
        let row;
        for (let i = start; i <= end; i++) {
            if (i >= rows.length || i < 0) break;
            row = fields.reduce(
                (rowData, column, columnIndex) => {
                    rowData[column.dataKey] = rows[i].split('\t')[columnIndex]
                    return rowData
                },
                {
                    id: i,
                    parentId: null,
                }
            )
            data.push(row)
        }
        return data
    }
}