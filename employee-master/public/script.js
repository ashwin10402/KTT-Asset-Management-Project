function toggleSidebar() {
    var sidebar = document.querySelector('.west');
    sidebar.classList.toggle('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    // Get references to elements
    var laborLink = document.getElementById('labor');
    var materialLink = document.getElementById('material');
    var centerUp = document.getElementById('center-up');

    var centerDown = document.getElementById('center-down');

    var openAssetFormBtn = document.getElementById('openAssetFormBtn');
    var editAssetBtn = document.getElementById('editAssetBtn');
    var openFormBtn = document.getElementById('openFormBtn');
    var editBtn = document.getElementById('editBtn');

    // Initially hide center-up content
    centerUp.style.display = 'none';
    centerDown.style.display = 'none';

    // Add event listener for labor link
    laborLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        centerUp.style.display = 'block'; // Show center-up content
        centerDown.style.display = 'none';
       
        if(openAssetFormBtn){
            editAssetBtn.style.display = 'none';
        }
        if(editAssetBtn){
            editAssetBtn.style.display = 'none';
        }
        if(editBtn){
            editBtn.style.display = 'block';
        }
        if(openFormBtn){
            openFormBtn.style.display = 'block';
        }
    });

    // Add event listener for material link
    materialLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        centerUp.style.display = 'none'; // Hide center-up content
        centerDown.style.display = 'block';

        if(openAssetFormBtn){
            editAssetBtn.style.display = 'block';
        }
        if(editAssetBtn){
            editAssetBtn.style.display = 'block';
        }
        if(editBtn){
            editBtn.style.display = 'none';
        }
        if(openFormBtn){
            openFormBtn.style.display = 'none';
        }

    });
    
});



$(document).ready(function() {
    var table = $('#employeeTable').DataTable({
        "ajax": {
            "url": "api/employees", // URL of the API that returns JSON data
            "dataSrc": "" // assuming your API returns an array of objects directly
        },
        "columns": [
            { "data": "id" },
            { "data": "name" },
            { "data": "email" },
            { "data": "is_active" },
            { "data": "date_of_birth" },
            { "data": "department" },
            { "data": "position" },
            { "data": "salary" },
            { "data": "hire_date" },
            { "data": "address" },
            { "data": "city" },
            { "data": "state" },
            { "data": "country" },
            { "data": "postal_code" },
            { "data": "phone" }
        ],
        select: true

        
    });

// Add New button
$('<button id="openFormBtn" type="button" class="btn btn-primary" style="margin-left:10px">Add</button>').appendTo('#employeeTable_length').click(function() {
    // Redirect to new entry page or implement new entry logic here
    console.log('New button clicked');
});

$('<button id="editBtn" style="margin-left:10px" type="button" class="btn btn-primary" disabled>Edit</button>').appendTo('#employeeTable_length').click(function() {
    
    
    console.log('Edit button clicked');
});
function openEditForm(data) {
    // Setting values from the data object to each form input
    $('#id').val(data.id);
    $('#name').val(data.name);
    $('#email').val(data.email);
    $('#is_active').val(data.is_active ? 'true' : 'false');  // Assuming is_active is a boolean
    $('#date_of_birth').val(data.date_of_birth);
    $('#department').val(data.department);
    $('#position').val(data.position);
    $('#salary').val(data.salary);
    $('#hire_date').val(data.hire_date);
    $('#address').val(data.address);
    $('#city').val(data.city);
    $('#state').val(data.state);
    $('#country').val(data.country);
    $('#postal_code').val(data.postal_code);
    $('#phone').val(data.phone);

    // Showing the modal
    $('#editModal').modal('show'); // If you're using a Bootstrap modal
}

$('#employeeTable tbody').on('click', 'tr', function () {
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        $('#editBtn').prop('disabled', true);
    } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#editBtn').prop('disabled', false);
    }
});


