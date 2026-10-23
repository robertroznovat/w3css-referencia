/* =========================================================
   FUNCIONES DE LA REFERENCIA LOCAL
   - Abrir y cerrar el menú lateral en pantallas pequeñas.
   - Filtrar secciones por nombre, clase o descripción.
   - Mantener todo el comportamiento en un fichero reutilizable.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const menu = document.getElementById("menu-lateral");
    const fondo = document.getElementById("fondo-menu");
    const abrir = document.getElementById("abrir-menu");
    const cerrar = document.getElementById("cerrar-menu");
    const buscador = document.getElementById("buscador");
    const limpiar = document.getElementById("limpiar-busqueda");
    const contador = document.getElementById("contador");
    const secciones = [...document.querySelectorAll(".grupo-filtrable")];
    let avisoSinResultados = null;

    // Muestra u oculta el menú móvil y actualiza los atributos accesibles.
    function abrirMenu() {
        menu.classList.add("abierto");
        fondo.hidden = false;
        abrir.setAttribute("aria-expanded", "true");
        cerrar.focus();
    }

    function cerrarMenu() {
        menu.classList.remove("abierto");
        fondo.hidden = true;
        abrir.setAttribute("aria-expanded", "false");
        abrir.focus();
    }

    abrir.addEventListener("click", abrirMenu);
    cerrar.addEventListener("click", cerrarMenu);
    fondo.addEventListener("click", cerrarMenu);

    // En móvil, al elegir una sección, se cierra el menú lateral.
    menu.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener("click", () => {
            if (window.matchMedia("(max-width: 850px)").matches) {
                menu.classList.remove("abierto");
                fondo.hidden = true;
                abrir.setAttribute("aria-expanded", "false");
            }
        });
    });

    // Escape cierra el menú lateral si está abierto.
    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape" && menu.classList.contains("abierto")) {
            cerrarMenu();
        }
    });
/* =========================================================
   Busca clases y texto dentro de las secciones y sus tablas.
   ========================================================= */
    
    function filtrarSecciones() {
        const consulta = buscador.value.trim().toLocaleLowerCase("es");
        let filasVisibles = 0;
        let seccionesVisibles = 0;

        secciones.forEach(seccion => {
            const filas = seccion.querySelectorAll("tbody tr");
            let coincideSeccion = false;

            if (filas.length > 0) {
                // Filtra las filas individualmente.
                filas.forEach(fila => {
                    const coincideFila =
                        fila.textContent.toLocaleLowerCase("es").includes(consulta);

                    fila.hidden = consulta !== "" && !coincideFila;

                    if (consulta === "" || coincideFila) {
                        filasVisibles++;
                        coincideSeccion = true;
                    }
                });

                // Mantiene visible la sección si contiene alguna coincidencia.
                seccion.classList.toggle(
                    "oculto-por-busqueda",
                    consulta !== "" && !coincideSeccion
                );
            } else {
                // En secciones sin tablas, busca en su texto completo.
                coincideSeccion =
                    seccion.textContent.toLocaleLowerCase("es").includes(consulta);

                seccion.classList.toggle(
                    "oculto-por-busqueda",
                    consulta !== "" && !coincideSeccion
                );
            }

            if (consulta === "" || coincideSeccion) {
                seccionesVisibles++;
            }
        });

        if (consulta === "") {
            contador.textContent = "Mostrando todas las secciones";
        } else {
            contador.textContent =
                `${filasVisibles} filas coinciden en ${seccionesVisibles} secciones con «${buscador.value.trim()}»`;
        }

        if (avisoSinResultados) {
            avisoSinResultados.remove();
            avisoSinResultados = null;
        }

        if (consulta !== "" && seccionesVisibles === 0) {
            avisoSinResultados = document.createElement("div");
            avisoSinResultados.className = "sin-resultados";
            avisoSinResultados.textContent =
                "No se han encontrado coincidencias. Prueba con otra clase W3.CSS.";
            contador.closest(".barra-resultados").after(avisoSinResultados);
        }
    }

   // Activa el filtrado al escribir.
    buscador.addEventListener("input", filtrarSecciones);
   // Limpia el cuadro de búsqueda.
    limpiar.addEventListener("click", () => {
        buscador.value = "";
        filtrarSecciones();
        buscador.focus();
    });
});

/* =========================================
   DEMOSTRACIONES DE CLASES W3.CSS
   ========================================= */

