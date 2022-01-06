// var jsonServerURL = 'https://my-json-server.typicode.com/sakutura179/responsive-restapi/'
var jsonServerURL = 'http://localhost:4000/'
var coursesApi = `${jsonServerURL}courses`

function start(params) {
    // Cach viet 1
    // getCourse(courses => renderCourse(courses)); // nhan duoc 1 promise co kieu DL la javascript type

    // Cach viet 2 - do getCourse nhan vao 1 function, ma renderCourse cung la 1 function, nen ket qua tra ve cua getCourse co the dung lam doi so cho renderCourse
    getCourse(renderCourse); // nhan duoc 1 promise co kieu DL la javascript type
}
    
start();

function getCourse(callback) {
    fetch(coursesApi)
        .then(respone =>  respone.json())
        .then(callback) // thanh cong thi goi tiep calback, truyen vao 1 promise da duoc parse tu json sang
        .catch(error => console.log('Loi: ',error));
}

function createCourse(data, callback) {
    var option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }

    fetch(coursesApi, option)
        .then(response => response.json())
        .then(callback)
        .catch(error => console.log('Loi khi them: ',error));
}

function updateCourse(id, data, callback) {
    var option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    }

    fetch(coursesApi + '/' + id, option)
        .then(response => response.json())
        .then(callback)
        .catch(error => console.log('Loi khi sua: ',error));
}

function deleteCourse(id) {
    var option = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(coursesApi + '/' + id, option)
        .then(response => response.json())
        .then(() => document.querySelector('.course-' + id).remove())
        .catch(error => console.log('Loi khi xoa: ',error));
}

function renderCourse(courses) {
    let coursesContainer = document.querySelector('#courses');
    coursesContainer.innerHTML = '';
    courses.forEach(course => {
        let child = document.createElement('li');
        child.className = `course course-${course.id}`;
        child.innerHTML = `
            <h3 class='title'>${course.name}</h3> 
            <p class='desc'>${course.description}</p>
            <p><button onclick='deleteCourse(${course.id})'>Delete</button></p> 
            <p><button onclick='handleShowUpdate(${course.id})'>Update</button></p> 
        `;
        coursesContainer.appendChild(child);
    })
}

function handleCreateCourse() {
    let name = document.querySelector('#name').value;
    let description = document.querySelector('#description').value;

    createCourse({name, description}, () => getCourse(renderCourse));
}

function handleShowUpdate(id) {
    // Lay ra thong tin de hien thi len form
    let course = document.querySelector('.course-' + id);
    let title = course.querySelector('.title').innerHTML;
    let desc = course.querySelector('.desc').innerHTML;

    // Select ra cac truong cua form
    let name = document.querySelector('#name');
    let description = document.querySelector('#description');

    // Hien thi gia tri vao form
    name.value = title;
    description.value = desc;

    // Hien thi nut update
    let submit = document.querySelector('.submit');
    submit.innerHTML = `<button id="update-btn" onclick="handleUpdateCourse(${id})">Update</button>`;
}

function handleUpdateCourse(id) {
    let nameCourse = document.querySelector('#name');
    let descCourse = document.querySelector('#description');
    let name = nameCourse.value;
    let description = descCourse.value;

    updateCourse(id, {name, description}, () => getCourse(renderCourse));
    nameCourse.value = '';
    descCourse.value = '';
    let submit = document.querySelector('.submit');
    submit.innerHTML = '<button id="create-btn" onclick="handleCreateCourse()">Create</button>';
}
