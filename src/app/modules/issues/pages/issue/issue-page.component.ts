import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { IssueService } from '../../services/issue.service';
import { IssueCommentComponent } from "../../components/issue-comment/issue-comment.component";

@Component({
  selector: 'app-issue-page',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
    IssueCommentComponent
],
  templateUrl: './issue-page.component.html',
})
export default  class IssuePageComponent {

  route = inject(ActivatedRoute); //permite acceder a los parámetros de la ruta actual
  issueService = inject(IssueService);

  issueNumber = toSignal<string>( //convierte un observable en una señal reactiva en Angular. issueNumber se convierte en una señal reactiva que almacena el valor del parámetro number de la URL de la ruta, como texto (string), o una cadena vacía ('') si el parámetro number no existe en la URL.
    this.route.paramMap.pipe( // El observable paramMap emite el conjunto de parámetros de la ruta cada vez que cambian.
      map((params) => params.get('number') ?? ''), //extrae el parámetro number del paramMap. Si el parámetro no existe, devuelve una cadena vacía.
      tap((number) => {
        this.issueService.setIssueNumber(number);
      })

    )
  );

  issueQuery = this.issueService.issueQuery; //issueQuery es un  objeto que almacena propiedades y métodos relevantes
  issueCommentsQuery = this.issueService.issueCommentsQuery;  //issueCommentsQuery es un  objeto que almacena propiedades y métodos relevantes
 }
