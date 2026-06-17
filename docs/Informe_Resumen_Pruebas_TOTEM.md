# Universidad Privada del Valle

## Facultad de Informatica y Electronica

## Ingenieria de Sistemas Informaticos

# Informe Resumen de Pruebas

## Proyecto TOTEM

**Estudiantes:**  
- [Nombre estudiante 1]  
- [Nombre estudiante 2]  
- [Nombre estudiante 3]  

**Docente:** [Nombre del docente]  
**Materia:** Software Quality Assurance  
**Grupo:** [Grupo]  
**Fecha:** [Fecha de entrega]  
**Gestion:** [Gestion]

---

# Informe Resumen de Pruebas - TOTEM

## a. Resumen

Este informe resume los resultados del ciclo de pruebas ejecutado sobre el sistema **TOTEM**, compuesto por:

- Panel administrativo web desarrollado con Next.js.
- API backend integrada en Next.js.
- Cliente fisico TOTEM desarrollado con React + Vite.
- Modulos de plantillas, publicidad, contenido multimedia, FAQ/PDF, voz y gestos.

El objetivo principal de las pruebas es verificar el correcto funcionamiento de los flujos criticos del sistema, validar controles de seguridad basicos, documentar defectos encontrados y preparar evidencia de automatizacion mediante Cypress y pruebas de rendimiento mediante JMeter.

**Total de casos definidos:** 100  
**Casos documentados en planilla CSV/Excel:** 100  
**Casos considerados para automatizacion Cypress:** 14  
**Casos considerados para rendimiento/carga con JMeter:** 4  
**Casos manuales/funcionales documentados:** [Completar]  

El presente documento incluye:

- Distribucion de casos por modulo.
- Resultados cuantitativos.
- Registro de casos funcionales y de seguridad ejecutados.
- Resultados de automatizacion con Cypress.
- Resultados esperados para pruebas de carga con JMeter.
- Principales hallazgos, conclusiones y recomendaciones.

---

## b. Casos por Modulo

Distribucion de los 100 casos de prueba documentados para TOTEM:

| Modulo | Cantidad aproximada | Ejemplos de casos |
| --- | ---: | --- |
| Autenticacion y sesion admin | 9 | TT-001 a TT-008, TT-091 |
| Recuperacion y administradores | 9 | TT-009 a TT-017 |
| Gestion de totems | 13 | TT-018 a TT-030, TT-092, TT-093 |
| Plantillas y contenido multimedia | 13 | TT-031 a TT-041, TT-094 |
| FAQ y documentos PDF | 8 | TT-042 a TT-048, TT-095 |
| Cliente fisico TOTEM | 18 | TT-049 a TT-064, TT-096 a TT-098 |
| Voz y gestos | 6 | TT-065 a TT-070 |
| Seguridad/API | 9 | TT-071 a TT-079 |
| Rendimiento, estabilidad y calidad tecnica | 15 | TT-080 a TT-090, TT-099, TT-100 |
| **Total** | **100** |  |

Todos los casos de prueba fueron registrados en:

```text
docs/TestCases_TOTEM.csv
docs/TestCases_TOTEM.md
```

---

## c. Resultados Cuantitativos

Completar esta tabla despues de ejecutar los casos:

| Indicador | Valor |
| --- | ---: |
| Casos totales definidos | 100 |
| Casos ejecutados | [Completar] |
| Casos aprobados (Passed) | [Completar] |
| Casos fallidos (Failed) | [Completar] |
| Casos bloqueados (Blocked) | [Completar] |
| Casos no ejecutados (Not Run) | [Completar] |
| Porcentaje de exito | [Completar] |

Formula sugerida:

```text
Porcentaje de exito = (Casos Passed / Casos Ejecutados) * 100
```

Estos resultados reflejan el estado general del sistema con respecto a funcionalidad, validaciones, seguridad, compatibilidad, rendimiento y mantenibilidad.

---

## d. Registro de Casos Ejecutados

> Completar esta seccion con los resultados reales obtenidos al ejecutar Cypress y las pruebas manuales.

### TT-001 - Acceso a ruta protegida sin autenticacion

**Resultado esperado:**  
El sistema redirige a `/login` o bloquea el acceso sin mostrar informacion interna.

**Resultado obtenido:**  
[Completar despues de ejecutar Cypress]

**Estado:** [Passed / Failed / Blocked]

---

### TT-002 - Inicio de sesion con campos vacios

**Resultado esperado:**  
El sistema muestra validacion de campos obligatorios y no autentica al usuario.

**Resultado obtenido:**  
[Completar despues de ejecutar Cypress]

**Estado:** [Passed / Failed / Blocked]

---

### TT-003 - Inicio de sesion con credenciales incorrectas

**Resultado esperado:**  
El sistema rechaza el acceso y muestra mensaje de credenciales invalidas o error controlado.

**Resultado obtenido:**  
[Completar despues de ejecutar Cypress]

**Estado:** [Passed / Failed / Blocked]

---

### TT-006 - Inicio de sesion exitoso de administrador

