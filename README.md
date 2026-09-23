## Funcionalidad EC1 F3 A4
GIFinder consulta GIPHY API para mostrar tendencias,
realizar búsquedas y consultar el detalle de un GIF.
## Configuración de la API
1. Crear una clave individual en GIPHY Developers.
2. Crear `.env.local` en la raíz del proyecto.
3. Agregar la variable:
```text
VITE_GIPHY_API_KEY=TU_CLAVE
```
4. Reiniciar el servidor de Vite.
`.env.local` no debe publicarse. El repositorio incluye
`.env.example` únicamente como referencia.
## Verificación
```bash
pnpm install
pnpm dev
pnpm build
```