/* document.getElementById('employeeForm').onsubmit = function(e) {
    e.preventDefault();

    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        is_active: document.getElementById('is_active').value === 'true',
        date_of_birth: document.getElementById('date_of_birth').value,
        department: document.getElementById('department').value,
        position: document.getElementById('position').value,
        salary: parseFloat(document.getElementById('salary').value),
        hire_date: document.getElementById('hire_date').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        country: document.getElementById('country').value,
        postal_code: document.getElementById('postal_code').value,
        phone: document.getElementById('phone').value
    };

    
    fetch('http://localhost:3000/api/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log('Employee created successfully'))
    .catch(error => console.log('Error creating employee'));
    
}; */


$('#editBtn').click(function() {
    var data = table.row('.selected').data();
    if (data) {
        
        openEditForm(data);
    }
});

$('#openFormBtn').click(function() {
    $('#newModal').modal('show');
});


$('#employeeForm').on('submit', function(e) {
    e.preventDefault();
    var formData = {
        
        name: document.getElementById('newname').value,
                email: document.getElementById('newemail').value,
                is_active: document.getElementById('newis_active').value === 'true',
                date_of_birth: document.getElementById('newdate_of_birth').value,
                department: document.getElementById('newdepartment').value,
                position: document.getElementById('newposition').value,
                salary: parseFloat(document.getElementById('newsalary').value),
                hire_date: document.getElementById('newhire_date').value,
                address: document.getElementById('newaddress').value,
                city: document.getElementById('newcity').value,
                state: document.getElementById('newstate').value,
                country: document.getElementById('newcountry').value,
                postal_code: document.getElementById('newpostal_code').value,
                phone: document.getElementById('newphone').value
    };


    
    fetch('http://localhost:3000/api/employees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log('Employee created successfully'))
    .catch(error => console.log('Error creating employee'));

            $('#newModal').modal('hide');
            $('#employeeTable').DataTable().ajax.reload(); // Reload data
});


$('#editForm').on('submit', function(e) {
    e.preventDefault();
    var updatedData = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                is_active: document.getElementById('is_active').value === 'true',
                date_of_birth: document.getElementById('date_of_birth').value,
                department: document.getElementById('department').value,
                position: document.getElementById('position').value,
                salary: parseFloat(document.getElementById('salary').value),
                hire_date: document.getElementById('hire_date').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value,
                country: document.getElementById('country').value,
                postal_code: document.getElementById('postal_code').value,
                phone: document.getElementById('phone').value
    };

    $.ajax({
        
        url: '/api/employees/' + updatedData.id,
        
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(updatedData),
        success: function(result) {
            $('#editModal').modal('hide');
            $('#employeeTable').DataTable().ajax.reload(); // Reload data
            
        },
        error: function(xhr) {
            console.log('Error updating employee: ' + xhr.responseText);
            console.log('/api/employees/' + updatedData.id);
        }
    });
    
});



});


