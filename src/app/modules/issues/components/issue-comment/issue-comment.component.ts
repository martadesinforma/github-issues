import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GitHubIssue } from '../../interfaces/github-issue.interface';
import { MarkdownModule} from 'ngx-markdown';

@Component({
  selector: 'issue-comment',
  standalone: true,
  imports: [
    CommonModule, MarkdownModule,
  ],
  templateUrl: './issue-comment.component.html',
})
export class IssueCommentComponent {//El componente IssueCommentComponent se va a insertar en el archivo issue-page.component.html mediante <issue-comment [issue]="issueQuery.data()!"></issue-comment> y mediante <issue-comment [issue]="comment"></issue-comment>. De esta forma  maneja diferentes datos para representar tanto el "issue" principal como sus comentarios asociados.

  issue = input.required<GitHubIssue>(); //Esta es información proveniente del componente issue-page

 }
