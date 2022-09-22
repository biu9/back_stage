const server = "https://cyzz.fun/HeartSpace";

export async function exportExcel(url) {
    const res = await fetch(server+url, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
    });
    const resTmp = await res.text();
    let blob = new Blob(["\ufeff",resTmp],{type:'application/csv'});
    downFile(blob,'导出.csv');
    console.log('export response : ',resTmp);
}

function downFile(blob, fileName) {
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName);
    } else {
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(link.href);
    }
}