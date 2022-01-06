var postApi = 'http://localhost:4000/courses'

fetch(postApi)
    .then(respone =>  respone.json()) // Tra ve 1 promise. respone la 1 object, respone.json() da duoc chuyen tu JSON sang Javascript type. Do do o duoi se nhan duoc thang 1 array gom cac object
    .then(courses => {
        let coursesContainer = document.querySelector('#courses');
        courses.forEach(course => {
            // usersContainer.innerHTML += `<li>${user.id} - ${user.name} - ${user.username} - ${user.email}</li>`
            let child = document.createElement('tr');
            child.className = 'course';
            child.innerHTML = `
                <td>${course.id}</td> 
                <td>${course.name}</td> 
                <td>${course.description}</td> 
            `;
            coursesContainer.appendChild(child);
        })
    }) // Nhan duoc 1 array object