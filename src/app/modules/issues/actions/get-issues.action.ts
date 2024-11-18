import { environment } from "../../../../environments/environment.development";
import { sleep } from "../../../helpers/sleep";
import { GitHubIssue, State } from "../interfaces/github-issue.interface";



const BASE_URL = environment.baseUrl;


//esta función la vamos a llamar en el servicio issues.service.ts
export const getIssues = async (state: State = State.All, /* selectedLabels:string[] */): Promise<GitHubIssue[]> => { //en caso de no recibir argumento, por defecto será 'all'

  await sleep(1500); //llamamamos a la funcion sleep() del archivo sleep.ts

  const params = new URLSearchParams(); //params es una instancia de URLSearchParams, una clase que permite crear y manipular una cadena de parámetros de URL.
  params.append('state', state); //se agrega un parámetro de estado (state) a params utilizando el método append. Esto crea la cadena state=valor en los parámetros de la URL, donde valor será el estado especificado (all, open, o closed).

  /* if(selectedLabels.length > 0 ){
    params.append('labels', selectedLabels.join(','));
  } */

  try {
    const resp = await fetch( //resp es un objeto Response que luce asi: Response {type: 'cors', url: 'https://api.github.com/repos/angular/angular/issues', redirected: true, status: 200, ok: true, …}
      `${BASE_URL}/issues?${params}`,
    );

    if (!resp.ok) throw "Can't load issues";

    const issues: GitHubIssue[] = await resp.json(); // El .json() obtiene el body de la response pero traducido de formato JSON a formato JavaScript .Me regresa en este caso un arreglo de GitHubIssue. issues luce de esta forma: Array(30) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}...]



    return issues;
  } catch (error) {
    throw "Can't load labels";
  }
};

