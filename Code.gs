function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function onFormSubmit(e) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // Retrieve the active spreadsheet
  Logger.log('Spreadsheet Retrieved: ' + spreadsheet.getName());
    
  var sheetId = 1171124007; 

  // Get all sheets and find the one with the matching ID
  var sheets = spreadsheet.getSheets();
  Logger.log('Sheets Found: ' + sheets.map(sheet => sheet.getSheetId()).join(', '));
    
  var sheet = sheets.find(s => s.getSheetId() === sheetId);
    
  // Log error if sheet is not found
  if (!sheet) {
    Logger.log('Error: Sheet with ID "' + sheetId + '" not found.');
    return [];
  }
    
  Logger.log('Sheet Retrieved: ' + sheet.getName());
  var row = sheet.getLastRow();
  var email = sheet.getRange(row, 6).getValue();  // Assuming email is in the 6th column
  
  // Handle null or empty email
  email = email ? email : 'default@example.com'; // Replace with a default email if needed
  
  sendNotification(email, 'Application Received', 'Your application has been received.');
}

function testOnEdit() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // Retrieve the active spreadsheet
  Logger.log('Spreadsheet Retrieved: ' + spreadsheet.getName());
    
  var sheetId = 1171124007; 
    
  // Get all sheets and find the one with the matching ID
  var sheets = spreadsheet.getSheets();
  Logger.log('Sheets Found: ' + sheets.map(sheet => sheet.getSheetId()).join(', '));
    
  var sheet = sheets.find(s => s.getSheetId() === sheetId);  var range = sheet.getRange('K4'); // Simulate an edit in cell A1
  var e = {
    source: SpreadsheetApp.getActiveSpreadsheet(),
    range: range
  };
  
  onEdit(e); // Call onEdit with the mock event object
}




function onEdit(e) {
  if (!e || !e.range || !e.source) {
    Logger.log('Event object or its properties are missing.');
    return; // Exit the function if the event object or its properties are missing
  }

  var spreadsheet = e.source; // Retrieve the spreadsheet from the event object
  Logger.log('Spreadsheet Retrieved: ' + spreadsheet.getName());
  
  var sheetId = 1171124007; // ID of the sheet to check
  
  // Get all sheets and find the one with the matching ID
  var sheets = spreadsheet.getSheets();
  Logger.log('Sheets Found: ' + sheets.map(sheet => sheet.getSheetId()).join(', '));
  
  var sheet = sheets.find(s => s.getSheetId() === sheetId);
  
  // Log error if sheet is not found
  if (!sheet) {
    Logger.log('Error: Sheet with ID "' + sheetId + '" not found.');
    return; // Exit if the sheet is not found
  }

  // Ensure the sheet in the event object is the correct one
  if (sheet.getName() !== e.source.getActiveSheet().getName()) {
    Logger.log('Error: Edit was not made in the expected sheet.');
    return;
  }

  var range = e.range;

  // Check if the edit was made in the status column (e.g., column 12)
  if (range.getColumn() === 11) {
    var row = range.getRow();
    var status = range.getValue();
    
    updateApplicationStatus(row, status);
  } else {
    Logger.log('Edit was not made in the status column.');
  }
}

function sendNotification(email, subject, body) {
  MailApp.sendEmail({
    to: email,
    subject: subject,
    body: body
  });
}

function updateApplicationStatus(row, status) {
  // Example implementation: log the status change
  Logger.log('Updated row: ' + row + ' with status: ' + status);

  // You might also want to send an email or update other cells
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // Retrieve the active spreadsheet
  Logger.log('Spreadsheet Retrieved: ' + spreadsheet.getName());
    
  var sheetId = 1171124007; 
    
  // Get all sheets and find the one with the matching ID
  var sheets = spreadsheet.getSheets();
  Logger.log('Sheets Found: ' + sheets.map(sheet => sheet.getSheetId()).join(', '));
    
  var sheet = sheets.find(s => s.getSheetId() === sheetId);
    
  // Log error if sheet is not found
  if (!sheet) {
    Logger.log('Error: Sheet with ID "' + sheetId + '" not found.');
    return [];
  }
  var email = sheet.getRange(row, 6).getValue(); // Assuming email is in the 6th column

  // Handle null or empty email
  email = email ? email : 'default@example.com'; // Replace with a default email if needed

  if (status === 'Approved') {
    sendNotification(email, 'Application Approved', 'Congratulations! Your application has been approved.');
  } else if (status === 'Rejected') {
    sendNotification(email, 'Application Rejected', 'We regret to inform you that your application has been rejected.');
  }
}


