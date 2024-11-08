import { Injectable, signal } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { getIssueByNumber } from '../actions/get-issue-by-number.action';

@Injectable({
  providedIn: 'root'
})

// Este servicio se va a utilizar en el componente issue-page
export class IssueService {

  private issueNumber = signal<string | null>(null);

  issueQuery = injectQuery(() => ({ //issueQuery es un  objeto que almacena propiedades y métodos relevantes
    queryKey: ['issue', this.issueNumber()],
    queryFn: () => getIssueByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null, //enabled evaluará si this.issueNumber() no es null. Si this.issueNumber() tiene un valor (por ejemplo, "123"), entonces enabled será true, y la consulta queryFn se disparará, ejecutando getIssueByNumber con el valor actual de this.issueNumber(). Si this.issueNumber() es null, enabled será false, lo que evita que la consulta se ejecute.
  }));

  /* issueCommentsQuery = injectQuery(() => ({
    queryKey: ['issue', this.issueNumber(), 'comments'],
    queryFn: () => getIssueCommentsByNumber(this.issueNumber()!),
    enabled: this.issueNumber() !== null,
  })); */

  setIssueNumber(issueId: string) { //El valor de issueId es proporcionado por el componente issue-page. issueId va a tener  el valor del parámetro number de la URL de la ruta
    this.issueNumber.set(issueId);
  }

}
