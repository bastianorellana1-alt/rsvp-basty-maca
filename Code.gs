// Google Apps Script — recibe las respuestas del formulario RSVP y las guarda en la hoja activa.
// Pasos de instalación en el archivo README.md que acompaña este proyecto.

const SHEET_NAME = "Respuestas"; // nombre de la pestaña donde se guardarán los datos

// Cada columna se ubica por su título, así que se pueden agregar columnas nuevas
// sin desalinear las respuestas que ya están guardadas.
const COLUMNS = [
  { header: "Fecha",                  value: p => (p.fecha ? new Date(p.fecha) : new Date()) },
  { header: "Nombre",                 value: p => p.nombre },
  { header: "Email",                  value: p => p.email },
  { header: "Asistirá",               value: p => p.asiste },
  { header: "Comentarios",            value: p => p.mensaje },
  { header: "¿Lleva acompañante?",    value: p => p.acompanante },
  { header: "Nombre del acompañante", value: p => p.nombre_acompanante }
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const sheet = getOrCreateSheet_();
    const headers = syncHeaders_(sheet);
    const params = e.parameter;

    const byHeader = {};
    COLUMNS.forEach(c => { byHeader[c.header] = c.value(params); });

    sheet.appendRow(headers.map(h => {
      const v = byHeader[h];
      return v === undefined || v === null ? "" : v;
    }));

    return jsonResponse_({ result: "success" });
  } catch (err) {
    return jsonResponse_({ result: "error", error: err.message });
  } finally {
    lock.releaseLock();
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

// Crea los encabezados si la hoja está vacía; si ya existen, agrega al final
// los que falten. Devuelve la lista de encabezados en el orden de la hoja.
function syncHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    const all = COLUMNS.map(c => c.header);
    sheet.appendRow(all);
    sheet.getRange(1, 1, 1, all.length).setFontWeight("bold");
    return all;
  }

  const headers = sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0]
    .map(h => String(h).trim());

  COLUMNS.forEach(c => {
    if (headers.indexOf(c.header) === -1) {
      headers.push(c.header);
      sheet.getRange(1, headers.length).setValue(c.header).setFontWeight("bold");
    }
  });
  return headers;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
