import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IssuesService } from '../../services/issues.service';
import { LabelsSelectorComponent } from '../../components/labels-selector/labels-selector.component';

@Component({
  selector: 'app-issues-list-page',
  standalone: true,
  imports: [
    CommonModule, RouterLink, LabelsSelectorComponent,
  ],
  templateUrl: './issues-list-page.component.html',
})
export default class IssuesListPageComponent {

  public issuesService = inject(IssuesService);

  get labelsQuery() { //para que en el html llamemos a este get que hace referencia directamente a abelsQuery del servicio  issuesService
    return this.issuesService.labelsQuery;
  }
}
