
import { environment } from '../../../../environments/environment.development';
import { getIssueCommentsByNumber } from './get-issue-comments-by-number.action';

const issueNumber = '123';
const BASE_URL = environment.baseUrl;


const mockComments: any[] = [
  { id: 1, body: 'First comment', user: { login: 'user1' } },
  { id: 2, body: 'Second comment', user: { login: 'user2' } },
];

describe('GetIssueComments', () => {


  //Esta prueba verifica que la función getIssueCommentsByNumber realice una solicitud fetch correctamente a la URL esperada y obtenga  "issues" exitosamente.
  it('should fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    // se crea una respuesta simulada (issueResponse)
    const issueResponse = new Response(JSON.stringify(mockComments), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse); //asegura que cada vez que fetch se llame en esta prueba, devolverá inmediatamente issueResponse.  Esto significa que no se hará una solicitud real a la red.

    const issues = await getIssueCommentsByNumber(issueNumber); //La función getIssueCommentsByNumber debería hacer una solicitud fetch a requestURL y devolver los datos del "issues" como array de  objetos. La respuesta simulada issueResponse garantiza que issues contendrá los datos de mockComments.

    console.log(issues) //issues luce: [{id: 1, body: 'First comment', user: {login: 'user1'}}, {id: 2, body: 'Second comment', user: {login: 'user2'}},]

    expect(window.fetch).toHaveBeenCalledWith(requestURL); //verifica que window.fetch haya sido llamado con la URL esperada (requestURL).
  });



  //esta prueba verifica el comportamiento de la función getIssueCommentsByNumber cuando la solicitud falla y recibe un error 404 Not Found
  it('should not fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}/comments`;
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse); //Cada vez que fetch es llamado en esta prueba, devolverá la issueResponse con el error 404. Así se evita hacer una solicitud real, lo cual es útil para pruebas controladas.

    try {
      const issues = await getIssueCommentsByNumber(issueNumber);//intenta obtener  "issues". Como fetch responde con un 404, se espera que esta función lance un error.

      console.log(issues);

      expect(true).toBeFalse();// es una declaración que solo se ejecutará si getIssueCommentsByNumber no lanza un error (lo cual significaría que algo falló en la prueba). Esto asegura que si getIssueCommentsByNumber no maneja correctamente el error 404, la prueba fallará.
    } catch (error) { // se captura el error lanzado por getIssueCommentsByNumber
      expect(error).toBe(`Can't load labels`);
    }

  });
});
