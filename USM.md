# USM.md

# User Story Mapping - Aplicación de sorteo de bingo

## 1. Propósito del documento

Este documento describe el User Story Mapping de la aplicación de sorteo de bingo, enfocada en una experiencia visual simple, elegante y confiable para desktop. La aplicación debe permitir ejecutar una partida de bingo de 90 números con una interfaz minimalista, limpia y fácil de operar, manteniendo una experiencia atractiva para los jugadores y una operación clara para quien controla el sorteo.

La propuesta de producto considera que el sistema debe mostrar una tómbola animada, un número principal altamente visible, un historial ordenado de números sorteados y controles básicos de operación en el header. La aplicación debe evitar cualquier repetición de números dentro de una misma partida.

## 2. Visión del producto

La aplicación debe sentirse como una experiencia digital moderna de bingo, con foco en legibilidad, entretenimiento visual y simplicidad operativa. El usuario principal es la persona que conduce el sorteo desde un computador, mientras que la audiencia observa la pantalla proyectada o visible en un monitor grande.

La interfaz debe estar optimizada para desktop y organizada de manera que el área principal se concentre en dos grandes focos visuales. Uno de ellos debe ser la tómbola animada, que ocupa aproximadamente entre 25% y 30% del display. El otro debe ser el número sorteado, también ocupando aproximadamente entre 25% y 30% del display. En la parte inferior debe existir un carrusel o cinta horizontal con los números ya sorteados en orden. En la parte superior debe existir un header con acciones principales de iniciar y reiniciar juego.

## 3. Usuarios principales

El usuario operador es quien inicia la partida, activa el sorteo y reinicia el juego cuando corresponde. Necesita una interfaz clara, sin fricción, con controles mínimos y visibilidad inmediata del estado del sistema.

El usuario espectador es quien observa la pantalla durante la partida. Necesita reconocer rápidamente qué número salió, entender que el sorteo sigue activo y revisar visualmente cuáles números ya han aparecido.

## 4. Backbone del User Story Mapping

El flujo principal del producto se organiza alrededor de seis grandes actividades del usuario. Estas actividades representan el backbone del mapa.

La primera actividad es preparar la partida.

La segunda actividad es iniciar el juego.

La tercera actividad es visualizar el sorteo en tiempo real.

La cuarta actividad es consultar el historial de números ya sorteados.

La quinta actividad es controlar el estado del juego.

La sexta actividad es reiniciar la experiencia para una nueva partida.

## 5. Desglose del User Story Mapping

## 5.1 Preparar la partida

Como operador, quiero abrir la aplicación y entender inmediatamente el estado inicial del sistema para comenzar el juego sin confusiones.

Como operador, quiero ver una interfaz limpia y despejada para centrarme solo en las acciones importantes del bingo.

Como operador, quiero que el header esté visible desde el inicio con los controles principales para no tener que buscar acciones críticas.

Como espectador, quiero que desde el primer momento la pantalla se vea ordenada, atractiva y profesional para confiar en el sistema de sorteo.

## 5.2 Iniciar el juego

Como operador, quiero tener un botón de inicio claramente visible en el header para comenzar la partida fácilmente.

Como operador, quiero que al iniciar el juego se active la experiencia visual principal de la tómbola para transmitir que el sorteo está comenzando.

Como espectador, quiero percibir que el juego comenzó oficialmente mediante movimiento, estado visible y feedback claro en pantalla.

Como operador, quiero que el sistema garantice desde el inicio que solo se sortearán números válidos entre 1 y 90 sin repetición.

## 5.3 Visualizar el sorteo en tiempo real

Como espectador, quiero ver una tómbola animada grande y llamativa para sentir que el número sorteado proviene de una experiencia visual entretenida.

Como espectador, quiero que la tómbola ocupe aproximadamente entre 25% y 30% del display para que tenga protagonismo real dentro de la interfaz.

Como espectador, quiero ver el número resultante en un área aún más clara y destacada para identificarlo de inmediato a distancia.

Como operador, quiero que el número mostrado como resultado sea grande, legible y dominante para evitar errores de lectura.

