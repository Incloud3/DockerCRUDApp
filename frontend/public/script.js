//Setting variable for editing
let currentId = null;

//Validate input
function validateForm()
{
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var student = document.getElementById("studentId").value;
    var email = document.getElementById("email").value;

    if(name == "")
    {
        alert("Name is required");
        return false;
    }

    if(age == "")
    {
        alert("Age is required");
        return false;
    }
    else if(age < 1)
    {
        alert("Age must not be less than 0");
        return false
    }

    if(studentId == "")
    {
        alert("Student ID is required");
        return false;
    }
    else if(student <= 1000 || student >=9999)
    {
        alert("Student ID must be a four-digit number");
        return false;
    }

    if(email == "")
    {
        alert("Email is required");
        return false;
    }
    else if(!email.includes("@"))
    {
        alert("Invalid email address");
        return false;
    }

    return true;
}

//Fetch data from db
function fetchAndDisplayData() {
    fetch('http://localhost:8080/fetch_data.php')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('crudTable').querySelector('tbody');
        tableBody.innerHTML = '';

        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.setAttribute('data-row-id', row.id);
            tr.innerHTML = `
                <td>${row.name}</td>
                <td>${row.age}</td>
                <td>${row.studentId}</td>
                <td>${row.email}</td>
                <td>
                    <button onclick="deleteData(${row.id})" class="btn btn-danger">Delete</button>
                    <button onclick="populateFormForEdit(${row.id})" class="btn btn-warning">Edit</button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error("There was an error fetching the data:", error);
    });
}


//Onload fetch existing data
document.onload = fetchAndDisplayData();

//Add new rows/data
function addData(event)
{
    event.preventDefault();
    if(validateForm() == true)
    {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var student = document.getElementById("studentId").value;
        var email = document.getElementById("email").value;

        var formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("studentId", student);
        formData.append("email", email);

        fetch("http://localhost:8080/save.php", {
            method: "POST",
            body: formData
        })

        .then(response => response.json())
        .then(data => {
            if(data.success) {
                console.log(data.message);
                fetchAndDisplayData();
                document.getElementById('crudForm').reset();
            } else {
                throw new Error(data.message || 'There was an error in the application.');
            }
        })
        .catch(error => {
            console.error("There was an error sending data to the backend: ", error);
        })
    }
}

//Delete selected row
function deleteData(id) {
    fetch('http://localhost:8080/delete.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `id=${id}`
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        fetchAndDisplayData();
    })
    .catch(error => {
        console.error("There was an error deleting the row: ", error);
    });
}

//Edit and update selected row
function updateData(id, event) 
{
    event.preventDefault();
    const formData = new FormData(document.getElementById('crudForm'));

    formData.append('id', id);

    fetch('http://localhost:8080/update.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);

        document.getElementById('crudForm').reset();
        document.getElementById('addDataBtn').style.display = 'block';
        document.getElementById('updateBtn').style.display = 'none';
        document.getElementById('cancelBtn').style.display = 'none';

        const allButtons = document.querySelectorAll('button');
        const deleteButtons = Array.from(allButtons).filter(btn => btn.innerText === "Delete");
        deleteButtons.forEach(btn => {
            btn.disabled = false;
        });

        fetchAndDisplayData();
        revertFromEditMode();
    })
    .catch(error => {
        console.error("There was an error updating the data:", error);
    });
}

//Fills in data of row being edited
function populateFormForEdit(id) {
    const row = document.querySelector(`tr[data-row-id="${id}"]`);
    const columns = row.querySelectorAll('td');
    currentId = id

    document.getElementById('name').value = columns[0].textContent;
    document.getElementById('age').value = columns[1].textContent;
    document.getElementById('studentId').value = columns[2].textContent;
    document.getElementById('email').value = columns[3].textContent;

    document.getElementById('addDataBtn').style.display = 'none';
    document.getElementById('updateBtn').style.display = 'block';
    document.getElementById('cancelBtn').style.display = 'block';

    const allButtons = document.querySelectorAll('button');
    const deleteButtons = Array.from(allButtons).filter(btn => btn.innerText === "Delete");
    deleteButtons.forEach(btn => {
        btn.disabled = true;
    });
}

//Reverts changes to button stance and clears form
function revertFromEditMode() {
    document.getElementById('crudForm').reset();
    document.getElementById('addDataBtn').style.display = 'block';
    document.getElementById('updateBtn').style.display = 'none';
    document.getElementById('cancelBtn').style.display = 'none';

    const allButtons = document.querySelectorAll('button');
    const deleteButtons = Array.from(allButtons).filter(btn => btn.innerText === "Delete");
    deleteButtons.forEach(btn => {
        btn.disabled = false;
    });
}

//Cancels any changes and reenables buttons
function cancelEdit() {
    document.getElementById('crudForm').reset();
    currentId = null;
    revertFromEditMode();
}