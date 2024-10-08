// filterStatus
// query = rep.query
module.exports = (query) => {
    let filterStatus = [
        {
            name : "Tất cả",
            status : "",
            class : ""
        },
        {
            name : "Hoạt động",
            status : "active",
            class : ""
        },
        {
            name : "Dừng họat động",
            status : "inactive",
            class : ""
        }
    ]
    // Tìm ra vị trí button có query hiện tại, xử lí hover
    if(query.status){
        const index = filterStatus.findIndex(item => item.status == query.status)
        filterStatus[index].class = "active";
    }else{
        const index = filterStatus.findIndex(item => item.status == "")
        filterStatus[index].class = "active";
    }
    return filterStatus;
}

// End filterStatus