# agents.md

# Agentes especializados para desarrollo y puesta en producción
## Aplicación de sorteo de bingo
## Optimizado para VS Code con Codex GPT-5.4

## 1. Propósito del documento

Este documento define los agentes especializados necesarios para diseñar, desarrollar, validar y dejar en producción una aplicación de sorteo de bingo de 90 números, optimizada para una experiencia desktop, con interfaz minimalista, limpia y visualmente atractiva. También establece una secuencia de trabajo sugerida para iterar el producto en VS Code utilizando Codex GPT-5.4 como copiloto principal de construcción.

La intención de este archivo es que funcione como guía operativa del equipo de agentes y como marco de ejecución para transformar las especificaciones y el User Story Mapping en una aplicación funcional, mantenible y desplegable.

## 2. Principios rectores del desarrollo

La aplicación debe priorizar simplicidad, claridad visual, mantenibilidad técnica y confiabilidad operativa. Cada decisión de desarrollo debe proteger cuatro ejes principales: integridad del sorteo, experiencia visual de alta legibilidad, código limpio y facilidad de despliegue.

Toda iteración debe respetar la regla central del dominio: los números del 1 al 90 no pueden repetirse dentro de una misma partida. Además, cada cambio debe cuidar la consistencia entre animación de tómbola, número principal visible, historial ordenado y controles de inicio o reinicio.

La colaboración con Codex GPT-5.4 en VS Code debe orientarse a trabajar de manera incremental, con artefactos claros, tareas acotadas, validaciones frecuentes y commits pequeños. El objetivo no es pedirle a Codex una app completa de una sola vez, sino usarlo como un sistema de desarrollo guiado por especificaciones, iteraciones y revisión continua.

## 3. Modelo de trabajo con agentes

La construcción de esta aplicación se organiza mediante agentes especializados. Cada agente representa una responsabilidad técnica concreta. En la práctica, una sola persona puede operar varios agentes apoyándose en Codex GPT-5.4, pero conceptualmente conviene separarlos para reducir errores, mejorar foco y ordenar el proceso de construcción.

Cada agente debe trabajar sobre entregables definidos, con entradas y salidas claras. Los agentes no deben superponerse innecesariamente ni introducir cambios fuera de su ámbito sin coordinación explícita.

## 4. Agente de arquitectura de solución

### Nombre sugerido

Solution Architect Agent

### Misión

Definir la arquitectura general de la aplicación, validar el stack tecnológico, establecer la estructura de carpetas, diseñar los límites entre frontend, lógica de sorteo, persistencia y despliegue, y asegurar que la solución sea suficientemente simple para un MVP pero preparada para crecer.

### Responsabilidades

Este agente define si la aplicación se construirá como una web app con React o Next.js, backend liviano o lógica embebida, y qué estrategia de persistencia tendrá la primera versión. También establece la separación entre estado visual, estado del juego y motor de sorteo.

Debe decidir la organización base del proyecto en VS Code, incluyendo módulos, convenciones de nombres, estructura de componentes, servicios, utilidades, pruebas y archivos de configuración. Debe velar porque la arquitectura minimice acoplamiento y facilite iteración rápida.

### Entregables

Debe producir la estructura técnica del proyecto, las decisiones de stack, el esquema de carpetas, el contrato entre capas, la estrategia de estado y los lineamientos para futuras extensiones como auditoría, persistencia o pantalla pública.

### Criterio de éxito

La arquitectura se considera correcta cuando permite desarrollar el MVP con rapidez, sin deuda técnica innecesaria y sin bloquear futuras mejoras funcionales o visuales.

## 5. Agente de UX y UI de producto

### Nombre sugerido

Product UX UI Agent

### Misión

Diseñar una experiencia desktop minimalista, limpia y prolija, con una composición visual clara que priorice la tómbola, el número principal, el historial en carrusel y el header con acciones esenciales.

### Responsabilidades

