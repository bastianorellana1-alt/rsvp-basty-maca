# Formulario RSVP (tema vino)

Formulario de confirmación de asistencia, listo para publicar en GitHub Pages y conectado a Google Sheets mediante Google Apps Script.

## Archivos

- `index.html` — el formulario (HTML + CSS + JS, un solo archivo).
- `Code.gs` — script que recibe los datos y los guarda en Google Sheets.

## Paso 1 — Crear la hoja de Google Sheets

1. Ve a [sheets.google.com](https://sheets.google.com) y crea una hoja nueva (dale el nombre que quieras, ej. "RSVP Evento").
2. En el menú, ve a **Extensiones → Apps Script**.
3. Se abrirá el editor de Apps Script con un archivo `Código.gs` vacío. Borra el contenido y pega el contenido del archivo [`Code.gs`](Code.gs) de este proyecto.
4. Guarda el proyecto (icono de disquete o `Ctrl+S`). Ponle un nombre, por ejemplo "RSVP Backend".

## Paso 2 — Publicar como Web App

1. En el editor de Apps Script, haz clic en **Implementar → Nueva implementación**.
2. En "Selecciona el tipo", elige **Aplicación web**.
3. Configura:
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quién tiene acceso:** Cualquier usuario
4. Haz clic en **Implementar**.
5. Google te pedirá autorizar permisos (es tu propio script, es seguro). Acepta.
6. Copia la **URL de la aplicación web** que te entrega (termina en `/exec`).

> Si más adelante editas `Code.gs`, debes crear una **nueva implementación** (o gestionar versiones) para que los cambios se reflejen en la URL publicada.

## Paso 3 — Conectar el formulario

1. Abre `index.html`.
2. Busca esta línea cerca del final del archivo:
   ```js
   const SCRIPT_URL = "PEGA_AQUI_TU_URL_DE_APPS_SCRIPT";
   ```
3. Reemplázala con la URL que copiaste en el paso anterior, por ejemplo:
   ```js
   const SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
4. Guarda el archivo.

## Paso 4 — Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público o privado con Pages habilitado en un plan que lo permita).
2. Sube `index.html` (el `Code.gs` no necesita subirse, solo vive en Apps Script, pero puedes dejarlo como referencia).
3. Ve a **Settings → Pages** del repositorio.
4. En "Source", selecciona la rama (`main`) y la carpeta raíz (`/`).
5. Guarda. En un par de minutos GitHub te dará una URL tipo `https://tuusuario.github.io/turepo/`.

## Probar

Abre la URL de GitHub Pages, llena el formulario y envíalo. Deberías ver una nueva fila en la pestaña "Respuestas" de tu Google Sheet.

## Personalización

- Colores: están definidos como variables CSS en `:root` dentro de `index.html` (`--wine`, `--gold`, `--cream`, etc.) — cambia esos valores para ajustar la paleta.
- Campos: agrega o quita campos en el `<form>` y actualiza `Code.gs` (los `headers` y `appendRow`) para que coincidan.
- Textos: edita libremente los títulos, mensajes y el texto del botón directamente en el HTML.