Como espectador, quiero que el área del número principal también ocupe aproximadamente entre 25% y 30% del display para que el resultado del sorteo sea el foco central de la pantalla.

Como operador, quiero que la transición desde la animación de la tómbola hasta la aparición del número sea fluida y visualmente satisfactoria.

Como operador, quiero que cada nuevo sorteo actualice la pantalla sin retrasos ni comportamientos ambiguos.

Como espectador, quiero tener la seguridad de que los números no se repiten para confiar en la legitimidad del juego.

## 5.4 Consultar el historial de números sorteados

Como espectador, quiero ver en la parte inferior de la pantalla un carrusel o cinta horizontal con los números ya sorteados para poder revisar rápidamente qué números han salido.

Como operador, quiero que el historial inferior se mantenga ordenado para poder validar visualmente el avance de la partida.

Como espectador, quiero que los números sorteados aparezcan en forma ordenada dentro del carrusel para que la lectura sea clara y prolija.

Como operador, quiero que el historial se actualice automáticamente cada vez que sale un nuevo número.

Como espectador, quiero que el carrusel inferior tenga una estética limpia y consistente con el resto de la UI para no romper la armonía visual.

## 5.5 Controlar el estado del juego

Como operador, quiero que el sistema refleje claramente cuándo el juego está listo para iniciar, en ejecución o reiniciado.

Como operador, quiero minimizar la cantidad de controles visibles para evitar errores de operación durante una partida en vivo.

Como espectador, quiero que la experiencia visual permanezca estable y consistente durante toda la partida.

Como operador, quiero que el sistema preserve la regla de no repetición de números durante toda la sesión activa.

## 5.6 Reiniciar la experiencia

Como operador, quiero tener un botón de reinicio en el header para comenzar una nueva partida cuando termine la actual o cuando sea necesario reiniciar.

Como operador, quiero que el reinicio limpie el número actual, la animación activa y el historial visual de la partida anterior para volver a un estado inicial claro.

Como espectador, quiero notar claramente cuándo una nueva partida ha comenzado para no confundir números de sesiones anteriores.

Como operador, quiero que el sistema vuelva a habilitar el universo completo de números del 1 al 90 al reiniciar el juego.

## 6. Estructura visual del producto

La pantalla debe dividirse en cuatro áreas principales.

La primera área es el header superior. Debe contener el branding o título de la aplicación y dos acciones primarias: iniciar juego y reiniciar juego. Debe ser sobrio, delgado y consistente con una estética minimalista.

La segunda área es el bloque visual de la tómbola. Debe ocupar aproximadamente entre 25% y 30% del display y representar una animación atractiva, fluida y moderna. Esta animación no necesita simular una física compleja en la primera versión, pero sí debe transmitir claramente la idea de extracción aleatoria de una bola.

La tercera área es el bloque del número principal. Debe ocupar aproximadamente entre 25% y 30% del display y mostrar el número resultante de manera dominante, con tipografía de gran tamaño, alto contraste y excelente legibilidad para desktop y proyección.

La cuarta área es la franja inferior del historial. Debe contener un carrusel horizontal con los números ya sorteados. Este carrusel debe verse ordenado, limpio y dinámico, privilegiando la claridad de lectura sobre la decoración.

## 7. Priorización por releases

## 7.1 Release 1 - MVP funcional

El MVP debe incluir una vista desktop minimalista con header, botón de inicio, botón de reinicio, animación de tómbola, número principal visible y carrusel inferior con historial de números sorteados. Debe existir la regla obligatoria de no repetir números. La interfaz debe estar preparada para una experiencia de uso simple, clara y estable.

En este release, el objetivo principal es lograr una partida funcional y visualmente convincente. La tómbola puede tener una animación simple pero atractiva. El carrusel puede mostrar los números en una secuencia limpia y ordenada. El sistema debe poder iniciar una sesión, sortear números válidos y reiniciar por completo el juego.

## 7.2 Release 2 - Mejoras de experiencia

En una segunda etapa se puede enriquecer la animación de la tómbola, agregar transiciones más refinadas al número principal, incluir efectos sonoros opcionales y mejorar el comportamiento del carrusel inferior para hacerlo más cinematográfico o más útil en proyección.