Este agente define jerarquía visual, layout, espaciados, comportamiento del header, balance entre el área de la tómbola y el área del número principal, estilo del carrusel inferior y estados visuales del sistema. Debe asegurar que la interfaz sea entendible a primera vista y legible incluso si se proyecta en una pantalla grande.

También debe diseñar la transición visual entre el giro de la tómbola y la aparición del número. Debe cuidar que la animación entretenga sin competir con el dato principal. Debe definir lineamientos de tipografía, contraste, tamaños, ritmo visual y consistencia general.

### Entregables

Debe entregar layout base, criterios visuales, comportamiento esperado de cada bloque, especificación de estados visuales y lineamientos de estilo para implementación.

### Criterio de éxito

La UX UI se considera correcta cuando el operador entiende la app sin instrucciones y los espectadores identifican inmediatamente el número sorteado y el historial visible.

## 6. Agente de frontend

### Nombre sugerido

Frontend Implementation Agent

### Misión

Construir la interfaz de usuario en código, respetando la arquitectura, los lineamientos visuales y la lógica del producto, con componentes limpios, reutilizables y fácilmente testeables.

### Responsabilidades

Este agente implementa el header, la tómbola animada, el bloque del número principal, el carrusel inferior y los estados de la aplicación. Debe traducir el diseño a componentes bien organizados, mantener una estructura clara y aplicar buenas prácticas de accesibilidad, performance y mantenibilidad.

Debe evitar lógica de negocio compleja dentro de componentes visuales. Debe consumir servicios o utilidades bien aisladas para el motor de sorteo y la gestión del estado del juego. Debe dejar la interfaz preparada para escalar sin reescrituras innecesarias.

### Entregables

Debe producir componentes UI, composición de pantallas, manejo de estado visual, integración con el motor de sorteo y comportamiento consistente del flujo principal.

### Criterio de éxito

El frontend se considera correcto cuando reproduce fielmente la experiencia definida, responde bien en desktop y mantiene claridad estructural en el código.

## 7. Agente de motor de sorteo y reglas de dominio

### Nombre sugerido

Game Logic Agent

### Misión

Diseñar e implementar la lógica central del juego de bingo, garantizando la integridad del sorteo y el cumplimiento absoluto de las reglas del dominio.

### Responsabilidades

Este agente implementa el universo de números del 1 al 90, la extracción aleatoria sin repetición, el reinicio de sesión, el control de estado del juego y la actualización consistente del historial. Debe separar claramente las reglas de dominio de la capa visual.

Debe asegurar que no exista posibilidad de repetición de números dentro de una partida. Debe modelar correctamente estados como listo, iniciado, en curso, terminado o reiniciado según el alcance final que se defina. También debe dejar la base lista para auditoría, persistencia y validaciones futuras.

### Entregables

Debe entregar funciones puras o servicios de lógica de juego, estructura de estado del sorteo, reglas de transición y contratos claros con la UI.

### Criterio de éxito

La lógica se considera correcta cuando el sistema nunca repite números, reinicia correctamente el universo de juego y sincroniza bien cada extracción con la interfaz.

## 8. Agente de animación e interacción visual

### Nombre sugerido

Motion Interaction Agent

### Misión

Construir una animación de tómbola visualmente entretenida, fluida y coherente con una interfaz minimalista, sin afectar la claridad del número principal ni degradar el rendimiento.

### Responsabilidades

Este agente define cómo gira la tómbola, cómo se representa visualmente la extracción y cómo se coordina la transición hacia el número ganador. Debe equilibrar estética y simplicidad técnica. Debe evitar animaciones pesadas o poco mantenibles.

También debe considerar tiempos, easing, feedback visual al finalizar el giro y posibles estados como espera, giro activo y resultado mostrado. Debe asegurar que la animación funcione bien en desktop y no produzca comportamientos erráticos entre sorteos consecutivos.

### Entregables

Debe entregar componentes o utilidades de animación, tiempos definidos, estados de interacción y comportamiento de transición entre sorteo y resultado.

### Criterio de éxito

