// Change-Status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status ]")
if(buttonsChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    buttonsChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let statusChange = (statusCurrent == "active") ? "inactive" : "active";

            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.action = action; 
            // đối với những thuộc tính có sẵn trong thẻ như action ta khong cần dùng  formChangeStatus.getAttribute("actiono") mà có thể chấm thẳng đến luôn
            formChangeStatus.submit();
            // bình thường trong form cần 1 nút submit nhưng hàm này sẽ hỗ trợ cho việc submit
        })
    })
}
//End Change-Status

// Delete Item
const buttonsDelete = document.querySelectorAll("[button-delete]")
if(buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item")
    const path = formDeleteItem.getAttribute("data-path");
    
    buttonsDelete.forEach(buttonDelete => {
        buttonDelete.addEventListener("click", () => {
            const confirmDelete = confirm("Bạn chắc chắn muốn xóa sản phẩm này ?");
            if(confirmDelete){
                const id = buttonDelete.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                formDeleteItem.action = action;
                formDeleteItem.submit();
                // console.log(action)
            }
        })
    })
}
//End Delete Item


