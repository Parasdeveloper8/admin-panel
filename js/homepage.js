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
    const button = document.createElement("button");
    button.innerText = "Delete";
    // Fetch data from the API
    fetch("http://localhost:5000/getstoreddata")
        .then(response => response.json())
        .then(data => {
            // Check if data is available
            if (data.length === 0) {
                const row = tbody.insertRow();
                const cell = row.insertCell(0);
                cell.colSpan = 4; // Span across all columns
                cell.style.textAlign = "center";
                return;
            }

            // Iterate over the data and populate the table
            data.forEach(user => {
                const row = tbody.insertRow();
                row.insertCell(0).innerText = user.Name; // Adjust based on your data structure
                row.insertCell(1).innerText = user.Age;
                row.insertCell(2).innerText = user.Profession;
                row.insertCell(3).innerText = user.Description;
            
                // Create a new delete button for each row
                const deleteButton = document.createElement("button");
                deleteButton.innerText = "Delete";
                deleteButton.style.border = "none";
                deleteButton.style.color = "white";
                deleteButton.style.backgroundColor = "#4a90e2";
                deleteButton.style.padding="5px";
                deleteButton.style.borderRadius = "5px";
                deleteButton.addEventListener('click', () => {
                    // Add your delete functionality here
                });
            
                row.insertCell(4).appendChild(deleteButton);
            });
            
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            const row = tbody.insertRow();
            const cell = row.insertCell(0);
            cell.colSpan = 5; // Span across all columns
            cell.innerText = "NO! data Available";
            cell.style.textAlign = "center";
        });
});