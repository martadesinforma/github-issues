import { environment } from "../../../../environments/environment.development";
import { sleep } from "../../../helpers/sleep";
import { GitHubLabel } from "../interfaces/github-label.interface";


const BASE_URL = environment.baseUrl;


//esta función la vamos a llamar en el servicio issues.service.ts
export const getLabels = async (): Promise<GitHubLabel[]> => {

  await sleep(1500); //llamamamos a la funcion sleep() del archivo sleep.ts

  try {
    const resp = await fetch( //resp es un objeto Response que luce asi:  Response {type: 'cors', url: 'https://api.github.com/repos/angular/angular/labels', redirected: true, status: 200, ok: true, …}
      `${BASE_URL}/labels`,
    );

    if (!resp.ok) throw "Can't load labels";

    const labels: GitHubLabel[] = await resp.json(); // El .json() obtiene el body de la response pero traducido de formato JSON a formato JavaScript.Me regresa en este caso un arreglo de GitHubLabel. labels luce de esta forma: Array(30) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}...]

    return labels;
  } catch (error) {
    throw "Can't load labels";
  }
};

