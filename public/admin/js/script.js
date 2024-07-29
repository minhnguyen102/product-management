// Buttons Status
//  xử lí sự kiện lấy ra phần params muốn thêm 
const buttonsStutus = document.querySelectorAll("[btn-status]") ;
if (buttonsStutus.length > 0) {
    var url = new URL(window.location.href);
    buttonsStutus.forEach((item) => {
        item.addEventListener("click", () => {
            const status = item.getAttribute("btn-status")
            if(status) {
                url.searchParams.set("status", status);
            }else{
                url.searchParams.delete("status")
            }
            window.location.href = url.href;
        })
    })
}
//End Buttons Status

// Form Search
const  formSearch = document.querySelector("#form-search");
if(formSearch) {
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if(keyword) {
            url.searchParams.set("keyword", keyword);
        }else{
            url.searchParams.delete("keyword")
        }

        window.location.href = url.href;
    });
}
// End Form Search




