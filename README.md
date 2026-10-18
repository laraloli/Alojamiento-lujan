# Casa en Luján — landing de alojamiento temporal

Sitio estático (HTML + CSS + JavaScript). Funciona en GitHub Pages sin servidor, base de datos ni servicios pagos.

## Archivos

```
index.html   → estructura: portada con carrusel, comodidades, ubicación con mapa, reservas
styles.css   → diseño (móvil primero)
main.js      → carrusel, visor de fotos, WhatsApp y enlaces de Google Maps
config.js    → ✏️ datos editables: WhatsApp, mensaje, dirección, reservas y fotos
img/         → fotos optimizadas, sin datos GPS
fonts/       → tipografías (licencia libre SIL OFL)
.nojekyll    → indica a GitHub Pages que publique los archivos tal cual
```

## Editar datos

Todo se cambia en `config.js`:

- `whatsapp`: solo números, formato internacional (`5492323553881`).
- `mensajeWhatsapp`: texto que aparece escrito al abrir el chat.
- `direccionMapa`: dirección que usan el mapa y los enlaces de Google Maps.
- `reservas`: fechas, tarifa y condiciones que se muestran en la sección Reservas.
- `galeria`: fotos del carrusel, en orden. `pos` indica qué parte de la foto mostrar cuando se recorta.
- `email`: opcional; si queda vacío, no se muestra.

## Ver en tu computadora

Dentro de la carpeta, ejecutá `python3 -m http.server` y entrá a http://localhost:8000
(abrir `index.html` con doble clic también funciona, pero el mapa puede no cargar).

## Publicar o actualizar en GitHub Pages

**Primera vez**

1. Creá un repositorio **público** en github.com (por ejemplo `alojamiento-lujan`).
2. **Add file → Upload files** y arrastrá todo el contenido de esta carpeta, incluida `.nojekyll`. **Commit changes**.
3. **Settings → Pages** → *Deploy from a branch* → rama `main`, carpeta `/ (root)` → **Save**.
4. En 1–2 minutos queda en `https://TU-USUARIO.github.io/alojamiento-lujan/`.

**Si ya estaba publicado**

Subí de nuevo los archivos con **Add file → Upload files** (reemplazan a los anteriores) y confirmá.
En esta versión cambiaron `index.html`, `styles.css`, `main.js`, `config.js` y `README.md`; las carpetas `img/` y `fonts/` no cambiaron.

Después de publicar, abrí la página desde el celular y tocá un botón de WhatsApp para confirmar que abre el chat con el mensaje.

## Qué afirma la página (y qué no)

Comodidades confirmadas que se muestran: living amplio, cocina equipada, dormitorio con cama de dos plazas,
dormitorio con dos camas individuales, terraza con parrilla, vista a la Basílica desde la terraza, calefacción,
ropa de cama, almohadas y toallas. No se mencionan Wi-Fi, aire acondicionado, cochera ni otros servicios.
La política de cambio de fecha no promete reprogramación automática ni devoluciones.
