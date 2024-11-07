
//para relentizar intencionalmente nuestra aplicación. Voy a llamar a esta función en la función getLabels del archivo get-labels.ts
export const sleep = async(ms:number) => {
  return new Promise(resolve => setTimeout(() => {
    resolve("Operación completada con éxito")
  }, ms));
}
