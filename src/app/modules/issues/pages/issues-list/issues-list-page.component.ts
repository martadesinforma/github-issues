import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssuesService } from '../../services/issues.service';
import { LabelsSelectorComponent } from '../../components/labels-selector/labels-selector.component';
import { IssueItemComponent } from "../../components/issue-item/issue-item.component";
import { State } from '../../interfaces/github-issue.interface';

@Component({
  selector: 'app-issues-list-page',
  standalone: true,
  imports: [
    CommonModule, LabelsSelectorComponent,
    IssueItemComponent
  ],
  templateUrl: './issues-list-page.component.html',
})
export default class IssuesListPageComponent {

  public issuesService = inject(IssuesService);

  get labelsQuery() { //para que en el html llamemos a este get que hace referencia directamente a labelsQuery del servicio  issuesService
    return this.issuesService.labelsQuery;
  }

  get issuesQuery() { //para que en el html llamemos a este get que hace referencia directamente a issuesQuery del servicio  issuesService
    return this.issuesService.issuesQuery;
  }


  onChangeState(newState: string) { //lo llamamos en el issues-list-page.html cada vez que clicamos el boton 'all', 'open' o 'closed' y este mñetodo recibe como newState un 'all', 'open' o 'closed'.
    let state;

    switch (newState) {
      case 'all':
        state = State.All;
        break;
      case 'open':
        state = State.Open;
        break;
      case 'closed':
        state = State.Closed;
        break;
      default:
        state = State.All; // Valor por defecto si newState no coincide con ningún caso
        break;
    }

    this.issuesService.showIssuesByState(state);

  }
}