$(document).ready(function() {
    var table = $('#assetsTable').DataTable({
        "ajax": {
            "url": "/api/assets", // Update the URL based on your server configuration
            "dataSrc": ""
        },
        "columns": [
            { "data": "id" },
            { "data": "serial_number" },
            { "data": "make" },
            { "data": "model" },
            { "data": "asset_type" },
            { "data": "description" },
            { "data": "status" }
        ],
        select: true
    });


    // $('#assetsTable tbody').on('click', 'tr', function () {
    //     if ($(this).hasClass('selected')) {
    //         $(this).removeClass('selected');
    //         $('#editAssetBtn').prop('disabled', true);
    //     } else {
    //         table.$('tr.selected').removeClass('selected');
    //         $(this).addClass('selected');
    //         $('#editAssetBtn').prop('disabled', false);
    //     }
    // });

    $('#assetsTable tbody').on('click', 'tr', function () {
        var data = table.row(this).data();
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $('#editAssetBtn').prop('disabled', true);
            $('#issueAssetBtn').prop('disabled', true);
            $('#scrapAssetBtn').prop('disabled', true);
            $('#viewHistoryBtn').prop('disabled', true);
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            $('#editAssetBtn').prop('disabled', false);
            $('#issueAssetBtn').prop('disabled', data.status !== 'Available');
            $('#scrapAssetBtn').prop('disabled', data.status === 'Issued');
            $('#viewHistoryBtn').prop('disabled', false);
        }
    });

    $('<button id="openAssetFormBtn" type="button" class="btn btn-primary" style="margin-left:10px">Add</button>').appendTo('#assetsTable_length').click(function() {
        // Redirect to new entry page or implement new entry logic here
        console.log('New button clicked');
    });
    
    $('<button id="editAssetBtn" style="margin-left:10px" type="button" class="btn btn-primary" disabled>Edit</button>').appendTo('#assetsTable_length').click(function() {
        
        console.log('Edit button clicked');
    });

    $('<button id="issueAssetBtn" style="margin-left:10px" type="button" class="btn btn-primary" disabled>Issue</button>').appendTo('#assetsTable_length').click(function() {
        $('#employeeTableModal').modal('show');
    });

    $('<button id="scrapAssetBtn" style="margin-left:10px" type="button" class="btn btn-danger" disabled>Scrap</button>').appendTo('#assetsTable_length').click(function() {
        console.log('Scrap button clicked');
        var assetId = $('#assetsTable').DataTable().row('.selected').data().id;
        if (confirm('Are you sure you want to scrap this asset?')) {
        $.ajax({
            url: '/api/assets/' + assetId,
            type: 'DELETE',
            success: function(response) {
                console.log('Asset scrapped successfully:', response);
                $('#assetsTable').DataTable().ajax.reload(); // Reload data table to reflect changes
            },
            error: function(xhr, status, error) {
                console.error('Error scrapping asset:', error);
            }
        });
        }
    });

    $('<button id="viewHistoryBtn" style="margin-left:10px" type="button" class="btn btn-info" disabled>View History</button>').appendTo('#assetsTable_length').click(function() {
        console.log('View History button clicked');
        var assetId = $('#assetsTable').DataTable().row('.selected').data().id;
    $.ajax({
        type: "GET",
        url: "/api/rtntrx",
        data: { asset_id: assetId },
        success: function(response) {
            console.log('Return transactions fetched successfully:', response);
            // Create a Bootstrap modal to display the fetched records
            var modalHtml = '<div class="modal fade" id="returnTransactionsModal" tabindex="-1" aria-labelledby="returnTransactionsModalLabel" aria-hidden="true">';
            modalHtml += '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">';
            modalHtml += '<h5 class="modal-title" id="returnTransactionsModalLabel">Return Transactions</h5>';
            modalHtml += '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>';
            modalHtml += '<div class="modal-body"><table class="table"><thead><tr><th>ID</th><th>Employee ID</th><th>Issue Date</th><th>Return Date</th><th>Notes</th></tr></thead><tbody>';

            response.forEach(function(trx) {
                modalHtml += '<tr><td>' + trx.asset_id + '</td><td>' + trx.employee_id + '</td><td>' + trx.issue_date + '</td><td>' + trx.return_date + '</td><td>' + trx.return_notes + '</td></tr>';
            });

            modalHtml += '</tbody></table></div><div class="modal-footer">';
            modalHtml += '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>';
            modalHtml += '</div></div></div></div>';

            // Append the modal to the body and show it
            $('body').append(modalHtml);
            $('#returnTransactionsModal').modal('show');
        },
        error: function(xhr, status, error) {
            console.error('Error fetching return transactions:', error);
        }
    });
    });

    $('#openAssetFormBtn').click(function() {
        $('#newAssetModal').modal('show');
    });


    $('#assetForm').on('submit', function(e) {
        e.preventDefault();
        var formData = {
            
            
            serial_number: document.getElementById('assetserial').value,
            make: document.getElementById('assetmake'),
            model: document.getElementById('assetmodel').value,
            asset_type: document.getElementById('assettype').value,
            description: document.getElementById('assetdescription').value,
            status: document.getElementById('assetstatus').value,
                    
        };
    
    
        
        fetch('http://localhost:3000/api/assets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => console.log('Asset created successfully'))
        .catch(error => console.log('Error creating asset'));
    
        $('#assetsTable').DataTable().ajax.reload(); // Reload data
        $('#newAssetModal').modal('hide');
                
    });

    $('#editAssetBtn').click(function() {
        var data = table.row('.selected').data();
        if (data) {
            
            openEditAssetForm(data);
        }
    });


    function openEditAssetForm(data) {
        // Setting values from the data object to each form input
        $('#editassetid').val(data.id);
        $('#editassetserial').val(data.serial_number);
        $('#editassetmake').val(data.make);
        $('#editassetmodel').val(data.model);
        $('#editassettype').val(data.asset_type);
        $('#editassetdescription').val(data.description);
        
        $('#editassetstatus').val(data.status);
       
    
        // Showing the modal
        $('#editAssetModal').modal('show'); // If you're using a Bootstrap modal
    }


    $('#editAssetModal').on('submit', function(e) {
        e.preventDefault();
        var updatedData = {
            id: document.getElementById('editassetid').value,
            serial_number: document.getElementById('editassetserial').value,
            make: document.getElementById('editassetmake').value,
            model: document.getElementById('editassetmodel').value,
            asset_type: document.getElementById('editassettype').value,
            description: document.getElementById('editassetdescription').value,
            status: document.getElementById('editassetstatus').value,
        };
    
        $.ajax({
            
            url: '/api/assets/' + updatedData.id,
            
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedData),
            success: function(result) {
                $('#editAssetModal').modal('hide');
                $('#assetsTable').DataTable().ajax.reload(); // Reload data
                
            },
            error: function(xhr) {
                console.log('Error updating assets: ' + xhr.responseText);
                console.log('/api/assets/' + updatedData.id);
            }
        });
        
    });
});


