import { Injectable, signal } from '@angular/core';
import { injectQuery, injectQueryClient } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions/get-issue-by-number.action';
import { getIssueCommentsByNumber } from '../actions/get-issue-comments-by-number.action';

@Injectable({
  providedIn: 'root'
})

// Este servicio se va a utilizar en el componente issue-page
export class IssueService {

  private queryClient = injectQueryClient(); //QueryClient es una instancia que maneja la lógica principal de TanStack Query. Permite ejecutar consultas, prefetch, cachear datos y controlar el estado de las consultas a nivel global en la aplicación.
  private issueNumber = signal<string | null>(null);


  issueQuery = injectQuery(() => ({ //issueQuery es un  objeto que almacena propiedades y métodos relevantes
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null, //enabled evaluará si this.issueNumber() no es null. Si this.issueNumber() tiene un valor (por ejemplo, "123"), entonces enabled será true, y la consulta queryFn se disparará, ejecutando getIssueByNumber con el valor actual de this.issueNumber(). Si this.issueNumber() es null, enabled será false, lo que evita que la consulta se ejecute.
  }));

  issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  }));

  setIssueNumber(issueId: string) { //El valor de issueId es proporcionado por el componente issue-page. issueId va a tener  el valor del parámetro number de la URL de la ruta
    this.issueNumber.set(issueId);
  }

  //este método lo vamos a llamar en el issue-item component
  prefetchIssue(issueId: string) { // carga y almacena en caché los datos de un issue con el ID issueId
    this.queryClient.prefetchQuery({
      queryKey: ['issue', issueId],
      queryFn: () => getIssueByNumber(issueId), // recuperará los datos específicos del issue con el número issueId.
      staleTime: 1000 * 60 * 5, //Define el tiempo de "vigencia" de los datos en la caché (5 minutos aquí), para no hacer llamadas innecesarias si el usuario vuelve a ver el mismo issue dentro de ese tiempo.
    });
  }

}