**Resultado esperado:**  
El sistema autentica al administrador, crea la sesion y redirige al dashboard.

**Resultado obtenido:**  
[Completar despues de configurar credenciales admin]

**Estado:** [Passed / Failed / Blocked]

---

### TT-007 - Cierre de sesion desde el panel

**Resultado esperado:**  
El sistema elimina la sesion/token y redirige a login al intentar acceder nuevamente.

**Resultado obtenido:**  
[Completar despues de ejecutar Cypress]

**Estado:** [Passed / Failed / Blocked]

---

### TT-049 - Login del dispositivo con credenciales vacias

**Resultado esperado:**  
El cliente fisico TOTEM muestra validacion y no solicita el display.

**Resultado obtenido:**  
[Completar despues de ejecutar Cypress en cliente Vite]

**Estado:** [Passed / Failed / Blocked]

---

### TT-050 - Login del dispositivo con credenciales incorrectas

**Resultado esperado:**  
El sistema rechaza el login del dispositivo y muestra error de credenciales.

**Resultado obtenido:**  
[Completar despues de ejecutar Cypress]

**Estado:** [Passed / Failed / Blocked]

---

### TT-051 - Login exitoso del dispositivo TOTEM

**Resultado esperado:**  
El sistema obtiene token de dispositivo y carga la pantalla principal del cliente TOTEM.

**Resultado obtenido:**  
[Completar despues de configurar credenciales del totem]

**Estado:** [Passed / Failed / Blocked]

---

### TT-053 - Consultar display sin token

**Resultado esperado:**  
El endpoint `/api/totems/display/me` responde 401 y no entrega contenido.

**Resultado obtenido:**  
[Completar despues de ejecutar Cypress]

**Estado:** [Passed / Failed / Blocked]

---

### TT-071 - Bloquear descarga publica de archivos privados

**Resultado esperado:**  
El sistema responde 401/403 o usa URL firmada; no debe exponer archivos privados.

**Resultado obtenido:**  
[Completar despues de ejecutar Cypress con un `gridfsFileId` valido]

**Estado:** [Passed / Failed / Blocked]

---

### TT-072 - Bloquear subida publica de FAQ PDF

**Resultado esperado:**  
El sistema rechaza la subida de PDF sin autenticacion con 401/403.

**Resultado obtenido:**  
[Completar despues de ejecutar Cypress]

**Estado:** [Passed / Failed / Blocked]

---

### TT-073 - Bloquear lectura publica de FAQ por totemId

**Resultado esperado:**  
El sistema exige token admin/totem o una politica publica documentada.

**Resultado obtenido:**  
[Completar despues de ejecutar Cypress con `totemId` valido]

**Estado:** [Passed / Failed / Blocked]

---

### TT-074 - Bloquear lectura publica de publicidad por totemId

**Resultado esperado:**  
El sistema exige token admin/totem o una politica publica documentada.

**Resultado obtenido:**  
[Completar despues de ejecutar Cypress con `totemId` valido]

**Estado:** [Passed / Failed / Blocked]

---

### TT-076 - No exponer contrasena de totem en listado admin

**Resultado esperado:**  
La respuesta de `GET /api/totems` no debe incluir contrasenas de totems en texto plano.

**Resultado obtenido:**  
[Completar despues de ejecutar Cypress con credenciales admin]

**Estado:** [Passed / Failed / Blocked]

---

## e. Resultados de Pruebas Automatizadas

### Cypress

#### 1. Objetivo de la automatizacion

Validar automaticamente los flujos criticos iniciales del sistema TOTEM:

- Acceso protegido del panel administrativo.
- Validaciones basicas de login admin.
- Pruebas negativas de autenticacion.
- Validaciones de seguridad sobre endpoints API.
- Login del cliente fisico TOTEM.

#### 2. Escenarios automatizados

| Spec | Casos | Descripcion |
| --- | --- | --- |
| `admin-auth.cy.js` | TT-001, TT-002, TT-003, TT-006, TT-007 | Autenticacion del panel admin |
| `security-api.cy.js` | TT-053, TT-071, TT-072, TT-073, TT-074, TT-076 | Seguridad de endpoints API |
| `totem-client.cy.js` | TT-049, TT-050, TT-051 | Login del cliente fisico TOTEM |

#### 3. Resultados obtenidos

Completar despues de ejecutar Cypress:

| Indicador Cypress | Valor |
| --- | ---: |
| Specs ejecutados | [Completar] |
| Tests ejecutados | [Completar] |
| Tests aprobados | [Completar] |
| Tests fallidos | [Completar] |
| Tests bloqueados/skipped | [Completar] |

Comando usado:

```bash
npm run cy:open
```

o:

```bash
npm run cy:run
```

#### 4. Evidencias Cypress

Agregar capturas de:

- Pantalla de Cypress con tests en verde/rojo.
- Mensajes de error de los tests fallidos.
- Pantalla del panel login.
- Respuestas de API cuando corresponda.

---

### JMeter

#### 1. Objetivo de JMeter