$(document).ready(function() {
    $('#newAssetModal').on('show.bs.modal', function(e) {
        $('#assetForm')[0].reset(); // Use the standard DOM 'reset()' function
    });
});


$(document).ready(function() {
    $('#newModal').on('show.bs.modal', function(e) {
        $('#employeeForm')[0].reset(); // Use the standard DOM 'reset()' function
    });
});


$(document).ready(function() {
    $('#categoryTable').DataTable({
        "ajax": {
            "url": "/api/assetCategories",
            "dataSrc": ""
        },
        "columns": [
            { "data": "asset_type" },
            { "data": "quantity" },
            { "data": "active_count" }, // New column for Active count
            { "data": "inactive_count" }, // New column for Inactive count
            { "data": "repair_count" } // New column for Repair count
        ]
    });
});


$(document).ready(function() {
    $('#stockTable').DataTable({
      "ajax": {
        "url": "/api/stockView",
        "dataSrc": ""
      },
      "columns": [
        { "data": "id" },
        { "data": "serial_number" },
        { "data": "make" },
        { "data": "model" },
        { "data": "asset_type" },
        { "data": "description" }
      ]
    });
  });


  $(document).ready(function() {
    var table = $('#employeeTableModalView').DataTable({
        "ajax": {
            "url": "api/employees", // URL of the API that returns JSON data
            "dataSrc": "" // assuming your API returns an array of objects directly
        },
        "columns": [
            { "data": "id" },
            { "data": "name" },
            { "data": "email" },
            { "data": "is_active" },
            { "data": "date_of_birth" },
            { "data": "department" },
            { "data": "position" },
            { "data": "salary" },
            { "data": "hire_date" },
            { "data": "address" },
            { "data": "city" },
            { "data": "state" },
            { "data": "country" },
            { "data": "postal_code" },
            { "data": "phone" }
        ],
        select: true

        
    });

    $('#employeeTableModalView tbody').on('click', 'tr', function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        } else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

    $('#employeeTableModal').on('hidden.bs.modal', function () {
        var selectedData = table.row('.selected').data();
        if (selectedData) {
            // Handle the selected data
            console.log(selectedData); // Or any other logic
        }
    });
});

