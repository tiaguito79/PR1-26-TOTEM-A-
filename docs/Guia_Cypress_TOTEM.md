# Guia paso a paso - Automatizacion Cypress para TOTEM

Esta guia explica que se busca lograr con Cypress, que casos se automatizan primero y como documentar los resultados en el informe SQA.

## 1. Objetivo de Cypress en el proyecto

Cypress se usa para automatizar pruebas funcionales y pruebas de seguridad basica sobre el sistema TOTEM.

No es necesario automatizar los 100 casos documentados. La matriz completa sirve como entregable de casos de prueba en Excel/CSV, mientras que Cypress sirve como evidencia de automatizacion sobre un subconjunto representativo.

## 2. Casos iniciales automatizados

| Spec Cypress | Casos cubiertos | Tipo |
| --- | --- | --- |
| `cypress/e2e/admin-auth.cy.js` | TT-001, TT-002, TT-003, TT-006, TT-007 | Funcional / Seguridad |
| `cypress/e2e/security-api.cy.js` | TT-053, TT-071, TT-072, TT-073, TT-074, TT-076 | Seguridad API |
| `cypress/e2e/totem-client.cy.js` | TT-049, TT-050, TT-051 | Funcional cliente TOTEM |

Total inicial: 14 casos automatizados.

## 3. Que casos van con JMeter

Los casos de rendimiento y carga no se deben automatizar con Cypress. Para esos casos se usara JMeter.

| Caso | Motivo |
| --- | --- |
| TT-080 | Medicion de tiempo de carga del dashboard |
| TT-081 | Medicion de tiempo de carga del display del totem |
| TT-099 | Carga concurrente del endpoint `/api/totems/display/me` |
| TT-100 | Carga concurrente del login de dispositivo |

## 4. Preparar el ambiente

Instalar dependencias desde la raiz del proyecto:

```bash
npm install
cd frontend
npm install
```

Levantar el panel/API:

```bash
npm run dev
```

El panel debe quedar disponible en:

```text
http://localhost:3000
```

Si tambien se probaran casos del cliente fisico TOTEM, levantar el cliente Vite en otra terminal:

```bash
cd Gestos_Voz/frontend-totem
npm install
npm run dev
```

El cliente normalmente queda en:

```text
http://localhost:5173
```

## 5. Abrir Cypress

Desde la raiz del proyecto:

```bash
npm run cy:open
```

Luego elegir:

```text
E2E Testing -> navegador -> Start
```

Ejecutar los specs:

```text
admin-auth.cy.js
security-api.cy.js
totem-client.cy.js
```

## 6. Variables opcionales para pruebas con credenciales reales

Algunos casos se saltan automaticamente si no existen credenciales reales. Para ejecutarlos, configurar variables antes de abrir Cypress:

```bash
CYPRESS_adminUser=ADMIN_USER \
CYPRESS_adminPassword=ADMIN_PASSWORD \
CYPRESS_totemUser=TOTEM_USER \
CYPRESS_totemPassword=TOTEM_PASSWORD \
CYPRESS_totemId=TOTEM_ID \
CYPRESS_gridfsFileId=GRIDFS_FILE_ID \
npm run cy:open
```

En Windows PowerShell:

```powershell
$env:CYPRESS_adminUser="ADMIN_USER"
$env:CYPRESS_adminPassword="ADMIN_PASSWORD"
$env:CYPRESS_totemUser="TOTEM_USER"
$env:CYPRESS_totemPassword="TOTEM_PASSWORD"
$env:CYPRESS_totemId="TOTEM_ID"
$env:CYPRESS_gridfsFileId="GRIDFS_FILE_ID"
npm run cy:open
```

Si no se tienen esas credenciales, se pueden ejecutar primero solo los casos que no dependen de datos reales:

```text
TT-001
TT-002
TT-003
TT-053
TT-072
TT-049
TT-050
```

## 7. Como documentar cada resultado

Por cada caso ejecutado, actualizar la planilla `docs/TestCases_TOTEM.csv` o el Excel exportado con:

| Campo | Que escribir |
| --- | --- |
| Resultado Actual | `OK` si paso, o descripcion corta del error si fallo |
| Estado | `Passed`, `Failed` o `Blocked` |
| Tester | Nombre del tester |
| Fecha | Fecha real de ejecucion |

Ejemplo:

| ID | Resultado Actual | Estado |
| --- | --- | --- |
| TT-001 | OK - redirige correctamente a login | Passed |
| TT-072 | El endpoint responde 400 en vez de 401/403 sin autenticacion | Failed |
| TT-006 | No se ejecuta porque faltan credenciales admin | Blocked |

## 8. Como interpretar Passed, Failed y Blocked

| Estado | Significado |
| --- | --- |
| Passed | El resultado real coincide con el resultado esperado |
| Failed | El sistema ejecuta, pero el comportamiento no coincide con lo esperado |
| Blocked | No se pudo ejecutar por falta de datos, credenciales, ambiente o dependencia externa |

## 9. Evidencia para el informe

Para el informe resumen de pruebas, guardar evidencia de:

- Pantalla de Cypress con casos en verde/rojo.
- Mensajes de error cuando un caso falle.
- Capturas de la aplicacion en el punto validado.
- Resultado del comando si se ejecuta por consola:

```bash
npm run cy:run
```

## 10. Orden recomendado de ejecucion

1. Ejecutar `admin-auth.cy.js`.
2. Documentar TT-001, TT-002 y TT-003.
3. Configurar credenciales admin y ejecutar TT-006, TT-007.
4. Ejecutar `security-api.cy.js`.
5. Documentar los fallos de seguridad como defectos.
6. Levantar el cliente Vite y ejecutar `totem-client.cy.js`.
7. Pasar a JMeter para TT-080, TT-081, TT-099 y TT-100.

