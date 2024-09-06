// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to read and write data
const readData = () => {
    const data = fs.readFileSync('employees.json');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync('employees.json', JSON.stringify(data, null, 2));
};

// Routes
app.get('/api/employees', (req, res) => {
    const data = readData();
    res.json(data);
});

app.post('/api/employees', (req, res) => {
    const data = readData();
    const newEmployee = req.body;
    data.push(newEmployee);
    writeData(data);
    res.status(201).json(newEmployee);
});

app.put('/api/employees/:id', (req, res) => {
    const data = readData();
    const { id } = req.params;
    const updatedEmployee = req.body;
    const index = data.findIndex(emp => emp.id === id);
    if (index !== -1) {
        data[index] = updatedEmployee;
        writeData(data);
        res.json(updatedEmployee);
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

app.delete('/api/employees/:id', (req, res) => {
    const data = readData();
    const { id } = req.params;
    const updatedData = data.filter(emp => emp.id !== id);
    if (data.length !== updatedData.length) {
        writeData(updatedData);
        res.json({ message: 'Employee deleted' });
    } else {
        res.status(404).json({ message: 'Employee not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
