// var student = {};
// student.name = 'คุณลุง'
// student.username = 'a@b.com'
// student.gender = 'ชาย'
// console.log(student.name)

// document.getElementById('output').innerText = student;

// function addRow(container, key, value) {
//     let row = document.createElement('div')
//     row.classList.add('row')
//     let columName = document.createElement('div')
//     columName.classList.add('col-1')
//     columName.classList.add('offset-1')
//     columName.innerHTML = key;
//     let columValue = document.createElement('div')
//     columValue.classList.add('col')
//     columValue.innerHTML = value;
//     row.appendChild(columName)
//     row.appendChild(columValue)
//     output.appendChild(row)
// }

// function addStudentData(student) {
//     const output = document.getElementById('output')
//     addRow(output, 'ชื่อ', student.name)
//     addRow(output, 'username', student.username)
//     addRow(output, 'เพศ', student.gender)
// }

// var secondStudent = {}
// secondStudent.name = 'น่ารัก'
// secondStudent.username = 'x@y.com'
// secondStudent.gender = 'หญิง'
// window.addEventListener('load', function() {
//     addStudentData(student)
// })

// var students = [
//     student,
//     secondStudent, {
//         name: 'สมรักษ์',
//         username: 'm@n.com',
//         gender: 'ชาย'
//     }
// ]

var singleStudentResult = document.getElementById('single_student_result')
var listStudentResult = document.getElementById('output')
var addUserDetail = document.getElementById('addUserDetail')

function hideAll() {
    singleStudentResult.style.display = 'none'
    listStudentResult.style.display = 'none'
    addUserDetail.style.display = 'none'
}

function addStudentToTable(index, student) {
    const tableBody = document.getElementById('tableBody')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('scope', 'row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = `${student.name} ${student.surname}`
    row.appendChild(cell)
    cell = document.createElement('td')
        // cell.innerHTML = student.username
    let someDiv = document.createElement('div')
    cell.appendChild(someDiv)
    let imgElem = document.createElement('img')
    someDiv.appendChild(imgElem)
    imgElem.setAttribute('src', student.image)
    imgElem.style.width = '150px'
    imgElem.classList.add('img-thumbnail')
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.description
    row.appendChild(cell)

    cell = document.createElement('td')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type', 'button')
    button.innerText = 'delete'
    button.addEventListener('click', function() {
        let cf = confirm(`ท่านต้องการลบคุณ ${student.name} หรือไม่`)
        if (cf) {
            deleteStudent(student.id)
        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
    row.appendChild(cell)
    tableBody.appendChild(row)

    row.addEventListener('click', function() {
        showStudentBlock(student)
    })
}
// window.addEventListener('load', function() {
//     addStudentToTable(students)
// })
function showStudentBlock(student) {
    hideAll()
    singleStudentResult.style.display = 'block'
    addStudentData(student)

}

function addStudentData(student) {
    let idElem = document.getElementById('id')
    idElem.innerHTML = student.id
    let studentIdElem = document.getElementById('studentId')
    studentIdElem.innerHTML = student.studentId
    let nameElem = document.getElementById('name')
    nameElem.innerHTML = `${student.name} ${student.surname}`
    let gpaElem = document.getElementById('gpa')
    gpaElem.innerHTML = student.gpa
    let profileElem = document.getElementById('image')
    profileElem.setAttribute('src', student.image)

}

function addStudentList(studentList) {
    let counter = 1
    const tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = ''
    for (student of studentList) {
        addStudentToTable(counter++, student)
    }
}

document.getElementById('searchButton').addEventListener('click', () => {
    let id = document.getElementById('inputText').value
    console.log(id)
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
        .then(response => {
            return response.json()
        }).then(student => {
            addStudentData(student)
        })
})

function addStudentToDB(student) {
    fetch('https://dv-student-backend-2019.appspot.com/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log('success', data)
        showAllStudents()
    })
}

// function onLoad() {
//     // student = {
//     //     name: 'John',
//     //     surname: 'Doe',
//     //     student: '6512345',
//     //     gpa: '4.00',
//     //     image: './asset/images/Inosuke.png'
//     // }
//     // addStudentToDB(student)
//     deleteStudent(100)
// }
window.addEventListener('load', onLoad)

function onLoad() {
    showAllStudentsBlock()
}

function deleteStudent(id) {
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`student name ${data.name} is now deleted`)
        showAllStudents()
    }).catch(error => {
        alert('your input student id is not in the database')
    })
}

function onAddStudentClick() {
    let student = {}
    student.name = document.getElementById('nameInput').value
    student.surname = document.getElementById('surnameInput').value
    student.studentId = document.getElementById('studentIdInput').value
    student.gpa = document.getElementById('gpaInput').value
    student.image = document.getElementById('imageLinkInput').value
    addStudentToDB(student)
}
document.getElementById('addButton').addEventListener('click', onAddStudentClick)

function showAllStudents() {
    fetch('https://dv-student-backend-2019.appspot.com/students')
        .then((response) => {
            return response.json()
        }).then(data => {
            addStudentList(data)
        })
}

document.getElementById('allStudentMenu').addEventListener('click', (event) => {
    hideAll()
    listStudentResult.style.display = 'block'
    showAllStudents()
})
document.getElementById('addStudentMenu').addEventListener('click', (event) => {
    hideAll()
    addUserDetail.style.display = 'block'
})

function showAllStudentsBlock() {
    hideAll()
    listStudentResult.style.display = 'block'
    showAllStudents()
}