var student = {};
student.name = 'คุณลุง'
student.username = 'a@b.com'
student.gender = 'ชาย'
console.log(student.name)

// document.getElementById('output').innerText = student;

function addRow(container, key, value) {
    let row = document.createElement('div')
    row.classList.add('row')
    let columName = document.createElement('div')
    columName.classList.add('col-1')
    columName.classList.add('offset-1')
    columName.innerHTML = 'key';
    let columValue = document.createElement('div')
    columValue.classList.add('col')
    columValue.innerHTML = value;
    row.appendChild(columName)
    row.appendChild(columValue)
    output.appendChild(row)
}

function addStudentData(student) {
    const output = document.getElementById('output')
    addRow(output, 'ชื่อ', student.name)
    addRow(output, 'username', student.username)
    addRow(output, 'เพศ', student.gender)
}
var secondStudent = {}
secondStudent.name = 'น่ารัก'
secondStudent.username = 'x@y.com'
secondStudent.gender = 'หญิง'
window.addEventListener('load', function() {
    addStudentData(student)
})

var students = [
    student,
    secondStudent, {
        name: 'สมรักษ์',
        username: 'm@n.com',
        gender: 'ชาย'
    }
]