document.addEventListener('DOMContentLoaded', loadEmployees);

function loadEmployees() {
    fetch('/api/employees')
        .then(response => response.json())
        .then(data => {
            const employeeList = document.getElementById('employeeList');
            employeeList.innerHTML = '';
            data.forEach(employee => {
                const employeeDiv = document.createElement('div');
                employeeDiv.className = 'employee';
                employeeDiv.innerHTML = `
                    <span>${employee.id}</span>
                    <span>${employee.name}</span>
                    <span>${employee.position}</span>
                    <span>${employee.salary}</span>
                    <span>${employee.address}</span>
                    <button onclick="deleteEmployee('${employee.id}')">Delete</button>
                    <button onclick="updateEmployee('${employee.id}')">Update</button>
                `;
                employeeList.appendChild(employeeDiv);
            });
        });
}

function addEmployee() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const salary = parseInt(document.getElementById('salary').value, 10);
    const address = document.getElementById('address').value;

    if (isNaN(salary)) {
        alert('Please enter a valid number for salary');
        return;
    }

    const employee = { id, name, position, salary, address };

    fetch('/api/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
        .then(response => response.json())
        .then(data => {
            loadEmployees();
            document.getElementById('id').value = '';
            document.getElementById('name').value = '';
            document.getElementById('position').value = '';
            document.getElementById('salary').value = '';
            document.getElementById('address').value = '';
        });
}

function deleteEmployee(id) {
    fetch(`/api/employees/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            loadEmployees();
        });
}

function updateEmployee(id) {
    const name = prompt("Enter new name:");
    const position = prompt("Enter new position:");
    const salary = parseInt(prompt("Enter new salary:"), 10);
    const address = prompt("Enter new address:");

    if (isNaN(salary)) {
        alert('Please enter a valid number for salary');
        return;
    }

    const employee = { id, name, position, salary, address };

    fetch(`/api/employees/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    })
        .then(response => response.json())
        .then(data => {
            loadEmployees();
        });
}