La animación se considera correcta cuando se percibe entretenida y profesional, pero sigue subordinada a la legibilidad del número sorteado.

## 9. Agente de backend y persistencia

### Nombre sugerido

Backend Persistence Agent

### Misión

Construir la capa de persistencia y servicios si la implementación final requiere guardar partidas, historial, eventos o permitir recuperación tras recarga.

### Responsabilidades

Este agente define y construye endpoints, modelos de datos, almacenamiento y validaciones del lado servidor si se opta por una arquitectura con backend. En una primera versión simple, puede limitarse a estructurar una capa opcional de persistencia local o remota sin sobrecargar el MVP.

Debe preparar la base para guardar partidas, sorteos, timestamps y reinicios. También debe dejar espacio para auditoría futura y soporte para pantalla secundaria o sesiones remotas si el producto crece.

### Entregables

Debe entregar modelos de datos, servicios de persistencia, endpoints si aplican y manejo consistente del estado de sesión.

### Criterio de éxito

La capa se considera correcta cuando el sistema puede guardar y recuperar estado de forma confiable, sin romper la simplicidad del MVP.

## 10. Agente de QA y testing

### Nombre sugerido

QA Test Agent

### Misión

Validar que la aplicación funcione correctamente en términos de lógica, experiencia de uso y robustez técnica, con foco especial en la no repetición de números y la estabilidad de la interfaz.

### Responsabilidades

Este agente diseña y ejecuta pruebas unitarias, de integración y de interfaz. Debe asegurar que el motor nunca repita números, que el historial coincida con el número mostrado y que el reinicio restaure correctamente el estado inicial. También debe verificar consistencia visual, estados de botones y sincronía entre animación y resultado.

Debe crear pruebas simples pero significativas, priorizando escenarios críticos del producto. Debe ayudar a detectar errores de borde, por ejemplo cuando el universo de números se agota o cuando el usuario intenta reiniciar en medio de una secuencia.

### Entregables

Debe producir estrategia de pruebas, suites automatizadas prioritarias, checklist de validación manual y criterios de regresión.

### Criterio de éxito

El QA se considera correcto cuando detecta errores relevantes antes del despliegue y mantiene la confianza en la lógica del bingo.

## 11. Agente de performance y hardening

### Nombre sugerido

Performance Reliability Agent

### Misión

Asegurar que la aplicación tenga buen desempeño, se mantenga estable en desktop y resista uso continuo durante una sesión completa de bingo.

### Responsabilidades

Este agente revisa renderizados innecesarios, peso de animaciones, eficiencia del carrusel, estabilidad del estado y posibles fugas de memoria o comportamientos raros tras múltiples sorteos. También revisa que el proyecto tenga configuración limpia, scripts consistentes y comportamiento predecible en build y producción.

Debe ayudar a simplificar donde sea necesario y a eliminar complejidad accidental. Su rol no es sofisticar la solución, sino volverla más sólida y confiable.

### Entregables

Debe producir ajustes de performance, recomendaciones de simplificación, revisión de build y validación de estabilidad.

### Criterio de éxito

La app se considera robusta cuando puede ejecutar una partida completa sin caídas, inconsistencias ni degradación visible.

## 12. Agente de despliegue y producción

### Nombre sugerido

Deployment Production Agent

### Misión

Preparar la aplicación para salir a producción con una configuración clara, repetible y fácil de operar.

### Responsabilidades

Este agente define scripts de desarrollo, build y preview, configura variables de entorno si existen, prepara el hosting y valida el comportamiento de la app una vez desplegada. Debe documentar el proceso de release y asegurar que la versión publicada sea consistente con lo probado en local.

También debe preparar el proyecto para una operación simple desde VS Code, con instrucciones claras para levantar entorno, correr tests, generar build y desplegar.

### Entregables

Debe entregar configuración de despliegue, documentación operativa, scripts de ejecución y validación final de publicación.

### Criterio de éxito

La puesta en producción se considera correcta cuando cualquier desarrollador del proyecto puede reproducir el flujo local y publicar una nueva versión con bajo riesgo.

