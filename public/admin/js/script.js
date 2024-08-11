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

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination){
    var url = new URL(window.location.href);
    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    })
}
// End Pagination


// CheckBox All
const checkboxMulti = document.querySelector("[checkbox-multi]");
if(checkboxMulti){
    const inputCheckAll = checkboxMulti.querySelector("input[name = 'checkall']");
    const inputsId = checkboxMulti.querySelectorAll("input[name = 'id']");

    // console.log(inputsId.length);
    inputCheckAll.addEventListener("click", () => {
        const checked = inputCheckAll.checked;
        if (checked){
            inputsId.forEach(input => input.checked = true)
        }else {
            inputsId.forEach(input => input.checked = false)
        }
    })

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputsId.length){
                inputCheckAll.checked = true;
            }else{
                inputCheckAll.checked = false;
            }
        })
    })
}
// End CheckBox All


// Form change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti){
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputChecked = checkboxMulti.querySelectorAll("input[name='id']:checked"); 

        const typeChange = e.target.elements.type.value; // lấy ra option được chọn

        if(typeChange == "delete-all"){
            const isConfirm = confirm("Bạn muốn xóa sản phẩm này ?");
            if(!isConfirm){
                return;
            }
        }
        
        if(inputChecked.length > 0) {
            let ids = [];
            const idsInput = formChangeMulti.querySelector("input[name = 'ids']");
            inputChecked.forEach(input => {
                const id = input.value
                if(typeChange == "change-position"){
                    // mảng ids[] cần có dữ liệu dạng (id-position)
                    const position = input.closest("tr").querySelector("input[name = 'position']").value;
                    // console.log(`${id}-${position}`);
                    ids.push(`${id}-${position}`)
                }else{
                    ids.push(id);
                }
            });
            idsInput.value = ids.join(", ")
            formChangeMulti.submit();

        }else{
            alert("Vui lòng chọn ít nhất 1 sản phẩm")
;        }
    })
}

// End Form change multi

// Show alert
    const showAlert = document.querySelector("[show-alert]");
    const closeAlert =document.querySelector("[close-alert]");
    console.log(closeAlert);
    if(showAlert){
        const time = parseInt(showAlert.getAttribute("data-time"))
        
        setTimeout(() => {
            showAlert.classList.add("alert-hidden");
        }, time)

        closeAlert.addEventListener("click", () => {
            showAlert.classList.add("alert-hidden");
        })
    }
// End Show alert





