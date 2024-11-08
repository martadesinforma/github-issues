import { environment } from "../../../../environments/environment.development";
import { sleep } from "../../../helpers/sleep";
import { GitHubIssue } from "../interfaces/github-issue.interface";



const BASE_URL = environment.baseUrl;

//esta función la vamos a llamar en el servicio issue service
export const getIssueCommentsByNumber = async (issueNumber: string): Promise<GitHubIssue[]> => {

  await sleep(1500); //llamamamos a la funcion sleep() del archivo sleep.ts

  try {
    const resp = await fetch( //resp es un objeto Response que luce asi: Response {type: 'cors', url: "https://api.github.com/repos/angular/angular/issues/58565/comments", redirected: true, status: 200, ok: true, …}
      `${BASE_URL}/issues/${issueNumber}/comments`,
    );

    if (!resp.ok) throw "Can't load issues";

    const issues: GitHubIssue[] = await resp.json(); // El .json() obtiene el body de la response pero traducido de formato JSON a formato JavaScript .Me regresa en este caso un array de GitHubIssue. issues luce de esta forma: Array(1)  0: {url: 'https://api.github.com/repos/angular/angular/issues/comments/2464395129', html_url: 'https://github.com/angular/angular/pull/58565#issuecomment-2464395129'...}

    return issues;
  } catch (error) {
    throw "Can't load labels";
  }
};