## 13. Agente de documentación técnica

### Nombre sugerido

Technical Documentation Agent

### Misión

Mantener actualizados los documentos del proyecto para que Codex GPT-5.4 y cualquier desarrollador humano puedan iterar sin perder contexto.

### Responsabilidades

Este agente consolida especificaciones, USM, decisiones de arquitectura, convenciones técnicas, scripts de arranque, estructura del proyecto y notas de release. Debe mantener coherencia entre lo documentado y lo implementado.

También debe dejar instrucciones explícitas para continuar iterando desde VS Code con Codex, evitando que el contexto se diluya entre sesiones.

### Entregables

Debe producir README, notas de arquitectura, decisiones de diseño, guías de desarrollo y documentación de despliegue.

### Criterio de éxito

La documentación se considera correcta cuando permite retomar el desarrollo sin fricción y reduce la dependencia de conocimiento tácito.

## 14. Secuencia propuesta de trabajo entre agentes

El primer agente que debe actuar es el de arquitectura, porque fija la base del proyecto y evita que los demás construyan sobre supuestos ambiguos.

Después debe trabajar el agente de UX UI para aterrizar la composición de pantalla, la jerarquía visual y el comportamiento esperado de la tómbola, el número principal y el carrusel.

Luego debe avanzar el agente de lógica de juego, que define el núcleo funcional de la app y garantiza la regla de no repetición.

Con esa base, entra el agente de frontend para construir la interfaz real y conectar los componentes visuales con el estado del juego.

A continuación debe intervenir el agente de animación e interacción para refinar la tómbola y la transición del sorteo sin romper la claridad general.

Después debe trabajar el agente de QA para validar comportamiento, detectar errores y asegurar que la lógica y la UI estén alineadas.

Una vez que la base esté estable, puede entrar el agente de backend y persistencia si el alcance requiere guardar estado, historial o auditoría.

Luego debe revisar el agente de performance y hardening para simplificar, optimizar y volver más estable la solución.

Finalmente debe intervenir el agente de despliegue y producción para publicar una versión usable y el agente de documentación para dejar trazabilidad completa del proceso.

## 15. Flujo recomendado para iterar en VS Code con Codex GPT-5.4

La forma recomendada de trabajar esta aplicación en VS Code con Codex GPT-5.4 es mediante iteraciones pequeñas, muy explícitas y apoyadas en archivos de contexto bien mantenidos. La mejor práctica no es pedir grandes bloques opacos de código, sino guiar a Codex con tareas atómicas, criterios de aceptación concretos y revisiones frecuentes.

La primera etapa consiste en abrir un workspace dedicado del proyecto y dejar en la raíz los archivos de contexto principales, incluyendo `SPECS.md`, `USM.md`, `agents.md` y `README.md`. Codex debe tener siempre acceso a estos documentos como fuente de verdad.

La segunda etapa consiste en pedir a Codex la creación de la estructura base del proyecto. En esta fase conviene solicitar un scaffold limpio, con carpetas bien nombradas, scripts claros y una división ordenada entre componentes, lógica, estilos, pruebas y utilidades.

La tercera etapa consiste en iterar el layout base. Aquí se debe pedir a Codex que implemente primero la pantalla general con header, zona de tómbola, zona del número principal y franja inferior del historial, usando datos mock si es necesario. El foco debe estar en jerarquía visual y composición, no todavía en lógica real.

La cuarta etapa consiste en introducir el motor de sorteo. En este punto se debe pedir a Codex que implemente funciones puras para inicializar números, extraer uno aleatorio sin repetición y reiniciar el juego. Antes de conectarlo a la UI, conviene pedir pruebas unitarias de esta lógica.

La quinta etapa consiste en conectar la lógica con la interfaz. Aquí se debe pedir a Codex que haga que los botones del header disparen acciones reales, que el número principal refleje el resultado del sorteo y que el carrusel se actualice automáticamente.

