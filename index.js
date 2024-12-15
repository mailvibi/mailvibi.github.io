// Create a function to upload a JSON file and a multistache template HTML file
function uploadFiles() {
  // Get the JSON file and template HTML file from the user
  var jsonFile = document.getElementById('json-file').files[0];
  var templateFile = document.getElementById('template-file').files[0];

  // Get the file reader for each file
  var jsonReader = new FileReader();
  var templateReader = new FileReader();

  // Read the JSON file and template HTML file
  jsonReader.onload = function(e) {
    var jsonData = JSON.parse(e.target.result);
    processFiles(jsonData);
  };

  templateReader.onload = function(e) {
    var template = e.target.result;
    processFiles(template);
  };

  // Read the JSON file and template HTML file
  jsonReader.readAsText(jsonFile);
  templateReader.readAsText(templateFile);
}

// Create a function to process the template and JSON data
function processFiles(templateData, jsonData) {
  // Create a new HTML string with the template and JSON data
  var processedTemplate = templateData.replace(/{{jsonData}}/, JSON.stringify(jsonData));

  // Save the processed HTML string to a new file
  var processedFile = new Blob([processedTemplate], {type: 'text/html'});
  saveAs(processedFile, 'processed-template.html');
}

// Create event listeners for the three buttons
document.getElementById('upload-json').addEventListener('click', uploadFiles);
document.getElementById('upload-template').addEventListener('click', uploadFiles);

// Create event listener for the "Process" button
document.getElementById('process-button').addEventListener('click', function() {
  uploadFiles();
});
