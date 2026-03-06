// Archivo script.js - SOLUCIÓN AL SYNTAX ERROR

let contenido = [];

// Función para renderizar el contenido en el panel (Muestra la noticia del JSON)
async function renderizarContenido() {
    const newsSection = document.getElementById('news-section');
    newsSection.innerHTML = ''; 

    for (let index = 0; index < contenido.length; index++) {
        const item = contenido[index];
        
        if (item.tipo === 'noticia') {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-item';
            
            const img = document.createElement('img');
            img.src = item.imagen; 
            img.alt = `Noticia ${index + 1}`;
            img.loading = 'lazy';
            
            const p = document.createElement('p');
            p.textContent = item.texto; 
            
            newsItem.appendChild(img);
            newsItem.appendChild(p);
            
            if (item.link) {
                newsItem.style.cursor = 'pointer';
                newsItem.addEventListener('click', () => {
                    if (item.link !== '#') {
                        window.open(item.link, '_blank');
                    }
                });
            }
            
            newsSection.appendChild(newsItem);
        }
    }
}

// FUNCIÓN CORREGIDA: Aseguramos que sea 'async' para el bloque try/catch
async function cargarContenidoDesdeJSON(url = 'contenido.json.json') {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Error al cargar JSON:', response.status);
            return false;
        }
        const data = await response.json();
        if (data && data.length > 0) {
            contenido = data.filter(item => item.tipo === 'noticia');
            await renderizarContenido();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error al cargar JSON:', error);
        return false;
    }
}

// Lógica de carga
window.addEventListener('load', async () => {
    const statFills = document.querySelectorAll('.stat-fill');
    statFills.forEach((fill, index) => {
        setTimeout(() => {
            fill.style.width = fill.style.width;
        }, index * 100);
    });
    
    await cargarContenidoDesdeJSON();
});

window.actualizarContenido = function(nuevoContenido) {
    contenido = nuevoContenido;
    renderizarContenido();
};