La sexta etapa consiste en mejorar la animación. En este momento se debe pedir a Codex que refine el componente de tómbola, agregue transición de giro y sincronice la aparición del número final sin introducir complejidad excesiva.

La séptima etapa consiste en robustecer la experiencia. Aquí se debe pedir a Codex que revise estados, desactive acciones inválidas, limpie posibles errores visuales y garantice que el reinicio vuelva realmente al estado inicial.

La octava etapa consiste en incorporar pruebas de integración y revisión manual. En esta fase se debe usar a Codex para generar casos de prueba realistas, sin dejar de revisar manualmente la experiencia en desktop.

La novena etapa consiste en preparar el build de producción. Aquí se debe pedir a Codex que revise configuración, scripts, tipado, errores de lint y comportamiento del build final.

La décima etapa consiste en documentar y cerrar iteración. Al finalizar cada ciclo, se debe pedir a Codex que actualice documentación técnica, decisiones relevantes y notas sobre pendientes.

## 16. Cómo pedirle trabajo a Codex GPT-5.4 de forma efectiva

Para obtener buenos resultados, cada prompt a Codex debe incluir contexto, objetivo, restricción y criterio de éxito. No conviene hacer pedidos vagos como “haz la app”. Conviene formular tareas concretas, por ejemplo implementar solo el layout, solo el motor de sorteo o solo el carrusel inferior.

Cada solicitud debe decir qué archivo modificar, qué comportamiento se espera, qué no debe romperse y cómo validar el resultado. También es útil pedir siempre que explique brevemente el enfoque antes de aplicar cambios grandes.

Cuando se trate de lógica sensible, como la no repetición de números, conviene pedirle a Codex pruebas además del código. Cuando se trate de UI, conviene pedir primero estructura y luego refinamiento visual. Cuando se trate de animación, conviene pedir una versión simple primero y una más pulida después.

La iteración ideal con Codex en VS Code es corta, explícita y verificable. Después de cada cambio importante, debe existir una revisión humana del diff, una validación funcional y, cuando aplique, una corrida de tests.

## 17. Convenciones sugeridas para el workspace en VS Code

Se recomienda mantener una raíz del proyecto limpia, con documentos de contexto claramente visibles. La carpeta de código debe separar presentación, dominio y utilidades. Los componentes visuales deben ubicarse en una sección clara del proyecto y la lógica del sorteo en otra distinta.

El nombre de funciones debe ser descriptivo y orientado al dominio, por ejemplo inicializar universo de números, sortear siguiente número o reiniciar partida. El estado del juego debe ser explícito y fácil de inspeccionar. La animación debe estar encapsulada en un componente o módulo propio.

También se recomienda dejar tareas automatizadas simples desde el inicio, como ejecutar desarrollo local, correr tests y generar build. Eso ayuda a que Codex trabaje sobre una base más estable y verificable.

## 18. Criterios de salida a producción

La aplicación está lista para producción cuando la interfaz funciona correctamente en desktop, la tómbola se anima de forma estable, el número principal tiene visibilidad impecable, el historial se actualiza sin errores y el sistema nunca repite números dentro de una misma partida.

También debe estar lista cuando reiniciar el juego devuelve el sistema a un estado limpio y confiable, cuando el build de producción se ejecuta sin fallos y cuando la documentación permite a otra persona levantar el proyecto sin depender del autor original.

## 19. Resumen operativo final

Este archivo organiza el trabajo de construcción del bingo como un sistema de agentes especializados. La clave no está en complejizar el equipo, sino en separar claramente los focos de arquitectura, UX UI, frontend, lógica de dominio, animación, QA, despliegue y documentación.

Usado correctamente en VS Code con Codex GPT-5.4, este enfoque permite desarrollar la aplicación por capas, reducir errores, mantener el control del producto y acelerar la salida a producción sin perder claridad técnica. La prioridad siempre debe ser la misma: una experiencia visual simple y atractiva, respaldada por una lógica sólida donde los números del bingo nunca se repiten.