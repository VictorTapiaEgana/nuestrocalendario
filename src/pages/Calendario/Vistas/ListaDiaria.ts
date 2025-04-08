import { esLocale } from '@fullcalendar/core/locales/es';

function formatearHora(date: Date): string {

    return date.toLocaleTimeString('es-CL', {
           hour: '2-digit',
           minute: '2-digit',
           hour12: false, 
    });
}

const ListaDiaria = ( arg ) => {

    const categoriaNombre = arg.event.extendedProps.tipo_evento_nombre || 'Sin categoría';                           
                         
    const container = document.createElement('div');
          container.style.width = '100%';
          container.style.boxSizing = 'border-box';
          container.style.overflow ='hidden';
          container.style.padding = '2px';
          container.style.fontSize = '12px';
  
    // Línea 1: Categoría
    const categoriaDiv = document.createElement('div');
          categoriaDiv.innerText = categoriaNombre;                                 
          categoriaDiv.style.backgroundColor = arg.event.extendedProps.color;
          categoriaDiv.style.color = '#333';
          categoriaDiv.style.fontWeight = 'bold';
          categoriaDiv.style.padding = '2px 4px';
          categoriaDiv.style.borderBottom = '1px solid #ccc';
  
    // Línea 2: Hora + Emoji + Título
    const infoDiv = document.createElement('div');
          infoDiv.style.display = 'flex';
          infoDiv.style.alignItems = 'center';
          infoDiv.style.gap = '4px';
          infoDiv.style.fontSize ='13px'
          infoDiv.style.padding = '2px 4px';
          infoDiv.innerHTML = `<div>
                                    <div>
                                        <span>${ arg.event.extendedProps.icono }</span>
                                        <strong>${ arg.event.title }</strong>
                                    </div>

                                    <div>        
                                        <span> ${ arg.event.extendedProps.descripcion } </span>
                                    </div>
                               </div>

                             `;
  
    container.appendChild(categoriaDiv);
    container.appendChild(infoDiv);
  
    return { domNodes: [container] };
  
}

export default ListaDiaria