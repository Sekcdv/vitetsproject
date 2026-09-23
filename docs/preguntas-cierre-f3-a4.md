Preguntas de cierre - EC1 F3 A4

1. ¿Qué diferencia existe entre una operación síncrona y una asíncrona?

En una ejecución síncrona, cada instrucción se procesa de forma secuencial y bloqueante: el programa no avanza a la siguiente línea hasta que la tarea actual ha finalizado por completo (por ejemplo, al transformar un arreglo mediante el método .map()).

En cambio, en una operación asíncrona, la tarea inicia un proceso cuya respuesta o finalización puede diferir en el tiempo (como la realización de una solicitud de red HTTP a GIPHY). Durante la espera, el flujo principal del programa no se bloquea y la aplicación continúa escuchando e interactuando con los eventos del usuario.

2. ¿Cuáles son los estados de una promesa y qué relación tienen con async/await?

Los tres estados de una promesa son:

pending (pendiente): La operación asíncrona está en proceso y aún no se ha resuelto ni fallado.

fulfilled (cumplida): La operación se completó exitosamente y devuelve un valor.

rejected (rechazada): La operación falló o encontró un error.

La sintaxis async/await es una forma de consumir promesas de manera más legible. Al declarar una función con la palabra clave async, esta siempre devuelve una promesa. Dentro de ella, la instrucción await pausa de forma no bloqueante la ejecución de la función hasta que la promesa pase del estado pending a fulfilled (devolviendo el resultado) o a rejected (lanzando una excepción).

3. ¿Qué devuelve fetch y qué devuelve response.json()?

fetch(url): Devuelve una Promise que se resuelve en un objeto de tipo Response cuando el servidor responde con los encabezados de la solicitud HTTP.

response.json(): Es un método del objeto Response que lee el cuerpo de la respuesta hasta el final y devuelve una nueva Promise, la cual se resuelve convirtiendo el texto en formato JSON a un objeto/valor nativo de JavaScript.

4. ¿Por qué es necesario comprobar response.ok?

La función fetch solo rechaza su promesa cuando ocurre un fallo de red a nivel de conexión o transporte (por ejemplo, pérdida de conexión a internet). Sin embargo, si el servidor responde con un código de error HTTP como 401 (no autorizado), 404 (no encontrado) o 500 (error interno), la promesa devuelta por fetch se resolverá correctamente.

Por este motivo, es imprescindible verificar la propiedad booleana response.ok (que es true solo para estados HTTP entre 200 y 299) para validar que la respuesta fue exitosa antes de intentar interpretar y procesar el contenido JSON.

5. ¿Cómo se utilizan try, catch y unknown para manejar errores en GIFinder?

En GIFinder, las llamadas asíncronas (searchGifs, getTrendingGifs) se envuelven en bloques try...catch dentro de las funciones coordinadoras en main.ts:

try: Contiene el código asíncrono que realiza las peticiones a la API y actualiza la galería con los datos exitosos.

catch: Captura cualquier excepción generada durante el proceso (fallos de red, códigos de estado HTTP no válidos o errores al validar datos).

unknown: Se utiliza como el tipo del parámetro atrapado en la cláusula catch(error: unknown). Dado que en JavaScript se puede lanzar cualquier tipo de valor, evaluar error instanceof Error permite extraer de forma segura la propiedad error.message si está disponible o asignar un mensaje por defecto ("Error desconocido") para mostrar visualmente el estado de error en la interfaz sin romper la aplicación.

6. ¿Qué diferencia existe entre GiphyGif y Gif, y qué responsabilidad tiene mapGiphyGif?

GiphyGif: Es el modelo externo (src/models/giphy-response.interface.ts). Representa fielmente la estructura compleja, anidada y detallada de la respuesta que entrega directamente la API de GIPHY (incluyendo propiedades como fixed_width, original, etc.).

Gif: Es el modelo interno (src/models/gif.interface.ts). Define únicamente las propiedades simples y estables necesarias para renderizar las tarjetas y el modal de detalle dentro de la aplicación frontend.

