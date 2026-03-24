# Especificaciones técnicas de aplicación para sorteo de bingo

## 1. Propósito

Definir las especificaciones técnicas de una aplicación destinada a sortear números de bingo de forma aleatoria, controlada y auditable, considerando que los participantes utilizarán cartones impresos con la estructura clásica de bingo de 90 bolas.

La aplicación no necesita generar los cartones en su primera versión, pero sí debe comprender la lógica de construcción de estos cartones para asegurar que el sorteo sea 100% compatible con los números que pueden aparecer en ellos.

## 2. Contexto del negocio

Cada participante llegará con un cartón impreso. Cada cartón tendrá una grilla de 3 filas por 9 columnas.

La distribución de números del cartón sigue estas reglas:

Cada fila debe contener exactamente 5 números y 4 espacios vacíos.

Cada cartón debe contener 15 números en total.

Cada columna representa un rango numérico específico.

Los rangos por columna son los siguientes:

Columna 1: números del 1 al 9

Columna 2: números del 10 al 19

Columna 3: números del 20 al 29

Columna 4: números del 30 al 39

Columna 5: números del 40 al 49

Columna 6: números del 50 al 59

Columna 7: números del 60 al 69

Columna 8: números del 70 al 79

Columna 9: números del 80 al 90

En un cartón, cada número debe ubicarse en la columna correspondiente a su rango.

El sistema de sorteo debe extraer números aleatorios entre 1 y 90, sin repetición, hasta completar el sorteo o hasta que el operador decida detenerlo.

## 3. Objetivo del sistema

La aplicación debe permitir ejecutar un sorteo de bingo transparente, visual y fácil de operar, mostrando en tiempo real los números extraídos y evitando repeticiones.

Además, la arquitectura debe quedar preparada para futuras extensiones, como validación de cartones, generación de cartones, control de partidas, múltiples salas, historial de sorteos y verificación automática de ganadores.

## 4. Alcance funcional de la primera versión

La primera versión debe enfocarse en el motor de sorteo y la operación de la partida.

Debe incluir:

Inicio de una nueva partida.

Sorteo aleatorio de números entre 1 y 90.

Garantía de no repetición de números ya sorteados.

Visualización destacada del número actual sorteado.

Visualización del historial completo de números ya sorteados.

Indicador de cuántos números faltan por salir.

Posibilidad de pausar o reanudar el sorteo.

Posibilidad de finalizar la partida manualmente.

Reinicio controlado de la partida.

Registro básico de auditoría de la sesión.

## 5. Reglas de dominio

### 5.1 Reglas del sorteo

El universo de números sorteables es del 1 al 90, ambos inclusive.

Cada número solo puede salir una vez por partida.

El orden de salida debe ser aleatorio.

Una partida puede estar en uno de los siguientes estados: pendiente, en curso, pausada, finalizada, cancelada.

No se puede sortear un nuevo número si la partida está pausada o finalizada.

No se puede iniciar una nueva partida si ya existe una partida activa en curso, salvo que el operador la cierre o cancele explícitamente.

### 5.2 Reglas del cartón

Aunque la versión inicial no generará cartones, la especificación debe reconocer estas restricciones para futuras integraciones:

Cada cartón tiene 3 filas y 9 columnas.

Cada fila contiene exactamente 5 números.

Cada fila contiene exactamente 4 celdas vacías.

Cada columna contiene números solo del rango que le corresponde.

Dentro de cada columna, los números deben quedar ordenados de menor a mayor de arriba hacia abajo si existieran múltiples números en esa columna.

Un cartón válido contiene 15 números únicos.

## 6. Requisitos funcionales

### RF-01. Crear partida

El operador debe poder crear una nueva partida.

La partida debe quedar registrada con identificador único, fecha de creación, estado inicial y configuración básica.

### RF-02. Iniciar partida

El operador debe poder iniciar una partida pendiente.

Al iniciar, la partida cambia a estado en curso.

### RF-03. Sortear número

El operador debe poder solicitar el siguiente número del bingo.

El sistema debe seleccionar un número aleatorio no sorteado previamente de entre los números disponibles.

