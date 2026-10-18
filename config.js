/* =========================================================================
   CONFIGURACIÓN DEL SITIO — editá solo este archivo
   -------------------------------------------------------------------------
   WhatsApp, dirección, mapa, datos de reserva y fotos están acá.
   No hace falta tocar index.html ni main.js para cambiarlos.
   ========================================================================= */

window.SITE = {
  nombre: "Casa en Luján",

  /* WhatsApp en formato internacional, SOLO números (sin +, espacios ni guiones).
     +54 9 2323 553881  →  "5492323553881" */
  whatsapp: "5492323553881",
  whatsappVisible: "+54 9 2323 553881",   // cómo se muestra en la página

  /* Mensaje que se precarga al abrir WhatsApp (se codifica solo) */
  mensajeWhatsapp:
    "Hola, vi la página del alojamiento en Doctor Muñiz 688, Luján. Quisiera consultar disponibilidad, tarifas y condiciones de reserva para noviembre de 2026.",

  /* Contacto opcional: dejá "" para ocultarlo */
  email: "",

  /* Ubicación: el mapa y los enlaces se arman a partir de esta dirección */
  direccion: "Doctor Muñiz 688",
  piso: "Primer piso",
  ciudad: "Luján, Buenos Aires",
  direccionMapa: "Doctor Muñiz 688, Luján, Buenos Aires, Argentina",

  /* Datos de la reserva (sección "Reservas") */
  reservas: {
    fechas: "Noviembre de 2026",
    tarifa: "A consultar",
    condiciones: "Se informan antes de confirmar y pagar"
  },

  /* Fotos del carrusel, en orden.
     src   = versión grande (~1800 px) · thumb = versión liviana (~800 px)
     pos   = qué parte de la foto mostrar cuando se recorta (opcional, CSS object-position)
     Para agregar una foto: subila a /img y sumá una línea. */
  galeria: [
    { src: "img/terraza-parrilla.jpg", thumb: "img/terraza-parrilla-sm.jpg", titulo: "Terraza con parrilla y vista a la Basílica", alt: "Terraza con parrilla de material y reposeras; al fondo asoman las torres de la Basílica" },
    { src: "img/vista-basilica.jpg", thumb: "img/vista-basilica-sm.jpg", pos: "50% 60%", titulo: "La Basílica desde el sector de la parrilla", alt: "Las torres de la Basílica de Luján vistas desde la terraza, entre palmeras" },
    { src: "img/living-1.jpg", thumb: "img/living-1-sm.jpg", titulo: "Living amplio", alt: "Living amplio con piso de granito, ventanal y puerta balcón" },
    { src: "img/living-3.jpg", thumb: "img/living-3-sm.jpg", titulo: "Living", alt: "Rincón del living con sillón junto a la ventana" },
    { src: "img/cocina-3.jpg", thumb: "img/cocina-3-sm.jpg", titulo: "Cocina equipada", alt: "Cocina con muebles blancos, cocina a gas, heladera y mesa de comedor" },
    { src: "img/cocina-1.jpg", thumb: "img/cocina-1-sm.jpg", titulo: "Cocina y comedor diario", alt: "Mesa de comedor con sillas de madera junto a la cocina" },
    { src: "img/comedor.jpg", thumb: "img/comedor-sm.jpg", titulo: "Comedor diario", alt: "Mesa de comedor y ventanal de la cocina" },
    { src: "img/dormitorio-principal-1.jpg", thumb: "img/dormitorio-principal-1-sm.jpg", titulo: "Dormitorio principal · cama de dos plazas", alt: "Dormitorio principal con cama de dos plazas, placard y ventana" },
    { src: "img/dormitorio-principal-5.jpg", thumb: "img/dormitorio-principal-5-sm.jpg", titulo: "Dormitorio principal", alt: "Dormitorio principal con placard de puertas corredizas" },
    { src: "img/dormitorio-principal-3.jpg", thumb: "img/dormitorio-principal-3-sm.jpg", pos: "50% 68%", titulo: "Dormitorio principal", alt: "Cama de dos plazas sobre piso de parquet" },
    { src: "img/dormitorio-2-2.jpg", thumb: "img/dormitorio-2-2-sm.jpg", pos: "50% 80%", titulo: "Segundo dormitorio · dos camas individuales", alt: "Segundo dormitorio con dos camas individuales y ventana" },
    { src: "img/dormitorio-2-1.jpg", thumb: "img/dormitorio-2-1-sm.jpg", pos: "50% 62%", titulo: "Segundo dormitorio", alt: "Segundo dormitorio con placard y dos camas individuales" },
    { src: "img/bano.jpg", thumb: "img/bano-sm.jpg", pos: "50% 62%", titulo: "Baño", alt: "Baño con ducha, inodoro, bidet y lavatorio" },
    { src: "img/escalera-1.jpg", thumb: "img/escalera-1-sm.jpg", pos: "50% 55%", titulo: "Escalera de acceso", alt: "Escalera de acceso con cerámicos y azulejos decorados" }
  ]
};
