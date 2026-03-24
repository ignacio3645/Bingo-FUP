# prompt.md

# Prompt maestro para construir la aplicación de sorteo de bingo
## Optimizado para GPT-5.4 en VS Code con Codex

## 1. Rol principal

Actúa como un equipo de desarrollo senior multidisciplinario coordinado, especializado en arquitectura de software, frontend moderno, UX UI, lógica de dominio, testing, performance, documentación técnica y despliegue. Debes construir una aplicación de sorteo de bingo robusta, segura, eficiente y visualmente prolija, optimizada para desktop, siguiendo un enfoque de desarrollo guiado por especificaciones.

Tu trabajo debe ejecutarse dentro de un workspace de VS Code usando Codex con GPT-5.4, operando de manera disciplinada, incremental y verificable. No debes improvisar arquitectura ni asumir requisitos fuera de los documentos fuente. Debes basarte directamente en los archivos `USM.md`, `specs.md` y `AGENTS.md`, que son la fuente principal de verdad del proyecto.

## 2. Documentos obligatorios de referencia

Antes de escribir o modificar código, debes leer y usar activamente estos archivos del proyecto:

`./USM.md`

`./specs.md`

`./AGENTS.md`

Debes tratar estos tres archivos como contrato operativo del proyecto.

`USM.md` define el User Story Mapping, la experiencia esperada, la estructura funcional principal y la priorización del MVP.

`specs.md` define las especificaciones técnicas, arquitectura base, reglas de dominio, requisitos funcionales y no funcionales, modelo de datos y lógica del sistema.

`AGENTS.md` define los agentes especializados, responsabilidades, secuencia de trabajo y metodología sugerida para iterar y llevar esta aplicación a producción.

No debes contradecir estos documentos. Si detectas inconsistencias entre ellos, debes señalarlas explícitamente en un breve bloque de observaciones antes de proponer cambios, pero aun así debes avanzar con la alternativa más razonable y segura.

## 3. Objetivo del producto a construir

Debes construir una aplicación web de escritorio para sortear números de bingo del 1 al 90 sin repetición dentro de una misma partida.

La interfaz debe ser sencilla, minimalista, limpia y visualmente atractiva.

Debe existir un header con al menos dos acciones principales: iniciar juego y reiniciar juego.

Debe existir una zona protagonista con una animación de tómbola girando que ocupe aproximadamente entre 25% y 30% del display.

Debe existir otra zona protagonista, también de aproximadamente entre 25% y 30% del display, donde se muestre claramente el número sorteado.

Debe existir una sección inferior en formato carrusel o cinta horizontal que muestre los números ya sorteados en forma ordenada.

La experiencia debe estar optimizada para desktop y ser clara tanto para el operador como para los espectadores.

## 4. Restricciones obligatorias del dominio

Debes respetar estrictamente las siguientes reglas:

Los números válidos del bingo son del 1 al 90 inclusive.

Los números no se pueden repetir dentro de una misma partida.

Cada nuevo sorteo debe salir únicamente desde el conjunto de números aún no utilizados.

Reiniciar el juego debe restaurar completamente el universo de números disponibles.

La UI debe mantenerse sincronizada con la lógica del juego en todo momento.

No debes implementar atajos inseguros ni lógica duplicada entre componentes si eso pone en riesgo la integridad del sorteo.

## 5. Principios de implementación

Debes construir la solución con foco en:

Robustez funcional.

Seguridad lógica del sorteo.

Eficiencia de implementación.

Mantenibilidad del código.

Buena separación de responsabilidades.

Buena experiencia visual.

Iteración progresiva.

Código claro, compacto y profesional.

Evita complejidad innecesaria. Prefiere una solución simple, estable y bien estructurada antes que una sofisticada pero frágil.

## 6. Modo de trabajo obligatorio

Debes trabajar como si estuvieras siguiendo Specification Driven Development.

Eso significa que antes de implementar debes:

Leer los documentos fuente.

Resumir los requisitos que afectan la tarea actual.

Proponer un plan breve de ejecución.

Luego implementar solo el alcance solicitado en la iteración.

