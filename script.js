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

// function addStudentToTable(index, student) {
//     const tableBody = document.getElementById('tableBody')
//     let row = document.createElement('tr')
//     let cell = document.createElement('th')
//     cell.setAttribute('scope', 'row')
//     cell.innerHTML = index
//     row.appendChild(cell)
//     cell = document.createElement('td')
//     cell.innerHTML = `${student.name} ${student.surname}`
//     row.appendChild(cell)
//     cell = document.createElement('td')
//         // cell.innerHTML = student.username
//     let someDiv = document.createElement('div')
//     cell.appendChild(someDiv)
//     let imgElem = document.createElement('img')
//     someDiv.appendChild(imgElem)
//     imgElem.setAttribute('src', student.image)
//     imgElem.style.width = '150px'
//     imgElem.classList.add('img-thumbnail')
//     row.appendChild(cell)
//     cell = document.createElement('td')
//     cell.innerHTML = student.description
//     row.appendChild(cell)
//     tableBody.appendChild(row)
// }
// window.addEventListener('load', function() {
//     addStudentToTable(students)
// })

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
    })
}

function onLoad() {
    // student = {
    //     name: 'John',
    //     surname: 'Doe',
    //     student: '6512345',
    //     gpa: '4.00',
    //     image: './asset/images/Inosuke.png'
    // }
    // addStudentToDB(student)
    deleteStudent(100)
}
window.addEventListener('load', onLoad)

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
    }).catch(error => {
        alert('your input student id is not in the database')
    })
}