$(document).ready(function() {
    $('.btn-primary[data-bs-dismiss="modal"]').click(function() {
        console.log('OK button clicked');
    var notes = prompt("Please enter any notes for the transaction:");
    var assetId = $('#assetsTable').DataTable().row('.selected').data().id;
    var employeeId = $('#employeeTableModalView').DataTable().row('.selected').data().id;
    console.log(assetId + " " + employeeId + " " + notes);    
    $.ajax({
        type: "POST",
        url: "/api/issueTrx",
        data: {
            assetId: assetId,
            employeeId: employeeId,
            notes: notes
        },
        success: function(response) {
            console.log('Asset issued successfully:', response);
            $('#assetsTable').DataTable().ajax.reload(); 
            $('#issuedAssetsTable').DataTable().ajax.reload(); 
            $('#stockTable').DataTable().ajax.reload(); 
            $('#categoryTable').DataTable().ajax.reload();
          
            $('#returnAssetsTable').DataTable().ajax.reload();

        },
        error: function(xhr, status, error) {
            console.error('Error issuing asset:', error);
        }
    });
    });
});

$(document).ready(function() {
    $.get('/api/session', function(data) {
        console.log('Session Data:', data);
        $('#employeeName').text(data.name);
        $('#employeeId').text(data.id);
    });
});

$(document).ready(function() {
    $('#issuedAssetsTable').DataTable({
        "ajax": {
            "url": "/api/issueTrx",
            "dataSrc": ""
        },
        "columns": [
            { "data": "employee_id" },
            { "data": "asset_id" },
            { "data": "transaction_id" },
            { "data": "issue_date" },
            { "data": "notes" }
        ],
        
    });
});


$('#employeeId').on('DOMSubtreeModified', function () {
    var employeeId = $(this).text(); // Assuming employeeId is stored in the span with id 'employeeId'
    var parsedEmployeeId = parseInt(employeeId, 10); // Convert to integer with base 10

    if (isNaN(parsedEmployeeId)) {
        $.get('/api/session', function(data) {
             employeeId = data.id;
             parsedEmployeeId = parseInt(employeeId, 10);
        });
    }

    var returnAssetsTable = $('#returnAssetsTable').DataTable({
        "ajax": {
            "url": "/api/issued-emp",
            "dataSrc": "",
            "data": function (d) {
                d.employee_id = parsedEmployeeId; // Send the employee ID as a parameter to the server
            }
        },
        "columns": [
            { "data": "id" },
            { "data": "serial_number" },
            { "data": "asset_type" },
            { "data": "status" }
        ],

        "select": true, // Enable row selection

        "language": {
            "emptyTable": "No data found"  // Custom message for empty table
        },
        

       

    });

    $('<button id="returnAssetBtn" style="margin-left:10px" type="button" class="btn btn-primary" disabled>Return Asset</button>').appendTo('#returnAssetsTable_length').click(function() {
    var selectedData = $('#returnAssetsTable').DataTable().row('.selected').data();
    if (selectedData) {
        console.log('Selected Record:', selectedData);
    } else {
        console.log('No record selected');
    }
    var returnReason = prompt("Please enter the reason for returning the asset:");
    if (returnReason) {
        console.log('Return Reason:', returnReason);
    } else {
        console.log('Return process cancelled or no reason provided.');
    }
    if (selectedData && returnReason) {
        $.ajax({
            url: '/api/rtntrx',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                asset_id: selectedData.id,
                return_notes: returnReason
            }),
            success: function(response) {
                console.log('Asset return processed:', response);
                $('#returnAssetsTable').DataTable().ajax.reload(); // Reload the data table to reflect changes
                $('#issuedAssetsTable').DataTable().ajax.reload();
                $('#stockTable').DataTable().ajax.reload();
                $('#assetsTable').DataTable().ajax.reload();
                

                alert('Asset return processed successfully.');
            },
            error: function(xhr, status, error) {
                console.error('Error processing asset return:', error);
                alert('Failed to process asset return.');
            }
        });
    } else {
        console.log('Missing data for processing asset return.');
        alert('Please select an asset and provide a return reason.');
    }
    });

});


$('#returnAssetsTable tbody').on('click', 'tr', function () {
    var table = $('#returnAssetsTable').DataTable();
    if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        $('#returnAssetBtn').prop('disabled', true);
    } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        $('#returnAssetBtn').prop('disabled', false);
    }
});