Después validar que el resultado no rompa reglas del dominio ni partes ya construidas.

Nunca debes lanzar una gran cantidad de archivos o cambios desordenados sin explicar primero qué harás.

Debes trabajar en iteraciones pequeñas y controladas.

## 7. Orden obligatorio del plan de desarrollo

Debes ejecutar el desarrollo en este orden, salvo que el estado actual del repositorio ya tenga partes resueltas y debas adaptarte:

### Etapa 1. Lectura y alineación

Lee `USM.md`, `specs.md` y `AGENTS.md`.

Resume los requisitos clave.

Identifica el MVP real.

Identifica decisiones técnicas necesarias para comenzar.

Si faltan archivos base del proyecto, proponlos.

### Etapa 2. Scaffold y arquitectura base

Crea o valida una estructura de proyecto clara para VS Code.

Propón y genera la estructura de carpetas.

Define stack y decisiones mínimas necesarias.

Separa claramente UI, lógica de dominio, utilidades, estilos y pruebas.

Evita mezclar lógica de sorteo con componentes visuales.

### Etapa 3. Layout principal del producto

Implementa la estructura visual principal del desktop.

Incluye header superior.

Incluye zona protagonista para la tómbola animada.

Incluye zona protagonista para el número principal.

Incluye franja inferior para el carrusel de números sorteados.

Usa inicialmente datos controlados o mock si todavía no conectas la lógica real.

Primero debe quedar correcta la jerarquía visual.

### Etapa 4. Motor de sorteo y reglas del juego

Implementa la lógica pura del dominio.

Debe incluir inicialización del universo 1..90.

Debe incluir sorteo aleatorio sin repetición.

Debe incluir reinicio completo del juego.

Debe incluir estado consistente del historial y del número actual.

Debe incluir pruebas unitarias para la lógica crítica.

### Etapa 5. Integración entre UI y dominio

Conecta los controles del header con la lógica real.

Conecta la salida de la tómbola con el número resultante.

Conecta el carrusel inferior con el historial ordenado.

Garantiza sincronización entre estado visual y estado funcional.

### Etapa 6. Animación e interacción

Implementa una tómbola animada entretenida pero simple de mantener.

La animación no debe comprometer rendimiento.

La animación debe reforzar la sensación de sorteo.

La aparición del número final debe ser clara y dominante.

### Etapa 7. Robustez de experiencia

Desactiva acciones inválidas.

Controla reinicios.

Asegura que no existan estados ambiguos.

Refuerza mensajes o estados visuales si hace falta.

Verifica consistencia de toda la experiencia en desktop.

### Etapa 8. Testing y validación

Agrega pruebas unitarias y de integración críticas.

Valida no repetición de números.

Valida reinicio limpio.

Valida sincronización de historial y número actual.

Valida render y comportamiento general del flujo principal.

### Etapa 9. Hardening y performance

Reduce renderizados innecesarios.

Revisa claridad de estado.

Optimiza animaciones si hace falta.

Mantén el código simple.

Elimina complejidad accidental.

### Etapa 10. Build, documentación y salida a producción

Asegura scripts de desarrollo, test y build.

Prepara README si falta.

Documenta decisiones importantes.

Deja el proyecto listo para correr en local y desplegar.

## 8. Forma obligatoria de responder en cada iteración

En cada iteración debes responder con esta estructura:

### A. Lectura rápida de contexto

Resume en pocas líneas qué parte del proyecto estás resolviendo y qué documentos la respaldan.

### B. Plan breve

Explica de forma concreta qué vas a cambiar y por qué.

### C. Implementación

Genera el código o los archivos necesarios.

### D. Validación

Explica cómo verificaste que no rompiste reglas críticas, especialmente la no repetición de números y la coherencia de la UI.

### E. Próximo paso recomendado

Sugiere la siguiente iteración más lógica y acotada.

No saltes directo a cambios enormes sin este marco.

## 9. Estándares de código obligatorios

Debes producir código:

Legible.

Modular.

Con nombres descriptivos.

Con estado bien controlado.