El número sorteado debe quedar registrado con su orden de extracción y timestamp.

### RF-04. Mostrar número actual

La interfaz debe mostrar en un área principal el último número sorteado.

### RF-05. Mostrar historial de sorteos

La interfaz debe mostrar todos los números ya sorteados, idealmente ordenados tanto por orden de salida como por valor numérico en vistas separadas o complementarias.

### RF-06. Mostrar números pendientes

La interfaz debe indicar cuántos números quedan sin sortear.

### RF-07. Pausar partida

El operador debe poder pausar una partida en curso.

Mientras la partida esté pausada, el sistema no debe permitir nuevos sorteos.

### RF-08. Reanudar partida

El operador debe poder reanudar una partida pausada.

### RF-09. Finalizar partida

El operador debe poder finalizar manualmente la partida.

No deben permitirse nuevos sorteos una vez finalizada.

### RF-10. Reiniciar partida

El operador debe poder reiniciar una partida, generando una nueva sesión limpia o dejando trazabilidad de que la sesión anterior fue cerrada.

### RF-11. Auditoría

El sistema debe almacenar eventos clave: creación, inicio, cada sorteo, pausa, reanudación, finalización y reinicio.

## 7. Requisitos no funcionales

### RNF-01. Integridad

El sistema no debe repetir números dentro de una misma partida.

### RNF-02. Trazabilidad

Cada evento importante debe quedar registrado con marca temporal.

### RNF-03. Usabilidad

La interfaz debe ser suficientemente clara para ser operada en vivo por una sola persona, con elementos visibles a distancia si se proyecta en una pantalla.

### RNF-04. Rendimiento

La acción de sortear un número debe responder en menos de 300 ms en condiciones normales.

### RNF-05. Confiabilidad

El sistema debe poder recuperar una partida en curso si se recarga la aplicación, siempre que exista persistencia habilitada.

### RNF-06. Portabilidad

La solución debe poder ejecutarse en navegador moderno desde notebook, computador de escritorio o tablet.

### RNF-07. Auditabilidad

El historial de números y eventos debe poder exportarse o consultarse posteriormente.

## 8. Arquitectura propuesta

Se recomienda una arquitectura web liviana, desacoplada y extensible.

### 8.1 Componentes principales

Frontend web.

Backend de aplicación.

Motor de sorteo.

Persistencia de partidas y eventos.

Módulo de auditoría.

### 8.2 Responsabilidades

#### Frontend

Debe proveer la interfaz visual del operador y la visualización pública del sorteo.

Debe consumir API del backend para crear, iniciar, pausar, reanudar y sortear números.

Debe representar visualmente el número actual, el historial y el estado de la partida.

#### Backend

Debe contener la lógica de negocio del sorteo.

Debe validar estados de partida.

Debe garantizar que un número no se repita.

Debe registrar eventos y exponer endpoints seguros y simples.

#### Motor de sorteo

Debe operar sobre una colección de números disponibles.

Debe seleccionar aleatoriamente uno de los números restantes.

Debe eliminarlo del conjunto disponible y devolverlo como número sorteado.

#### Persistencia

Debe guardar partidas, números extraídos y eventos.

Puede implementarse inicialmente con SQLite, PostgreSQL o incluso almacenamiento local según el contexto del despliegue.

### 8.3 Stack sugerido

Para una versión robusta y rápida de implementar:

Frontend: React, Next.js o Vue.

Backend: Node.js con Express, NestJS o Fastify.

Base de datos: PostgreSQL o SQLite.

Tiempo real opcional: WebSocket o Server-Sent Events si se requiere transmitir el sorteo a otra pantalla o múltiples clientes.

Despliegue: Vercel, Railway, Render o servidor local según necesidad del evento.

## 9. Modelo de datos sugerido

### 9.1 Entidad Game

```json
{
  "id": "uuid",
  "status": "pending | active | paused | finished | cancelled",
  "createdAt": "datetime",
  "startedAt": "datetime | null",
  "finishedAt": "datetime | null",
  "currentNumber": 42,
  "remainingCount": 53
}
```

### 9.2 Entidad Draw

