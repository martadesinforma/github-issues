import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getLabels } from '../actions/get-labels.action';
import { getIssues } from '../actions/get-issues.action';
import { State } from '../interfaces/github-issue.interface';

@Injectable({
  providedIn: 'root'
})

// Este servicio se va a utilizar en el componente issues-list-page
//Este código en Angular define un servicio (IssuesService) que utiliza TanStack Query para realizar una solicitud de datos mediante la función getLabels y getIssues. Cuando labelsQuery o issuesQuery se activan (por ejemplo, cuando el componente  issues-list-page lo utiliza), TanStack Query comprueba en su caché si hay datos almacenados bajo las claves ['labels'] y ['issues']. Si no hay datos en la caché o estos han caducado, TanStack Query ejecuta getLabels() y getIssues() para obtener datos de la API de GitHub. Una vez que los datos son recibidos, TanStack Query los almacena en la caché, bajo las claves ['labels'] y  ['issues'], y los proporciona al componente que utiliza labelsQuery y IssuesQuery.
export class IssuesService {

  selectedState = signal<State>(State.All); // Va a recibir como valor un 'all', 'open' o 'closed'.

 /*  selectedLabels = signal(new Set<string>()); */ //significa que selectedLabels almacenará un conjunto de etiquetas (strings). En este caso, se le pasa un Set<string> vacío (es decir, new Set<string>()) como valor inicial. Esto significa que selectedLabels comienza vacío y, a medida que se añaden o eliminan etiquetas, el estado reactivo se actualizará automáticamente.


  labelsQuery = injectQuery(() => ({ //labelsQuery es un observable que representa el estado de la consulta de etiquetas y se puede suscribir para obtener los datos
    queryKey: ['labels'], //queryKey: Define la clave única ['labels'] para esta consulta. Esto identifica la consulta en la caché de TanStack Query, permitiendo almacenar y reutilizar los resultados.
    queryFn: () => getLabels(), //queryFn: Es la función que se ejecuta para obtener los datos. Aquí, es una llamada directa a getLabels(), que realiza la solicitud HTTP.
  }));

  issuesQuery = injectQuery(() => ({
    queryKey: ['issues',
      {
        state: this.selectedState(),
       /*  selectedLabels: [...this.selectedLabels()] */ //El operador de propagación (...) toma todos los elementos del Set dentro de selectedLabels()  y los coloca en un nuevo arreglo ([]). Trabajamos con una copia. Si agregamos o eliminamos elementos en este array, no afectarás la señal original selectedLabels
      }
    ],
    queryFn: () => getIssues(this.selectedState(), /* [...this.selectedLabels()] */),
  }));


  //este método lo vamos a llamar en el  issues-list-page.component. Va a recibir como state un 'all', 'open' o 'closed'.
  showIssuesByState(state: State) {
    this.selectedState.set(state);
  }


  //Este método sirve para agregar o quitar una etiqueta de la colección selectedLabels, dependiendo de si ya está presente o no en el conjunto (Set). Vamos a llamar este método en el componente labels-selector y va a recibir como argumento el nombre de uno de los labels
/*   toggleLabel(label:string){
    const labels = this.selectedLabels(); //Obtiene el conjunto actual de etiquetas seleccionadas.

    if(labels.has(label)) {  //Si el conjunto ya contiene la etiqueta:
      labels.delete(label); //Elimina la etiqueta del conjunto
    }else{ //Si el conjunto no contiene la etiqueta
      labels.add(label) //Añade la etiqueta al conjunto
    }

    this.selectedLabels.set(new Set(labels)); //para actualizar la señal selectedLabels
  } */

}
