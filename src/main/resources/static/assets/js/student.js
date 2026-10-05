document.addEventListener("DOMContentLoaded", () => {
    loadStudents();
});

async function loadStudents() {
    const response = await fetch("http://localhost:8080/api/students");
    const students = await response.json();
    renderStudents(students);
}

function renderStudents(students) {
    const tbody = document.getElementById("studentTableBody");
    tbody.innerHTML = "";
    students.forEach(student => {
        const row = `
        <tr>
            <td>${student.studentCode}</td>
            <td>${student.fullName}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.className}</td>
            <td class="text-end">
                <div class="table-actions d-flex justify-content-end gap-1">
                    <!-- Xem -->
                    <a class="btn btn-info btn-sm" href="student-form.html?id=${encodeURIComponent(student.id)}&mode=view" title="Xem">
                        <i class="bi bi-eye"></i>
                    </a>
                    <!-- Sửa -->
                    <a class="btn btn-warning btn-sm" href="student-form.html?id=${encodeURIComponent(student.id)}&mode=edit" title="Sửa">
                        <i class="bi bi-pencil-square"></i>
                    </a>
                    <!-- Xóa -->
                    <button class="btn btn-danger btn-sm" onclick="deleteStudent('${student.id}')" title="Xóa">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

// Xử lý Xóa sinh viên
async function deleteStudent(id) {
    if (confirm("Bạn có chắc chắn muốn xóa sinh viên này không?")) {
        try {
            await fetch(`http://localhost:8080/api/students/${id}`, {
                method: 'DELETE'
            });
            alert("Xóa thành công!");
            loadStudents(); // Tải lại bảng sau khi xóa
        } catch (error) {
            console.error("Lỗi khi xóa:", error);
            alert("Đã xảy ra lỗi khi xóa sinh viên.");
        }
    }
}