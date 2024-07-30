document.getElementById('loadCsv').addEventListener('click', function() {
    const input = document.getElementById('csvFileInput');
    if (input.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const rows = e.target.result.split('\n').map(row => row.split(','));
            displayCsvData(rows);
        };
        reader.readAsText(input.files[0]);
    }
});

function displayCsvData(rows) {
    const preview = document.getElementById('data-preview');
    preview.innerHTML = '<table>' + rows.map(row => '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>').join('') + '</table>';
}

document.getElementById('fetchTemplates').addEventListener('click', function() {
    fetch('/api/templates') // Adjust the URL to your API endpoint
        .then(response => response.json())
        .then(templates => {
            const templateList = document.getElementById('templateList');
            templateList.innerHTML = templates.map(template => `<li data-id="${template.id}">${template.name}</li>`).join('');
            templateList.addEventListener('click', function(e) {
                if (e.target.tagName === 'LI') {
                    const selectedTemplate = templates.find(template => template.id.toString() === e.target.dataset.id);
                    document.getElementById('email-preview').textContent = selectedTemplate.content; // Assuming 'content' is part of your template object
                }
            });
        });
});

document.getElementById('sendEmail').addEventListener('click', function() {
    // Here, you would gather the necessary data, such as the selected template and CSV data, and send it to your backend for emailing
    // This step is highly dependent on your backend API and the structure of your data
});