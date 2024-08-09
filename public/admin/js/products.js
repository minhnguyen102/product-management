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