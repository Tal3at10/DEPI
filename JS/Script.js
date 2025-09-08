const form = document.getElementById('crudForm');
const submitButton = document.getElementById('submit');
let editingRow = null; 

function addEventListenersToButtons(row) 
{
    // Delete button
    row.querySelector(".btn-danger").addEventListener("click", function() 
    {
        if(confirm("Are you sure you want to delete this product?")) 
        {
            this.closest("tr").remove();
            updateRowNumbers();
            resetForm();
        }
    });

    // Update button
    row.querySelector(".btn-warning").addEventListener("click", function()
     {
        editingRow = this.closest("tr");
        document.getElementById("productname").value = editingRow.children[1].textContent;
        document.getElementById("productprice").value = editingRow.children[2].textContent;
        document.getElementById("productcategory").value = editingRow.children[3].textContent;
        document.getElementById("productdescription").value = editingRow.children[4].textContent;

        submitButton.textContent = "Update Product";
        submitButton.classList.replace("btn-primary", "btn-success");
    });
}

function updateRowNumbers() 
{
    document.querySelectorAll("table tbody tr").forEach((row, index) => 
    {
        row.cells[0].textContent = index + 1;
    });
}

form.addEventListener("submit", function(e) 
{
    e.preventDefault();

    const name = document.getElementById("productname").value;
    const price = document.getElementById("productprice").value;
    const category = document.getElementById("productcategory").value;
    const description = document.getElementById("productdescription").value;

    if(editingRow)
    {
        // Update existing row
        editingRow.children[1].textContent = name;
        editingRow.children[2].textContent = price;
        editingRow.children[3].textContent = category;
        editingRow.children[4].textContent = description;
        resetForm();
    }
    else
    {
        // Add new row
        const tbody = document.querySelector("table tbody");
        const rowCount = tbody.children.length + 1;
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <th scope="row">${rowCount}</th>
            <td>${name}</td>
            <td>${price}</td>
            <td>${category}</td>
            <td>${description}</td>
            <td>
                <button type="button" class="btn btn-danger btn-sm">Delete</button>
                <button type="button" class="btn btn-warning btn-sm">Update</button>
            </td>
        `;
        tbody.appendChild(newRow);
        addEventListenersToButtons(newRow);
    }

    form.reset();
});

function resetForm() 
{
    editingRow = null;
    submitButton.textContent = "Add Product";
    submitButton.classList.replace("btn-success", "btn-primary");
}

// Search functionality by selected field
document.getElementById("searchInput").addEventListener("input", function(){
    const value = this.value.toLowerCase();
    const field = document.getElementById("searchField").value;

    document.querySelectorAll("table tbody tr").forEach(row => 
    {
        if(field === "index") {
            row.style.display = row.cells[0].textContent.toLowerCase().includes(value) ? "" : "none";
        } else if(field === "name") {
            row.style.display = row.cells[1].textContent.toLowerCase().includes(value) ? "" : "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() 
{
    document.querySelectorAll("table tbody tr").forEach(row => 
    {
        addEventListenersToButtons(row);
    });
});
