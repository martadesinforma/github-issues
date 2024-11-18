import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GitHubIssue, State } from '../../interfaces/github-issue.interface';
import { IssueService } from '../../services/issue.service';

@Component({
  selector: 'issue-item',
  standalone: true,
  imports: [
    CommonModule, RouterLink,
  ],
  templateUrl: './issue-item.component.html',
})
export class IssueItemComponent { //El componente IssueItemComponent se va a insertar en el archivo issues-list-page.component.html mediante <issue-item></issue-item>

  issue = input.required<GitHubIssue>(); //Esta es información proveniente del componente issues-list-page
  issueService = inject(IssueService);

  get isOpen() {
    return this.issue().state === State.Open;
  }

  prefetcData() { //prepara los datos de un issue específico de la lista para que estén listos en la caché si el usuario decide acceder a él.
    this.issueService.prefetchIssue(this.issue().number.toString());
  }

}