function mostrarEjemplo(clase) {

    const modal = document.getElementById("modalEjemplo");
    const titulo = document.getElementById("tituloEjemplo");
    const contenido = document.getElementById("contenidoEjemplo");

    // Comprobamos los elementos necesarios.
    if (!modal || !titulo || !contenido) {
        console.error("Falta algún elemento del modal.");
        return;
    }

    if (clase === "w3-container") {
        titulo.textContent = "Ejemplo: w3-container";

        contenido.innerHTML = `
            <p>Observa el espacio interior del contenedor:</p>

            <div class="w3-container w3-blue">
                <h3>Mi contenedor</h3>
                <p>Este texto está dentro de w3-container.</p>
                <p>El contenedor añade 16 px de relleno lateral.</p>
            </div>

            <p>El fondo azul permite apreciar el espacio interior.</p>
        `;
    }
     else if (clase === "w3-header") {
        titulo.textContent = "Ejemplo: w3-header";

        contenido.innerHTML = `
            <header class="w3-container w3-blue">
                <h2>Mi cabecera</h2>
                <p>Ejemplo de una cabecera con W3.CSS.</p>
            </header>
        `;
    }
    // Proximo elemento
   else if (clase === "w3-footer") {
        titulo.textContent = "Ejemplo: w3-footer";

        contenido.innerHTML = `
            <footer class="w3-container w3-blue">
                <h2>Mi pie de página</h2>
                <p>Ejemplo de un pie de página con W3.CSS.</p>
            </footer>
        `;
    }
    // Proximo elemento....
        else if (clase === "w3-panel") {
        titulo.textContent = "Ejemplo: w3-panel";

        contenido.innerHTML = `
            <p>Los paneles aplican márgenes verticales (16px) además del relleno lateral:</p>

            <div class="w3-panel w3-pale-blue w3-leftbar w3-border-blue">
                <h3>Nota Informativa</h3>
                <p>Este es un w3-panel útil para notas, alertas o citas destacadas.</p>
            </div>

            <p>Ideal para separar bloques de texto importantes del flujo común.</p>
        `;
    }
    // Proximo elemento....
    else if (clase === "w3-badge") {
        titulo.textContent = "Ejemplo: w3-badge";

        contenido.innerHTML = `
            <p>Las insignias (badges) son elementos circulares ideales para mostrar números, alertas o notificaciones:</p>

            <div class="w3-container">
                <p>Mensajes nuevos <span class="w3-badge w3-red">6</span></p>
                <p>Alertas del sistema <span class="w3-badge w3-blue">!</span></p>
                <p>Contador básico: <span class="w3-badge w3-green">A</span></p>
            </div>

            <p>Se adaptan automáticamente al tamaño del texto que las rodea.</p>
        `;
    }
// Proximo elemento....
    else if (clase === "w3-tag") {
        titulo.textContent = "Ejemplo: w3-tag";

        contenido.innerHTML = `
            <p>Las etiquetas (tags) son elementos rectangulares perfectos para marcar categorías, palabras clave o precios:</p>

            <div class="w3-container">
                <p>Categoría: <span class="w3-tag w3-blue">Desarrollo</span></p>
                <p>Estado: <span class="w3-tag w3-green">Completado</span></p>
                <p>Precio especial: <span class="w3-tag w3-yellow">9.99 €</span></p>
            </div>

            <p>A diferencia de w3-badge, el elemento w3-tag mantiene esquinas rectangulares y es más ancho.</p>
        `;
    }
// Proximo elemento....
    else if (clase === "w3-ul") {
        titulo.textContent = "Ejemplo: w3-ul";

        contenido.innerHTML = `
            <p>La clase w3-ul da formato a las listas sin ordenar, eliminando los viñetas comunes y añadiendo líneas divisorias limpias:</p>

            <ul class="w3-ul w3-border">
                <li>Primer elemento de la lista</li>
                <li>Segundo elemento con más texto</li>
                <li>Tercer elemento final</li>
            </ul>

            <p>Puedes combinarlo con w3-border para enmarcar la lista completa y con w3-hoverable si quieres efectos al pasar el ratón.</p>
        `;
    }
// Proximo elemento....
    else if (clase === "w3-display-container") {
        titulo.textContent = "Ejemplo: w3-display-container";

        contenido.innerHTML = `
            <p>Este contenedor sirve como base (posición relativa) para colocar elementos hijos en esquinas o posiciones exactas usando clases w3-display-*:</p>

            <div class="w3-display-container w3-blue" style="height:150px;">
                <div class="w3-display-topleft w3-padding w3-black">Arriba-Izquierda</div>
                <div class="w3-display-topright w3-padding w3-black">Arriba-Derecha</div>
                <div class="w3-display-middle w3-padding w3-white w3-text-black">Centro</div>
                <div class="w3-display-bottomleft w3-padding w3-black">Abajo-Izquierda</div>
                <div class="w3-display-bottomright w3-padding w3-black">Abajo-Derecha</div>
            </div>

            <p>Es indispensable fijar una altura (height) al contenedor para apreciar correctamente el posicionamiento visual.</p>
        `;
    }
// Proximo elemento....
    else if (clase === "w3-block") {
        titulo.textContent = "Ejemplo: w3-block";

        contenido.innerHTML = `
            <p>La clase w3-block obliga a un elemento (como un botón o un input) a comportarse como un bloque y ocupar el 100% del ancho disponible:</p>

            <div class="w3-container">
                <button class="w3-button w3-blue w3-block w3-section">Botón de ancho completo (w3-block)</button>
                <button class="w3-button w3-green w3-section">Botón normal</button>
            </div>

            <p>Es muy útil para diseñar formularios móviles o botones principales de llamada a la acción.</p>
        `;
           }
     // Proximo elemento....
    else if (clase === "w3-code") {
        titulo.textContent = "Ejemplo: w3-code";

        contenido.innerHTML = `
            <p>Diseñada específicamente para mostrar bloques de código fuente multilínea con una tipografía monoespaciada y un fondo limpio:</p>

            <div class="w3-code htmlHigh notranslate">
                &lt;div class="w3-container w3-green"&gt;<br>
                &nbsp;&nbsp;&lt;p&gt;Hola Mundo&lt;/p&gt;<br>
                &lt;/div&gt;
            </div>

            <p>Conserva los saltos de línea y añade un borde izquierdo gris para destacar el bloque.</p>
        `;
            }
            // Proximo elemento....
    else if (clase === "w3-codespan") {
        titulo.textContent = "Ejemplo: w3-codespan";

        contenido.innerHTML = `
            <p>Ideal para resaltar palabras clave, comandos o fragmentos cortos de código intercalados directamente dentro de un párrafo de texto:</p>

            <div class="w3-container">
                <p>Para aplicar este estilo, debes añadir la clase <code class="w3-codespan">w3-codespan</code> al elemento contenedor.</p>
                <p>Usa el comando <code class="w3-codespan">npm install</code> para iniciar el proyecto.</p>
            </div>

            <p>Aplica un fondo gris claro y una fuente monoespaciada sin romper el flujo de la línea.</p>
        `;
        
    }
    // Proximo elemento....
    else if (clase === "w3-content") {
        titulo.textContent = "Ejemplo: w3-content";

        contenido.innerHTML = `
            <p>Centra horizontalmente un contenedor y le asigna un ancho máximo fijo (por defecto de 980 píxeles):</p>

            <div class="w3-content w3-border w3-pale-green w3-padding" style="max-width:400px;">
                <h3>Contenido Centrado</h3>
                <p>Este bloque se mantendrá siempre centrado en pantallas grandes.</p>
            </div>

            <p><i>Nota: En este ejemplo se ha forzado un max-width menor (400px) para que puedas apreciar el centrado dentro del modal.</i></p>
        `;
        
    }
    // Proximo elemento....
    else if (clase === "w3-auto") {
        titulo.textContent = "Ejemplo: w3-auto";

        contenido.innerHTML = `
            <p>Similar a w3-content, centra el contenedor horizontalmente pero ajusta su ancho máximo de forma dinámica según el tamaño de la pantalla activa (responsive):</p>

            <div class="w3-auto w3-card w3-padding w3-light-grey">
                <h4>Bloque Adaptable</h4>
                <p>Cambia su ancho máximo automáticamente según sea móvil, tablet o PC.</p>
            </div>

            <p>Es la clase recomendada por W3.CSS para crear envoltorios de páginas web modernas.</p>
        `;
        
    }
    // Proximo elemento....
    else if (clase === "w3-stretch") {
        titulo.textContent = "Ejemplo: w3-stretch";

        contenido.innerHTML = `
            <p>Fuerza a un elemento a ignorar los márgenes o rellenos interiores de su contenedor padre para expandirse por completo de borde a borde:</p>

            <div class="w3-container w3-border w3-padding-16">
                <p>Texto dentro del contenedor con relleno.</p>
                <div class="w3-container w3-red w3-stretch">
                    <p>Este bloque usa w3-stretch y toca los bordes laterales.</p>
                </div>
            </div>

            <p>Es excelente para crear banners de color completo dentro de secciones con paddings.</p>
        `;
       
    }
     // Proximo elemento....
    else if (clase === "w3-rtl") {
        titulo.textContent = "Ejemplo: w3-rtl";

        contenido.innerHTML = `
            <p>Cambia la orientación del flujo del texto y los elementos para que se lean de derecha a izquierda (Right-to-Left):</p>

            <div class="w3-container w3-rtl w3-light-grey w3-padding">
                <h3>Este es un título RTL</h3>
                <p>El texto comienza en la derecha y los puntos finales van a la izquierda.</p>
            </div>

            <p>Indispensable para soportar idiomas como el árabe, hebreo o persa.</p>
        `;
       
    }
     // Proximo elemento....
    else if (clase === "w3-ltr") {
        titulo.textContent = "Ejemplo: w3-ltr";

        contenido.innerHTML = `
            <p>Fuerza y asegura la orientación estándar del texto de izquierda a derecha (Left-to-Right):</p>

            <div class="w3-container w3-ltr w3-light-grey w3-padding">
                <h3>Este es un título LTR</h3>
                <p>Flujo de lectura e inicialización de elementos común de izquierda a derecha.</p>
            </div>

            <p>Se utiliza para restablecer la dirección normal si un contenedor padre tiene activa la propiedad RTL.</p>
        `;
    }
 // Proximo elemento....

    // Próximo elemento: w3-table
    else if (clase === "w3-table") {
        titulo.textContent = "Ejemplo: w3-table";

        contenido.innerHTML = `
            <p>Aplica el formato básico de W3.CSS a una tabla HTML.</p>

            <table class="w3-table">
                <tr><th>Nombre</th><th>Apellido</th><th>Puntos</th></tr>
                <tr><td>Ana</td><td>García</td><td>50</td></tr>
                <tr><td>Carlos</td><td>López</td><td>94</td></tr>
                <tr><td>María</td><td>Martín</td><td>78</td></tr>
            </table>

            <p>La clase proporciona un formato de tabla con espaciado y presentación propios de W3.CSS.</p>
        `;
    }

    // Próximo elemento: w3-striped
    else if (clase === "w3-striped") {
        titulo.textContent = "Ejemplo: w3-striped";

        contenido.innerHTML = `
            <p>Alterna el color de fondo de las filas para facilitar la lectura.</p>

            <table class="w3-table w3-striped">
                <tr><th>Nombre</th><th>Apellido</th><th>Puntos</th></tr>
                <tr><td>Ana</td><td>García</td><td>50</td></tr>
                <tr><td>Carlos</td><td>López</td><td>94</td></tr>
                <tr><td>María</td><td>Martín</td><td>78</td></tr>
                <tr><td>Pedro</td><td>Sánchez</td><td>65</td></tr>
            </table>

            <p>Las filas alternan sus fondos para distinguir visualmente cada registro.</p>
        `;
    }

    // Próximo elemento: w3-border
    else if (clase === "w3-border") {
        titulo.textContent = "Ejemplo: w3-border";

        contenido.innerHTML = `
            <p>Agrega un borde exterior alrededor de toda la tabla.</p>

            <table class="w3-table w3-border">
                <tr><th>Nombre</th><th>Apellido</th><th>Puntos</th></tr>
                <tr><td>Ana</td><td>García</td><td>50</td></tr>
                <tr><td>Carlos</td><td>López</td><td>94</td></tr>
                <tr><td>María</td><td>Martín</td><td>78</td></tr>
            </table>

            <p>La clase añade un borde al contenedor de la tabla, sin crear por sí misma las líneas divisorias entre todas las celdas.</p>
        `;
    }

    // Próximo elemento: w3-bordered
    else if (clase === "w3-bordered") {
        titulo.textContent = "Ejemplo: w3-bordered";

        contenido.innerHTML = `
            <p>Añade líneas de separación entre las filas de la tabla.</p>

            <table class="w3-table w3-bordered">
                <tr><th>Nombre</th><th>Apellido</th><th>Puntos</th></tr>
                <tr><td>Ana</td><td>García</td><td>50</td></tr>
                <tr><td>Carlos</td><td>López</td><td>94</td></tr>
                <tr><td>María</td><td>Martín</td><td>78</td></tr>
            </table>

            <p>Las líneas horizontales ayudan a separar los registros.</p>
        `;
    }

    // Próximo elemento: w3-centered
    else if (clase === "w3-centered") {
        titulo.textContent = "Ejemplo: w3-centered";

        contenido.innerHTML = `
            <p>Centra horizontalmente el contenido de los encabezados y las celdas.</p>

            <table class="w3-table w3-bordered w3-centered">
                <tr><th>Nombre</th><th>Apellido</th><th>Puntos</th></tr>
                <tr><td>Ana</td><td>García</td><td>50</td></tr>
                <tr><td>Carlos</td><td>López</td><td>94</td></tr>
                <tr><td>María</td><td>Martín</td><td>78</td></tr>
            </table>

            <p>Observa cómo los textos y números quedan centrados en sus respectivas columnas.</p>
        `;
    }

    // Próximo elemento: w3-table-all
    else if (clase === "w3-table-all") {
        titulo.textContent = "Ejemplo: w3-table-all";

        contenido.innerHTML = `
            <p>Combina el formato de tabla con bordes y filas con fondos alternos.</p>

            <table class="w3-table-all">
                <tr><th>Nombre</th><th>Apellido</th><th>Puntos</th></tr>
                <tr><td>Ana</td><td>García</td><td>50</td></tr>
                <tr><td>Carlos</td><td>López</td><td>94</td></tr>
                <tr><td>María</td><td>Martín</td><td>78</td></tr>
                <tr><td>Pedro</td><td>Sánchez</td><td>65</td></tr>
            </table>

            <p>Es una opción práctica cuando quieres una tabla con líneas visibles y filas alternas sin combinar varias clases por separado.</p>
        `;
    }

    // Próximo elemento: w3-hoverable
    else if (clase === "w3-hoverable") {
        titulo.textContent = "Ejemplo: w3-hoverable";

        contenido.innerHTML = `
            <p>Pasa el puntero del ratón por las filas para observar el cambio de fondo.</p>

            <table class="w3-table w3-bordered w3-hoverable">
                <tr><th>Nombre</th><th>Apellido</th><th>Puntos</th></tr>
                <tr><td>Ana</td><td>García</td><td>50</td></tr>
                <tr><td>Carlos</td><td>López</td><td>94</td></tr>
                <tr><td>María</td><td>Martín</td><td>78</td></tr>
            </table>

            <p>La clase resalta la fila sobre la que se encuentra el puntero, facilitando la identificación del registro.</p>
        `;
    }

    // Próximo elemento: w3-responsive
    else if (clase === "w3-responsive") {
        titulo.textContent = "Ejemplo: w3-responsive";

        contenido.innerHTML = `
            <p>Reduce el ancho de la ventana o del área de visualización para comprobar el desplazamiento horizontal.</p>

            <div class="w3-responsive">
                <table class="w3-table-all">
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Departamento</th>
                        <th>Ciudad</th>
                        <th>Correo electrónico</th>
                        <th>Puntos</th>
                    </tr>
                    <tr>
                        <td>Ana</td>
                        <td>García</td>
                        <td>Administración</td>
                        <td>Madrid</td>
                        <td>ana.garcia@example.com</td>
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>Carlos</td>
                        <td>López</td>
                        <td>Informática</td>
                        <td>Barcelona</td>
                        <td>carlos.lopez@example.com</td>
                        <td>94</td>
                    </tr>
                    <tr>
                        <td>María</td>
                        <td>Martín</td>
                        <td>Contabilidad</td>
                        <td>Valencia</td>
                        <td>maria.martin@example.com</td>
                        <td>78</td>
                    </tr>
                </table>
            </div>

            <p>Cuando la tabla no cabe en el espacio disponible, el contenedor permite desplazarse horizontalmente en lugar de obligar a reducir todas las columnas.</p>
        `;
    }
// Próximo bloque

    // Próximo elemento: w3-card
    else if (clase === "w3-card") {
        titulo.textContent = "Ejemplo: w3-card";

        contenido.innerHTML = `
            <p>Aplica una sombra a un elemento para darle apariencia de tarjeta. Equivale a w3-card-2.</p>

            <div class="w3-container w3-card">
                <h3>Mi primera tarjeta</h3>
                <p>Esta tarjeta utiliza la clase w3-card.</p>
                <p>La sombra ayuda a distinguir el contenido del fondo de la página.</p>
            </div>

            <p>La clase añade el efecto de sombra, pero no asigna por sí misma un color de fondo.</p>
        `;
    }

    // Próximo elemento: w3-card-2
    else if (clase === "w3-card-2") {
        titulo.textContent = "Ejemplo: w3-card-2";

        contenido.innerHTML = `
            <p>Añade una sombra ligera alrededor del elemento para crear un efecto de tarjeta.</p>

            <div class="w3-container w3-card-2">
                <h3>Tarjeta con sombra ligera</h3>
                <p>Esta tarjeta utiliza la clase w3-card-2.</p>
                <p>Observa cómo la sombra separa visualmente el contenido del fondo.</p>
            </div>

            <p>Esta clase no asigna un color de fondo. El color que ves procede del estilo de la página.</p>
        `;
    }

    // Próximo elemento: w3-card-4
    else if (clase === "w3-card-4") {
        titulo.textContent = "Ejemplo: w3-card-4";

        contenido.innerHTML = `
            <p>Añade una sombra más marcada que w3-card-2 para destacar el elemento.</p>

            <div class="w3-container w3-card-4">
                <h3>Tarjeta con sombra más marcada</h3>
                <p>Esta tarjeta utiliza la clase w3-card-4.</p>
                <p>La sombra más pronunciada ayuda a destacar el bloque de contenido.</p>
            </div>

            <p>Al igual que las otras clases de tarjeta, w3-card-4 no asigna por sí misma un color de fondo.</p>
        `;
    }
// Próximo bloque

    // Próximo elemento: w3-row
    else if (clase === "w3-row") {
        titulo.textContent = "Ejemplo: w3-row";

        contenido.innerHTML = `
            <p>Organiza varios elementos en una fila mediante el sistema de columnas de W3.CSS.</p>

            <div class="w3-row">
                <div class="w3-col s4 w3-blue w3-padding">
                    <p>Columna 1</p>
                </div>
                <div class="w3-col s4 w3-green w3-padding">
                    <p>Columna 2</p>
                </div>
                <div class="w3-col s4 w3-orange w3-padding">
                    <p>Columna 3</p>
                </div>
            </div>

            <p>La clase w3-row contiene las columnas. Las clases s4 hacen que cada una ocupe un tercio del ancho en pantallas pequeñas.</p>
        `;
    }

    // Próximo elemento: w3-row-padding
    else if (clase === "w3-row-padding") {
        titulo.textContent = "Ejemplo: w3-row-padding";

        contenido.innerHTML = `
            <p>Añade separación horizontal entre las columnas de una fila.</p>

            <div class="w3-row-padding">
                <div class="w3-col s4">
                    <div class="w3-blue w3-padding">
                        <p>Columna 1</p>
                    </div>
                </div>
                <div class="w3-col s4">
                    <div class="w3-green w3-padding">
                        <p>Columna 2</p>
                    </div>
                </div>
                <div class="w3-col s4">
                    <div class="w3-orange w3-padding">
                        <p>Columna 3</p>
                    </div>
                </div>
            </div>

            <p>Compara los espacios entre las columnas. w3-row-padding resulta útil para crear diseños con separación sin tener que definir manualmente cada margen.</p>
        `;
    }

    // Próximo elemento: w3-half
    else if (clase === "w3-half") {
        titulo.textContent = "Ejemplo: w3-half";

        contenido.innerHTML = `
            <p>Hace que cada columna ocupe la mitad del ancho disponible.</p>

            <div class="w3-row">
                <div class="w3-half w3-blue w3-padding">
                    <p>Primera mitad: 50 %</p>
                </div>
                <div class="w3-half w3-green w3-padding">
                    <p>Segunda mitad: 50 %</p>
                </div>
            </div>

            <p>Las dos columnas ocupan conjuntamente el 100 % de la fila.</p>
        `;
    }

    // Próximo elemento: w3-third
    else if (clase === "w3-third") {
        titulo.textContent = "Ejemplo: w3-third";

        contenido.innerHTML = `
            <p>Hace que cada columna ocupe un tercio del ancho disponible.</p>

            <div class="w3-row">
                <div class="w3-third w3-blue w3-padding">
                    <p>Columna 1</p>
                    <p>33,33 %</p>
                </div>
                <div class="w3-third w3-green w3-padding">
                    <p>Columna 2</p>
                    <p>33,33 %</p>
                </div>
                <div class="w3-third w3-orange w3-padding">
                    <p>Columna 3</p>
                    <p>33,33 %</p>
                </div>
            </div>

            <p>Tres columnas de un tercio ocupan conjuntamente toda la fila.</p>
        `;
    }

    // Próximo elemento: w3-twothird
    else if (clase === "w3-twothird") {
        titulo.textContent = "Ejemplo: w3-twothird";

        contenido.innerHTML = `
            <p>Hace que una columna ocupe dos tercios del ancho disponible.</p>

            <div class="w3-row">
                <div class="w3-twothird w3-blue w3-padding">
                    <p>Columna principal</p>
                    <p>Dos tercios del ancho</p>
                </div>
                <div class="w3-third w3-green w3-padding">
                    <p>Columna lateral</p>
                    <p>Un tercio del ancho</p>
                </div>
            </div>

            <p>Es útil para combinar una zona de contenido principal con otra más estrecha.</p>
        `;
    }

    // Próximo elemento: w3-quarter
    else if (clase === "w3-quarter") {
        titulo.textContent = "Ejemplo: w3-quarter";

        contenido.innerHTML = `
            <p>Hace que cada columna ocupe una cuarta parte del ancho disponible.</p>

            <div class="w3-row">
                <div class="w3-quarter w3-blue w3-padding">
                    <p>25 %</p>
                </div>
                <div class="w3-quarter w3-green w3-padding">
                    <p>25 %</p>
                </div>
                <div class="w3-quarter w3-orange w3-padding">
                    <p>25 %</p>
                </div>
                <div class="w3-quarter w3-red w3-padding">
                    <p>25 %</p>
                </div>
            </div>

            <p>Cuatro columnas de un cuarto completan el ancho de la fila.</p>
        `;
    }

    // Próximo elemento: w3-threequarter
    else if (clase === "w3-threequarter") {
        titulo.textContent = "Ejemplo: w3-threequarter";

        contenido.innerHTML = `
            <p>Hace que una columna ocupe tres cuartas partes del ancho disponible.</p>

            <div class="w3-row">
                <div class="w3-threequarter w3-blue w3-padding">
                    <p>Contenido principal</p>
                    <p>75 % del ancho</p>
                </div>
                <div class="w3-quarter w3-green w3-padding">
                    <p>Zona lateral</p>
                    <p>25 %</p>
                </div>
            </div>

            <p>Permite combinar una zona amplia con una columna lateral más estrecha.</p>
        `;
    }

    // Próximo elemento: w3-col
    else if (clase === "w3-col") {
        titulo.textContent = "Ejemplo: w3-col";

        contenido.innerHTML = `
            <p>Define una columna dentro de una fila. Se combina con clases de tamaño para establecer su anchura.</p>

            <div class="w3-row">
                <div class="w3-col s4 w3-blue w3-padding">
                    <p>w3-col s4</p>
                    <p>Un tercio</p>
                </div>
                <div class="w3-col s8 w3-green w3-padding">
                    <p>w3-col s8</p>
                    <p>Dos tercios</p>
                </div>
            </div>

            <p>Las clases s4 y s8 determinan las proporciones de las columnas en pantallas pequeñas.</p>
        `;
    }

    // Próximo elemento: w3-rest
    else if (clase === "w3-rest") {
        titulo.textContent = "Ejemplo: w3-rest";

        contenido.innerHTML = `
            <p>Ocupa el espacio horizontal restante después de reservar una anchura para otra columna.</p>

            <div class="w3-row">
                <div class="w3-col" style="width:100px">
                    <div class="w3-blue w3-padding">
                        <p>100 px</p>
                    </div>
                </div>
                <div class="w3-rest">
                    <div class="w3-green w3-padding">
                        <p>w3-rest</p>
                        <p>Esta zona ocupa el espacio restante.</p>
                    </div>
                </div>
            </div>

            <p>La primera columna tiene una anchura fija y w3-rest utiliza el espacio horizontal disponible. Si el espacio es insuficiente, el diseño puede necesitar ajustes para evitar desbordamientos.</p>
        `;
    }

    // Próximo elemento: l1-l12
    else if (clase === "l1-l12") {
        titulo.textContent = "Ejemplo: l1-l12";

        contenido.innerHTML = `
            <p>Las clases l1 a l12 establecen el ancho de las columnas en pantallas grandes. El número indica cuántas de las doce partes ocupa cada columna.</p>

            <div class="w3-row">
                <div class="w3-col l3 w3-blue w3-padding">
                    <p>l3</p>
                    <p>25 %</p>
                </div>
                <div class="w3-col l6 w3-green w3-padding">
                    <p>l6</p>
                    <p>50 %</p>
                </div>
                <div class="w3-col l3 w3-orange w3-padding">
                    <p>l3</p>
                    <p>25 %</p>
                </div>
            </div>

            <p>En pantallas grandes, las columnas ocupan 3 + 6 + 3 = 12 partes. En pantallas medianas o pequeñas, estas clases por sí solas no definen el ancho, por lo que el diseño puede cambiar.</p>
        `;
    }

    // Próximo elemento: m1-m12
    else if (clase === "m1-m12") {
        titulo.textContent = "Ejemplo: m1-m12";

        contenido.innerHTML = `
            <p>Las clases m1 a m12 establecen el ancho de las columnas en pantallas medianas.</p>

            <div class="w3-row">
                <div class="w3-col m4 w3-blue w3-padding">
                    <p>m4</p>
                    <p>Un tercio</p>
                </div>
                <div class="w3-col m4 w3-green w3-padding">
                    <p>m4</p>
                    <p>Un tercio</p>
                </div>
                <div class="w3-col m4 w3-orange w3-padding">
                    <p>m4</p>
                    <p>Un tercio</p>
                </div>
            </div>

            <p>En pantallas medianas, cada columna ocupa cuatro de las doce partes disponibles. En otros tamaños de pantalla, el comportamiento puede variar.</p>
        `;
    }

    // Próximo elemento: s1-s12
    else if (clase === "s1-s12") {
        titulo.textContent = "Ejemplo: s1-s12";

        contenido.innerHTML = `
            <p>Las clases s1 a s12 establecen el ancho de las columnas en pantallas pequeñas.</p>

            <div class="w3-row">
                <div class="w3-col s6 w3-blue w3-padding">
                    <p>s6</p>
                    <p>50 %</p>
                </div>
                <div class="w3-col s6 w3-green w3-padding">
                    <p>s6</p>
                    <p>50 %</p>
                </div>
            </div>

            <p>En pantallas pequeñas, cada columna ocupa seis de las doce partes disponibles. Las clases de tamaño m y l permiten definir otras proporciones para pantallas medianas y grandes.</p>
        `;
    }

    // Próximo elemento: w3-hide-small
    else if (clase === "w3-hide-small") {
        titulo.textContent = "Ejemplo: w3-hide-small";

        contenido.innerHTML = `
            <p>Oculta el elemento cuando la pantalla tiene un ancho inferior a 601 píxeles.</p>

            <div class="w3-container w3-blue w3-padding">
                <p>Este bloque siempre está visible.</p>
            </div>

            <div class="w3-container w3-orange w3-padding w3-hide-small">
                <p>Este bloque desaparece en pantallas pequeñas.</p>
            </div>

            <p>Amplía o reduce el ancho de la ventana para comprobar cómo cambia la visibilidad del segundo bloque.</p>
        `;
    }

    // Próximo elemento: w3-hide-medium
    else if (clase === "w3-hide-medium") {
        titulo.textContent = "Ejemplo: w3-hide-medium";

        contenido.innerHTML = `
            <p>Oculta el elemento en pantallas medianas, normalmente entre 601 y 992 píxeles de ancho.</p>

            <div class="w3-container w3-blue w3-padding">
                <p>Este bloque siempre está visible.</p>
            </div>

            <div class="w3-container w3-green w3-padding w3-hide-medium">
                <p>Este bloque se oculta en pantallas medianas.</p>
            </div>

            <p>Redimensiona la ventana para observar el comportamiento en los distintos tamaños de pantalla.</p>
        `;
    }

    // Próximo elemento: w3-hide-large
    else if (clase === "w3-hide-large") {
        titulo.textContent = "Ejemplo: w3-hide-large";

        contenido.innerHTML = `
            <p>Oculta el elemento en pantallas grandes, normalmente con un ancho superior a 992 píxeles.</p>

            <div class="w3-container w3-blue w3-padding">
                <p>Este bloque siempre está visible.</p>
            </div>

            <div class="w3-container w3-red w3-padding w3-hide-large">
                <p>Este bloque desaparece en pantallas grandes.</p>
            </div>

            <p>Amplía la ventana para comprobar cómo se oculta el segundo bloque al alcanzar el rango de pantalla grande.</p>
        `;
    }

    // Próximo elemento: w3-image
    else if (clase === "w3-image") {
        titulo.textContent = "Ejemplo: w3-image";

        contenido.innerHTML = `
            <p>Hace que una imagen se adapte al ancho del contenedor sin superar su tamaño original.</p>

            <div class="w3-container">
                <img
                    class="w3-image"
                    src="img/img_lights.jpg"
                    alt="Luces de una ciudad por la noche">
            </div>

            <p>La imagen se ajusta al espacio disponible. Necesita que la dirección de la imagen sea accesible para que se muestre.</p>
        `;
    }

    // Próximo elemento: w3-mobile
    else if (clase === "w3-mobile") {
        titulo.textContent = "Ejemplo: w3-mobile";

        contenido.innerHTML = `
            <p>Hace que determinados elementos se comporten como bloques en pantallas pequeñas, facilitando su uso en dispositivos móviles.</p>

            <div class="w3-bar w3-light-grey">
                <a href="#responsive" class="w3-bar-item w3-button w3-mobile">Inicio</a>
                <a href="#responsive" class="w3-bar-item w3-button w3-mobile">Servicios</a>
                <a href="#responsive" class="w3-bar-item w3-button w3-mobile">Contacto</a>
            </div>

            <p>Prueba a reducir el ancho de la ventana. En pantallas pequeñas, los elementos w3-mobile se muestran como bloques y pueden ocupar líneas separadas.</p>
        `;
    }
// Próximo bloque 5

    // Próximo elemento: w3-flex
    else if (clase === "w3-flex") {
        titulo.textContent = "Ejemplo: w3-flex";

        contenido.innerHTML = `
            <p>Convierte el contenedor en un contenedor Flexbox para distribuir sus elementos en una dimensión.</p>

            <div class="w3-flex">
                <div class="w3-blue w3-padding">Elemento 1</div>
                <div class="w3-green w3-padding">Elemento 2</div>
                <div class="w3-orange w3-padding">Elemento 3</div>
            </div>

            <p>Los elementos se distribuyen en una fila según las reglas Flexbox definidas en tu CSS.</p>
        `;
    }

    // Próximo elemento: w3-flex-wrap
    else if (clase === "w3-flex-wrap") {
        titulo.textContent = "Ejemplo: w3-flex-wrap";

        contenido.innerHTML = `
            <p>Permite que los elementos pasen a una nueva línea cuando no hay espacio suficiente.</p>

            <div class="w3-flex w3-flex-wrap">
                <div class="w3-blue w3-padding">Elemento 1</div>
                <div class="w3-green w3-padding">Elemento 2</div>
                <div class="w3-orange w3-padding">Elemento 3</div>
                <div class="w3-red w3-padding">Elemento 4</div>
                <div class="w3-purple w3-padding">Elemento 5</div>
                <div class="w3-teal w3-padding">Elemento 6</div>
            </div>

            <p>Reduce el espacio disponible para observar cómo los elementos saltan a otras líneas.</p>
        `;
    }

    // Próximo elemento: w3-flex-column
    else if (clase === "w3-flex-column") {
        titulo.textContent = "Ejemplo: w3-flex-column";

        contenido.innerHTML = `
            <p>Organiza los elementos verticalmente, uno debajo del otro.</p>

            <div class="w3-flex w3-flex-column">
                <div class="w3-blue w3-padding">Primer elemento</div>
                <div class="w3-green w3-padding">Segundo elemento</div>
                <div class="w3-orange w3-padding">Tercer elemento</div>
            </div>

            <p>La dirección principal de Flexbox es vertical.</p>
        `;
    }

    // Próximo elemento: w3-flex-start
    else if (clase === "w3-flex-start") {
        titulo.textContent = "Ejemplo: w3-flex-start";

        contenido.innerHTML = `
            <p>Alinea los elementos al inicio del eje principal.</p>

            <div class="w3-flex w3-flex-start w3-light-grey" style="min-height:100px">
                <div class="w3-blue w3-padding">Uno</div>
                <div class="w3-green w3-padding">Dos</div>
                <div class="w3-orange w3-padding">Tres</div>
            </div>

            <p>En una fila, el inicio suele estar en el lado izquierdo.</p>
        `;
    }

    // Próximo elemento: w3-flex-center
    else if (clase === "w3-flex-center") {
        titulo.textContent = "Ejemplo: w3-flex-center";

        contenido.innerHTML = `
            <p>Centra los elementos en el eje principal.</p>

            <div class="w3-flex w3-flex-center w3-light-grey" style="min-height:100px">
                <div class="w3-blue w3-padding">Uno</div>
                <div class="w3-green w3-padding">Dos</div>
                <div class="w3-orange w3-padding">Tres</div>
            </div>

            <p>Observa cómo el conjunto de elementos queda centrado horizontalmente en una fila.</p>
        `;
    }

    // Próximo elemento: w3-flex-end
    else if (clase === "w3-flex-end") {
        titulo.textContent = "Ejemplo: w3-flex-end";

        contenido.innerHTML = `
            <p>Alinea los elementos al final del eje principal.</p>

            <div class="w3-flex w3-flex-end w3-light-grey" style="min-height:100px">
                <div class="w3-blue w3-padding">Uno</div>
                <div class="w3-green w3-padding">Dos</div>
                <div class="w3-orange w3-padding">Tres</div>
            </div>

            <p>En una fila, los elementos se agrupan normalmente hacia la derecha.</p>
        `;
    }

    // Próximo elemento: w3-flex-between
    else if (clase === "w3-flex-between") {
        titulo.textContent = "Ejemplo: w3-flex-between";

        contenido.innerHTML = `
            <p>Distribuye el espacio libre entre los elementos, sin dejar espacio adicional en los extremos.</p>

            <div class="w3-flex w3-flex-between w3-light-grey" style="min-height:80px">
                <div class="w3-blue w3-padding">Uno</div>
                <div class="w3-green w3-padding">Dos</div>
                <div class="w3-orange w3-padding">Tres</div>
            </div>

            <p>El primer elemento queda al inicio y el último al final.</p>
        `;
    }

    // Próximo elemento: w3-flex-around
    else if (clase === "w3-flex-around") {
        titulo.textContent = "Ejemplo: w3-flex-around";

        contenido.innerHTML = `
            <p>Distribuye espacio alrededor de cada elemento.</p>

            <div class="w3-flex w3-flex-around w3-light-grey" style="min-height:80px">
                <div class="w3-blue w3-padding">Uno</div>
                <div class="w3-green w3-padding">Dos</div>
                <div class="w3-orange w3-padding">Tres</div>
            </div>

            <p>El espacio libre se reparte alrededor de cada elemento, incluidos los extremos del contenedor.</p>
        `;
    }

    // Próximo elemento: w3-flex-evenly
    else if (clase === "w3-flex-evenly") {
        titulo.textContent = "Ejemplo: w3-flex-evenly";

        contenido.innerHTML = `
            <p>Distribuye el espacio de manera uniforme entre los elementos y los extremos.</p>

            <div class="w3-flex w3-flex-evenly w3-light-grey" style="min-height:80px">
                <div class="w3-blue w3-padding">Uno</div>
                <div class="w3-green w3-padding">Dos</div>
                <div class="w3-orange w3-padding">Tres</div>
            </div>

            <p>Los espacios entre los elementos y los bordes tienen el mismo tamaño.</p>
        `;
    }

    // Próximo elemento: w3-flex-align-start
    else if (clase === "w3-flex-align-start") {
        titulo.textContent = "Ejemplo: w3-flex-align-start";

        contenido.innerHTML = `
            <p>Alinea los elementos al inicio del eje transversal.</p>

            <div class="w3-flex w3-flex-align-start w3-light-grey" style="height:150px">
                <div class="w3-blue w3-padding">Bajo</div>
                <div class="w3-green w3-padding">Medio</div>
                <div class="w3-orange w3-padding">Alto</div>
            </div>

            <p>En una fila horizontal, el eje transversal es vertical y el inicio suele ser la parte superior.</p>
        `;
    }

    // Próximo elemento: w3-flex-align-center
    else if (clase === "w3-flex-align-center") {
        titulo.textContent = "Ejemplo: w3-flex-align-center";

        contenido.innerHTML = `
            <p>Centra los elementos en el eje transversal.</p>

            <div class="w3-flex w3-flex-align-center w3-light-grey" style="height:150px">
                <div class="w3-blue w3-padding">Bajo</div>
                <div class="w3-green w3-padding">Medio</div>
                <div class="w3-orange w3-padding">Alto</div>
            </div>

            <p>En una fila, los elementos quedan centrados verticalmente dentro del contenedor.</p>
        `;
    }

    // Próximo elemento: w3-flex-align-end
    else if (clase === "w3-flex-align-end") {
        titulo.textContent = "Ejemplo: w3-flex-align-end";

        contenido.innerHTML = `
            <p>Alinea los elementos al final del eje transversal.</p>

            <div class="w3-flex w3-flex-align-end w3-light-grey" style="height:150px">
                <div class="w3-blue w3-padding">Bajo</div>
                <div class="w3-green w3-padding">Medio</div>
                <div class="w3-orange w3-padding">Alto</div>
            </div>

            <p>En una fila, los elementos quedan alineados hacia la parte inferior.</p>
        `;
    }

    // Próximo elemento: w3-flex-align-stretch
    else if (clase === "w3-flex-align-stretch") {
        titulo.textContent = "Ejemplo: w3-flex-align-stretch";

        contenido.innerHTML = `
            <p>Estira los elementos para ocupar el espacio disponible en el eje transversal.</p>

            <div class="w3-flex w3-flex-align-stretch w3-light-grey" style="height:150px">
                <div class="w3-blue w3-padding">Elemento 1</div>
                <div class="w3-green w3-padding">Elemento 2</div>
                <div class="w3-orange w3-padding">Elemento 3</div>
            </div>

            <p>En una fila, los elementos pueden extenderse verticalmente para ocupar la altura disponible.</p>
        `;
    }

    // Próximo elemento: w3-flex-1
    else if (clase === "w3-flex-1") {
        titulo.textContent = "Ejemplo: w3-flex-1";

        contenido.innerHTML = `
            <p>Permite que un elemento crezca y se encoja para aprovechar el espacio disponible, con una base flexible de cero.</p>

            <div class="w3-flex">
                <div class="w3-blue w3-padding" style="flex:1">flex: 1</div>
                <div class="w3-green w3-padding" style="flex:1">flex: 1</div>
                <div class="w3-orange w3-padding" style="flex:1">flex: 1</div>
            </div>

            <p>Para que el ejemplo funcione aunque la clase personalizada no esté definida, los elementos incluyen flex: 1 como estilo directo.</p>
        `;
    }

    // Próximo elemento: w3-flex-auto
    else if (clase === "w3-flex-auto") {
        titulo.textContent = "Ejemplo: w3-flex-auto";

        contenido.innerHTML = `
            <p>Permite que un elemento flexible crezca o se encoja teniendo en cuenta su tamaño inicial.</p>

            <div class="w3-flex">
                <div class="w3-blue w3-padding" style="flex:0 1 auto">Texto corto</div>
                <div class="w3-green w3-padding" style="flex:0 1 auto">Este elemento tiene un contenido más largo</div>
                <div class="w3-orange w3-padding" style="flex:0 1 auto">Texto medio</div>
            </div>

            <p>Con flex-basis: auto, el tamaño inicial tiene en cuenta el contenido o el tamaño establecido para cada elemento.</p>
        `;
    }

    // Próximo elemento: w3-flex-none
    else if (clase === "w3-flex-none") {
        titulo.textContent = "Ejemplo: w3-flex-none";

        contenido.innerHTML = `
            <p>Evita que el elemento crezca o se encoja dentro del contenedor flexible.</p>

            <div class="w3-flex">
                <div class="w3-blue w3-padding" style="flex:none">Tamaño propio</div>
                <div class="w3-green w3-padding" style="flex:1">Elemento flexible que ocupa el espacio restante</div>
            </div>

            <p>El primer elemento conserva su tamaño base, mientras que el segundo crece para ocupar el espacio libre.</p>
        `;
    }

    // Próximo elemento: w3-flex-shrink-0
    else if (clase === "w3-flex-shrink-0") {
        titulo.textContent = "Ejemplo: w3-flex-shrink-0";

        contenido.innerHTML = `
            <p>Impide que un elemento se encoja cuando el espacio disponible es limitado.</p>

            <div class="w3-flex" style="width:100%; overflow-x:auto">
                <div class="w3-blue w3-padding" style="width:220px; flex-shrink:0">
                    <p>No se encoge</p>
                    <p>220 px</p>
                </div>
                <div class="w3-green w3-padding" style="width:220px; flex-shrink:1">
                    <p>Puede encogerse</p>
                    <p>220 px de base</p>
                </div>
            </div>

            <p>Si el contenedor es demasiado estrecho, el primer elemento mantiene su anchura y puede aparecer desplazamiento horizontal.</p>
        `;
    }

    // Próximo elemento: w3-flex-spacer
    else if (clase === "w3-flex-spacer") {
        titulo.textContent = "Ejemplo: w3-flex-spacer";

        contenido.innerHTML = `
            <p>Un separador flexible puede usar un margen automático para empujar los elementos siguientes hacia el extremo opuesto.</p>

            <div class="w3-flex w3-light-grey">
                <div class="w3-blue w3-padding">Inicio</div>
                <div class="w3-flex-spacer" style="margin-left:auto"></div>
                <div class="w3-green w3-padding">Final</div>
            </div>

            <p>El margen automático consume el espacio libre entre ambos elementos y separa el contenido de los extremos.</p>
        `;
    }
// Próximo bloque 6

    // Próximo elemento: w3-grid
    else if (clase === "w3-grid") {
        titulo.textContent = "w3-grid";
        contenido.innerHTML = `
            <p>Contenedor Grid con dos filas y tres columnas.</p>
            <div class="w3-grid" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px;">
                <div style="background:#2196F3; color:white; padding:16px; text-align:center;">1</div>
                <div style="background:#2196F3; color:white; padding:16px; text-align:center;">2</div>
                <div style="background:#2196F3; color:white; padding:16px; text-align:center;">3</div>
                <div style="background:#2196F3; color:white; padding:16px; text-align:center;">4</div>
                <div style="background:#2196F3; color:white; padding:16px; text-align:center;">5</div>
                <div style="background:#2196F3; color:white; padding:16px; text-align:center;">6</div>
            </div>`;
    }

    // Próximo elemento: w3-grid-padding
    else if (clase === "w3-grid-padding") {
        titulo.textContent = "w3-grid-padding";
        contenido.innerHTML = `
            <p>Grid con separación de 16 px entre filas y columnas.</p>
            <div class="w3-grid-padding" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">
                <div style="background:#009688; color:white; padding:16px; text-align:center;">1</div>
                <div style="background:#009688; color:white; padding:16px; text-align:center;">2</div>
                <div style="background:#009688; color:white; padding:16px; text-align:center;">3</div>
                <div style="background:#009688; color:white; padding:16px; text-align:center;">4</div>
                <div style="background:#009688; color:white; padding:16px; text-align:center;">5</div>
                <div style="background:#009688; color:white; padding:16px; text-align:center;">6</div>
            </div>`;
    }

    // Próximo elemento: w3-grid-2
    else if (clase === "w3-grid-2") {
        titulo.textContent = "w3-grid-2";
        contenido.innerHTML = `
            <p>Dos columnas iguales que mantienen su distribución en pantallas estrechas.</p>
            <div class="w3-grid-2" style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px;">
                <div style="background:#3F51B5; color:white; padding:20px; text-align:center;">Columna 1</div>
                <div style="background:#3F51B5; color:white; padding:20px; text-align:center;">Columna 2</div>
            </div>`;
    }

    // Próximo elemento: w3-grid-3
    else if (clase === "w3-grid-3") {
        titulo.textContent = "w3-grid-3";
        contenido.innerHTML = `
            <p>Tres columnas de igual anchura.</p>
            <div class="w3-grid-3" style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:8px;">
                <div style="background:#4CAF50; color:white; padding:16px; text-align:center;">1</div>
                <div style="background:#4CAF50; color:white; padding:16px; text-align:center;">2</div>
                <div style="background:#4CAF50; color:white; padding:16px; text-align:center;">3</div>
            </div>`;
    }

    // Próximo elemento: w3-grid-4
    else if (clase === "w3-grid-4") {
        titulo.textContent = "w3-grid-4";
        contenido.innerHTML = `
            <p>Cuatro columnas de igual anchura.</p>
            <div class="w3-grid-4" style="display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:8px;">
                <div style="background:#FF9800; color:white; padding:16px 4px; text-align:center;">1</div>
                <div style="background:#FF9800; color:white; padding:16px 4px; text-align:center;">2</div>
                <div style="background:#FF9800; color:white; padding:16px 4px; text-align:center;">3</div>
                <div style="background:#FF9800; color:white; padding:16px 4px; text-align:center;">4</div>
            </div>`;
    }

    // Próximo elemento: w3-grid-auto-xsmall
    else if (clase === "w3-grid-auto-xsmall") {
        titulo.textContent = "w3-grid-auto-xsmall";
        contenido.innerHTML = `
            <p>Columnas automáticas con un mínimo de 150 px.</p>
            <div class="w3-grid-auto-xsmall" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(150px, 100%), 1fr)); gap:8px;">
                <div style="background:#607D8B; color:white; padding:20px; text-align:center;">Elemento 1</div>
                <div style="background:#607D8B; color:white; padding:20px; text-align:center;">Elemento 2</div>
                <div style="background:#607D8B; color:white; padding:20px; text-align:center;">Elemento 3</div>
                <div style="background:#607D8B; color:white; padding:20px; text-align:center;">Elemento 4</div>
            </div>`;
    }

    // Próximo elemento: w3-grid-auto-small
    else if (clase === "w3-grid-auto-small") {
        titulo.textContent = "w3-grid-auto-small";
        contenido.innerHTML = `
            <p>Columnas automáticas con un mínimo de 200 px.</p>
            <div class="w3-grid-auto-small" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(200px, 100%), 1fr)); gap:8px;">
                <div style="background:#795548; color:white; padding:20px; text-align:center;">Elemento 1</div>
                <div style="background:#795548; color:white; padding:20px; text-align:center;">Elemento 2</div>
                <div style="background:#795548; color:white; padding:20px; text-align:center;">Elemento 3</div>
                <div style="background:#795548; color:white; padding:20px; text-align:center;">Elemento 4</div>
            </div>`;
    }

    // Próximo elemento: w3-grid-auto
    else if (clase === "w3-grid-auto") {
        titulo.textContent = "w3-grid-auto";
        contenido.innerHTML = `
            <p>Columnas automáticas con un mínimo de 250 px.</p>
            <div class="w3-grid-auto" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(250px, 100%), 1fr)); gap:8px;">
                <div style="background:#009688; color:white; padding:20px; text-align:center;">Elemento 1</div>
                <div style="background:#009688; color:white; padding:20px; text-align:center;">Elemento 2</div>
                <div style="background:#009688; color:white; padding:20px; text-align:center;">Elemento 3</div>
                <div style="background:#009688; color:white; padding:20px; text-align:center;">Elemento 4</div>
            </div>`;
    }

    // Próximo elemento: w3-grid-auto-large
    else if (clase === "w3-grid-auto-large") {
        titulo.textContent = "w3-grid-auto-large";
        contenido.innerHTML = `
            <p>Columnas automáticas con un mínimo de 300 px.</p>
            <div class="w3-grid-auto-large" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(300px, 100%), 1fr)); gap:8px;">
                <div style="background:#E91E63; color:white; padding:20px; text-align:center;">Elemento 1</div>
                <div style="background:#E91E63; color:white; padding:20px; text-align:center;">Elemento 2</div>
                <div style="background:#E91E63; color:white; padding:20px; text-align:center;">Elemento 3</div>
            </div>`;
    }

    // Próximo elemento: w3-grid-auto-xlarge
    else if (clase === "w3-grid-auto-xlarge") {
        titulo.textContent = "w3-grid-auto-xlarge";
        contenido.innerHTML = `
            <p>Columnas automáticas con un mínimo de 350 px.</p>
            <div class="w3-grid-auto-xlarge" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(min(350px, 100%), 1fr)); gap:8px;">
                <div style="background:#673AB7; color:white; padding:20px; text-align:center;">Elemento 1</div>
                <div style="background:#673AB7; color:white; padding:20px; text-align:center;">Elemento 2</div>
                <div style="background:#673AB7; color:white; padding:20px; text-align:center;">Elemento 3</div>
            </div>`;
    }

    // Próximo elemento: w3-grid-span-2
    else if (clase === "w3-grid-span-2") {
        titulo.textContent = "w3-grid-span-2";
        contenido.innerHTML = `
            <p>El elemento destacado ocupa dos columnas.</p>
            <div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:8px;">
                <div style="background:#607D8B; color:white; padding:16px; text-align:center;">1</div>
                <div class="w3-grid-span-2" style="grid-column:span 2; background:#2196F3; color:white; padding:16px; text-align:center;">Ocupa 2 columnas</div>
                <div style="background:#607D8B; color:white; padding:16px; text-align:center;">3</div>
                <div style="background:#607D8B; color:white; padding:16px; text-align:center;">4</div>
            </div>`;
    }

    // Próximo elemento: w3-grid-span-3
    else if (clase === "w3-grid-span-3") {
        titulo.textContent = "w3-grid-span-3";
        contenido.innerHTML = `
            <p>El elemento destacado ocupa tres columnas.</p>
            <div style="display:grid; grid-template-columns:repeat(4, minmax(0, 1fr)); gap:8px;">
                <div style="background:#607D8B; color:white; padding:16px 4px; text-align:center;">1</div>
                <div class="w3-grid-span-3" style="grid-column:span 3; background:#009688; color:white; padding:16px 4px; text-align:center;">Ocupa 3 columnas</div>
                <div style="background:#607D8B; color:white; padding:16px 4px; text-align:center;">3</div>
                <div style="background:#607D8B; color:white; padding:16px 4px; text-align:center;">4</div>
            </div>`;
    }

    // Próximo elemento: w3-grid-span-all
    else if (clase === "w3-grid-span-all") {
        titulo.textContent = "w3-grid-span-all";
        contenido.innerHTML = `
            <p>El elemento destacado ocupa toda la anchura de la cuadrícula.</p>
            <div class="w3-grid-span-all" style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:8px;">
                <div style="background:#607D8B; color:white; padding:16px; text-align:center;">Columna 1</div>
                <div style="background:#607D8B; color:white; padding:16px; text-align:center;">Columna 2</div>
                <div style="background:#607D8B; color:white; padding:16px; text-align:center;">Columna 3</div>
                <div style="grid-column:1 / -1; background:#FF9800; color:white; padding:16px; text-align:center;">Ocupa todas las columnas</div>
            </div>`;
    }
// Próximo bloque 7

    // Próximo elemento: w3-gap-small
    else if (clase === "w3-gap-small") {
        titulo.textContent = "w3-gap-small";
        contenido.innerHTML = `
            <p>Establece una separación pequeña de 8 px entre filas y columnas.</p>
            <div class="w3-gap-small" style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:8px;">
                <div style="background:#2196F3; color:white; padding:16px; text-align:center;">1</div>
                <div style="background:#2196F3; color:white; padding:16px; text-align:center;">2</div>
                <div style="background:#2196F3; color:white; padding:16px; text-align:center;">3</div>
                <div style="background:#2196F3; color:white; padding:16px; text-align:center;">4</div>
                <div style="background:#2196F3; color:white; padding:16px; text-align:center;">5</div>
                <div style="background:#2196F3; color:white; padding:16px; text-align:center;">6</div>
            </div>`;
    }

    // Próximo elemento: w3-gap
    else if (clase === "w3-gap") {
        titulo.textContent = "w3-gap";
        contenido.innerHTML = `
            <p>Establece una separación de 16 px entre filas y columnas.</p>
            <div class="w3-gap" style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:16px;">
                <div style="background:#009688; color:white; padding:16px; text-align:center;">1</div>
                <div style="background:#009688; color:white; padding:16px; text-align:center;">2</div>
                <div style="background:#009688; color:white; padding:16px; text-align:center;">3</div>
                <div style="background:#009688; color:white; padding:16px; text-align:center;">4</div>
                <div style="background:#009688; color:white; padding:16px; text-align:center;">5</div>
                <div style="background:#009688; color:white; padding:16px; text-align:center;">6</div>
            </div>`;
    }

    // Próximo elemento: w3-gap-large
    else if (clase === "w3-gap-large") {
        titulo.textContent = "w3-gap-large";
        contenido.innerHTML = `
            <p>Establece una separación amplia de 24 px entre filas y columnas.</p>
            <div class="w3-gap-large" style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:24px;">
                <div style="background:#FF9800; color:white; padding:16px; text-align:center;">1</div>
                <div style="background:#FF9800; color:white; padding:16px; text-align:center;">2</div>
                <div style="background:#FF9800; color:white; padding:16px; text-align:center;">3</div>
                <div style="background:#FF9800; color:white; padding:16px; text-align:center;">4</div>
                <div style="background:#FF9800; color:white; padding:16px; text-align:center;">5</div>
                <div style="background:#FF9800; color:white; padding:16px; text-align:center;">6</div>
            </div>`;
    }
// Próximo bloque 8

    // Próximo elemento: w3-cell-row
    else if (clase === "w3-cell-row") {
        titulo.textContent = "w3-cell-row";
        contenido.innerHTML = `
            <p>Contenedor que organiza varias celdas en una misma fila.</p>
            <div class="w3-cell-row" style="display:table; width:100%; table-layout:fixed; border-spacing:6px;">
                <div class="w3-cell" style="display:table-cell; background:#2196F3; color:white; padding:20px; text-align:center;">
                    Columna 1
                </div>
                <div class="w3-cell" style="display:table-cell; background:#009688; color:white; padding:20px; text-align:center;">
                    Columna 2
                </div>
                <div class="w3-cell" style="display:table-cell; background:#FF9800; color:white; padding:20px; text-align:center;">
                    Columna 3
                </div>
            </div>`;
    }

    // Próximo elemento: w3-cell
    else if (clase === "w3-cell") {
        titulo.textContent = "w3-cell";
        contenido.innerHTML = `
            <p>Una celda que ocupa parte del espacio disponible en una fila.</p>
            <div style="display:table; width:100%; table-layout:fixed; border-spacing:6px;">
                <div class="w3-cell" style="display:table-cell; background:#607D8B; color:white; padding:20px; text-align:center;">
                    Celda A
                </div>
                <div class="w3-cell" style="display:table-cell; background:#607D8B; color:white; padding:20px; text-align:center;">
                    Celda B
                </div>
            </div>
            <p>Ambas celdas comparten el ancho de la fila.</p>`;
    }

    // Próximo elemento: w3-cell-top
    else if (clase === "w3-cell-top") {
        titulo.textContent = "w3-cell-top";
        contenido.innerHTML = `
            <p>Alinea el contenido de la celda en la parte superior.</p>
            <div style="display:table; width:100%; table-layout:fixed; border-spacing:6px;">
                <div class="w3-cell-top" style="display:table-cell; vertical-align:top; background:#2196F3; color:white; padding:12px; height:120px;">
                    <strong>Alineación superior</strong>
                    <p>El contenido comienza arriba.</p>
                </div>
                <div style="display:table-cell; vertical-align:middle; background:#607D8B; color:white; padding:12px;">
                    Contenido centrado
                </div>
            </div>`;
    }

    // Próximo elemento: w3-cell-middle
    else if (clase === "w3-cell-middle") {
        titulo.textContent = "w3-cell-middle";
        contenido.innerHTML = `
            <p>Alinea verticalmente el contenido en el centro de la celda.</p>
            <div style="display:table; width:100%; table-layout:fixed; border-spacing:6px;">
                <div class="w3-cell-middle" style="display:table-cell; vertical-align:middle; background:#009688; color:white; padding:12px; height:140px;">
                    <strong>Alineación central</strong>
                    <p>El contenido queda en medio.</p>
                </div>
                <div style="display:table-cell; vertical-align:top; background:#607D8B; color:white; padding:12px;">
                    Contenido arriba
                </div>
            </div>`;
    }

    // Próximo elemento: w3-cell-bottom
    else if (clase === "w3-cell-bottom") {
        titulo.textContent = "w3-cell-bottom";
        contenido.innerHTML = `
            <p>Alinea el contenido de la celda en la parte inferior.</p>
            <div style="display:table; width:100%; table-layout:fixed; border-spacing:6px;">
                <div class="w3-cell-bottom" style="display:table-cell; vertical-align:bottom; background:#FF9800; color:white; padding:12px; height:140px;">
                    <strong>Alineación inferior</strong>
                    <p>El contenido queda abajo.</p>
                </div>
                <div style="display:table-cell; vertical-align:top; background:#607D8B; color:white; padding:12px;">
                    Contenido arriba
                </div>
            </div>`;
    }
// Próximo bloque 9

    // Próximo elemento: w3-bar
    else if (clase === "w3-bar") {
        titulo.textContent = "w3-bar";
        contenido.innerHTML = `
            <p>Crea una barra horizontal para organizar enlaces o controles de navegación.</p>
            <div class="w3-bar" style="background:#2196F3; color:white; overflow:hidden;">
                <a href="#inicio" class="w3-bar-item" style="display:inline-block; padding:12px 16px; color:white; text-decoration:none;">Inicio</a>
                <a href="#servicios" class="w3-bar-item" style="display:inline-block; padding:12px 16px; color:white; text-decoration:none;">Servicios</a>
                <a href="#contacto" class="w3-bar-item" style="display:inline-block; padding:12px 16px; color:white; text-decoration:none;">Contacto</a>
            </div>
            <p>Los elementos se distribuyen horizontalmente dentro de la barra.</p>`;
    }

    // Próximo elemento: w3-bar-block
    else if (clase === "w3-bar-block") {
        titulo.textContent = "w3-bar-block";
        contenido.innerHTML = `
            <p>Organiza los elementos de navegación verticalmente.</p>
            <div class="w3-bar-block" style="width:220px; max-width:100%; background:#f1f1f1; border:1px solid #ddd;">
                <a href="#inicio" class="w3-bar-item" style="display:block; padding:12px 16px; color:#222; text-decoration:none;">Inicio</a>
                <a href="#servicios" class="w3-bar-item" style="display:block; padding:12px 16px; color:#222; text-decoration:none; border-top:1px solid #ddd;">Servicios</a>
                <a href="#contacto" class="w3-bar-item" style="display:block; padding:12px 16px; color:#222; text-decoration:none; border-top:1px solid #ddd;">Contacto</a>
            </div>
            <p>Observa cómo cada enlace ocupa su propia fila.</p>`;
    }

    // Próximo elemento: w3-bar-item
    else if (clase === "w3-bar-item") {
        titulo.textContent = "w3-bar-item";
        contenido.innerHTML = `
            <p>Aplica un estilo común a los elementos de una barra.</p>
            <div style="background:#607D8B; color:white; padding:6px;">
                <a href="#uno" class="w3-bar-item" style="display:inline-block; padding:12px 16px; color:white; text-decoration:none;">Elemento 1</a>
                <a href="#dos" class="w3-bar-item" style="display:inline-block; padding:12px 16px; color:white; text-decoration:none;">Elemento 2</a>
                <a href="#tres" class="w3-bar-item" style="display:inline-block; padding:12px 16px; color:white; text-decoration:none;">Elemento 3</a>
            </div>
            <p>La clase identifica los elementos; su disposición depende también del contenedor y de los estilos aplicados.</p>`;
    }

    // Próximo elemento: w3-sidebar
    else if (clase === "w3-sidebar") {
        titulo.textContent = "w3-sidebar";
        contenido.innerHTML = `
            <p>Crea una barra lateral para la navegación.</p>
            <div style="display:flex; min-height:190px; border:1px solid #ddd;">
                <nav class="w3-sidebar" style="width:130px; flex-shrink:0; background:#f1f1f1;">
                    <div style="padding:12px; background:#607D8B; color:white; font-weight:bold;">Mi menú</div>
                    <a href="#inicio" class="w3-bar-item" style="display:block; padding:10px; color:#222; text-decoration:none;">Inicio</a>
                    <a href="#servicios" class="w3-bar-item" style="display:block; padding:10px; color:#222; text-decoration:none;">Servicios</a>
                    <a href="#contacto" class="w3-bar-item" style="display:block; padding:10px; color:#222; text-decoration:none;">Contacto</a>
                </nav>
                <div style="padding:16px; flex:1; min-width:0;">
                    <strong>Contenido principal</strong>
                    <p>Esta zona aparece junto a la barra lateral.</p>
                </div>
            </div>
            <p>Una barra lateral puede superponerse al contenido o dejar espacio a su lado, según cómo se configure.</p>`;
    }

    // Próximo elemento: w3-collapse
    else if (clase === "w3-collapse") {
        titulo.textContent = "w3-collapse";
        contenido.innerHTML = `
            <p>Se combina con w3-sidebar para adaptar la navegación lateral a diferentes tamaños de pantalla.</p>
            <div style="display:flex; min-height:180px; border:1px solid #ddd;">
                <nav class="w3-sidebar w3-collapse" style="width:130px; flex-shrink:0; background:#f1f1f1;">
                    <div style="padding:12px; background:#009688; color:white; font-weight:bold;">Mi menú</div>
                    <a href="#inicio" class="w3-bar-item" style="display:block; padding:10px; color:#222; text-decoration:none;">Inicio</a>
                    <a href="#servicios" class="w3-bar-item" style="display:block; padding:10px; color:#222; text-decoration:none;">Servicios</a>
                </nav>
                <main class="w3-main" style="padding:16px; flex:1; min-width:0;">
                    <strong>Contenido principal</strong>
                    <p>En una página real, el comportamiento adaptable depende de las reglas CSS y del ancho de pantalla.</p>
                </main>
            </div>
            <p><strong>Importante:</strong> este ejemplo ilustra la estructura. Para comprobar el comportamiento real de w3-collapse, debe actuar el CSS de W3.CSS sin que otros estilos lo anulen.</p>`;
    }

    // Próximo elemento: w3-main
    else if (clase === "w3-main") {
        titulo.textContent = "w3-main";
        contenido.innerHTML = `
            <p>Identifica el contenedor del contenido principal de la página.</p>
            <div style="display:flex; min-height:180px; border:1px solid #ddd;">
                <aside style="width:110px; flex-shrink:0; background:#607D8B; color:white; padding:12px;">
                    <strong>Sidebar</strong>
                    <p>Menú lateral</p>
                </aside>
                <main class="w3-main" style="flex:1; min-width:0; padding:16px; background:#f1f1f1;">
                    <h3 style="margin-top:0;">Contenido principal</h3>
                    <p>Aquí se sitúan las secciones principales de la página.</p>
                </main>
            </div>
            <p>Cuando se combina con una barra lateral adaptable, el margen y la disposición del contenido deben ajustarse según la configuración elegida.</p>`;
    }
// Próximo bloque 10

    // Próximo elemento: w3-dropdown-click
    else if (clase === "w3-dropdown-click") {
        titulo.textContent = "w3-dropdown-click";
        contenido.innerHTML = `
            <p>Abre y cierra el menú al hacer clic en el botón.</p>

            <div class="w3-dropdown-click" style="position:relative; display:inline-block;">
                <button class="w3-button" style="background:#2196F3; color:white; padding:10px 16px;"
                    onclick="const menu = this.nextElementSibling; menu.style.display = menu.style.display === 'block' ? 'none' : 'block';">
                    Abrir menú ▼
                </button>

                <div class="w3-dropdown-content" style="display:none; position:absolute; top:100%; left:0; min-width:180px; background:white; box-shadow:0 4px 8px rgba(0,0,0,0.25); z-index:20;">
                    <a href="#opcion1" style="display:block; padding:10px 14px; color:#222; text-decoration:none;">Opción 1</a>
                    <a href="#opcion2" style="display:block; padding:10px 14px; color:#222; text-decoration:none;">Opción 2</a>
                    <a href="#opcion3" style="display:block; padding:10px 14px; color:#222; text-decoration:none;">Opción 3</a>
                </div>
            </div>

            <p>Haz clic otra vez en el botón para ocultar el menú.</p>`;
    }

    // Próximo elemento: w3-dropdown-hover
    else if (clase === "w3-dropdown-hover") {
        titulo.textContent = "w3-dropdown-hover";
        contenido.innerHTML = `
            <p>Muestra el menú al pasar el puntero sobre el botón o al entrar en él con el teclado.</p>

            <style>
                .ejemplo-dropdown-hover:hover .ejemplo-dropdown-menu,
                .ejemplo-dropdown-hover:focus-within .ejemplo-dropdown-menu {
                    display: block !important;
                }
                .ejemplo-dropdown-hover .ejemplo-dropdown-trigger:focus-visible {
                    outline: 3px solid #FF9800;
                    outline-offset: 2px;
                }
            </style>

            <div class="w3-dropdown-hover ejemplo-dropdown-hover" style="position:relative; display:inline-block;">
                <button class="ejemplo-dropdown-trigger" style="background:#009688; color:white; border:0; padding:10px 16px; cursor:pointer;">
                    Pasar el puntero aquí ▼
                </button>

                <div class="w3-dropdown-content ejemplo-dropdown-menu" style="display:none; position:absolute; top:100%; left:0; min-width:200px; background:white; box-shadow:0 4px 8px rgba(0,0,0,0.25); z-index:20;">
                    <a href="#hover1" style="display:block; padding:10px 14px; color:#222; text-decoration:none;">Primera opción</a>
                    <a href="#hover2" style="display:block; padding:10px 14px; color:#222; text-decoration:none;">Segunda opción</a>
                    <a href="#hover3" style="display:block; padding:10px 14px; color:#222; text-decoration:none;">Tercera opción</a>
                </div>
            </div>

            <p>Prueba también a llegar al botón con la tecla Tab.</p>`;
    }

    // Próximo elemento: w3-dropdown-content
    else if (clase === "w3-dropdown-content") {
        titulo.textContent = "w3-dropdown-content";
        contenido.innerHTML = `
            <p>Es el contenedor que agrupa las opciones del menú desplegable. Normalmente se oculta hasta que se activa.</p>

            <div style="position:relative; display:inline-block;">
                <button class="w3-button" style="background:#607D8B; color:white; padding:10px 16px;"
                    onclick="const menu = this.nextElementSibling; menu.style.display = menu.style.display === 'block' ? 'none' : 'block';">
                    Mostrar el contenido ▼
                </button>

                <div class="w3-dropdown-content" style="display:none; position:absolute; top:100%; left:0; min-width:220px; background:#f1f1f1; border:1px solid #ccc; box-shadow:0 4px 8px rgba(0,0,0,0.2); z-index:20;">
                    <div style="padding:12px; font-weight:bold;">Contenido del desplegable</div>
                    <div style="padding:10px 12px;">Este bloque contiene las opciones.</div>
                    <div style="padding:10px 12px;">Puede contener texto o enlaces.</div>
                </div>
            </div>

            <p>La clase identifica el contenido, pero el clic que lo muestra se controla mediante JavaScript en este ejemplo.</p>`;
    }
// Próximo bloque 11

    // Próximo elemento: w3-button
    else if (clase === "w3-button") {
        titulo.textContent = "w3-button";
        contenido.innerHTML = `
            <p>Botón rectangular con un fondo gris al pasar el puntero, según los estilos de W3.CSS.</p>
            <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
                <button class="w3-button">Botón normal</button>
                <button class="w3-button" style="background:#2196F3; color:white;">Botón azul</button>
                <button class="w3-button" style="background:#4CAF50; color:white;">Botón verde</button>
            </div>
            <p>Prueba a pasar el puntero sobre los botones para observar el cambio visual.</p>`;
    }

    // Próximo elemento: w3-btn
    else if (clase === "w3-btn") {
        titulo.textContent = "w3-btn";
        contenido.innerHTML = `
            <p>Botón rectangular con efecto de sombra al interactuar, según los estilos de W3.CSS.</p>
            <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:center;">
                <button class="w3-btn">Botón con sombra</button>
                <button class="w3-btn" style="background:#2196F3; color:white;">Botón azul</button>
                <button class="w3-btn" style="background:#607D8B; color:white;">Botón gris</button>
            </div>
            <p>Compara el aspecto y el efecto al pasar el puntero.</p>`;
    }

    // Próximo elemento: w3-circle
    else if (clase === "w3-circle") {
        titulo.textContent = "w3-circle";
        contenido.innerHTML = `
            <p>Aplica una forma circular a un elemento. Para conseguir un círculo perfecto, utiliza el mismo ancho y alto.</p>
            <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:center;">
                <button class="w3-button w3-circle" style="width:60px; height:60px; padding:0; background:#2196F3; color:white;">+</button>
                <button class="w3-button w3-circle" style="width:60px; height:60px; padding:0; background:#E91E63; color:white;">♥</button>
                <div class="w3-circle" style="width:80px; height:80px; display:flex; align-items:center; justify-content:center; background:#009688; color:white;">CSS</div>
            </div>
            <p>El primer ejemplo es un botón circular; el tercero es un elemento circular que contiene texto.</p>`;
    }

    // Próximo elemento: w3-ripple
    else if (clase === "w3-ripple") {
        titulo.textContent = "w3-ripple";
        contenido.innerHTML = `
            <p>Permite mostrar un efecto de onda al interactuar con un elemento.</p>
            <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
                <button class="w3-button w3-ripple" style="background:#2196F3; color:white;">Pulsa aquí</button>
                <button class="w3-button w3-ripple" style="background:#009688; color:white;">Prueba la onda</button>
            </div>
            <p>Haz clic en los botones y observa la animación, si está disponible en la hoja de estilos cargada.</p>`;
    }

    // Próximo elemento: w3-bar-btn
    else if (clase === "w3-bar-btn") {
        titulo.textContent = "w3-bar";
        contenido.innerHTML = `
            <p>Agrupa varios botones en una barra horizontal.</p>
            <div class="w3-bar">
                <button class="w3-button" style="background:#2196F3; color:white;">Inicio</button>
                <button class="w3-button" style="background:#009688; color:white;">Servicios</button>
                <button class="w3-button" style="background:#607D8B; color:white;">Contacto</button>
            </div>
            <p>La clase w3-bar organiza los elementos; w3-button proporciona el estilo de botón.</p>`;
    }

    // Próximo elemento: w3-block-btn
    else if (clase === "w3-block-btn") {
        titulo.textContent = "w3-block";
        contenido.innerHTML = `
            <p>Hace que el botón ocupe todo el ancho disponible de su contenedor.</p>
            <div style="width:100%; max-width:420px; border:1px solid #ddd; padding:12px;">
                <button class="w3-button w3-block" style="background:#2196F3; color:white;">Botón a ancho completo</button>
                <div style="height:12px;"></div>
                <button class="w3-button w3-block" style="background:#4CAF50; color:white;">Otro botón completo</button>
            </div>
            <p>Compara el ancho de estos botones con el de un botón normal.</p>`;
    }
// Próximo bloque 12

        // Próximo elemento: w3-input
        else if (clase === "w3-input") {
            titulo.textContent = "w3-input";
            contenido.innerHTML = `
                <p>Aplica un estilo a los campos de entrada de un formulario, como los campos de texto, correo electrónico y contraseña.</p>

                <div style="max-width:420px;">
                    <label for="nombre-demo">Nombre:</label>
                    <input class="w3-input" type="text" id="nombre-demo" placeholder="Escribe tu nombre">

                    <label for="correo-demo" style="display:block; margin-top:12px;">Correo electrónico:</label>
                    <input class="w3-input" type="email" id="correo-demo" placeholder="nombre@ejemplo.com">

                    <label for="clave-demo" style="display:block; margin-top:12px;">Contraseña:</label>
                    <input class="w3-input" type="password" id="clave-demo" placeholder="Escribe una contraseña">
                </div>

                <p>Prueba a escribir en los campos y observa el estilo que proporciona W3.CSS.</p>`;
        }

        // Próximo elemento: w3-check
        else if (clase === "w3-check") {
            titulo.textContent = "w3-check";
            contenido.innerHTML = `
                <p>Se utiliza para aplicar el estilo de W3.CSS a una casilla de verificación (<code>checkbox</code>).</p>

                <div style="display:flex; flex-direction:column; gap:12px;">
                    <label>
                        <input class="w3-check" type="checkbox" checked>
                        Acepto las condiciones
                    </label>

                    <label>
                        <input class="w3-check" type="checkbox">
                        Recibir novedades
                    </label>

                    <label>
                        <input class="w3-check" type="checkbox" disabled>
                        Opción deshabilitada
                    </label>
                </div>

                <p>Marca o desmarca las casillas para comprobar su funcionamiento.</p>`;
        }

        // Próximo elemento: w3-radio
        else if (clase === "w3-radio") {
            titulo.textContent = "w3-radio";
            contenido.innerHTML = `
                <p>Aplica el estilo de W3.CSS a los botones de opción (<code>radio</code>). Los elementos que comparten el mismo atributo <code>name</code> permiten seleccionar una sola opción.</p>

                <div style="display:flex; flex-direction:column; gap:12px;">
                    <label>
                        <input class="w3-radio" type="radio" name="lenguaje-demo" value="html" checked>
                        HTML
                    </label>

                    <label>
                        <input class="w3-radio" type="radio" name="lenguaje-demo" value="css">
                        CSS
                    </label>

                    <label>
                        <input class="w3-radio" type="radio" name="lenguaje-demo" value="javascript">
                        JavaScript
                    </label>
                </div>

                <p>Selecciona distintas opciones: solo puede quedar una marcada dentro de este grupo.</p>`;
        }

        // Próximo elemento: w3-select
        else if (clase === "w3-select") {
            titulo.textContent = "w3-select";
            contenido.innerHTML = `
                <p>Aplica el estilo de W3.CSS a un menú desplegable de selección.</p>

                <div style="max-width:420px;">
                    <label for="curso-demo">Selecciona un curso:</label>
                    <select class="w3-select" id="curso-demo" name="curso-demo">
                        <option value="" disabled selected>Elige una opción</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                    </select>
                </div>

                <p>Abre el menú y selecciona un curso para probar el control.</p>`;
        }

        // Próximo elemento: w3-disabled
        else if (clase === "w3-disabled") {
            titulo.textContent = "w3-disabled";
            contenido.innerHTML = `
                <p>Aplica una apariencia deshabilitada a un elemento. Esta clase visual no siempre impide por sí sola la interacción; para deshabilitar realmente un campo o botón de formulario, utiliza también el atributo HTML <code>disabled</code>.</p>

                <div style="display:flex; flex-direction:column; gap:14px; max-width:420px;">
                    <div>
                        <label>Campo habilitado:</label>
                        <input class="w3-input" type="text" value="Puedes editar este texto">
                    </div>

                    <div>
                        <label>Campo con apariencia deshabilitada:</label>
                        <input class="w3-input w3-disabled" type="text" value="Solo apariencia visual">
                    </div>

                    <div>
                        <label>Campo realmente deshabilitado:</label>
                        <input class="w3-input" type="text" value="No puedes editar este texto" disabled>
                    </div>

                    <button class="w3-button w3-disabled" style="background:#9E9E9E; color:white;">Botón con apariencia deshabilitada</button>

                    <button class="w3-button" style="background:#9E9E9E; color:white;" disabled>Botón realmente deshabilitado</button>
                </div>

                <p>Compara los ejemplos: el atributo <code>disabled</code> impide la interacción con los controles compatibles.</p>`;
        }

        // Próximo elemento: w3-animate-input
        else if (clase === "w3-animate-input") {
            titulo.textContent = "w3-animate-input";
            contenido.innerHTML = `
                <p>Anima la anchura del campo de entrada cuando recibe el foco, hasta ocupar el 100 % del ancho disponible.</p>

                <div style="max-width:420px; padding:4px;">
                    <label for="busqueda-demo">Campo de búsqueda:</label>
                    <input
                        class="w3-input w3-animate-input"
                        type="text"
                        id="busqueda-demo"
                        placeholder="Haz clic aquí"
                        style="width:50%;"
                    >
                </div>

                <p>Haz clic dentro del campo y después pulsa fuera para observar cómo cambia su anchura.</p>`;
        }
// Próximo bloque 13

        // Próximo elemento: w3-modal
        else if (clase === "w3-modal") {
            titulo.textContent = "w3-modal";
            contenido.innerHTML = `
                <p>Crea una capa que cubre la página para mostrar una ventana modal. En este ejemplo puedes abrirla y cerrarla sin salir del catálogo.</p>

                <button class="w3-button w3-blue" onclick="document.getElementById('modal-demo-13').style.display='block'">
                    Abrir ventana modal
                </button>

                <div id="modal-demo-13" class="w3-modal" style="z-index:10000;">
                    <div class="w3-modal-content w3-card-4 w3-animate-zoom" style="max-width:400px;">
                        <header class="w3-container w3-blue">
                            <button class="w3-button w3-display-topright"
                                onclick="document.getElementById('modal-demo-13').style.display='none'"
                                aria-label="Cerrar ventana">&times;</button>
                            <h3>Ventana modal</h3>
                        </header>

                        <div class="w3-container w3-padding">
                            <p>Este contenido aparece sobre el resto de la página.</p>
                            <p>Una ventana modal permite mostrar información o solicitar una acción.</p>
                        </div>

                        <footer class="w3-container w3-light-grey w3-padding">
                            <button class="w3-button w3-red"
                                onclick="document.getElementById('modal-demo-13').style.display='none'">
                                Cerrar
                            </button>
                        </footer>
                    </div>
                </div>

                <p>Abre la ventana y ciérrala con el botón de la esquina o con el botón inferior.</p>`;
        }

        // Próximo elemento: w3-modal-content
        else if (clase === "w3-modal-content") {
            titulo.textContent = "w3-modal-content";
            contenido.innerHTML = `
                <p>Define el panel que contiene el contenido de una ventana modal. Normalmente se coloca dentro de un elemento con la clase <code>w3-modal</code>.</p>

                <button class="w3-button w3-teal"
                    onclick="document.getElementById('panel-demo-13').style.display='block'">
                    Mostrar panel modal
                </button>

                <div id="panel-demo-13" class="w3-modal" style="z-index:10000;">
                    <div class="w3-modal-content" style="max-width:420px;">
                        <div class="w3-container w3-padding w3-white">
                            <button class="w3-button w3-display-topright"
                                onclick="document.getElementById('panel-demo-13').style.display='none'"
                                aria-label="Cerrar panel">&times;</button>

                            <h3>Panel de contenido</h3>
                            <p>Este panel utiliza <code>w3-modal-content</code>.</p>
                            <p>Puedes personalizar su anchura, colores, márgenes y contenido.</p>

                            <button class="w3-button w3-teal"
                                onclick="document.getElementById('panel-demo-13').style.display='none'">
                                Cerrar panel
                            </button>
                        </div>
                    </div>
                </div>

                <p>La clase <code>w3-modal-content</code> da estilo al panel; la clase <code>w3-modal</code> proporciona la capa que lo contiene.</p>`;
        }

        // Próximo elemento: w3-tooltip
        else if (clase === "w3-tooltip") {
            titulo.textContent = "w3-tooltip";
            contenido.innerHTML = `
                <p>Actúa como contenedor de una ayuda emergente. El texto de ayuda suele colocarse dentro de un elemento con la clase <code>w3-text</code>.</p>

                <style>
                    #tooltip-demo-13:hover .ayuda-demo-13,
                    #tooltip-demo-13:focus-within .ayuda-demo-13 {
                        visibility: visible;
                    }

                    #tooltip-demo-13 .ayuda-demo-13 {
                        visibility: hidden;
                        position: absolute;
                        left: 0;
                        top: 100%;
                        margin-top: 6px;
                        padding: 8px 12px;
                        background: #333;
                        color: white;
                        border-radius: 4px;
                        width: max-content;
                        max-width: 260px;
                        z-index: 20;
                    }
                </style>

                <div id="tooltip-demo-13" class="w3-tooltip"
                    style="position:relative; display:inline-block; margin:18px 0 65px;">
                    <button class="w3-button w3-blue">Sitúa el puntero aquí</button>
                    <span class="w3-text ayuda-demo-13" role="tooltip">
                        Esta es una ayuda emergente.
                    </span>
                </div>

                <p>Pasa el puntero sobre el botón o utiliza el foco del teclado para ver la ayuda.</p>`;
        }

        // Próximo elemento: w3-text
        else if (clase === "w3-text") {
            titulo.textContent = "w3-text";
            contenido.innerHTML = `
                <p>Se utiliza en el texto que aparece como ayuda emergente dentro de un contenedor <code>w3-tooltip</code>.</p>

                <style>
                    #texto-tooltip-demo-13:hover .texto-ayuda-demo-13,
                    #texto-tooltip-demo-13:focus-within .texto-ayuda-demo-13 {
                        visibility: visible;
                    }

                    #texto-tooltip-demo-13 .texto-ayuda-demo-13 {
                        visibility: hidden;
                        position: absolute;
                        left: 0;
                        top: 100%;
                        margin-top: 6px;
                        padding: 8px 12px;
                        background: #333;
                        color: white;
                        border-radius: 4px;
                        width: max-content;
                        max-width: 260px;
                        z-index: 20;
                    }
                </style>

                <div id="texto-tooltip-demo-13" class="w3-tooltip"
                    style="position:relative; display:inline-block; margin:18px 0 65px;">
                    <button class="w3-button w3-green">Información</button>
                    <span class="w3-text texto-ayuda-demo-13" role="tooltip">
                        El texto de ayuda explica la función del elemento.
                    </span>
                </div>

                <p>En este ejemplo, <code>w3-text</code> identifica el texto de ayuda. Las reglas CSS incluidas controlan cuándo se muestra.</p>`;
        }
// Próximo bloque 14

        // Próximo elemento: w3-animate-top
        else if (clase === "w3-animate-top") {
            titulo.textContent = "w3-animate-top";
            contenido.innerHTML = `
                <p>Anima la entrada de un elemento desde la parte superior.</p>
                <div id="demo-animate-top" style="padding:30px; background:#2196F3; color:white; text-align:center;">
                    <h3>¡Vengo desde arriba!</h3>
                    <p>Animación de entrada superior.</p>
                </div>
                <button class="w3-button w3-blue" style="margin-top:12px;"
                    onclick="const e=document.getElementById('demo-animate-top'); e.classList.remove('w3-animate-top'); void e.offsetWidth; e.classList.add('w3-animate-top');">
                    Repetir animación
                </button>`;
        }

        // Próximo elemento: w3-animate-left
        else if (clase === "w3-animate-left") {
            titulo.textContent = "w3-animate-left";
            contenido.innerHTML = `
                <p>Anima la entrada de un elemento desde la izquierda.</p>
                <div id="demo-animate-left" class="w3-animate-left"
                    style="padding:30px; background:#009688; color:white; text-align:center;">
                    <h3>¡Llego desde la izquierda!</h3>
                    <p>Animación de entrada lateral.</p>
                </div>
                <button class="w3-button w3-teal" style="margin-top:12px;"
                    onclick="const e=document.getElementById('demo-animate-left'); e.classList.remove('w3-animate-left'); void e.offsetWidth; e.classList.add('w3-animate-left');">
                    Repetir animación
                </button>`;
        }

        // Próximo elemento: w3-animate-bottom
        else if (clase === "w3-animate-bottom") {
            titulo.textContent = "w3-animate-bottom";
            contenido.innerHTML = `
                <p>Anima la entrada de un elemento desde la parte inferior.</p>
                <div id="demo-animate-bottom" class="w3-animate-bottom"
                    style="padding:30px; background:#673AB7; color:white; text-align:center;">
                    <h3>¡Subo desde abajo!</h3>
                    <p>Animación de entrada inferior.</p>
                </div>
                <button class="w3-button" style="margin-top:12px; background:#673AB7; color:white;"
                    onclick="const e=document.getElementById('demo-animate-bottom'); e.classList.remove('w3-animate-bottom'); void e.offsetWidth; e.classList.add('w3-animate-bottom');">
                    Repetir animación
                </button>`;
        }

        // Próximo elemento: w3-animate-right
        else if (clase === "w3-animate-right") {
            titulo.textContent = "w3-animate-right";
            contenido.innerHTML = `
                <p>Anima la entrada de un elemento desde la derecha.</p>
                <div id="demo-animate-right" class="w3-animate-right"
                    style="padding:30px; background:#FF9800; color:white; text-align:center;">
                    <h3>¡Entro desde la derecha!</h3>
                    <p>Animación de entrada lateral.</p>
                </div>
                <button class="w3-button" style="margin-top:12px; background:#FF9800; color:white;"
                    onclick="const e=document.getElementById('demo-animate-right'); e.classList.remove('w3-animate-right'); void e.offsetWidth; e.classList.add('w3-animate-right');">
                    Repetir animación
                </button>`;
        }

        // Próximo elemento: w3-animate-opacity
        else if (clase === "w3-animate-opacity") {
            titulo.textContent = "w3-animate-opacity";
            contenido.innerHTML = `
                <p>Anima la opacidad de un elemento para que aparezca gradualmente.</p>
                <div id="demo-animate-opacity" class="w3-animate-opacity"
                    style="padding:30px; background:#4CAF50; color:white; text-align:center;">
                    <h3>Ahora me ves</h3>
                    <p>La opacidad aumenta progresivamente.</p>
                </div>
                <button class="w3-button w3-green" style="margin-top:12px;"
                    onclick="const e=document.getElementById('demo-animate-opacity'); e.classList.remove('w3-animate-opacity'); void e.offsetWidth; e.classList.add('w3-animate-opacity');">
                    Repetir animación
                </button>`;
        }

        // Próximo elemento: w3-animate-zoom
        else if (clase === "w3-animate-zoom") {
            titulo.textContent = "w3-animate-zoom";
            contenido.innerHTML = `
                <p>Anima la aparición de un elemento mediante un efecto de zoom.</p>
                <div id="demo-animate-zoom" class="w3-animate-zoom"
                    style="padding:30px; background:#E91E63; color:white; text-align:center;">
                    <h3>¡Aparezco con zoom!</h3>
                    <p>El elemento crece hasta alcanzar su tamaño normal.</p>
                </div>
                <button class="w3-button" style="margin-top:12px; background:#E91E63; color:white;"
                    onclick="const e=document.getElementById('demo-animate-zoom'); e.classList.remove('w3-animate-zoom'); void e.offsetWidth; e.classList.add('w3-animate-zoom');">
                    Repetir animación
                </button>`;
        }

        // Próximo elemento: w3-animate-fading
        else if (clase === "w3-animate-fading") {
            titulo.textContent = "w3-animate-fading";
            contenido.innerHTML = `
                <p>Produce un efecto de desvanecimiento que alterna la aparición y desaparición del elemento.</p>
                <div id="demo-animate-fading"
                    style="padding:30px; background:#3F51B5; color:white; text-align:center;">
                    <h3>Desvanecimiento</h3>
                    <p>La animación alterna entre visible y transparente.</p>
                </div>
                <button class="w3-button" style="margin-top:12px; background:#3F51B5; color:white;"
                    onclick="const e=document.getElementById('demo-animate-fading'); e.classList.remove('w3-animate-fading'); void e.offsetWidth; e.classList.add('w3-animate-fading');">
                    Repetir animación
                </button>
                <p>Nota: esta animación puede continuar repitiéndose mientras el elemento permanezca en pantalla, según la implementación de W3.CSS.</p>`;
        }

        // Próximo elemento: w3-spin
        else if (clase === "w3-spin") {
            titulo.textContent = "w3-spin";
            contenido.innerHTML = `
                <p>Hace girar continuamente un elemento mediante una animación de rotación.</p>
                <div style="display:flex; gap:30px; align-items:center; justify-content:center; flex-wrap:wrap; padding:20px;">
                    <div class="w3-spin"
                        style="width:90px; height:90px; border-radius:50%; background:#2196F3; color:white; display:flex; align-items:center; justify-content:center;">
                        <strong>Giro</strong>
                    </div>
                    <div class="w3-spin" style="font-size:48px;" aria-label="Símbolo giratorio">⚙</div>
                </div>
                <p>Observa cómo giran el círculo y el símbolo. La animación se repite continuamente.</p>`;
        }

        // Próximo elemento: w3-animate-input
        else if (clase === "w3-animate-input") {
            titulo.textContent = "w3-animate-input";
            contenido.innerHTML = `
                <p>Anima la anchura de un campo de entrada cuando recibe el foco, hasta ocupar el ancho disponible.</p>
                <div style="max-width:420px; padding:4px;">
                    <label for="demo-animate-input-14">Buscar:</label>
                    <input class="w3-input w3-animate-input"
                        type="text"
                        id="demo-animate-input-14"
                        placeholder="Haz clic aquí"
                        style="width:50%;">
                </div>
                <p>Haz clic en el campo para observar la transición de anchura. Pulsa fuera para comprobar cómo se comporta al perder el foco.</p>`;
        }
// Próximo bloque 15

        // Próximo elemento: w3-tiny
        else if (clase === "w3-tiny") {
            titulo.textContent = "w3-tiny";
            contenido.innerHTML = `
                <p>Aplica un tamaño de fuente muy pequeño, aproximadamente 10 px en W3.CSS.</p>
                <div class="w3-tiny" style="padding:12px; background:#E3F2FD;">
                    <p>Este texto utiliza w3-tiny.</p>
                    <p>Texto pequeño para comparar su tamaño.</p>
                </div>
                <p>Es útil para textos secundarios, aunque conviene comprobar que siga siendo legible.</p>`;
        }

        // Próximo elemento: w3-small
        else if (clase === "w3-small") {
            titulo.textContent = "w3-small";
            contenido.innerHTML = `
                <p>Reduce el tamaño de la fuente a aproximadamente 12 px.</p>
                <div class="w3-small" style="padding:12px; background:#E8F5E9;">
                    <p>Este texto utiliza w3-small.</p>
                    <p>Una opción para notas y textos complementarios.</p>
                </div>
                <p>Compara este tamaño con el texto normal que estás leyendo.</p>`;
        }

        // Próximo elemento: w3-medium
        else if (clase === "w3-medium") {
            titulo.textContent = "w3-medium";
            contenido.innerHTML = `
                <p>Establece un tamaño de fuente de aproximadamente 15 px.</p>
                <div class="w3-medium" style="padding:12px; background:#FFF3E0;">
                    <p>Este texto utiliza w3-medium.</p>
                    <p>Es un tamaño adecuado para contenido general.</p>
                </div>
                <p>En la hoja de estilos clásica de W3.CSS, el tamaño predeterminado habitual es 15 px.</p>`;
        }

        // Próximo elemento: w3-large
        else if (clase === "w3-large") {
            titulo.textContent = "w3-large";
            contenido.innerHTML = `
                <p>Aumenta el tamaño de la fuente hasta aproximadamente 18 px.</p>
                <div class="w3-large" style="padding:12px; background:#F3E5F5;">
                    <p>Este texto utiliza w3-large.</p>
                    <p>Destaca información importante sin llegar a ser un título grande.</p>
                </div>`;
        }

        // Próximo elemento: w3-xlarge
        else if (clase === "w3-xlarge") {
            titulo.textContent = "w3-xlarge";
            contenido.innerHTML = `
                <p>Aplica un tamaño de fuente de aproximadamente 24 px.</p>
                <div class="w3-xlarge" style="padding:12px; background:#E0F7FA;">
                    <p>Texto w3-xlarge.</p>
                    <p>Ideal para destacar frases o subtítulos.</p>
                </div>`;
        }

        // Próximo elemento: w3-xxlarge
        else if (clase === "w3-xxlarge") {
            titulo.textContent = "w3-xxlarge";
            contenido.innerHTML = `
                <p>Establece un tamaño de fuente de aproximadamente 36 px.</p>
                <div class="w3-xxlarge" style="padding:12px; background:#FFF8E1;">
                    <p>Texto grande</p>
                </div>
                <p>Observa cómo aumenta el impacto visual respecto a los tamaños anteriores.</p>`;
        }

        // Próximo elemento: w3-xxxlarge
        else if (clase === "w3-xxxlarge") {
            titulo.textContent = "w3-xxxlarge";
            contenido.innerHTML = `
                <p>Aplica un tamaño de fuente de aproximadamente 48 px.</p>
                <div class="w3-xxxlarge" style="padding:12px; background:#FCE4EC;">
                    <p>¡Enorme!</p>
                </div>
                <p>Este tamaño funciona bien para títulos destacados y mensajes breves.</p>`;
        }

        // Próximo elemento: w3-jumbo
        else if (clase === "w3-jumbo") {
            titulo.textContent = "w3-jumbo";
            contenido.innerHTML = `
                <p>Aplica un tamaño de fuente de aproximadamente 64 px.</p>
                <div class="w3-jumbo" style="padding:12px; background:#263238; color:white; text-align:center;">
                    <p>JUMBO</p>
                </div>
                <p>Está pensado para textos muy destacados, como titulares o cifras importantes.</p>`;
        }

        // Próximo elemento: w3-wide
        else if (clase === "w3-wide") {
            titulo.textContent = "w3-wide";
            contenido.innerHTML = `
                <p>Aumenta el espacio entre las letras para dar al texto una apariencia más abierta.</p>
                <div style="padding:16px; background:#E3F2FD;">
                    <p class="w3-wide" style="font-size:24px;">TEXTO ESPACIADO</p>
                    <p style="font-size:24px;">TEXTO NORMAL</p>
                </div>
                <p>Compara las dos líneas. En W3.CSS clásico, w3-wide aplica un espaciado entre letras de 4 px.</p>`;
        }

        // Próximo elemento: w3-serif
        else if (clase === "w3-serif") {
            titulo.textContent = "w3-serif";
            contenido.innerHTML = `
                <p>Utiliza una familia tipográfica serif, con pequeños remates en los extremos de los caracteres.</p>
                <div class="w3-serif" style="padding:16px; background:#FFF3E0;">
                    <h3>La familia Serif</h3>
                    <p>Las letras tienen pequeños remates que aportan una apariencia clásica.</p>
                    <p>Ejemplo: Georgia, "Times New Roman", serif.</p>
                </div>
                <p>Es frecuente encontrar estas fuentes en textos editoriales y diseños tradicionales.</p>`;
        }

        // Próximo elemento: w3-sans-serif
        else if (clase === "w3-sans-serif") {
            titulo.textContent = "w3-sans-serif";
            contenido.innerHTML = `
                <p>Utiliza una familia tipográfica sans-serif, sin los remates característicos de las fuentes serif.</p>
                <div class="w3-sans-serif" style="padding:16px; background:#E8F5E9;">
                    <h3>La familia Sans-serif</h3>
                    <p>Una apariencia limpia y moderna, muy habitual en interfaces web.</p>
                    <p>Ejemplo: Arial, Helvetica, sans-serif.</p>
                </div>
                <p>Compara esta tipografía con la del ejemplo w3-serif.</p>`;
        }

        // Próximo elemento: w3-cursive
        else if (clase === "w3-cursive") {
            titulo.textContent = "w3-cursive";
            contenido.innerHTML = `
                <p>Utiliza una familia de fuentes cursivas o de apariencia manuscrita, según las fuentes disponibles en el sistema.</p>
                <div class="w3-cursive" style="padding:16px; background:#FCE4EC; font-size:24px;">
                    <p>Escribir con estilo</p>
                    <p>Una apariencia más personal y decorativa.</p>
                </div>
                <p>El resultado exacto puede variar según el navegador y las fuentes instaladas.</p>`;
        }

        // Próximo elemento: w3-monospace
        else if (clase === "w3-monospace") {
            titulo.textContent = "w3-monospace";
            contenido.innerHTML = `
                <p>Utiliza una fuente monoespaciada, en la que todos los caracteres ocupan el mismo ancho.</p>
                <div class="w3-monospace" style="padding:16px; background:#263238; color:#80CBC4;">
                    <p>HTML    = estructura</p>
                    <p>CSS     = presentación</p>
                    <p>JS      = interacción</p>
                </div>
                <p>Este tipo de fuente es especialmente útil para código, comandos y datos alineados.</p>`;
        }

        // Próximo elemento: w3-center
        else if (clase === "w3-center") {
            titulo.textContent = "w3-center";
            contenido.innerHTML = `
                <p>Centra horizontalmente el texto y otros elementos en línea dentro de su contenedor.</p>
                <div class="w3-center" style="padding:20px; border:1px solid #90CAF9; background:#E3F2FD;">
                    <h3>Título centrado</h3>
                    <p>Este párrafo también está centrado.</p>
                    <button class="w3-button w3-blue">Botón</button>
                </div>
                <p>Compara el resultado con un bloque de texto alineado a la izquierda.</p>`;
        }

        // Próximo elemento: w3-bold
        else if (clase === "w3-bold") {
            titulo.textContent = "w3-bold / w3-text-bold";
            contenido.innerHTML = `
                <p>Las clases w3-bold y w3-text-bold se presentan aquí como variantes para mostrar texto en negrita.</p>
                <div style="padding:16px; background:#FFF8E1;">
                    <p>Texto normal.</p>
                    <p class="w3-bold">Texto con w3-bold.</p>
                    <p class="w3-text-bold">Texto con w3-text-bold.</p>
                    <p style="font-weight:bold;">Texto con CSS: font-weight: bold.</p>
                </div>
                <p>Nota: font-weight: bold es la regla CSS estándar. Comprueba que las clases W3.CSS de tu catálogo estén definidas en la hoja de estilos cargada.</p>`;
        }

        // Próximo elemento: w3-italic
        else if (clase === "w3-italic") {
            titulo.textContent = "w3-italic / w3-text-italic";
            contenido.innerHTML = `
                <p>Estas variantes se muestran como clases para representar texto en cursiva.</p>
                <div style="padding:16px; background:#F3E5F5;">
                    <p>Texto normal.</p>
                    <p class="w3-italic">Texto con w3-italic.</p>
                    <p class="w3-text-italic">Texto con w3-text-italic.</p>
                    <p style="font-style:italic;">Texto con CSS: font-style: italic.</p>
                </div>
                <p>La regla CSS estándar para cursiva es font-style: italic.</p>`;
        }

        // Próximo elemento: w3-text-center
        else if (clase === "w3-text-center") {
            titulo.textContent = "w3-text-center";
            contenido.innerHTML = `
                <p>Esta clase se presenta como una alternativa para centrar el texto sin depender de una regla con !important.</p>
                <div style="padding:16px; border:1px solid #80CBC4; background:#E0F2F1;">
                    <p class="w3-text-center">Texto con la clase w3-text-center.</p>
                    <p style="text-align:center;">Texto centrado con CSS estándar.</p>
                    <p style="text-align:left;">Texto alineado a la izquierda.</p>
                </div>
                <p>Importante: verifica que w3-text-center esté definida en tu hoja de estilos. En W3.CSS clásico, w3-center es la clase habitual para centrar texto.</p>`;
        }

        // Próximo elemento: w3-rtl
        else if (clase === "w3-rtl") {
            titulo.textContent = "w3-rtl / w3-ltr";
            contenido.innerHTML = `
                <p>La dirección del texto determina si se lee de izquierda a derecha (LTR) o de derecha a izquierda (RTL).</p>

                <div style="padding:16px; margin-bottom:12px; background:#E3F2FD;">
                    <h4>Izquierda a derecha — LTR</h4>
                    <p class="w3-ltr" dir="ltr" style="text-align:left;">
                        Hello! This text is displayed from left to right.
                    </p>
                </div>

                <div style="padding:16px; background:#FFF3E0;">
                    <h4>Derecha a izquierda — RTL</h4>
                    <p class="w3-rtl" dir="rtl" style="text-align:right;">
                        مرحباً! هذا النص يُقرأ من اليمين إلى اليسار.
                    </p>
                </div>

                <p>El atributo HTML dir establece la dirección del texto. Las clases w3-rtl y w3-ltr se muestran también para comprobar su comportamiento en tu hoja de estilos.</p>`;
        }
// Próximo bloque 16

        // Próximo elemento: w3-left
        else if (clase === "w3-left") {
            titulo.textContent = "w3-left";
            contenido.innerHTML = `
                <p>Hace flotar un elemento hacia la izquierda, permitiendo que otros elementos se sitúen a su lado.</p>
                <div style="padding:12px; border:1px solid #ddd; min-height:100px;">
                    <div class="w3-left" style="background:#2196F3; color:white; padding:12px;">
                        Elemento izquierdo
                    </div>
                    <div style="background:#E8F5E9; padding:12px;">
                        Contenido que fluye alrededor del elemento flotante.
                    </div>
                    <div class="w3-clear"></div>
                </div>
                <p>Observa cómo el contenido puede rodear al elemento flotante.</p>`;
        }

        // Próximo elemento: w3-right
        else if (clase === "w3-right") {
            titulo.textContent = "w3-right";
            contenido.innerHTML = `
                <p>Hace flotar un elemento hacia la derecha de su contenedor.</p>
                <div style="padding:12px; border:1px solid #ddd; min-height:100px;">
                    <div class="w3-right" style="background:#009688; color:white; padding:12px;">
                        Elemento derecho
                    </div>
                    <div style="background:#E0F2F1; padding:12px;">
                        Contenido junto al elemento flotante.
                    </div>
                    <div class="w3-clear"></div>
                </div>
                <p>La clase desplaza el elemento hacia la derecha; w3-clear limpia el flotado al final.</p>`;
        }

        // Próximo elemento: w3-left-align
        else if (clase === "w3-left-align") {
            titulo.textContent = "w3-left-align";
            contenido.innerHTML = `
                <p>Alinea el contenido de texto a la izquierda.</p>
                <div class="w3-left-align" style="padding:16px; background:#E3F2FD; border:1px solid #90CAF9;">
                    <h3>Título a la izquierda</h3>
                    <p>Este párrafo comienza en el margen izquierdo del contenedor.</p>
                    <button class="w3-button w3-blue">Botón</button>
                </div>
                <p>Es útil cuando quieres fijar explícitamente la alineación del contenido.</p>`;
        }

        // Próximo elemento: w3-right-align
        else if (clase === "w3-right-align") {
            titulo.textContent = "w3-right-align";
            contenido.innerHTML = `
                <p>Alinea el contenido de texto a la derecha.</p>
                <div class="w3-right-align" style="padding:16px; background:#FFF3E0; border:1px solid #FFCC80;">
                    <h3>Título a la derecha</h3>
                    <p>Este párrafo termina en el margen derecho del contenedor.</p>
                    <button class="w3-button w3-orange">Botón</button>
                </div>
                <p>La alineación afecta al contenido del contenedor, no cambia por sí misma su posición.</p>`;
        }

        // Próximo elemento: w3-justify
        else if (clase === "w3-justify") {
            titulo.textContent = "w3-justify";
            contenido.innerHTML = `
                <p>Distribuye el texto para que sus líneas, excepto normalmente la última, ocupen el ancho disponible.</p>
                <div class="w3-justify" style="padding:16px; background:#F3E5F5; border:1px solid #CE93D8;">
                    <h3>Texto justificado</h3>
                    <p>W3.CSS permite modificar la alineación de los textos. La justificación distribuye los espacios entre palabras para que las líneas alcancen ambos márgenes del contenedor. Este comportamiento resulta especialmente útil en párrafos largos, aunque en columnas estrechas puede generar espacios excesivos entre las palabras.</p>
                </div>
                <p>Compara los márgenes izquierdo y derecho del párrafo.</p>`;
        }

        // Próximo elemento: w3-hide
        else if (clase === "w3-hide") {
            titulo.textContent = "w3-hide";
            contenido.innerHTML = `
                <p>Oculta un elemento mediante la clase w3-hide. El siguiente ejemplo permite mostrarlo y ocultarlo.</p>
                <div style="padding:16px; border:1px solid #ddd;">
                    <div id="demo-hide-16" class="w3-hide" style="padding:16px; background:#E8F5E9;">
                        <strong>¡Ahora estoy visible!</strong>
                        <p>Este contenido estaba oculto.</p>
                    </div>
                    <button class="w3-button w3-green" style="margin-top:12px;"
                        onclick="const e=document.getElementById('demo-hide-16'); e.classList.toggle('w3-hide'); this.textContent=e.classList.contains('w3-hide')?'Mostrar contenido':'Ocultar contenido';">
                        Mostrar contenido
                    </button>
                </div>
                <p>La clase w3-hide normalmente aplica display:none, por lo que el elemento deja de ocupar espacio en el diseño.</p>`;
        }

        // Próximo elemento: w3-show
        else if (clase === "w3-show") {
            titulo.textContent = "w3-show / w3-show-block";
            contenido.innerHTML = `
                <p>Las clases w3-show y w3-show-block permiten mostrar un elemento como bloque, según los estilos disponibles en W3.CSS.</p>
                <div style="padding:16px; border:1px solid #ddd;">
                    <div id="demo-show-16" class="w3-show-block" style="padding:12px; background:#E3F2FD;">
                        <strong>Contenido visible</strong>
                        <p>Este panel se muestra como bloque.</p>
                    </div>
                    <button class="w3-button w3-blue" style="margin-top:12px;"
                        onclick="const e=document.getElementById('demo-show-16'); e.classList.toggle('w3-hide');">
                        Alternar visibilidad
                    </button>
                </div>
                <p>En W3.CSS clásico, w3-show suele aplicar display:block mediante sus reglas de visibilidad.</p>`;
        }

        // Próximo elemento: w3-show-inline-block
        else if (clase === "w3-show-inline-block") {
            titulo.textContent = "w3-show-inline-block";
            contenido.innerHTML = `
                <p>Muestra un elemento con comportamiento inline-block: puede colocarse junto a otros elementos y conservar dimensiones propias.</p>
                <div style="padding:16px; border:1px solid #ddd;">
                    <div class="w3-show-inline-block" style="padding:16px; margin:4px; background:#2196F3; color:white;">
                        Bloque 1
                    </div>
                    <div class="w3-show-inline-block" style="padding:16px; margin:4px; background:#009688; color:white;">
                        Bloque 2
                    </div>
                    <div class="w3-show-inline-block" style="padding:16px; margin:4px; background:#FF9800; color:white;">
                        Bloque 3
                    </div>
                </div>
                <p>Los bloques pueden aparecer en la misma línea y saltar a otra cuando no hay suficiente espacio.</p>`;
        }

        // Próximo elemento: w3-top
        else if (clase === "w3-top") {
            titulo.textContent = "w3-top";
            contenido.innerHTML = `
                <p>Fija un elemento en la parte superior de la ventana del navegador. Para no cubrir los controles del catálogo, simulamos el efecto dentro de este panel.</p>
                <div style="position:relative; height:210px; overflow:auto; border:1px solid #bbb; background:#fafafa;">
                    <div style="position:absolute; top:0; left:0; right:0; z-index:2; background:#2196F3; color:white; padding:12px;">
                        <strong>Barra superior de demostración</strong>
                    </div>
                    <div style="padding:60px 16px 16px;">
                        <p>Contenido de ejemplo.</p>
                        <p>Desplázate dentro de este panel para comprobar la posición de la barra.</p>
                        <p>Contenido adicional.</p>
                        <p>Más contenido de prueba.</p>
                        <p>Final del panel.</p>
                    </div>
                </div>
                <p>En una página real, w3-top utiliza posicionamiento fijo respecto a la ventana. Aquí empleamos una barra absoluta dentro de un contenedor para evitar interferencias con el modal principal.</p>`;
        }

        // Próximo elemento: w3-bottom
        else if (clase === "w3-bottom") {
            titulo.textContent = "w3-bottom";
            contenido.innerHTML = `
                <p>Fija un elemento en la parte inferior de la ventana. Este ejemplo muestra el efecto dentro de un panel de demostración.</p>
                <div style="position:relative; height:210px; overflow:auto; border:1px solid #bbb; background:#fafafa;">
                    <div style="padding:16px 16px 60px;">
                        <p>Contenido de ejemplo.</p>
                        <p>La barra inferior permanece al fondo del panel.</p>
                        <p>Desplázate para observar su posición.</p>
                        <p>Contenido adicional.</p>
                        <p>Final del contenido.</p>
                    </div>
                    <div style="position:absolute; bottom:0; left:0; right:0; z-index:2; background:#009688; color:white; padding:12px;">
                        <strong>Barra inferior de demostración</strong>
                    </div>
                </div>
                <p>La posición fija real se aplica respecto a la ventana; este ejemplo está contenido para proteger el diseño del catálogo.</p>`;
        }

        // Próximo elemento: w3-display-topleft
        else if (clase === "w3-display-topleft") {
            titulo.textContent = "w3-display-topleft";
            contenido.innerHTML = `
                <p>Posiciona un elemento en la esquina superior izquierda de un contenedor de referencia.</p>
                <div style="position:relative; height:180px; background:#E3F2FD; border:2px solid #90CAF9;">
                    <div class="w3-display-topleft" style="padding:12px; background:#2196F3; color:white;">
                        Superior izquierda
                    </div>
                    <div style="position:absolute; bottom:8px; right:8px; color:#555;">
                        Contenedor de referencia
                    </div>
                </div>
                <p>La posición se interpreta respecto al contenedor adecuado, normalmente uno con position:relative.</p>`;
        }

        // Próximo elemento: w3-display-topright
        else if (clase === "w3-display-topright") {
            titulo.textContent = "w3-display-topright";
            contenido.innerHTML = `
                <p>Posiciona un elemento en la esquina superior derecha del contenedor.</p>
                <div style="position:relative; height:180px; background:#E0F2F1; border:2px solid #80CBC4;">
                    <div class="w3-display-topright" style="padding:12px; background:#009688; color:white;">
                        Superior derecha
                    </div>
                    <div style="position:absolute; bottom:8px; left:8px; color:#555;">
                        Contenedor de referencia
                    </div>
                </div>
                <p>Es útil para etiquetas, controles o botones situados en la esquina de un panel.</p>`;
        }

        // Próximo elemento: w3-display-bottomleft
        else if (clase === "w3-display-bottomleft") {
            titulo.textContent = "w3-display-bottomleft";
            contenido.innerHTML = `
                <p>Posiciona un elemento en la esquina inferior izquierda del contenedor.</p>
                <div style="position:relative; height:180px; background:#FFF3E0; border:2px solid #FFCC80;">
                    <div class="w3-display-bottomleft" style="padding:12px; background:#FF9800; color:white;">
                        Inferior izquierda
                    </div>
                    <div style="position:absolute; top:8px; right:8px; color:#555;">
                        Contenedor de referencia
                    </div>
                </div>
                <p>El elemento se coloca en la parte inferior izquierda del área de referencia.</p>`;
        }

        // Próximo elemento: w3-display-bottomright
        else if (clase === "w3-display-bottomright") {
            titulo.textContent = "w3-display-bottomright";
            contenido.innerHTML = `
                <p>Posiciona un elemento en la esquina inferior derecha del contenedor.</p>
                <div style="position:relative; height:180px; background:#F3E5F5; border:2px solid #CE93D8;">
                    <div class="w3-display-bottomright" style="padding:12px; background:#9C27B0; color:white;">
                        Inferior derecha
                    </div>
                    <div style="position:absolute; top:8px; left:8px; color:#555;">
                        Contenedor de referencia
                    </div>
                </div>
                <p>Esta posición es frecuente en etiquetas superpuestas sobre imágenes o tarjetas.</p>`;
        }

        // Próximo elemento: w3-display-middle
        else if (clase === "w3-display-middle") {
            titulo.textContent = "w3-display-middle";
            contenido.innerHTML = `
                <p>Posiciona un elemento en el centro de su contenedor.</p>
                <div style="position:relative; height:180px; background:#ECEFF1; border:2px solid #90A4AE;">
                    <div class="w3-display-middle" style="padding:16px; background:#607D8B; color:white; text-align:center;">
                        <strong>Centro</strong>
                        <div>Elemento centrado</div>
                    </div>
                </div>
                <p>La clase permite centrar un elemento en ambos ejes dentro del área de referencia.</p>`;
        }

        // Próximo elemento: w3-display-hover
        else if (clase === "w3-display-hover") {
            titulo.textContent = "w3-display-hover";
            contenido.innerHTML = `
                <p>Muestra un elemento al pasar el puntero sobre el contenedor. También añadimos soporte para el foco del teclado.</p>
                <style>
                    #demo-display-hover-16 .contenido-hover-16 {
                        display: none;
                    }
                    #demo-display-hover-16:hover .contenido-hover-16,
                    #demo-display-hover-16:focus-within .contenido-hover-16 {
                        display: block;
                    }
                </style>
                <div id="demo-display-hover-16" tabindex="0"
                    style="position:relative; padding:28px; background:#ECEFF1; border:1px solid #90A4AE; text-align:center;">
                    <strong>Pasa el puntero por aquí o utiliza el teclado</strong>
                    <div class="w3-display-hover contenido-hover-16"
                        style="margin-top:16px; padding:16px; background:#3F51B5; color:white;">
                        ¡Contenido revelado!
                    </div>
                </div>
                <p>La regla CSS del ejemplo controla la visibilidad para que puedas probar el efecto incluso si tu hoja de estilos no incluye ese comportamiento.</p>`;
        }

        // Próximo elemento: w3-clear
        else if (clase === "w3-clear") {
            titulo.textContent = "w3-clear";
            contenido.innerHTML = `
                <p>Limpia los elementos flotantes anteriores para que el contenido siguiente no quede afectado por ellos.</p>
                <div style="padding:12px; border:1px solid #ddd;">
                    <div class="w3-left" style="width:100px; padding:12px; background:#2196F3; color:white;">
                        Izquierda
                    </div>
                    <div class="w3-right" style="width:100px; padding:12px; background:#009688; color:white;">
                        Derecha
                    </div>
                    <div class="w3-clear"></div>
                    <div style="padding:16px; background:#FFF3E0; border:1px solid #FFCC80;">
                        <strong>Contenido posterior</strong>
                        <p>Este bloque comienza debajo de los elementos flotantes.</p>
                    </div>
                </div>
                <p>Sin limpiar los flotados, el siguiente contenido puede situarse a su lado o quedar rodeado por ellos.</p>`;
        }
// Próximo bloque 17

        // Próximo elemento: w3-opacity
        else if (clase === "w3-opacity") {
            titulo.textContent = "w3-opacity";
            contenido.innerHTML = `
                <p>Aplica una opacidad de aproximadamente 0,6, haciendo que el elemento se vea parcialmente transparente.</p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:center;">
                    <div style="padding:20px; background:#2196F3; color:white;">Normal</div>
                    <div class="w3-opacity" style="padding:20px; background:#2196F3; color:white;">w3-opacity</div>
                </div>
                <p>Compara ambos elementos. La opacidad afecta tanto al fondo como al contenido del elemento.</p>`;
        }

        // Próximo elemento: w3-opacity-off
        else if (clase === "w3-opacity-off") {
            titulo.textContent = "w3-opacity-off";
            contenido.innerHTML = `
                <p>Devuelve la opacidad completa al elemento, con un valor de 1, es decir, el 100 %.</p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:center;">
                    <div class="w3-opacity" style="padding:20px; background:#009688; color:white;">Opacidad reducida</div>
                    <div class="w3-opacity-off" style="padding:20px; background:#009688; color:white;">Opacidad completa</div>
                </div>
                <p>La segunda caja debe verse completamente opaca.</p>`;
        }

        // Próximo elemento: w3-opacity-min
        else if (clase === "w3-opacity-min") {
            titulo.textContent = "w3-opacity-min";
            contenido.innerHTML = `
                <p>Aplica una opacidad aproximada de 0,75, según los valores indicados en el catálogo.</p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:center;">
                    <div style="padding:20px; background:#673AB7; color:white;">Normal</div>
                    <div class="w3-opacity-min" style="padding:20px; background:#673AB7; color:white;">w3-opacity-min</div>
                </div>
                <p>Observa la diferencia entre el elemento normal y el elemento con opacidad reducida.</p>`;
        }

        // Próximo elemento: w3-opacity-max
        else if (clase === "w3-opacity-max") {
            titulo.textContent = "w3-opacity-max";
            contenido.innerHTML = `
                <p>Aplica una opacidad aproximada de 0,25, haciendo que el elemento sea mucho más transparente.</p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:center;">
                    <div style="padding:20px; background:#E91E63; color:white;">Normal</div>
                    <div class="w3-opacity-max" style="padding:20px; background:#E91E63; color:white;">w3-opacity-max</div>
                </div>
                <p>Cuanto menor es la opacidad, más se transparenta el elemento.</p>`;
        }

        // Próximo elemento: w3-grayscale
        else if (clase === "w3-grayscale") {
            titulo.textContent = "w3-grayscale / w3-greyscale";
            contenido.innerHTML = `
                <p>Aplica un efecto de escala de grises. La tabla recoge un efecto aproximado del 75 % y ambas grafías como equivalentes.</p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:flex-start;">
                    <div style="flex:1; min-width:180px;">
                        <p><strong>Imagen original</strong></p>
                        <img src="img/img_lights.jpg" alt="Imagen original en color" style="width:100%; height:160px; object-fit:cover;">
                    </div>
                    <div style="flex:1; min-width:180px;">
                        <p><strong>Escala de grises</strong></p>
                        <img class="w3-grayscale" src="img/img_lights.jpg" alt="Imagen con escala de grises" style="width:100%; height:160px; object-fit:cover;">
                    </div>
                </div>
                <p>Las dos imágenes utilizan el mismo archivo local para que puedas comparar el efecto.</p>`;
        }

        // Próximo elemento: w3-grayscale-max
        else if (clase === "w3-grayscale-max") {
            titulo.textContent = "w3-grayscale-max";
            contenido.innerHTML = `
                <p>Aplica una escala de grises completa, eliminando prácticamente toda la información de color.</p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:flex-start;">
                    <div style="flex:1; min-width:180px;">
                        <p><strong>Original</strong></p>
                        <img src="img/img_lights.jpg" alt="Imagen original en color" style="width:100%; height:180px; object-fit:cover;">
                    </div>
                    <div style="flex:1; min-width:180px;">
                        <p><strong>Grises al máximo</strong></p>
                        <img class="w3-grayscale-max" src="img/img_lights.jpg" alt="Imagen en escala de grises completa" style="width:100%; height:180px; object-fit:cover;">
                    </div>
                </div>
                <p>Este efecto resulta útil para crear una apariencia monocromática.</p>`;
        }

        // Próximo elemento: w3-grayscale-min
        else if (clase === "w3-grayscale-min") {
            titulo.textContent = "w3-grayscale-min";
            contenido.innerHTML = `
                <p>Aplica un efecto parcial de escala de grises, aproximadamente del 50 % según la tabla.</p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:flex-start;">
                    <div style="flex:1; min-width:180px;">
                        <p><strong>Original</strong></p>
                        <img src="img/img_lights.jpg" alt="Imagen original en color" style="width:100%; height:180px; object-fit:cover;">
                    </div>
                    <div style="flex:1; min-width:180px;">
                        <p><strong>Grises parciales</strong></p>
                        <img class="w3-grayscale-min" src="img/img_lights.jpg" alt="Imagen con escala de grises parcial" style="width:100%; height:180px; object-fit:cover;">
                    </div>
                </div>
                <p>El efecto parcial conserva parte del color original.</p>`;
        }

        // Próximo elemento: w3-sepia-min
        else if (clase === "w3-sepia-min") {
            titulo.textContent = "w3-sepia-min";
            contenido.innerHTML = `
                <p>Aplica un efecto sepia parcial, aproximadamente del 50 % según la tabla.</p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:flex-start;">
                    <div style="flex:1; min-width:180px;">
                        <p><strong>Original</strong></p>
                        <img src="img/img_lights.jpg" alt="Imagen original en color" style="width:100%; height:180px; object-fit:cover;">
                    </div>
                    <div style="flex:1; min-width:180px;">
                        <p><strong>Sepia parcial</strong></p>
                        <img class="w3-sepia-min" src="img/img_lights.jpg" alt="Imagen con efecto sepia parcial" style="width:100%; height:180px; object-fit:cover;">
                    </div>
                </div>
                <p>El sepia añade una tonalidad cálida, similar a la de algunas fotografías antiguas.</p>`;
        }

        // Próximo elemento: w3-sepia
        else if (clase === "w3-sepia") {
            titulo.textContent = "w3-sepia";
            contenido.innerHTML = `
                <p>Aplica un efecto sepia aproximado del 75 % según la tabla.</p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:flex-start;">
                    <div style="flex:1; min-width:180px;">
                        <p><strong>Original</strong></p>
                        <img src="img/img_lights.jpg" alt="Imagen original en color" style="width:100%; height:180px; object-fit:cover;">
                    </div>
                    <div style="flex:1; min-width:180px;">
                        <p><strong>Sepia</strong></p>
                        <img class="w3-sepia" src="img/img_lights.jpg" alt="Imagen con efecto sepia" style="width:100%; height:180px; object-fit:cover;">
                    </div>
                </div>
                <p>Compara el cambio de color entre ambas imágenes.</p>`;
        }

        // Próximo elemento: w3-sepia-max
        else if (clase === "w3-sepia-max") {
            titulo.textContent = "w3-sepia-max";
            contenido.innerHTML = `
                <p>Aplica el efecto sepia al máximo, creando una apariencia cálida y antigua.</p>
                <div style="display:flex; gap:16px; flex-wrap:wrap; align-items:flex-start;">
                    <div style="flex:1; min-width:180px;">
                        <p><strong>Original</strong></p>
                        <img src="img/img_lights.jpg" alt="Imagen original en color" style="width:100%; height:180px; object-fit:cover;">
                    </div>
                    <div style="flex:1; min-width:180px;">
                        <p><strong>Sepia máximo</strong></p>
                        <img class="w3-sepia-max" src="img/img_lights.jpg" alt="Imagen con efecto sepia máximo" style="width:100%; height:180px; object-fit:cover;">
                    </div>
                </div>
                <p>El resultado depende de los filtros definidos en la hoja de estilos de W3.CSS.</p>`;
        }

        // Próximo elemento: w3-overlay
        else if (clase === "w3-overlay") {
            titulo.textContent = "w3-overlay";
            contenido.innerHTML = `
                <p>Crea una capa superpuesta, por ejemplo, para oscurecer un fondo y destacar contenido.</p>
                <div style="position:relative; min-height:220px; overflow:hidden; background:#90A4AE; border:1px solid #78909C;">
                    <img src="img/img_lights.jpg" alt="Paisaje de fondo" style="width:100%; height:220px; object-fit:cover; display:block;">
                    <div class="w3-overlay" style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.55); color:white; z-index:1;">
                        <div style="text-align:center; padding:16px;">
                            <h3>Contenido superpuesto</h3>
                            <p>La capa oscurece el fondo para mejorar el contraste.</p>
                        </div>
                    </div>
                </div>
                <p>En este ejemplo, los estilos en línea delimitan la capa al panel para no cubrir la ventana del catálogo.</p>`;
        }

        // Próximo elemento: w3-hover-shadow
        else if (clase === "w3-hover-shadow") {
            titulo.textContent = "w3-hover-shadow";
            contenido.innerHTML = `
                <p>Añade una sombra al elemento cuando el puntero pasa por encima.</p>
                <div style="display:flex; gap:20px; flex-wrap:wrap;">
                    <div style="flex:1; min-width:160px; padding:24px; background:#E3F2FD; border:1px solid #BBDEFB;">
                        <h3>Sin sombra</h3>
                        <p>Elemento normal.</p>
                    </div>
                    <div class="w3-hover-shadow" tabindex="0" style="flex:1; min-width:160px; padding:24px; background:#E8F5E9; border:1px solid #C8E6C9; transition:box-shadow 0.3s;">
                        <h3>Con w3-hover-shadow</h3>
                        <p>Pasa el puntero o utiliza el foco del teclado.</p>
                    </div>
                </div>
                <p>La sombra proporciona sensación de profundidad y ayuda a destacar tarjetas o paneles interactivos.</p>`;
        }
// Próximo bloque 18

    // Próximo elemento: w3-danger
    else if (clase === "w3-danger") {
        titulo.textContent = "w3-danger";
        contenido.innerHTML = `
            <p>Clase semántica para representar una situación negativa o peligrosa.</p>
            <div class="w3-container w3-padding w3-margin-bottom"
                 style="background-color:#f44336; color:white;">
                <strong>¡Error!</strong> No se pudo completar la operación.
            </div>
            <p><strong>Uso:</strong> mensajes de error o situaciones que requieren atención.</p>
            <p><em>Nota:</em> el color mostrado es una simulación visual para este ejemplo.</p>
        `;
    }

    // Próximo elemento: w3-warning
    else if (clase === "w3-warning") {
        titulo.textContent = "w3-warning";
        contenido.innerHTML = `
            <p>Clase semántica para mostrar una advertencia.</p>
            <div class="w3-container w3-padding w3-margin-bottom"
                 style="background-color:#ff9800; color:black;">
                <strong>Advertencia:</strong> revisa los datos antes de continuar.
            </div>
            <p><strong>Uso:</strong> avisar de una posible incidencia o de una acción que requiere precaución.</p>
            <p><em>Nota:</em> el color mostrado es una simulación visual para este ejemplo.</p>
        `;
    }

    // Próximo elemento: w3-success
    else if (clase === "w3-success") {
        titulo.textContent = "w3-success";
        contenido.innerHTML = `
            <p>Clase semántica para representar un resultado positivo.</p>
            <div class="w3-container w3-padding w3-margin-bottom"
                 style="background-color:#4caf50; color:white;">
                <strong>Correcto:</strong> los datos se han guardado correctamente.
            </div>
            <p><strong>Uso:</strong> confirmar que una operación se ha realizado con éxito.</p>
            <p><em>Nota:</em> el color mostrado es una simulación visual para este ejemplo.</p>
        `;
    }

    // Próximo elemento: w3-info
    else if (clase === "w3-info") {
        titulo.textContent = "w3-info";
        contenido.innerHTML = `
            <p>Clase semántica para presentar información neutral.</p>
            <div class="w3-container w3-padding w3-margin-bottom"
                 style="background-color:#2196f3; color:white;">
                <strong>Información:</strong> el sistema está funcionando con normalidad.
            </div>
            <p><strong>Uso:</strong> comunicar información útil sin indicar un error ni una advertencia.</p>
            <p><em>Nota:</em> el color mostrado es una simulación visual para este ejemplo.</p>
        `;
    }

    // Próximo elemento: w3-note
    else if (clase === "w3-note") {
        titulo.textContent = "w3-note";
        contenido.innerHTML = `
            <p>Clase semántica para destacar una nota o un aviso.</p>
            <div class="w3-container w3-padding w3-margin-bottom"
                 style="background-color:#ffeb3b; color:black;">
                <strong>Nota:</strong> recuerda guardar los cambios antes de salir.
            </div>
            <p><strong>Uso:</strong> resaltar observaciones y recordatorios.</p>
            <p><em>Nota:</em> el color mostrado es una simulación visual para este ejemplo.</p>
        `;
    }

    // Próximo elemento: w3-transparent
    else if (clase === "w3-transparent") {
        titulo.textContent = "w3-transparent";
        contenido.innerHTML = `
            <p>Clase destinada a dejar transparente el fondo de un elemento.</p>
            <div class="w3-container w3-padding w3-border w3-margin-bottom"
                 style="background-color:#d9eaf7;">
                <div style="padding:12px; background-color:#4b83b5; color:white;">
                    Fondo azul del contenedor interior
                </div>
                <div class="w3-transparent w3-padding w3-border"
                     style="color:black;">
                    Este elemento utiliza w3-transparent.
                </div>
            </div>
            <p><strong>Observa:</strong> el fondo del segundo elemento deja ver el color que hay detrás.</p>
            <p><em>Nota:</em> la apariencia final depende del CSS de W3.CSS que tengas cargado.</p>
        `;
    }
// Próximo bloque 19

    // Próximo elemento: w3-text-red
    else if (clase === "w3-text-red") {
        titulo.textContent = "w3-text-red";
        contenido.innerHTML = `
            <p>Esta clase aplica un color rojo al texto.</p>
            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <p class="w3-text-red" style="font-size:22px;">
                    Este texto es de color rojo.
                </p>
                <p>Este texto conserva su color habitual.</p>
            </div>
            <p><strong>Uso:</strong> destacar errores, alertas o palabras importantes.</p>
        `;
    }

    // Próximo elemento: w3-text-green
    else if (clase === "w3-text-green") {
        titulo.textContent = "w3-text-green";
        contenido.innerHTML = `
            <p>Esta clase aplica un color verde al texto.</p>
            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <p class="w3-text-green" style="font-size:22px;">
                    Operación realizada correctamente.
                </p>
                <p>Este texto conserva su color habitual.</p>
            </div>
            <p><strong>Uso:</strong> indicar resultados positivos o acciones completadas.</p>
        `;
    }

    // Próximo elemento: w3-text-blue
    else if (clase === "w3-text-blue") {
        titulo.textContent = "w3-text-blue";
        contenido.innerHTML = `
            <p>Esta clase aplica un color azul al texto.</p>
            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <p class="w3-text-blue" style="font-size:22px;">
                    Información importante del sistema.
                </p>
                <p>Este texto conserva su color habitual.</p>
            </div>
            <p><strong>Uso:</strong> destacar información, enlaces o mensajes informativos.</p>
        `;
    }

    // Próximo elemento: w3-text-grey
    else if (clase === "w3-text-grey") {
        titulo.textContent = "w3-text-grey";
        contenido.innerHTML = `
            <p>Esta clase aplica un color gris al texto. La variante w3-text-gray puede estar disponible según la hoja de estilos utilizada.</p>
            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <p class="w3-text-grey" style="font-size:22px;">
                    Este texto es de color gris.
                </p>
                <p>Este texto conserva su color habitual.</p>
            </div>
            <p><strong>Uso:</strong> mostrar información secundaria o aclaraciones sin darles demasiado protagonismo.</p>
        `;
    }

    // Próximo elemento: w3-text-black
    else if (clase === "w3-text-black") {
        titulo.textContent = "w3-text-black";
        contenido.innerHTML = `
            <p>Esta clase aplica el color negro al texto.</p>
            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <p class="w3-text-black" style="font-size:22px;">
                    Este texto es de color negro.
                </p>
                <p>Este texto conserva su color habitual.</p>
            </div>
            <p><strong>Uso:</strong> establecer un texto negro explícito, independientemente del color heredado del elemento.</p>
        `;
    }
// Próximo bloque 20

    // Próximo elemento: w3-hover-blue
    else if (clase === "w3-hover-blue") {
        titulo.textContent = "w3-hover-blue";
        contenido.innerHTML = `
            <p>Esta familia cambia el fondo del elemento cuando pasamos el puntero sobre él.</p>
            <div class="w3-container w3-padding w3-border w3-hover-blue w3-margin-bottom"
                 style="cursor:pointer;">
                <strong>¡Pasa el puntero por aquí!</strong>
                <p>El fondo cambiará a azul si la clase está disponible en tu versión de W3.CSS.</p>
            </div>
            <p><strong>Prueba también:</strong> w3-hover-red y w3-hover-green.</p>
            <p><em>Uso:</em> destacar botones, filas, enlaces y otros elementos interactivos.</p>
        `;
    }

    // Próximo elemento: w3-hover-text-red
    else if (clase === "w3-hover-text-red") {
        titulo.textContent = "w3-hover-text-red";
        contenido.innerHTML = `
            <p>Esta clase cambia el color del texto al pasar el puntero.</p>
            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <p class="w3-hover-text-red" style="cursor:pointer;">
                    Pasa el puntero por este texto: debería volverse rojo.
                </p>
                <p class="w3-hover-text-blue" style="cursor:pointer;">
                    Pasa el puntero por este otro texto: debería volverse azul.
                </p>
            </div>
            <p><strong>Uso:</strong> resaltar textos y enlaces sin cambiar el fondo del elemento.</p>
            <p><em>Observación:</em> el segundo ejemplo utiliza w3-hover-text-blue para comparar dos colores.</p>
        `;
    }

    // Próximo elemento: w3-hover-border-color
    else if (clase === "w3-hover-border-color") {
        titulo.textContent = "w3-hover-border-color";
        contenido.innerHTML = `
            <p>Este ejemplo ilustra cómo cambiar el color de un borde al interactuar.</p>
            <div class="w3-container w3-padding w3-border w3-margin-bottom"
                 style="border:3px solid #9e9e9e !important;
                        transition:border-color 0.3s;
                        cursor:pointer;"
                 onmouseover="this.style.borderColor='#2196f3'"
                 onmouseout="this.style.borderColor='#9e9e9e'">
                <strong>Pasa el puntero por aquí.</strong>
                <p>El borde cambiará de gris a azul.</p>
            </div>
            <p><strong>Uso:</strong> destacar tarjetas, campos o paneles cuando el usuario interactúa con ellos.</p>
            <p><em>Nota:</em> el cambio se simula con JavaScript y estilos en línea para que el ejemplo sea visible aunque tu versión de W3.CSS no incluya esa clase exacta.</p>
        `;
    }

    // Próximo elemento: w3-hover-opacity
    else if (clase === "w3-hover-opacity") {
        titulo.textContent = "w3-hover-opacity";
        contenido.innerHTML = `
            <p>Esta familia reúne efectos visuales que se activan al pasar el puntero.</p>

            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <p><strong>1. w3-hover-opacity</strong></p>
                <div class="w3-hover-opacity w3-padding"
                     style="background:#2196f3; color:white; cursor:pointer;">
                    Pasa el puntero para observar el cambio de transparencia.
                </div>

                <p><strong>2. w3-hover-shadow</strong></p>
                <div class="w3-hover-shadow w3-padding w3-margin-bottom"
                     style="background:#e0e0e0; color:black; cursor:pointer;">
                    Pasa el puntero para observar la sombra.
                </div>

                <p><strong>3. w3-hover-none</strong></p>
                <div class="w3-hover-none w3-padding"
                     style="background:#ffeb3b; color:black; cursor:pointer;">
                    Ejemplo para observar el comportamiento de w3-hover-none.
                </div>
            </div>

            <p><strong>Uso:</strong> añadir o controlar efectos visuales sin necesidad de crear varios elementos.</p>
            <p><em>Importante:</em> los efectos concretos dependen de las clases que incluya la versión de W3.CSS que tengas cargada.</p>
        `;
    }
// Próximo bloque 21

    // Próximo elemento: w3-round-small
    else if (clase === "w3-round-small") {
        titulo.textContent = "w3-round-small";
        contenido.innerHTML = `
            <p>La familia w3-round controla el redondeo de las esquinas de un elemento.</p>

            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <div class="w3-container w3-blue w3-round-small w3-padding w3-margin-bottom">
                    w3-round-small
                </div>

                <div class="w3-container w3-green w3-round w3-padding w3-margin-bottom">
                    w3-round / w3-round-medium
                </div>

                <div class="w3-container w3-orange w3-round-large w3-padding w3-margin-bottom">
                    w3-round-large
                </div>

                <div class="w3-container w3-purple w3-round-xlarge w3-padding w3-margin-bottom">
                    w3-round-xlarge
                </div>

                <div class="w3-container w3-red w3-round-xxlarge w3-padding">
                    w3-round-xxlarge
                </div>
            </div>

            <p><strong>Observa:</strong> cuanto mayor es el tamaño del radio, más redondeadas aparecen las esquinas.</p>
            <p><em>Nota:</em> el resultado exacto depende de los valores definidos en la versión de W3.CSS que tengas cargada.</p>
        `;
    }

    // Próximo elemento: w3-round
    else if (clase === "w3-round") {
        titulo.textContent = "w3-round / w3-round-medium";
        contenido.innerHTML = `
            <p>Estas clases aplican un redondeo moderado a las esquinas.</p>

            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <div class="w3-blue w3-round w3-padding">
                    Ejemplo de esquinas redondeadas.
                </div>
            </div>

            <p><strong>Uso:</strong> tarjetas, paneles, imágenes y otros elementos que necesitan esquinas suavizadas.</p>
        `;
    }

    // Próximo elemento: w3-round-large
    else if (clase === "w3-round-large") {
        titulo.textContent = "w3-round-large";
        contenido.innerHTML = `
            <p>Aplica un redondeo mayor que el de w3-round.</p>

            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <div class="w3-green w3-round-large w3-padding">
                    Esquinas más redondeadas.
                </div>
            </div>

            <p><strong>Uso:</strong> destacar tarjetas, bloques de contenido o botones.</p>
        `;
    }

    // Próximo elemento: w3-round-xlarge
    else if (clase === "w3-round-xlarge") {
        titulo.textContent = "w3-round-xlarge";
        contenido.innerHTML = `
            <p>Aplica un redondeo extra grande.</p>

            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <div class="w3-purple w3-round-xlarge w3-padding">
                    Redondeo extra grande.
                </div>
            </div>

            <p><strong>Uso:</strong> crear elementos con una apariencia más suave y destacada.</p>
        `;
    }

    // Próximo elemento: w3-round-xxlarge
    else if (clase === "w3-round-xxlarge") {
        titulo.textContent = "w3-round-xxlarge";
        contenido.innerHTML = `
            <p>Aplica un redondeo muy grande a las esquinas.</p>

            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <div class="w3-red w3-round-xxlarge w3-padding">
                    Redondeo extra extra grande.
                </div>
            </div>

            <p><strong>Uso:</strong> diseños con esquinas muy suaves o elementos visuales destacados.</p>
        `;
    }
// Próximo bloque 22

    // Próximo elemento: w3-padding-small
    else if (clase === "w3-padding-small") {
        titulo.textContent = "w3-padding-small";
        contenido.innerHTML = `
            <p>Aplica un relleno interior pequeño.</p>
            <div style="background:#e0e0e0; margin-bottom:12px;">
                <div class="w3-blue w3-padding-small" style="color:white;">
                    w3-padding-small
                </div>
            </div>
            <p><strong>Relleno indicado:</strong> 4 px arriba y abajo, 8 px a los lados.</p>
        `;
    }

    // Próximo elemento: w3-padding
    else if (clase === "w3-padding") {
        titulo.textContent = "w3-padding";
        contenido.innerHTML = `
            <p>Aplica el relleno interior estándar.</p>
            <div style="background:#e0e0e0; margin-bottom:12px;">
                <div class="w3-green w3-padding" style="color:white;">
                    w3-padding
                </div>
            </div>
            <p><strong>Relleno indicado:</strong> 8 px arriba y abajo, 16 px a los lados.</p>
        `;
    }

    // Próximo elemento: w3-padding-large
    else if (clase === "w3-padding-large") {
        titulo.textContent = "w3-padding-large";
        contenido.innerHTML = `
            <p>Aplica un relleno interior grande.</p>
            <div style="background:#e0e0e0; margin-bottom:12px;">
                <div class="w3-orange w3-padding-large" style="color:black;">
                    w3-padding-large
                </div>
            </div>
            <p><strong>Relleno indicado:</strong> 12 px arriba y abajo, 24 px a los lados.</p>
        `;
    }

    // Próximo elemento: w3-padding-16
    else if (clase === "w3-padding-16") {
        titulo.textContent = "w3-padding-16";
        contenido.innerHTML = `
            <p>Aplica 16 px de relleno en la parte superior e inferior.</p>
            <div style="background:#e0e0e0;">
                <div class="w3-blue w3-padding-16" style="color:white;">
                    w3-padding-16
                </div>
            </div>
        `;
    }

    // Próximo elemento: w3-padding-24
    else if (clase === "w3-padding-24") {
        titulo.textContent = "w3-padding-24";
        contenido.innerHTML = `
            <p>Aplica 24 px de relleno en la parte superior e inferior.</p>
            <div style="background:#e0e0e0;">
                <div class="w3-purple w3-padding-24" style="color:white;">
                    w3-padding-24
                </div>
            </div>
        `;
    }

    // Próximo elemento: w3-padding-32
    else if (clase === "w3-padding-32") {
        titulo.textContent = "w3-padding-32";
        contenido.innerHTML = `
            <p>Aplica 32 px de relleno en la parte superior e inferior.</p>
            <div style="background:#e0e0e0;">
                <div class="w3-green w3-padding-32" style="color:white;">
                    w3-padding-32
                </div>
            </div>
        `;
    }

    // Próximo elemento: w3-padding-48
    else if (clase === "w3-padding-48") {
        titulo.textContent = "w3-padding-48";
        contenido.innerHTML = `
            <p>Aplica 48 px de relleno en la parte superior e inferior.</p>
            <div style="background:#e0e0e0;">
                <div class="w3-orange w3-padding-48" style="color:black;">
                    w3-padding-48
                </div>
            </div>
        `;
    }

    // Próximo elemento: w3-padding-64
    else if (clase === "w3-padding-64") {
        titulo.textContent = "w3-padding-64";
        contenido.innerHTML = `
            <p>Aplica 64 px de relleno en la parte superior e inferior.</p>
            <div style="background:#e0e0e0;">
                <div class="w3-blue w3-padding-64" style="color:white;">
                    w3-padding-64
                </div>
            </div>
        `;
    }

    // Próximo elemento: w3-padding-top-64
    else if (clase === "w3-padding-top-64") {
        titulo.textContent = "w3-padding-top-64";
        contenido.innerHTML = `
            <p>Aplica relleno únicamente en la parte superior.</p>
            <div style="background:#e0e0e0;">
                <div class="w3-red w3-padding-top-64" style="color:white;">
                    w3-padding-top-64
                </div>
            </div>
            <p><strong>Variantes:</strong> w3-padding-top-48, w3-padding-top-32 y w3-padding-top-24.</p>
            <p>El número indica la cantidad de píxeles de relleno superior.</p>
        `;
    }
// Próximo bloque 23

    // Próximo elemento: w3-margin
    else if (clase === "w3-margin") {
        titulo.textContent = "w3-margin";
        contenido.innerHTML = `
            <p>Aplica un margen exterior alrededor del elemento.</p>
            <div style="background:#eeeeee; padding:4px;">
                <div class="w3-blue w3-margin w3-padding" style="color:white;">
                    w3-margin
                </div>
            </div>
            <p><strong>Margen:</strong> 16 px alrededor del elemento.</p>
            <p>Observa el espacio gris que queda entre el bloque azul y los límites del contenedor.</p>
        `;
    }

    // Próximo elemento: w3-margin-top
    else if (clase === "w3-margin-top") {
        titulo.textContent = "w3-margin-top";
        contenido.innerHTML = `
            <p>Aplica margen únicamente en la parte superior.</p>
            <div style="background:#eeeeee; padding:4px;">
                <div class="w3-gray w3-padding">Elemento anterior</div>
                <div class="w3-blue w3-margin-top w3-padding" style="color:white;">
                    w3-margin-top
                </div>
            </div>
            <p><strong>Margen superior:</strong> 16 px.</p>
        `;
    }

    // Próximo elemento: w3-margin-right
    else if (clase === "w3-margin-right") {
        titulo.textContent = "w3-margin-right";
        contenido.innerHTML = `
            <p>Aplica margen únicamente en el lado derecho.</p>
            <div style="background:#eeeeee; padding:4px;">
                <div class="w3-blue w3-margin-right w3-padding"
                     style="display:inline-block; color:white;">
                    w3-margin-right
                </div>
                <span>Elemento situado a continuación</span>
            </div>
            <p><strong>Margen derecho:</strong> 16 px.</p>
        `;
    }

    // Próximo elemento: w3-margin-bottom
    else if (clase === "w3-margin-bottom") {
        titulo.textContent = "w3-margin-bottom";
        contenido.innerHTML = `
            <p>Aplica margen únicamente en la parte inferior.</p>
            <div style="background:#eeeeee; padding:4px;">
                <div class="w3-blue w3-padding" style="color:white;">
                    w3-margin-bottom
                </div>
                <div class="w3-gray w3-padding">Elemento siguiente</div>
            </div>
            <p><strong>Margen inferior:</strong> 16 px.</p>
        `;
    }

    // Próximo elemento: w3-margin-left
    else if (clase === "w3-margin-left") {
        titulo.textContent = "w3-margin-left";
        contenido.innerHTML = `
            <p>Aplica margen únicamente en el lado izquierdo.</p>
            <div style="background:#eeeeee; padding:4px;">
                <div class="w3-blue w3-margin-left w3-padding"
                     style="color:white;">
                    w3-margin-left
                </div>
            </div>
            <p><strong>Margen izquierdo:</strong> 16 px.</p>
        `;
    }

    // Próximo elemento: w3-section
    else if (clase === "w3-section") {
        titulo.textContent = "w3-section";
        contenido.innerHTML = `
            <p>Se utiliza para separar verticalmente secciones o elementos.</p>
            <div style="background:#eeeeee; padding:4px;">
                <div class="w3-gray w3-padding">Contenido anterior</div>
                <div class="w3-blue w3-section w3-padding" style="color:white;">
                    w3-section
                </div>
                <div class="w3-gray w3-padding">Contenido siguiente</div>
            </div>
            <p><strong>Margen:</strong> 16 px arriba y abajo.</p>
            <p><strong>Uso:</strong> separar bloques de contenido para mejorar la distribución visual.</p>
        `;
    }
// Próximo bloque 24


    // Próximo elemento: w3-border
    else if (clase === "w3-border") {
        titulo.textContent = "w3-border";
        contenido.innerHTML = `
            <p>Aplica un borde alrededor de los cuatro lados del elemento.</p>
            <div class="w3-container w3-border w3-padding w3-margin-bottom">
                Este elemento tiene un borde en sus cuatro lados.
            </div>
            <p><strong>Uso:</strong> delimitar paneles, cajas y bloques de contenido.</p>
        `;
    }

    // Próximo elemento: w3-border-top
    else if (clase === "w3-border-top") {
        titulo.textContent = "w3-border-top";
        contenido.innerHTML = `
            <p>Aplica un borde únicamente en la parte superior.</p>
            <div class="w3-container w3-border-top w3-padding w3-margin-bottom">
                Este elemento tiene un borde superior.
            </div>
            <p><strong>Uso:</strong> separar visualmente el contenido que aparece debajo.</p>
        `;
    }

    // Próximo elemento: w3-border-right
    else if (clase === "w3-border-right") {
        titulo.textContent = "w3-border-right";
        contenido.innerHTML = `
            <p>Aplica un borde únicamente en el lado derecho.</p>
            <div class="w3-container w3-border-right w3-padding w3-margin-bottom">
                Este elemento tiene un borde derecho.
            </div>
            <p><strong>Uso:</strong> crear separaciones verticales en paneles o columnas.</p>
        `;
    }

    // Próximo elemento: w3-border-bottom
    else if (clase === "w3-border-bottom") {
        titulo.textContent = "w3-border-bottom";
        contenido.innerHTML = `
            <p>Aplica un borde únicamente en la parte inferior.</p>
            <div class="w3-container w3-border-bottom w3-padding w3-margin-bottom">
                Este elemento tiene un borde inferior.
            </div>
            <p><strong>Uso:</strong> separar filas, títulos o bloques de contenido.</p>
        `;
    }

    // Próximo elemento: w3-border-left
    else if (clase === "w3-border-left") {
        titulo.textContent = "w3-border-left";
        contenido.innerHTML = `
            <p>Aplica un borde únicamente en el lado izquierdo.</p>
            <div class="w3-container w3-border-left w3-padding w3-margin-bottom">
                Este elemento tiene un borde izquierdo.
            </div>
            <p><strong>Uso:</strong> destacar notas, citas o mensajes informativos.</p>
        `;
    }

    // Próximo elemento: w3-border-0
    else if (clase === "w3-border-0") {
        titulo.textContent = "w3-border-0";
        contenido.innerHTML = `
            <p>Elimina los bordes del elemento.</p>
            <div class="w3-container w3-border-0 w3-padding w3-margin-bottom"
                 style="outline:1px dashed #999;">
                Este elemento utiliza w3-border-0.
            </div>
            <p><strong>Observa:</strong> la línea discontinua es un contorno de referencia, no un borde aplicado por w3-border.</p>
        `;
    }

    // Próximo elemento: w3-border-color
    else if (clase === "w3-border-color") {
        titulo.textContent = "w3-border-color";
        contenido.innerHTML = `
            <p>El color de un borde puede personalizarse mediante una clase compatible o una regla CSS.</p>
            <div class="w3-container w3-padding w3-margin-bottom"
                 style="border:3px solid #2196f3;">
                Borde azul
            </div>
            <div class="w3-container w3-padding"
                 style="border:3px solid #f44336;">
                Borde rojo
            </div>
            <p><strong>Observa:</strong> aquí usamos CSS en línea para definir los colores de forma explícita.</p>
        `;
    }

    // Próximo elemento: w3-bottombar
    else if (clase === "w3-bottombar") {
        titulo.textContent = "w3-bottombar";
        contenido.innerHTML = `
            <p>Destaca la parte inferior de un elemento con una barra gruesa.</p>
            <div class="w3-container w3-bottombar w3-border-blue w3-padding w3-margin-bottom">
                Este bloque tiene una barra inferior.
            </div>
            <p><strong>Uso:</strong> separar secciones o destacar encabezados y mensajes.</p>
        `;
    }

    // Próximo elemento: w3-leftbar
    else if (clase === "w3-leftbar") {
        titulo.textContent = "w3-leftbar";
        contenido.innerHTML = `
            <p>Destaca el lado izquierdo con una barra gruesa.</p>
            <div class="w3-container w3-leftbar w3-border-green w3-padding w3-margin-bottom">
                Este bloque tiene una barra izquierda.
            </div>
            <p><strong>Uso:</strong> identificar notas, citas y mensajes destacados.</p>
        `;
    }

    // Próximo elemento: w3-rightbar
    else if (clase === "w3-rightbar") {
        titulo.textContent = "w3-rightbar";
        contenido.innerHTML = `
            <p>Destaca el lado derecho con una barra gruesa.</p>
            <div class="w3-container w3-rightbar w3-border-red w3-padding w3-margin-bottom">
                Este bloque tiene una barra derecha.
            </div>
            <p><strong>Uso:</strong> crear un acento visual en el lado derecho del contenido.</p>
        `;
    }

    // Próximo elemento: w3-topbar
    else if (clase === "w3-topbar") {
        titulo.textContent = "w3-topbar";
        contenido.innerHTML = `
            <p>Destaca la parte superior con una barra gruesa.</p>
            <div class="w3-container w3-topbar w3-border-orange w3-padding w3-margin-bottom">
                Este bloque tiene una barra superior.
            </div>
            <p><strong>Uso:</strong> destacar el inicio de una sección o separar visualmente contenidos.</p>
        `;
    }
// Próximo bloque 25

    // Próximo elemento: w3-dark-mode
    else if (clase === "w3-dark-mode") {
        titulo.textContent = "w3-dark-mode";
        contenido.innerHTML = `
            <p>Esta clase pretende aplicar un tema oscuro a una página o sección mediante variables CSS y colores adaptados a ese tema.</p>

            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <h4>Modo claro</h4>
                <div style="background:#f1f1f1; color:#222; padding:16px; border-radius:4px;">
                    <strong>Panel claro</strong>
                    <p>Fondo claro y texto oscuro.</p>
                </div>
            </div>

            <div class="w3-container w3-padding w3-border w3-margin-bottom">
                <h4>Modo oscuro</h4>
                <div class="w3-dark-mode w3-padding"
                     style="border-radius:4px;">
                    <strong>Panel oscuro</strong>
                    <p>Fondo oscuro y texto claro.</p>
                    <p>Este panel utiliza la clase w3-dark-mode.</p>
                </div>
            </div>

            <p><strong>¿Qué debes observar?</strong></p>
            <ul>
                <li>El fondo y el texto adaptados al tema oscuro.</li>
                <li>El comportamiento de las variables CSS del tema.</li>
                <li>La diferencia entre colores adaptables y colores explícitos.</li>
            </ul>

            <p><em>Importante:</em> w3-dark-mode no es una clase estándar de todas las versiones de W3.CSS. Este ejemplo solo aplicará el tema oscuro si tu hoja de estilos define esa clase y sus variables correspondientes.</p>
        `;
    }
// Próximo bloque 26 final

    // Próximo elemento: --w3-font-family
    else if (clase === "--w3-font-family") {
        titulo.textContent = "--w3-font-family";
        contenido.innerHTML = `
            <p>Define la familia tipográfica predeterminada del cuerpo de la página.</p>
            <div style="font-family:Verdana,sans-serif; padding:16px; background:#f1f1f1;">
                <strong>Verdana, sans-serif</strong>
                <p>Este texto utiliza la fuente Verdana.</p>
            </div>
            <p><strong>Ejemplo de sobrescritura:</strong></p>
            <pre>:root {
    --w3-font-family: Arial, sans-serif;
}</pre>
            <p>La variable solo tendrá efecto si las reglas de la hoja de estilos la utilizan.</p>
        `;
    }

    // Próximo elemento: --w3-heading-font-family
    else if (clase === "--w3-heading-font-family") {
        titulo.textContent = "--w3-heading-font-family";
        contenido.innerHTML = `
            <p>Permite definir una fuente específica para los encabezados.</p>
            <div style="font-family:'Segoe UI',Arial,sans-serif; padding:16px; border:1px solid #ccc;">
                <h2 style="margin-top:0;">Encabezado de ejemplo</h2>
                <p>Texto normal del panel.</p>
            </div>
            <pre>:root {
    --w3-heading-font-family: "Segoe UI", Arial, sans-serif;
}</pre>
            <p>Así puedes diferenciar la tipografía de los títulos de la del cuerpo.</p>
        `;
    }

    // Próximo elemento: --w3-font-size
    else if (clase === "--w3-font-size") {
        titulo.textContent = "--w3-font-size";
        contenido.innerHTML = `
            <p>Establece el tamaño de fuente predeterminado.</p>
            <div style="font-size:15px; padding:16px; background:#f1f1f1;">
                <p style="margin:0;">Este texto tiene un tamaño de 15 píxeles.</p>
            </div>
            <pre>:root {
    --w3-font-size: 15px;
}</pre>
            <p>Si las reglas CSS usan esta variable, cambiar su valor permite ajustar el tamaño base del texto.</p>
        `;
    }

    // Próximo elemento: --w3-line-height
    else if (clase === "--w3-line-height") {
        titulo.textContent = "--w3-line-height";
        contenido.innerHTML = `
            <p>Controla la altura de línea y el espacio vertical entre líneas de texto.</p>
            <div style="line-height:1.5; padding:12px; background:#f1f1f1;">
                Este es un ejemplo de texto con una altura de línea de 1.5. La separación facilita la lectura de párrafos largos.
            </div>
            <pre>:root {
    --w3-line-height: 1.5;
}</pre>
            <p>Un valor mayor aumenta el espacio entre líneas; uno menor las acerca.</p>
        `;
    }

    // Próximo elemento: --w3-content-max-width
    else if (clase === "--w3-content-max-width") {
        titulo.textContent = "--w3-content-max-width";
        contenido.innerHTML = `
            <p>Define el ancho máximo que puede alcanzar el contenido cuando el CSS del framework utiliza esta variable.</p>
            <div style="max-width:980px; margin:auto; padding:12px; background:#dbeafe; border:1px solid #2563eb; box-sizing:border-box;">
                <strong>Contenedor de ejemplo</strong>
                <p style="margin-bottom:0;">Su ancho no supera los 980 píxeles, aunque el espacio disponible sea mayor.</p>
            </div>
            <pre>:root {
    --w3-content-max-width: 980px;
}</pre>
            <p>El contenedor también necesita una regla CSS que aplique esta variable.</p>
        `;
    }

    // Próximo elemento: --w3-page-bg
    else if (clase === "--w3-page-bg") {
        titulo.textContent = "--w3-page-bg";
        contenido.innerHTML = `
            <p>Representa el color de fondo de la página.</p>
            <div style="background:#fff; color:#222; border:1px solid #ccc; padding:16px;">
                <strong>Fondo de página</strong>
                <p style="margin-bottom:0;">Color blanco: #fff.</p>
            </div>
            <pre>:root {
    --w3-page-bg: #fff;
}</pre>
            <p>Para cambiar el fondo real de la página, la regla correspondiente debe utilizar <code>background-color: var(--w3-page-bg)</code>.</p>
        `;
    }

    // Próximo elemento: --w3-text-color
    else if (clase === "--w3-text-color") {
        titulo.textContent = "--w3-text-color";
        contenido.innerHTML = `
            <p>Define el color de texto predeterminado.</p>
            <div style="color:#000; background:#fff; padding:16px; border:1px solid #ccc;">
                <strong>Texto negro</strong>
                <p style="margin-bottom:0;">Color de ejemplo: #000.</p>
            </div>
            <pre>:root {
    --w3-text-color: #000;
}</pre>
            <p>Las reglas que utilicen esta variable podrán adaptar el color de texto de forma centralizada.</p>
        `;
    }

    // Próximo elemento: --w3-surface
    else if (clase === "--w3-surface") {
        titulo.textContent = "--w3-surface";
        contenido.innerHTML = `
            <p>Representa el fondo principal de componentes como paneles o tarjetas.</p>
            <div style="background:#fff; color:#222; border:1px solid #ccc; padding:16px;">
                <strong>Tarjeta de ejemplo</strong>
                <p style="margin-bottom:0;">Superficie blanca sobre el fondo que la rodea.</p>
            </div>
            <pre>:root {
    --w3-surface: #fff;
}</pre>
            <p>Una superficie común ayuda a mantener una apariencia coherente entre componentes.</p>
        `;
    }

    // Próximo elemento: --w3-surface-alt
    else if (clase === "--w3-surface-alt") {
        titulo.textContent = "--w3-surface-alt";
        contenido.innerHTML = `
            <p>Define un fondo alternativo, por ejemplo para filas de tablas o fragmentos de código.</p>
            <div style="border:1px solid #ccc;">
                <div style="padding:10px; background:#fff;">Fila normal</div>
                <div style="padding:10px; background:#f1f1f1;">Fila alternativa: #f1f1f1</div>
            </div>
            <pre>:root {
    --w3-surface-alt: #f1f1f1;
}</pre>
            <p>Alternar fondos ayuda a distinguir visualmente las filas y los bloques.</p>
        `;
    }

    // Próximo elemento: --w3-codespan-text
    else if (clase === "--w3-codespan-text") {
        titulo.textContent = "--w3-codespan-text";
        contenido.innerHTML = `
            <p>Establece el color del texto de código en línea, si el estilo del framework utiliza esta variable.</p>
            <div style="padding:16px; background:#f1f1f1;">
                Ejemplo: <code style="color:#d2143a;">var nombre = "Ana";</code>
            </div>
            <pre>:root {
    --w3-codespan-text: #d2143a;
}</pre>
            <p>El fragmento de código destaca gracias a su color diferente del texto normal.</p>
        `;
    }

    // Próximo elemento: --w3-border-color
    else if (clase === "--w3-border-color") {
        titulo.textContent = "--w3-border-color";
        contenido.innerHTML = `
            <p>Define el color de borde predeterminado.</p>
            <div style="border:2px solid #ccc; padding:16px;">
                <strong>Panel con borde</strong>
                <p style="margin-bottom:0;">Borde de ejemplo: #ccc.</p>
            </div>
            <pre>:root {
    --w3-border-color: #ccc;
}</pre>
            <p>Permite cambiar el color de los bordes de varios componentes desde una sola variable.</p>
        `;
    }

    // Próximo elemento: --w3-border-light
    else if (clase === "--w3-border-light") {
        titulo.textContent = "--w3-border-light";
        contenido.innerHTML = `
            <p>Se utiliza para separadores sutiles entre filas, listas u otros elementos.</p>
            <div style="border-top:1px solid #ddd; border-bottom:1px solid #ddd;">
                <div style="padding:12px;">Elemento uno</div>
                <div style="padding:12px; border-top:1px solid #ddd;">Elemento dos</div>
                <div style="padding:12px; border-top:1px solid #ddd;">Elemento tres</div>
            </div>
            <pre>:root {
    --w3-border-light: #ddd;
}</pre>
            <p>Los separadores suaves organizan el contenido sin destacar demasiado.</p>
        `;
    }

    // Próximo elemento: --w3-hover-bg
    else if (clase === "--w3-hover-bg") {
        titulo.textContent = "--w3-hover-bg";
        contenido.innerHTML = `
            <p>Define el fondo que puede aplicarse cuando el puntero pasa sobre un elemento.</p>
            <div style="padding:12px; border:1px solid #ccc;">
                <div style="padding:12px; background:#ccc; cursor:pointer;"
                     onmouseover="this.style.background='#aaa'"
                     onmouseout="this.style.background='#ccc'">
                    Pasa el puntero por aquí
                </div>
            </div>
            <pre>:root {
    --w3-hover-bg: #ccc;
}</pre>
            <p>Esta demostración simula el cambio de fondo. La variable debe estar conectada a una regla CSS para controlar los estados hover reales.</p>
        `;
    }

    // Próximo elemento: --w3-hover-text
    else if (clase === "--w3-hover-text") {
        titulo.textContent = "--w3-hover-text";
        contenido.innerHTML = `
            <p>Define el color del texto durante el estado hover, cuando el CSS correspondiente utiliza esta variable.</p>
            <div style="padding:12px; border:1px solid #ccc;">
                <div style="padding:12px; color:#000; cursor:pointer;"
                     onmouseover="this.style.color='#d2143a'"
                     onmouseout="this.style.color='#000'">
                    Pasa el puntero por este texto
                </div>
            </div>
            <pre>:root {
    --w3-hover-text: #000;
}</pre>
            <p>El cambio de color del ejemplo es ilustrativo; el efecto depende de las reglas CSS que apliquen la variable.</p>
        `;
    }

    // Próximo elemento: --w3-danger-bg
    else if (clase === "--w3-danger-bg") {
        titulo.textContent = "--w3-danger-bg";
        contenido.innerHTML = `
            <p>Define el fondo asociado a un estado de peligro o error.</p>
            <div style="background:#dd0000; color:#fff; padding:16px; border-radius:4px;">
                <strong>¡Peligro!</strong>
                <p style="margin-bottom:0;">Ejemplo de mensaje de error.</p>
            </div>
            <pre>:root {
    --w3-danger-bg: #dd0000;
}</pre>
            <p>Un color intenso ayuda a destacar mensajes que requieren atención.</p>
        `;
    }

    // Próximo elemento: --w3-danger-text
    else if (clase === "--w3-danger-text") {
        titulo.textContent = "--w3-danger-text";
        contenido.innerHTML = `
            <p>Define el color del texto utilizado en mensajes de peligro.</p>
            <div style="background:#dd0000; color:#fff; padding:16px; border-radius:4px;">
                <strong>¡Atención!</strong>
                <p style="margin-bottom:0;">El texto blanco contrasta con el fondo rojo.</p>
            </div>
            <pre>:root {
    --w3-danger-text: #fff;
}</pre>
            <p>El contraste adecuado mejora la legibilidad del mensaje.</p>
        `;
    }

    // Próximo elemento: --w3-note-bg
    else if (clase === "--w3-note-bg") {
        titulo.textContent = "--w3-note-bg";
        contenido.innerHTML = `
            <p>Define el fondo de un aviso o nota informativa.</p>
            <div style="background:#fff599; color:#000; padding:16px; border-left:5px solid #e6cf00;">
                <strong>Nota</strong>
                <p style="margin-bottom:0;">Recuerda guardar los cambios antes de cerrar.</p>
            </div>
            <pre>:root {
    --w3-note-bg: #fff599;
}</pre>
            <p>Un fondo amarillo suave llama la atención sin resultar demasiado agresivo.</p>
        `;
    }

    // Próximo elemento: --w3-note-text
    else if (clase === "--w3-note-text") {
        titulo.textContent = "--w3-note-text";
        contenido.innerHTML = `
            <p>Define el color del texto de una nota.</p>
            <div style="background:#fff599; color:#000; padding:16px; border-left:5px solid #e6cf00;">
                <strong>Nota importante</strong>
                <p style="margin-bottom:0;">Texto negro sobre fondo amarillo.</p>
            </div>
            <pre>:root {
    --w3-note-text: #000;
}</pre>
            <p>El color del texto debe mantener un contraste suficiente con el fondo.</p>
        `;
    }

    // Próximo elemento: --w3-info-bg
    else if (clase === "--w3-info-bg") {
        titulo.textContent = "--w3-info-bg";
        contenido.innerHTML = `
            <p>Define el fondo de un mensaje informativo.</p>
            <div style="background:#0a6fc2; color:#fff; padding:16px; border-radius:4px;">
                <strong>Información</strong>
                <p style="margin-bottom:0;">La operación se ha completado.</p>
            </div>
            <pre>:root {
    --w3-info-bg: #0a6fc2;
}</pre>
            <p>El fondo azul distingue la información de los mensajes de advertencia o error.</p>
        `;
    }

    // Próximo elemento: --w3-info-text
    else if (clase === "--w3-info-text") {
        titulo.textContent = "--w3-info-text";
        contenido.innerHTML = `
            <p>Define el color del texto de un mensaje informativo.</p>
            <div style="background:#0a6fc2; color:#fff; padding:16px; border-radius:4px;">
                <strong>Información</strong>
                <p style="margin-bottom:0;">Texto blanco sobre fondo azul.</p>
            </div>
            <pre>:root {
    --w3-info-text: #fff;
}</pre>
            <p>Combinar fondo y texto con contraste facilita la lectura del aviso.</p>
        `;
    }

    // Próximo elemento: --w3-warning-bg
    else if (clase === "--w3-warning-bg") {
        titulo.textContent = "--w3-warning-bg";
        contenido.innerHTML = `
            <p>Define el fondo de un mensaje de advertencia.</p>
            <div style="background:#ffb305; color:#000; padding:16px; border-radius:4px;">
                <strong>Advertencia</strong>
                <p style="margin-bottom:0;">Comprueba los datos antes de continuar.</p>
            </div>
            <pre>:root {
    --w3-warning-bg: #ffb305;
}</pre>
            <p>El amarillo o ámbar suele utilizarse para llamar la atención sobre posibles problemas.</p>
        `;
    }

    // Próximo elemento: --w3-warning-text
    else if (clase === "--w3-warning-text") {
        titulo.textContent = "--w3-warning-text";
        contenido.innerHTML = `
            <p>Define el color del texto de una advertencia.</p>
            <div style="background:#ffb305; color:#000; padding:16px; border-radius:4px;">
                <strong>Advertencia</strong>
                <p style="margin-bottom:0;">Texto negro sobre fondo ámbar.</p>
            </div>
            <pre>:root {
    --w3-warning-text: #000;
}</pre>
            <p>El color negro permite mantener una buena legibilidad sobre este fondo claro.</p>
        `;
    }

    // Próximo elemento: --w3-success-bg
    else if (clase === "--w3-success-bg") {
        titulo.textContent = "--w3-success-bg";
        contenido.innerHTML = `
            <p>Define el fondo de un mensaje de éxito.</p>
            <div style="background:#008a00; color:#fff; padding:16px; border-radius:4px;">
                <strong>¡Correcto!</strong>
                <p style="margin-bottom:0;">La operación se ha completado con éxito.</p>
            </div>
            <pre>:root {
    --w3-success-bg: #008a00;
}</pre>
            <p>El verde suele asociarse con operaciones completadas correctamente.</p>
        `;
    }

    // Próximo elemento: --w3-success-text
    else if (clase === "--w3-success-text") {
        titulo.textContent = "--w3-success-text";
        contenido.innerHTML = `
            <p>Define el color del texto de un mensaje de éxito.</p>
            <div style="background:#008a00; color:#fff; padding:16px; border-radius:4px;">
                <strong>Operación correcta</strong>
                <p style="margin-bottom:0;">Texto blanco sobre fondo verde.</p>
            </div>
            <pre>:root {
    --w3-success-text: #fff;
}</pre>
            <p>El texto y el fondo deben combinarse para que el mensaje sea fácil de leer.</p>
        `;
    }


    // Abrimos el modal.
    modal.style.display = "block";

    console.log("Clase solicitada:", clase);
    console.log("Contenido insertado:", contenido.innerHTML);
    console.log("Visualización del modal:", modal.style.display);
}

