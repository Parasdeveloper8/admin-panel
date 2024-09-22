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
document.addEventListener("DOMContentLoaded",()=>{
    const div =document.getElementById("data-div");
    if(div.innerText == ""){
        div.innerText = "No data available";
        div.style.fontSize = "20px";
        div.style.color = "black";
    }
});