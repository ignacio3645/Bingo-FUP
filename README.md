# Bingo FUP

Aplicacion web desktop para sorteo de bingo de 90 numeros, construida con `React + TypeScript + Vite`.

## Estado actual

- MVP funcional con header sobrio, tombola animada, numero principal dominante e historial horizontal.
- Motor de sorteo puro con numeros `1..90`, sin repeticion por partida.
- Estados de juego soportados: `pending`, `active`, `paused`, `finished`.
- Auditoria basica en memoria para creacion, inicio, sorteos, pausa, reanudacion, finalizacion y reinicio.
- Pruebas unitarias del dominio y una prueba de integracion del flujo principal.

## Scripts

- `npm install`
- `npm run dev`
- `npm run test`
- `npm run build`
- `npm run preview`

## Estructura

- `src/app`: composicion principal y hook de orquestacion del juego.
- `src/components`: bloques visuales del header, tombola, numero actual e historial.
- `src/domain/bingo`: reglas puras del dominio, tipos y pruebas unitarias.
- `src/styles`: estilos globales y layout desktop.

## Decisiones tecnicas

- La fuente de verdad del juego vive en `src/domain/bingo/game.ts`.
- La animacion no decide resultados; solo reacciona al numero ya sorteado por el motor.
- El historial visible y el numero principal dependen del mismo estado central del hook `useBingoGame`.

## Observacion de alcance

`specs.md` pide pausa, reanudacion, finalizacion y auditoria basica en primera version, mientras `USM.md` prioriza un header minimalista con inicio y reinicio como controles criticos del MVP. Se implemento una version compacta que mantiene esos controles principales y agrega pausa/finalizacion sin recargar la interfaz.
