import { environment } from "../../../../environments/environment.development";
import { sleep } from "../../../helpers/sleep";
import { GitHubIssue } from "../interfaces/github-issue.interface";



const BASE_URL = environment.baseUrl;


//esta función la vamos a llamar en el servicio issues.service.ts
export const getIssues = async (): Promise<GitHubIssue[]> => {

  await sleep(1500); //llamamamos a la funcion sleep() del archivo sleep.ts

  try {
    const resp = await fetch( //resp es un objeto Response que luce asi: Response {type: 'cors', url: 'https://api.github.com/repos/angular/angular/issues', redirected: true, status: 200, ok: true, …}
      `${BASE_URL}/issues`,
    );

    if (!resp.ok) throw "Can't load issues";

    const issues: GitHubIssue[] = await resp.json(); // El .json() obtiene el body de la response pero traducido de formato JSON a formato JavaScript .Me regresa en este caso un arreglo de GitHubIssue. labels luce de esta forma: Array(30) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}...]



    return issues;
  } catch (error) {
    throw "Can't load labels";
  }
};