```json
{
  "id": "uuid",
  "gameId": "uuid",
  "number": 42,
  "drawOrder": 17,
  "drawnAt": "datetime"
}
```

### 9.3 Entidad AuditEvent

```json
{
  "id": "uuid",
  "gameId": "uuid",
  "eventType": "game_created | game_started | number_drawn | game_paused | game_resumed | game_finished | game_reset",
  "payload": {},
  "createdAt": "datetime"
}
```

## 10. Algoritmo de sorteo

El algoritmo de sorteo de la primera versión puede ser simple, seguro y suficiente para el caso de uso.

### 10.1 Inicialización

Al crear o iniciar una partida, el sistema debe inicializar una colección de números disponibles desde 1 hasta 90.

Ejemplo:

```ts
availableNumbers = [1, 2, 3, ..., 90]
```

### 10.2 Extracción aleatoria

Cada vez que el operador solicite un nuevo número:

Se verifica que la partida esté activa.

Se obtiene un índice aleatorio entre 0 y la longitud de `availableNumbers - 1`.

Se toma el número en esa posición.

Se elimina ese número del arreglo o conjunto de disponibles.

Se persiste el resultado.

Se actualiza el número actual y el contador de pendientes.

### 10.3 Pseudocódigo

```ts
function drawNextNumber(game) {
  if (game.status !== "active") {
    throw new Error("La partida no está activa")
  }

  if (game.availableNumbers.length === 0) {
    game.status = "finished"
    return null
  }

  const index = randomInt(0, game.availableNumbers.length - 1)
  const drawnNumber = game.availableNumbers[index]

  game.availableNumbers.splice(index, 1)

  saveDraw({
    gameId: game.id,
    number: drawnNumber,
    drawOrder: game.draws.length + 1,
    drawnAt: now()
  })

  game.currentNumber = drawnNumber
  game.remainingCount = game.availableNumbers.length

  if (game.remainingCount === 0) {
    game.status = "finished"
  }

  return drawnNumber
}
```

## 11. Consideraciones sobre aleatoriedad

Para una partida social o recreativa, puede usarse el generador pseudoaleatorio del lenguaje de programación.

Si se requiere mayor confianza o auditabilidad, se recomienda:

Usar un generador de números pseudoaleatorios con semilla registrada.

Registrar semilla de partida para reproducibilidad.

Permitir modo auditable donde el orden completo del sorteo pueda reconstruirse.

Para producción básica, es suficiente usar funciones estándar seguras del runtime o del navegador, preferentemente encapsuladas en una capa de servicio.

## 12. API sugerida

### 12.1 Crear partida

`POST /api/games`

Respuesta esperada:

```json
{
  "id": "uuid",
  "status": "pending"
}
```

### 12.2 Iniciar partida

`POST /api/games/:id/start`

### 12.3 Sortear siguiente número

`POST /api/games/:id/draw`

Respuesta esperada:

```json
{
  "number": 42,
  "drawOrder": 17,
  "remainingCount": 73,
  "status": "active"
}
```

### 12.4 Pausar partida

`POST /api/games/:id/pause`

### 12.5 Reanudar partida

`POST /api/games/:id/resume`

### 12.6 Finalizar partida

`POST /api/games/:id/finish`

### 12.7 Obtener estado actual

`GET /api/games/:id`

### 12.8 Obtener historial de números sorteados

`GET /api/games/:id/draws`

### 12.9 Obtener auditoría

`GET /api/games/:id/audit`

## 13. Interfaz de usuario esperada

La interfaz de la primera versión debe tener dos vistas posibles.

### 13.1 Vista operador

Debe incluir controles para:

Crear partida.

Iniciar partida.

Sortear siguiente número.

Pausar.

Reanudar.

Finalizar.

Reiniciar.

También debe incluir paneles de información con:

Estado actual de la partida.

Número actual grande y visible.

Lista de números ya sorteados.

Contador de números restantes.

Log resumido de eventos.

### 13.2 Vista pública o proyección

Debe priorizar legibilidad y simplicidad.

Debe mostrar:

Número actual en formato grande.

Historial resumido.

Cantidad de números sorteados.

Estado de la partida.

