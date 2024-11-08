import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GitHubIssue, State } from '../../interfaces/github-issue.interface';

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

  get isOpen() {
    return this.issue().state === State.Open;
  }

}



