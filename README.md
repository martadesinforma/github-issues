## Pasos a seguir para hacer uso de este proyecto

 1. Clonar el proyecto
 2. Ejecutar ```npm install``` 
 3. Ejecutar la app ```ng serve -o```
 4. Para generar los archivos de producción lanzar `ng build`.


 # Este es un breve listado del contenido del proyecto:

1. Uso de Standalone components

2. Tailwind: Para instalarlo, hemos escrito en la terminal ` npm install -D tailwindcss postcss autoprefixer` y `npx tailwindcss init`. En el archivo tailwind.config.js que se ha creado tenemos que copiar este codigo `"./src/**/*.{html,ts}"`. En el archivo styles.css tenemos que copiar este codigo `@tailwind base; @tailwind components; @tailwind utilities`. Ahora en la terminal cancelamos el ng serve-o que habíamos lanzado al principio cuando comienzas el proyecto y lo vuelves a lanzar.

3. Zoneless: En el archivo app.config.ts he borrado este codigo provideZoneChangeDetection({ eventCoalescing: true }), y he escrito este otro provideExperimentalZonelessChangeDetection(),.Cuando pasas a Zoneless Change Detection, como indica esta configuración experimental, estás eliminando la dependencia de Zone.js para gestionar la detección de cambios. Esto significa que Angular ya no intercepta eventos automáticamente y no disparará la detección de cambios a menos que tú lo manejes explícitamente. Este enfoque tiene varias ventajas, como un mejor rendimiento y mayor control, pero requiere que el desarrollador gestione manualmente cuándo y cómo Angular debe actualizar el DOM. En el archivo angular.json borramos "zone.js" de todos los lugares donde aparezca.

4. Instalación TasStack Query: En la terminal escribimos los comandos `npm i @tanstack/angular-query-experimental`y `npm i @tanstack/angular-query-devtools-experimental`. Tambien tengo que modificar el archivo app.config.ts agregando el provider `provideAngularQuery(new QueryClient())`. En el archivo app.component.ts  tenemos que agregar la importación de `AngularQueryDevtools` y en el archivo app.component.html tenemos que escribir `<angular-query-devtools initialIsOpen></angular-query-devtools>`.

5. Uso de input(): En el componente labels-selector vamos a guardar en la variable labels (es una señal) información proveniente del componente issues-list-page mediante un input. En el issues-list-page.component.html hacemos la asociación: `<issues-labels-selector [labels]="labelsQuery.data() ?? []"></issues-labels-selector>`. Después vamos a hacer uso de este labels en el labels-selector.component.html. 
Tambien  En el componente issue-item vamos a guardar en la variable issue (es una señal) información proveniente del componente issues-list-page mediante un input. En el issues-list-page.component.html hacemos la asociación: `<issue-item [issue]="issue"></issue-item>`. Después vamos a hacer uso de este issue en el issue-item.component.html.
Tambien  En el componente issue-comment vamos a guardar en la variable issue (es una señal) información proveniente del componente issue-page mediante un input. En el issue-page.component.html hacemos la asociación: `<issue-comment [issue]="issueQuery.data()!"></issue-comment>` y la asociación `<issue-comment [issue]="comment"></issue-comment>`.De esta forma  maneja diferentes datos para representar tanto el "issue" principal como sus comentarios asociados. Después vamos a hacer uso de este issue en el issue-comment.component.html.

6. Instalación de Markdown: Markdown es un lenguaje de marcado ligero y sencillo que se utiliza principalmente para dar formato a texto en archivos de texto plano. En la terminal escribimos el comando `npm i ngx-markdown`.Tambien tengo que modificar el archivo app.config.ts agregando el provider `provideMarkdown()`. Como este Markdown lo voy a usar en el componente issue-comment, tengo que hacer la importación de `MarkdownModule` en el archivo issue-comment.component.ts y lo voy a usar en el issue-comment.component.html de esta manera:  <markdown></markdown>

7. Uso de prefetchQuery. El prefetch consiste en identificar qué información o recursos pueden ser necesarios en breve y comenzar a cargarlos en segundo plano, sin que el usuario se dé cuenta. Vamos a definir el método `prefetchIssue(issueId: string)` en el servicio issue.service.ts que permite cargar anticipadamente (o "prefetch") los datos de un issue específico cuando el usuario pasa el cursor sobre un elemento en la lista de issues. Este método lo vamos a llamar en el componente issue-item.component.ts

8. Incluir la hoja de estilos de Font Awesome en el index.html. Una vez que el archivo CSS de Font Awesome está vinculado, puedes usar su amplio catálogo de iconos en el HTML mediante clases predefinidas. Vamos a usar iconos en la página issue-item.component.html.

9. Testing: Hacemos testing en el componente get-issue-by-number.action.ts, y en el servicio issues.service.ts

# Estructura de esta aplicación:

### Dentro de la carpeta app
1. Carpeta helpers
  - sleep.ts function

2. Carpeta modules 
  2.1 carpeta issues
    2.1.1 carpeta actions
      - get-labels.action.ts function
      - get-issues.action.ts function
      - get-issue-by-number.action.ts function
    2.1.2 carpeta components
      - lables-selector component
      - issue-item component
      - issue-comment component
    2.1.3 carpeta interfaces
      - github-label.interface.ts
    2.1.4 carpeta pages
      - issues-list-page component
      - issue-page component
    2.1.5 carpeta services
      - issues service
      - issue service

### Fuera de la carpeta app
1. Carpeta environments
  - environments.ts
  - environments.development.ts