mapGiphyGif: Es la función encargada de transformar y desacoplar los datos. Toma un objeto de tipo GiphyGif, extrae los valores requeridos, aplica valores por defecto si faltan datos y retorna un objeto limpio acorde a la interfaz interna Gif.

7. ¿Por qué se utiliza URLSearchParams al construir la solicitud?

Se utiliza para construir y codificar automáticamente la cadena de parámetros de consulta (query string) de una URL.

URLSearchParams asegura que caracteres especiales, espacios o símbolos dentro de las variables (como en la clave api_key o en el texto ingresado por el usuario en q) queden correctamente escapados en formato de URL (percent-encoding), previniendo URLs malformadas y evitando errores de sintaxis en la petición a la API.

8. ¿Qué significa Promise<Gif[]> en el tipo de retorno?

Indica que la función es asíncrona y devolverá una promesa. Una vez que esta promesa cambie al estado cumplido (fulfilled), entregará un valor final correspondiente a un arreglo de objetos de tipo Gif (Gif[]).

9. ¿Qué diferencia existe entre .env.local y .env.example, y por qué una variable VITE_ no debe considerarse secreta?

.env.local: Es un archivo privado ubicado en la raíz del proyecto que contiene los valores reales de las variables de entorno (como la clave de API activa). Este archivo está ignorado por Git y no debe publicarse bajo ninguna circunstancia.

.env.example: Es un archivo plantilla libre de credenciales sensibles que define los nombres de las variables requeridas por el proyecto. Este archivo sí se publica en el repositorio como referencia para otros desarrolladores.

Seguridad de variables VITE_: Cualquier variable de entorno que comience con el prefijo VITE_ es incrustada directamente por el empaquetador dentro del código ejecutable del cliente (JavaScript) al momento de la compilación. Por esta razón, cualquier usuario puede abrir las herramientas del navegador (Inspector/Red) y ver la clave expuesta en texto plano. Por tanto, no se debe considerar un secreto ni utilizar para guardar contraseñas, claves privadas o tokens confidenciales.

10. ¿Cómo comprobaste que .env.local no está versionado?

Se comprobó ejecutando los siguientes dos comandos en la terminal integrada dentro de la raíz del proyecto:

git check-ignore -v .env.local: Confirmó que existía una regla activa dentro de .gitignore ignorando de manera efectiva el archivo.

git ls-files .env.local: No devolvió ninguna salida, lo que verificó que Git no estaba haciendo rastreo o seguimiento previo de este archivo dentro de su índice.

11. ¿Por qué Loading puede observarse con mayor claridad al consultar una API?

A diferencia de trabajar con colecciones locales almacenadas en memoria (donde el acceso a los datos es inmediato y la interfaz responde en milisegundos), una petición de red enviada a través de internet implica latencia, tiempo de procesamiento en los servidores de GIPHY y transferencia de paquetes.

Este tiempo de respuesta real (que puede variar de cientos de milisegundos a varios segundos) permite que la aplicación mantenga visible el estado intermedio Loading ("Consultando GIPHY..."), ofreciendo una retroalimentación visual clara al usuario mientras la promesa se resuelve.

12. ¿Qué dificultad se presentó durante la integración y cómo comprobaste que quedó resuelta?

Dificultad: Tras crear el archivo .env.local, la variable de entorno VITE_GIPHY_API_KEY retornaba undefined al realizar la llamada desde gif.service.ts, haciendo que la petición fallara inmediatamente con el mensaje de error de configuración.

Comprobación/Solución: Se verificó que el nombre de la variable tuviera la sintaxis exacta con el prefijo VITE_ tanto en .env.local como en src/vite-env.d.ts. Posteriormente, se detuvo y reinició el servidor de desarrollo mediante pnpm dev (puesto que Vite requiere reiniciar el servidor para recargar los archivos .env). Se comprobó que quedó resuelto al inspeccionar la pestaña Network del navegador y observar que las solicitudes HTTP hacia la API de GIPHY retornaban el código 200 OK junto con la galería de GIFs.