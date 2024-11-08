import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'issues',
    loadComponent: () => import('./modules/issues/pages/issues-list/issues-list-page.component'),  //conseguimos escrbir de manera tan corta la importacion pq en el archivo .ts hemos escrito **default** despues del nombre de la clase. Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/issues. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal.
  },
  {
    path: 'issue/:number',
    loadComponent: () => import('./modules/issues/pages/issue/issue-page.component'), //conseguimos escrbir de manera tan corta la importacion pq en el archivo .ts hemos escrito **default** despues del nombre de la clase. Angular necesita saber dónde en el DOM debe insertar este componente cuando la url sea  http://localhost:52951/issue/1. Aquí es donde entra en juego router-outlet. En este caso lo vamos a insertar en el app.component.html para que se muestre en la pagina principal. Podemos llegar hasta esta url cuando hacemos click en cada enlace (titulo) de cada issue  del  issue-item.component.html (<a [routerLink]="['/issue', issue().number]">{{ issue().title }}</a>)
  },
  {
    path: '**',
    redirectTo: 'issues',
  },

];
