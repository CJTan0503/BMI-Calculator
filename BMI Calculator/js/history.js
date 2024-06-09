$(document).ready(function() {
    let history = JSON.parse(localStorage.getItem('bmiHistory')) || [];

    if (history.length === 0) {
        $('#historyData').html('<p class="text-center">No history available.</p>');
    } else {
        let table = $('<table>').addClass('table table-striped table-sm');
        table.append('<thead><tr><th>Date</th><th>Time</th><th>Name</th><th>Action</th></tr></thead>');

        let tbody = $('<tbody>');
        history.forEach((entry, index) => {
            tbody.append(`<tr>
                <td>${entry.date}</td>
                <td>${entry.time}</td>
                <td>${entry.name}</td>
                <td><button class="btn btn-primary btn-xs viewDetails" data-index="${index}">View</button></td>
            </tr>`);
        });
        table.append(tbody);

        $('#historyData').append(table);
    }

    $('#historyData').on('click', '.viewDetails', function() {
        let index = $(this).data('index');
        let entry = history[index];
        let details = `
            <strong>Date:</strong> ${entry.date}<br>
            <strong>Time:</strong> ${entry.time}<br>
            <strong>Name:</strong> ${entry.name}<br>
            <strong>Height:</strong> ${entry.height} meters<br>
            <strong>Weight:</strong> ${entry.weight} kg<br>
            <strong>BMI:</strong> ${entry.bmi}<br>
            <strong>Status:</strong> ${entry.status}
        `;
        $('#modalContent').html(details);
        $('#detailModal').modal('show');
    });

    $('#backButton').on('click', function() {
        window.location.href = 'index.html';
    });
});
