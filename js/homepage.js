// Show dashboard section on click
document.getElementById('dashboard-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    document.getElementById('dashboard').style.display = 'block'; // Show dashboard
    document.getElementById('form').style.display = 'none'; // Hide form
    sidebar.classList.remove('active'); // Close the sidebar
});

// Show form section on click
document.getElementById('form-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default anchor behavior
    document.getElementById('dashboard').style.display = 'none'; // Hide dashboard
    document.getElementById('form').style.display = 'block'; // Show form
    sidebar.classList.remove('active'); // Close the sidebar
});

// Sidebar toggle functionality
const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active'); // Toggle the sidebar
});
document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector("#data-table tbody"); // Select the table body

    // Clear the table if it was previously populated
    tbody.innerHTML = "";

    // Fetch data from the API
    fetch("http://localhost:8000/getstoreddata")
        .then(response => response.json())
        .then(data => {
            // Check if data is available
            if (data.length === 0) {
                const row = tbody.insertRow();
                const cell = row.insertCell(0);
                cell.colSpan = 4; // Span across all columns
                cell.innerText = "No data available";
                cell.style.textAlign = "center";
                return;
            }

            // Iterate over the data and populate the table
            data.forEach(user => {
                const row = tbody.insertRow();
                row.insertCell(0).innerText = JSON.stringify(user.Name).replace(/['"]/g, ''); // Adjust based on your data structure
                row.insertCell(1).innerText = JSON.stringify(user.Age).replace(/['"]/g, ''); // Adjust based on your data structure
                row.insertCell(2).innerText = JSON.stringify(user.Profession).replace(/['"]/g, ''); // Adjust based on your data structure
                row.insertCell(3).innerText = JSON.stringify(user.Description).replace(/['"]/g, ''); // Adjust based on your data structure
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            const row = tbody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 4; // Span across all columns
            cell.innerText = "Error loading data.";
            cell.style.textAlign = "center";
        });
});