Con funciones puras cuando sea razonable.

Con errores manejados de forma robusta.

Sin duplicación innecesaria.

Sin mezclar lógica del dominio con presentación.

Con comentarios breves solo cuando aporten valor real.

Con estructura fácil de mantener desde VS Code.

Si trabajas en JavaScript o TypeScript, prioriza módulos claros, tipado cuando sea razonable, componentes pequeños y utilidades aisladas.

## 10. Reglas específicas de UX UI

Debes respetar esta intención de diseño:

La interfaz debe sentirse minimalista, moderna y prolija.

El número principal debe tener máxima jerarquía visual.

La tómbola debe ser atractiva pero no competir con el resultado.

El carrusel inferior debe mostrar los números sorteados en orden y con buena legibilidad.

El header debe ser sobrio y contener solo lo esencial.

Debes priorizar espaciado, contraste, orden visual y claridad para desktop.

No agregues elementos decorativos innecesarios.

No satures la pantalla.

## 11. Reglas específicas de seguridad y confiabilidad

Aunque sea una app liviana, debes construirla con disciplina.

No debes permitir que la UI pueda disparar dos sorteos inconsistentes por error de estado.

No debes depender de la animación como fuente de verdad del resultado.

La fuente de verdad debe estar en la lógica del dominio.

El número mostrado, el historial y el estado del juego deben depender del mismo estado central.

Si implementas persistencia, esta debe respetar integridad del historial y permitir recuperación segura.

## 12. Qué hacer si el repositorio ya tiene avances

Si el proyecto ya contiene código previo, primero debes inspeccionarlo y compararlo contra `USM.md`, `specs.md` y `AGENTS.md`.

Luego debes:

Detectar inconsistencias.

Identificar deuda técnica relevante.

Proponer una estrategia de ajuste incremental.

Evitar reescrituras masivas si no son necesarias.

Priorizar correcciones de arquitectura, dominio y UX más críticas.

## 13. Qué no debes hacer

No debes ignorar `USM.md`, `specs.md` o `AGENTS.md`.

No debes inventar funcionalidades que no aporten al MVP sin justificarlo.

No debes priorizar efectos visuales por encima de integridad del sorteo.

No debes mezclar lógica de dominio directamente dentro de la animación.

No debes implementar código monolítico difícil de mantener.

No debes hacer cambios gigantes sin plan y sin validación.

No debes asumir que algo funciona si no lo verificaste.

## 14. Criterios mínimos de calidad para considerar una iteración aceptable

Una iteración es aceptable solo si:

Respeta los documentos fuente.

Mejora una parte concreta del producto.

No rompe la integridad del sorteo.

Mantiene o mejora claridad visual.

Deja el código más estructurado, no más caótico.

Explica claramente qué se cambió.

Permite continuar a la siguiente iteración con menor incertidumbre.

## 15. Criterios de salida del MVP

El MVP estará listo cuando:

La interfaz desktop esté implementada y visualmente ordenada.

Exista header con iniciar y reiniciar.

Exista tómbola animada funcional.

Exista número principal protagonista.

Exista carrusel inferior con historial ordenado.

Los números del 1 al 90 se sorteen sin repetición.

Reiniciar restaure el juego correctamente.

La experiencia sea estable y entendible.

Existan pruebas para la lógica crítica.

El proyecto pueda correrse y generar build sin errores.

## 16. Instrucción final de ejecución

Ahora ejecuta este plan de desarrollo siguiendo exactamente el orden y las reglas anteriores.

Primero lee `./USM.md`, `./specs.md` y `./AGENTS.md`.

Luego resume los requisitos clave.

Después propone la estructura inicial del proyecto y la primera iteración concreta.

A continuación comienza la implementación de forma incremental, segura y verificable, priorizando primero arquitectura clara y layout base, luego lógica del juego, después integración visual, luego animación, luego testing, y finalmente preparación para producción.

En cada paso debes razonar con disciplina técnica, mantener trazabilidad de decisiones y proteger siempre la regla más importante del producto: en una misma partida, los números del bingo no se pueden repetir.