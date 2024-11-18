import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { GitHubLabel } from '../../interfaces/github-label.interface';
import { IssuesService } from '../../services/issues.service';

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

  issuesService = inject(IssuesService);



  //Este método recibe como argumento el labelName cuando en el labels-selector.component.html hacemos click en uno de los labels
  /* onToggleLabel(labelName:string) {
    this.issuesService.toggleLabel(labelName)
  } */


  //El propósito de este método es determinar si una etiqueta específica está en el conjunto de etiquetas seleccionadas. Si el conjunto selectedLabels() contiene el labelName, .has(labelName) devolverá true, de lo contrario, devolverá false. Vamos a utilizar este método en el labels-selector.component.html para poner una clase en el label si está en el conjunto de etiqutas
  /* isSelected(labelName:string) {
    return this.issuesService.selectedLabels().has(labelName); //has retorna un valor booleano
  } */
}
