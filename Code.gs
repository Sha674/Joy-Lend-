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


// function onEdit(e) {
//   var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // Retrieve the active spreadsheet
//   Logger.log('Spreadsheet Retrieved: ' + spreadsheet.getName());
    
//   var sheetId = 1171124007; 
    
//   // Get all sheets and find the one with the matching ID
//   var sheets = spreadsheet.getSheets();
//   Logger.log('Sheets Found: ' + sheets.map(sheet => sheet.getSheetId()).join(', '));
    
//   var sheet = sheets.find(s => s.getSheetId() === sheetId);
    
//   // Log error if sheet is not found
//   if (!sheet) {
//     Logger.log('Error: Sheet with ID "' + sheetId + '" not found.');
//     return [];
//   }  
//   var range = e.range;

//   // Check if the edit was made in the status column (e.g., column 12)
//   if (sheet.getName()==='Funding Application' && range.getColumn() === 12) {
//     var row = range.getRow();
//     var status = range.getValue();
    
//     updateApplicationStatus(row, status);
//   }
// }

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


// // function getApplications() {
// //   try {
// //     var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // Retrieve the active spreadsheet
// //     Logger.log('Spreadsheet Retrieved: ' + spreadsheet.getName());
    
// //     var sheetId = 1171124007; // Replace with your actual sheet ID
    
// //     // Get all sheets and find the one with the matching ID
// //     var sheets = spreadsheet.getSheets();
// //     Logger.log('Sheets Found: ' + sheets.map(sheet => sheet.getSheetId()).join(', '));
    
// //     var sheet = sheets.find(s => s.getSheetId() === sheetId);
    
// //     // Log error if sheet is not found
// //     if (!sheet) {
// //       Logger.log('Error: Sheet with ID "' + sheetId + '" not found.');
// //       return [];
// //     }
    
// //     Logger.log('Sheet Retrieved: ' + sheet.getName());
    
// //     // Retrieve all data from the sheet
// //     var data = sheet.getDataRange().getValues();
// //     Logger.log('Data Retrieved: ' + JSON.stringify(data));
    
// //     // Return the data
// //     return data;
// //   } catch (e) {
// //     // Log and handle any errors
// //     Logger.log('Error: ' + e.toString());
// //     return [];
// //   }
// // }

// function getResponses() {
//   try {
//     var spreadsheet = SpreadsheetApp.getActiveSpreadsheet(); // Retrieve the active spreadsheet
//     Logger.log('Spreadsheet Retrieved: ' + spreadsheet.getName());
    
//     var sheetId = 1171124007; // Replace with your actual sheet ID
    
//     // Get all sheets and find the one with the matching ID
//     var sheets = spreadsheet.getSheets();
//     Logger.log('Sheets Found: ' + sheets.map(sheet => sheet.getSheetId()).join(', '));
    
//     var sheet = sheets.find(s => s.getSheetId() === sheetId);
    
//     var data = sheet.getDataRange().getValues();
    
//     // Log the data to check its structure
//     Logger.log('Data fetched: ' + JSON.stringify(data));
    
//     // Remove header row if it exists
//     if (data.length > 0) {
//       data.shift(); // Removes the first row (header)
//     }
    
//     // Replace null values with empty strings
//     data = data.map(function(row) {
//       return row.map(function(cell) {
//         return cell === null ? '' : cell;
//       });
//     });
    
//     return data;
//   } catch (e) {
//     Logger.log('Error fetching responses: ' + e.toString());
//     return []; // Return an empty array if there is an error
//   }
// }


// function onFormSubmit(e) {
//   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Funding Application');
//   var range = e.range;
//   var row = range.getRow();
//   var email = sheet.getRange(row, 6).getValue(); // Assuming the email is in the 2nd column
//   var subject = 'New Funding Application Received';
//   var body = 'A new funding application has been submitted:\n\n' +
//              'Business Name: ' + sheet.getRange(row, 1).getValue() + '\n' +
//              'Contact Person: ' + sheet.getRange(row, 2).getValue() + '\n' +
//              'Amount Requested: ' + sheet.getRange(row, 3).getValue() + '\n' +
//              'Funding Source: ' + sheet.getRange(row, 4).getValue() + '\n';

//   MailApp.sendEmail(email, subject, body);
// }

// function createTrigger() {
//   var sheet = SpreadsheetApp.getActiveSpreadsheet();
//   ScriptApp.newTrigger('onFormSubmit')
//            .forSpreadsheet(sheet)
//            .onFormSubmit()
//            .create();
// }

// function processForm(formData) {
//   var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Responses 1');
//   var row = [
//     formData.get('name'),
//     formData.get('contact'),
//     formData.get('amount'),
//     formData.get('source')
//   ];
//   sheet.appendRow(row);
//   return HtmlService.createHtmlOutput('Thank you for your submission!');
// }