Medir rendimiento, concurrencia y estabilidad de los endpoints principales del sistema TOTEM.

#### 2. Escenarios propuestos

| Caso | Endpoint / Flujo | Objetivo |
| --- | --- | --- |
| TT-080 | Dashboard admin | Medir tiempo de carga percibido del panel |
| TT-081 | Display del totem | Medir tiempo de carga del cliente fisico |
| TT-099 | `/api/totems/display/me` | Probar carga concurrente del display |
| TT-100 | `/api/totems/auth/login` | Probar carga concurrente del login de dispositivo |

#### 3. Configuracion sugerida inicial

| Elemento | Valor sugerido |
| --- | --- |
| Usuarios concurrentes | 10 |
| Ramp-up | 10 segundos |
| Iteraciones | 5 |
| Assertions | Codigo HTTP 200/401 esperado segun caso |
| Reportes | Summary Report, Aggregate Report, View Results Tree |

#### 4. Resultados obtenidos

Completar despues de ejecutar JMeter:

| Metrica | Valor |
| --- | ---: |
| Muestras totales | [Completar] |
| Promedio de respuesta | [Completar] |
| Tiempo minimo | [Completar] |
| Tiempo maximo | [Completar] |
| Porcentaje de error | [Completar] |
| Throughput | [Completar] |

---

## f. Principales Hallazgos

> Completar con los hallazgos reales despues de ejecutar pruebas. Segun la revision estatica inicial del proyecto, los puntos con mayor probabilidad de aparecer como defectos son:

### HF-01 - Endpoints publicos con informacion sensible

- **Tipo:** Seguridad
- **Impacto:** Alto
- **Descripcion:** Existen rutas publicas para archivos, FAQ y publicidad que podrian exponer informacion si no se protegen correctamente.
- **Casos relacionados:** TT-071, TT-073, TT-074
- **Recomendacion:** Exigir token admin/totem o usar URLs firmadas con expiracion.

### HF-02 - Subida publica de FAQ PDF

- **Tipo:** Seguridad / Validacion
- **Impacto:** Alto
- **Descripcion:** El endpoint de subida de PDF podria aceptar solicitudes sin autenticacion.
- **Caso relacionado:** TT-072
- **Recomendacion:** Proteger la ruta con autenticacion y validar tamano/tipo de archivo.

### HF-03 - Exposicion de credenciales de totem

- **Tipo:** Seguridad de datos
- **Impacto:** Alto
- **Descripcion:** Las credenciales de totem no deberian exponerse en texto plano ni en respuestas API.
- **Casos relacionados:** TT-076, TT-077
- **Recomendacion:** Hashear contrasenas y ocultarlas en respuestas del backend.

### HF-04 - Dependencia de textos en automatizacion

- **Tipo:** Mantenibilidad
- **Impacto:** Medio
- **Descripcion:** Los tests Cypress dependen de textos visibles como "Ingresar" o "Entrar al totem".
- **Recomendacion:** Agregar atributos `data-testid` a botones, inputs y secciones criticas.

### HF-05 - Casos bloqueados por falta de datos reales

- **Tipo:** Gestion de pruebas
- **Impacto:** Medio
- **Descripcion:** Algunos tests requieren credenciales admin, credenciales de totem, `totemId` o `gridfsFileId`.
- **Recomendacion:** Preparar datos de prueba controlados antes de la ejecucion final.

---

## g. Conclusiones

Despues de planificar y preparar las pruebas del proyecto TOTEM se concluye que:

- El sistema cuenta con flujos funcionales claramente identificados: administracion, totems, contenido, FAQ, publicidad y cliente fisico.
- La matriz de pruebas cubre 100 casos, cumpliendo el minimo requerido para el entregable SQA.
- Cypress permite automatizar los flujos funcionales y de seguridad mas importantes del sistema.
- JMeter sera usado para validar rendimiento y carga en endpoints criticos.
- Los resultados finales deben completarse despues de ejecutar los tests en un ambiente con datos reales.

Conclusion final despues de ejecucion:

```text
[Completar segun resultados: sistema apto / sistema requiere correcciones antes de produccion]
```

---

## h. Recomendaciones

### Recomendaciones Cypress

1. Agregar `data-testid` en componentes clave del panel y cliente TOTEM.
2. Preparar usuarios y totems de prueba estables.
3. Ejecutar Cypress antes y despues de corregir defectos para validar regresion.
4. Mantener separados los tests funcionales y los tests de seguridad API.

### Recomendaciones JMeter

1. Iniciar con 10 usuarios concurrentes.
2. Aumentar progresivamente a 20, 50 y 100 usuarios segun estabilidad.
3. Agregar assertions por codigo HTTP y tiempo maximo.
4. Monitorear CPU, memoria y base de datos durante la prueba.

### Recomendacion general

No marcar el sistema como listo para produccion hasta que:

- Los casos criticos de seguridad esten corregidos.
- Los casos automatizados principales pasen en Cypress.
- Las pruebas de carga JMeter no presenten errores relevantes.
- Se documenten defectos, limitaciones y recomendaciones finales.

