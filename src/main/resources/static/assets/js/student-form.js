document.addEventListener("DOMContentLoaded", () => {
    // Lấy ID và chế độ (mode) từ URL (ví dụ: ?id=123&mode=edit)
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const mode = urlParams.get('mode');

    if (id) {
        loadStudentDetails(id, mode);
    }

    // Xử lý sự kiện Submit Form (Thêm hoặc Sửa)
    document.getElementById("studentForm").addEventListener("submit", async (e) => {
        e.preventDefault(); // Ngăn trình duyệt load lại trang
        await saveStudent();
    });
});

async function loadStudentDetails(id, mode) {
    try {
        // Lấy thông tin sinh viên bằng GET API
        const response = await fetch(`http://localhost:8080/api/students/${id}`);
        const student = await response.json();

        // Đổ dữ liệu vào các ô input
        document.getElementById("studentId").value = student.id;
        document.getElementById("studentCode").value = student.studentCode;
        document.getElementById("fullName").value = student.fullName;
        document.getElementById("email").value = student.email;
        document.getElementById("phone").value = student.phone;
        document.getElementById("className").value = student.className;

        if (mode === 'edit') {
            document.getElementById("formTitle").innerText = "Cập nhật sinh viên";
        } else if (mode === 'view') {
            document.getElementById("formTitle").innerText = "Chi tiết sinh viên";
            document.getElementById("btnSave").style.display = "none"; // Ẩn nút lưu
            // Khóa (disable) tất cả các ô input
            const inputs = document.querySelectorAll("input");
            inputs.forEach(input => input.disabled = true);
        }
    } catch (error) {
        console.error("Lỗi tải thông tin:", error);
    }
}

async function saveStudent() {
    const id = document.getElementById("studentId").value;
    const studentData = {
        studentCode: document.getElementById("studentCode").value,
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        className: document.getElementById("className").value
    };

    let url = "http://localhost:8080/api/students";
    let method = "POST"; // Mặc định là Thêm mới

    if (id) {
        url = `${url}/${id}`;
        method = "PUT"; // Nếu có ID thì là Cập nhật
    }

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            alert("Lưu thông tin thành công!");
            window.location.href = "student.html"; // Quay lại trang danh sách
        } else {
            alert("Có lỗi xảy ra khi lưu.");
        }
    } catch (error) {
        console.error("Lỗi khi lưu:", error);
    }
}