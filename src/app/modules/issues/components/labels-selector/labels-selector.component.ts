import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces/github-label.interface';

@Component({
  selector: 'issues-labels-selector',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './labels-selector.component.html',
})
export class LabelsSelectorComponent { //El componente LabelsSelectorComponent se va a insertar en el archivo issues-list-page.component.html mediante <issues-labels-selector></issues-labels-selector>

  labels = input.required<GitHubLabel[]>(); //Esta es información proveniente del componente issues-list-page
}