/* Cierra la ventana modal */
function cerrarEjemplo() {
    document.getElementById("modalEjemplo").style.display = "none";
}



// ==================================================
// MODO OSCURO: alternar tema claro y oscuro
// ==================================================

const botonTema = document.getElementById("alternar-tema");

// Comprobamos que el botón existe en la página.
if (botonTema) {

    // Recuperamos el tema guardado, si existe.
    const temaGuardado = localStorage.getItem("tema");

    // Aplicamos el tema guardado al cargar la página.
    if (temaGuardado === "oscuro") {
        document.documentElement.classList.add("modo-oscuro");
        botonTema.textContent = "☀️";
        botonTema.setAttribute("aria-label", "Activar modo claro");
        botonTema.setAttribute("aria-pressed", "true");
    } else {
        document.documentElement.classList.remove("modo-oscuro");
        botonTema.textContent = "🌙";
        botonTema.setAttribute("aria-label", "Activar modo oscuro");
        botonTema.setAttribute("aria-pressed", "false");
    }

    // Alternamos el tema al pulsar el botón.
    botonTema.addEventListener("click", function () {

        const modoOscuroActivo =
            document.documentElement.classList.toggle("modo-oscuro");

        // Guardamos la preferencia para futuras visitas.
        localStorage.setItem(
            "tema",
            modoOscuroActivo ? "oscuro" : "claro"
        );

        // Actualizamos el icono y la accesibilidad del botón.
        botonTema.textContent = modoOscuroActivo ? "☀️" : "🌙";

        botonTema.setAttribute(
            "aria-label",
            modoOscuroActivo ? "Activar modo claro" : "Activar modo oscuro"
        );

        botonTema.setAttribute(
            "aria-pressed",
            modoOscuroActivo ? "true" : "false"
        );
    });
}
