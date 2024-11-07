import { Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getLabels } from '../actions/get-labels';

@Injectable({
  providedIn: 'root'
})

// Este servicio se va a utilizar en el componente issues-list-page
//Este código en Angular define un servicio (IssuesService) que utiliza TanStack Query para realizar una solicitud de datos mediante la función getLabels y getIssues. Cuando labelsQuery se activa (por ejemplo, cuando el componente  issues-list-page lo utiliza), TanStack Query comprueba en su caché si hay datos almacenados bajo las claves ['labels'] y ['issues']. Si no hay datos en la caché o estos han caducado, TanStack Query ejecuta getLabels() y getIssues() para obtener datos de la API de GitHub. Una vez que los datos son recibidos, TanStack Query los almacena en la caché, bajo las claves ['labels'] y  ['issues'], y los proporciona al componente que utiliza labelsQuery.
export class IssuesService {

  labelsQuery = injectQuery(() => ({ //labelsQuery es un observable que representa el estado de la consulta de etiquetas y se puede suscribir para obtener los datos
    queryKey: ['labels'], //queryKey: Define la clave única ['labels'] para esta consulta. Esto identifica la consulta en la caché de TanStack Query, permitiendo almacenar y reutilizar los resultados.
    queryFn: () => getLabels(), //queryFn: Es la función que se ejecuta para obtener los datos. Aquí, es una llamada directa a getLabels(), que realiza la solicitud HTTP.
  }));

  /* issuesQuery = injectQuery(() => ({
    queryKey: ['issues'],
    queryFn: () => getIssues(),
  })); */

}
