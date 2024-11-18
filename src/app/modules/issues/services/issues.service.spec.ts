import { TestBed } from "@angular/core/testing";
import { IssuesService } from "./issues.service";
import { provideAngularQuery, QueryClient } from "@tanstack/angular-query-experimental";
import { State } from "../interfaces/github-issue.interface";


describe('CalculatorService', () => {//describe es un agrupador de pruebas. La idea es que cada prueba sea atómica e independiente.

  let service: IssuesService; //Aún no se le asigna un valor, pero esto se hará en el bloque beforeEach().
  const queryClient = new QueryClient(); //queryClient es una instancia de QueryClient utilizada para manejar el estado y caché de datos en la aplicación.

  beforeEach(() => { //nos permite ejecutar algún tipo de código antes de cada prueba.
    TestBed.configureTestingModule({
     teardown: { //teardown.destroyAfterEach: false:  evita que el módulo de pruebas (TestingModule) se destruya después de cada prueba, manteniendo el estado entre pruebas (esto puede ser útil si se necesita conservar el estado de caché o conexión en ciertas pruebas).
      destroyAfterEach:false,
     },
     providers: [provideAngularQuery(queryClient)], //Esto permite que IssuesService y cualquier otro servicio que dependa de Angular Query use el mismo queryClient en las pruebas
    });
    service = TestBed.inject(IssuesService);
  });


  // Este código está verificando que el servicio IssuesService ha sido creado correctamente.
  it('should be created', () => {
    expect(service).toBeTruthy(); //verifica que se haya creado una instancia válida del servicio.
  });


 /*  //Esta prueba verifica que el servicio labelsQuery cargue una lista de etiquetas ("labels") correctamente y que cada etiqueta tenga las propiedades esperadas con los tipos de datos correctos.
  it('should load labels', async () => {
    const { data } = await service.labelsQuery.refetch();//.refetch() fuerza la recarga de los datos desde el servidor. La respuesta de refetch se desestructura para obtener data, que contiene el conjunto de etiquetas.

    expect(data?.length).toBe(30); //se espera que el servicio devuelva exactamente 30 etiquetas.
    const [label] = data!; //Se hace una desestructuración de arrays. Extrae el primer elemento de data y lo asigna a la variable label. En términos simples, si data es un array como [label1, label2, label3, ...], esta sintaxis extraerá label1 y lo asignará a label.
    //necesito que todas estas propiedades sean la data de label  y que cada una de ellas tenga el tipo de datos correcto.
    expect(typeof label.color).toBe('string');
    expect(typeof label.default).toBe('boolean');
    expect(typeof label.description).toBe('string');
    expect(typeof label.id).toBe('number');
    expect(typeof label.name).toBe('string');
    expect(typeof label.node_id).toBe('string');
    expect(typeof label.url).toBe('string');
  });


  //Esta prueba verifica que el servicio IssuesService puede cambiar el estado de los "issues" (incidencias) que se muestran en función de los estados CLOSED y OPEN.
   it('should set selected state, OPEN, CLOSED, ALL', async () => {
    service.showIssuesByState(State.Closed);//se llama al método showIssuesByState con State.Closed para indicar que solo se deben mostrar los "issues" en estado cerrado (Closed).
    expect(service.selectedState()).toBe(State.Closed); //verifica que selectedState() devuelve State.Closed, confirmando que el estado seleccionado ha sido configurado correctamente.

    const { data } = await service.issuesQuery.refetch(); //llama a refetch para recargar los datos con la configuración actual, esperando obtener solo "issues" con el estado Closed.

    data?.forEach((issue) => {// verifica que el estado de cada "issue" en los datos obtenidos sea Closed.
      expect(issue.state).toBe(State.Closed);
    });

    service.showIssuesByState(State.Open);//cambia el estado a Open, indicando que ahora se deben mostrar solo los "issues" en estado Open.
    const { data: dataOpen } = await service.issuesQuery.refetch();//recarga los datos para obtener solo "issues" con el estado Open, guardándolos en dataOpen

    dataOpen?.forEach((issue) => {//verifica que el estado de cada "issue" en los datos obtenidos sea Open.
      expect(issue.state).toBe(State.Open);
    });
  }); */

})
