
import { environment } from '../../../../environments/environment.development';
import { getIssueByNumber } from './get-issue-by-number.action';

const issueNumber = '123';
const BASE_URL = environment.baseUrl;


const mockIssue = {
  id: 123,
  number: issueNumber,
  body: '# Hola Mundo',
};

describe('GetIssueByNumber action', () => {


  //Esta prueba verifica que la función getIssueByNumber realice una solicitud fetch correctamente a la URL esperada y obtenga un "issue" exitosamente.
  it('should fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    // se crea una respuesta simulada (issueResponse)
    const issueResponse = new Response(JSON.stringify(mockIssue), {
      status: 200,
      statusText: 'OK',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse); //asegura que cada vez que fetch se llame en esta prueba, devolverá inmediatamente issueResponse.  Esto significa que no se hará una solicitud real a la red.

    const issue = await getIssueByNumber(issueNumber); //La función getIssueByNumber debería hacer una solicitud fetch a requestURL y devolver los datos del "issue" como un objeto. La respuesta simulada issueResponse garantiza que issue contendrá los datos de mockIssue.

    console.log(issue) //issue luce: {id: 123, number: '123', body: '# Hola Mundo'}

    expect(window.fetch).toHaveBeenCalledWith(requestURL); //verifica que window.fetch haya sido llamado con la URL esperada (requestURL).
  });



//esta prueba verifica el comportamiento de la función getIssueByNumber cuando la solicitud falla y recibe un error 404 Not Found
it('should not fetch issue successfully', async () => {
    const requestURL = `${BASE_URL}/issues/${issueNumber}`;
    const issueResponse = new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });

    spyOn(window, 'fetch').and.resolveTo(issueResponse); //Cada vez que fetch es llamado en esta prueba, devolverá la issueResponse con el error 404. Así se evita hacer una solicitud real, lo cual es útil para pruebas controladas.

    try {
      const issue = await getIssueByNumber(issueNumber);//intenta obtener el "issue". Como fetch responde con un 404, se espera que esta función lance un error.

      console.log(issue);

      expect(true).toBeFalse();// es una declaración que solo se ejecutará si getIssueByNumber no lanza un error (lo cual significaría que algo falló en la prueba). Esto asegura que si getIssueByNumber no maneja correctamente el error 404, la prueba fallará.
    } catch (error) { // se captura el error lanzado por getIssueByNumber
      expect(error).toBe(`Can't load labels`);
    }

  });
});
