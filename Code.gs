// Google Apps Script — recibe las respuestas del formulario RSVP y las guarda en la hoja activa.
// Pasos de instalación en el archivo README.md que acompaña este proyecto.

const SHEET_NAME = "Respuestas"; // nombre de la pestaña donde se guardarán los datos

function doPost(e) {
  try {
    const sheet = getOrCreateSheet_();
    const params = e.parameter;

    const headers = ["Fecha", "Nombre", "Email", "Asistirá", "Comentarios"];
    ensureHeaders_(sheet, headers);

    sheet.appendRow([
      params.fecha ? new Date(params.fecha) : new Date(),
      params.nombre || "",
      params.email || "",
      params.asiste || "",
      params.mensaje || ""
    ]);

    return jsonResponse_({ result: "success" });
  } catch (err) {
    return jsonResponse_({ result: "error", error: err.message });
  }
}

function getOrCreateSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
