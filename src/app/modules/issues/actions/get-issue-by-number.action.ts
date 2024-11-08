import { environment } from "../../../../environments/environment.development";
import { sleep } from "../../../helpers/sleep";
import { GitHubIssue } from "../interfaces/github-issue.interface";



const BASE_URL = environment.baseUrl;

//esta función la vamos a llamar en el servicio issue service
export const getIssueByNumber = async (issueNumber: string): Promise<GitHubIssue> => {

  await sleep(1500); //llamamamos a la funcion sleep() del archivo sleep.ts

  try {
    const resp = await fetch( //resp es un objeto Response que luce asi: Response {type: 'cors', url: 'https://api.github.com/repos/angular/angular/issues/58546', redirected: true, status: 200, ok: true, …}
      `${BASE_URL}/issues/${issueNumber}`,
    );

    if (!resp.ok) throw "Can't load issues";

    const issue: GitHubIssue = await resp.json(); // El .json() obtiene el body de la response pero traducido de formato JSON a formato JavaScript .Me regresa en este caso un GitHubIssue. issue luce de esta forma: {url: 'https://api.github.com/repos/angular/angular/issues/58546', repository_url: 'https://api.github.com/repos/angular/angular', labels_url: 'https://api.github.com/repos/angular/angular/issues/58546/labels{/name}', comments_url: 'https://api.github.com/repos/angular/angular/issues/58546/comments', events_url: 'https://api.github.com/repos/angular/angular/issues/58546/events', …}

    return issue;
  } catch (error) {
    throw "Can't load labels";
  }
};
