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

function addStudentToTable(index, student) {
    const tableBody = document.getElementById('tableBody')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    cell.setAttribute('scope', 'row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.name
    row.appendChild(cell)
    cell = document.createElement('td')
        // cell.innerHTML = student.username
    let someDiv = document.createElement('div')
    cell.appendChild(someDiv)
    let imgElem = document.createElement('img')
    someDiv.appendChild(imgElem)
    imgElem.setAttribute('src', student.imageLink)
    imgElem.style.width = '150px'
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.gender
    row.appendChild(cell)
    tableBody.appendChild(row)
}
// window.addEventListener('load', function() {
//     addStudentToTable(students)
// })

function addStudentList(studentList) {
    let counter = 1
    for (student of studentList) {
        addStudentToTable(counter++, student)
    }
}

function onLoad() {
    fetch('./asset/students2.json').then(response => {
        return response.json()
    }).then(data => {
        let students = data
        console.log(data)
        addStudentList(students)
    })

    // fetch('./asset2/students2.json').then(response => {
    //     response.json()
    //         .then(data => {
    //             addStudentList(data)
    //         })
    // })
}
window.addEventListener('load', onLoad)