También en esta etapa se puede reforzar el estado visual de la partida, incorporar mensajes de feedback y mejorar el diseño responsivo para pantallas de distintos tamaños dentro de la categoría desktop.

## 7.3 Release 3 - Escalamiento funcional

En una tercera etapa se pueden agregar auditoría visible, control de sesiones, persistencia entre recargas, validación de cartones, soporte para múltiples vistas y modos especiales para eventos o pantalla pública.

## 8. Historias críticas del MVP

La historia más crítica es que, como operador, quiero iniciar el juego para activar una partida de bingo desde una interfaz simple y sin fricción.

La segunda historia crítica es que, como espectador, quiero ver una tómbola animada y un número grande en pantalla para identificar claramente el resultado del sorteo.

La tercera historia crítica es que, como operador, quiero que el sistema nunca repita un número para asegurar la validez del bingo.

La cuarta historia crítica es que, como espectador, quiero ver un carrusel inferior con el historial ordenado de números sorteados para seguir el desarrollo del juego.

La quinta historia crítica es que, como operador, quiero reiniciar el juego desde el header para comenzar una nueva partida limpiamente.

## 9. Reglas de UX y UI

La experiencia debe priorizar limpieza visual, jerarquía fuerte y mínima carga cognitiva. No deben existir elementos innecesarios ni controles secundarios que distraigan del flujo principal del bingo.

La tipografía del número principal debe ser extremadamente visible y estar pensada para ser leída a distancia. La animación de la tómbola debe ser entretenida, pero no debe competir visualmente con el número resultante. El header debe verse sobrio y contener solo lo indispensable. El carrusel inferior debe mantener orden y ritmo visual, mostrando los números sorteados con espaciado uniforme y excelente contraste.

La composición general debe sentirse moderna, elegante y confiable. El estilo visual debe inclinarse por una estética minimalista y prolija, con transiciones suaves, buen uso del espacio negativo y bloques visuales claramente separados.

## 10. Reglas funcionales del sistema asociadas al mapa

Cada vez que el juego esté activo, el sistema debe poder seleccionar un nuevo número del conjunto disponible sin repetir ninguno de los ya sorteados.

El conjunto válido siempre debe estar restringido al rango 1 a 90.

Cada nuevo número debe reflejarse simultáneamente en la animación, en el bloque del número principal y en el carrusel inferior.

El botón de reinicio debe devolver la experiencia a su estado inicial y restaurar el universo completo de números disponibles.

El sistema debe impedir cualquier comportamiento que haga aparecer dos veces el mismo número dentro de una misma partida.

## 11. Criterios de aceptación del User Story Mapping

El producto cumple este User Story Mapping cuando un operador puede abrir la aplicación y entenderla sin instrucciones adicionales.

El producto cumple este User Story Mapping cuando el header presenta claramente las acciones de iniciar juego y reiniciar juego.

El producto cumple este User Story Mapping cuando la tómbola animada ocupa un área protagonista de aproximadamente 25% a 30% del display.

El producto cumple este User Story Mapping cuando el número principal ocupa un área protagonista de aproximadamente 25% a 30% del display y puede ser leído fácilmente a distancia.

El producto cumple este User Story Mapping cuando el carrusel inferior muestra los números sorteados en forma ordenada y se actualiza correctamente en cada extracción.

El producto cumple este User Story Mapping cuando la experiencia general se percibe minimalista, limpia, prolija y optimizada para desktop.

El producto cumple este User Story Mapping cuando no existe repetición de números dentro de una misma partida.

## 12. Resumen ejecutivo

Este User Story Mapping define una aplicación de bingo desktop centrada en una experiencia visual limpia y potente. El flujo principal se apoya en iniciar el juego, visualizar una tómbola animada, mostrar de manera protagonista el número resultante, consultar el historial ordenado en un carrusel inferior y reiniciar la partida desde el header.

El corazón del producto está en combinar claridad operativa con una experiencia visual atractiva. La interfaz debe sentirse moderna, simple y confiable, mientras que la lógica del sistema debe garantizar estrictamente que los números no se repitan.