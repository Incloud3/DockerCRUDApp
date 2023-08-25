// Function to validate data in form before submission
function validateForm()
{
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var student = document.getElementById("student").value;
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

    if(student == "")
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

function fetchAndDisplayData() {
    fetch('http://localhost:8080/fetch_data.php')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('crudTable');
        tableBody.innerHTML = '';

        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.name}</td>
                <td>${row.age}</td>
                <td>${row.student_id}</td>
                <td>${row.email}</td>
            `;
            tableBody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error("There was an error fetching the data:", error);
    });
}


// Loading data on page load
document.onload = fetchAndDisplayData();

// Function to add data
function AddData()
{
    if(validateForm() == true)
    {
        var name = document.getElementById("name").value;
        var age = document.getElementById("age").value;
        var student = document.getElementById("student").value;
        var email = document.getElementById("email").value;

        var formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("student", student);
        formData.append("email", email);

        fetch("http://localhost:8080/save.php", {
            method: "POST",
            body: formData
        })

        .then(response => response.json())
        .then(data => {
            if(data.success) {
                console.log(data.message); // Data successfully saved to the backend
                fetchAndDisplayData();  // Update the table after adding data
            } else {
                throw new Error(data.message || 'There was an error in the application.');
            }
        })
        .catch(error => {
            console.error("There was an error sending data to the backend: ", error);
        })
    }
}

// Function to delete data
function deleteData(index)
{
    var currentList;
    if(localStorage.getItem("currentList") == null)
    {
        currentList = [];
    }
    else
    {
        currentList = JSON.parse(localStorage.getItem("currentList"));
    }

    currentList.splice(index, 1);
    localStorage.setItem("currentList", JSON.stringify(currentList));
    showData();
}

// Function to edit data
function updateData(index)
{
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var currentList;
    if(localStorage.getItem("currentList") == null)
    {
        currentList = [];
    }
    else
    {
        currentList = JSON.parse(localStorage.getItem("currentList"));
    }

    document.getElementById("name").value = currentList[index].name;
    document.getElementById("age").value = currentList[index].age;
    document.getElementById("student").value = currentList[index].student;
    document.getElementById("email").value = currentList[index].email;

    document.querySelector("#Update").onclick = function()
    {
        if(validateForm() == true)
        {
            currentList[index].name = document.getElementById("name").value;
            currentList[index].age = document.getElementById("age").value;
            currentList[index].student = document.getElementById("student").value;
            currentList[index].email = document.getElementById("email").value;

            localStorage.setItem("currentList", JSON.stringify(currentList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("student").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}