Opcionalmente, una grilla del 1 al 90 resaltando los ya sorteados.

## 14. Validaciones clave

No permitir sorteo sin partida iniciada.

No permitir repetición de números.

No permitir transición de estado inválida.

No permitir reinicio accidental sin confirmación del operador.

No permitir que el sistema quede con números fuera del rango 1 a 90.

## 15. Escenarios de error

Si se intenta sortear cuando no quedan números, el sistema debe finalizar la partida automáticamente o devolver mensaje claro.

Si falla la persistencia, el sistema no debe mostrar un número como válido si no quedó guardado.

Si se recarga la interfaz, debe reconstruirse el estado desde la fuente persistida.

Si existe más de un cliente conectado, todos deben ver el mismo estado consistente.

## 16. Seguridad básica

Aunque sea una app simple, debe contemplarse:

Control de acceso para la vista operador.

Separación entre vista pública y vista administrativa.

Protección contra llamadas repetidas accidentales al endpoint de sorteo.

Validación de payloads de API.

Logs mínimos para soporte y diagnóstico.

## 17. Estrategia de pruebas

### 17.1 Unitarias

Probar que el motor nunca repite números.

Probar que solo salen números entre 1 y 90.

Probar cambios de estado válidos e inválidos.

Probar finalización automática al agotarse los números.

### 17.2 Integración

Probar flujo completo: crear, iniciar, sortear, pausar, reanudar, finalizar.

Probar persistencia correcta de sorteos y auditoría.

### 17.3 UI

Probar actualización correcta del número actual.

Probar bloqueo visual de acciones no permitidas.

Probar correcta visualización del historial y contador.

## 18. Futuras extensiones recomendadas

Módulo de generación automática de cartones válidos.

Carga y validación de cartones impresos.

Verificación automática de línea, doble línea o bingo completo.

Modo TV o pantalla secundaria.

Locución automática por voz del número sorteado.

Animaciones y temporizador entre sorteos.

Multi-sala o múltiples partidas concurrentes.

Exportación de acta o resultado final en PDF o CSV.

## 19. Definición técnica de compatibilidad con cartones

Aunque la app solo sortea números del 1 al 90, debe quedar documentado que los cartones compatibles con el sistema deben obedecer estas reglas:

La grilla del cartón es de 3 filas por 9 columnas.

Los números posibles del cartón pertenecen al conjunto 1..90.

Cada número se posiciona exclusivamente en la columna correspondiente a su decena.

Cada fila contiene exactamente 5 números.

El cartón completo contiene 15 números únicos.

Esto asegura que cualquier número sorteado por el sistema puede existir en uno o varios cartones impresos válidos y que el sorteo cubre todo el universo permitido por el formato de bingo descrito.

## 20. Recomendación de implementación

La forma más simple y mantenible para una primera versión es una aplicación web con backend liviano y persistencia básica.

Una implementación recomendada sería:

Frontend en React o Next.js.

Backend en Node.js.

Persistencia en SQLite si el uso será local o PostgreSQL si se quiere dejar listo para múltiples sesiones o acceso remoto.

Comunicación en tiempo real opcional mediante WebSocket si se proyectará simultáneamente en varias pantallas.

## 21. Criterios de aceptación

La aplicación será considerada funcionalmente correcta cuando:

Permita iniciar una partida nueva sin errores.

Sortee números aleatorios entre 1 y 90 sin repetir ninguno.

Muestre claramente el último número sorteado.

Mantenga historial completo y consistente.

Permita pausar, reanudar y finalizar correctamente.

Registre eventos clave de la sesión.

Sea utilizable en vivo por una persona sin confusión operativa.

## 22. Resumen ejecutivo

La aplicación debe diseñarse como un sistema de sorteo de bingo de 90 números, alineado con cartones impresos de 3 filas por 9 columnas, donde cada fila contiene 5 números y cada columna representa un rango numérico definido.

La lógica crítica del sistema está en garantizar aleatoriedad sin repetición, consistencia del estado de la partida, buena visualización en tiempo real y una arquitectura suficientemente limpia para crecer luego hacia validación o generación de cartones.
