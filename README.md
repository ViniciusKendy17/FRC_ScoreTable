
# FRC SCORE SYSTEM

This is a simple score frc points system developed for the FESTIVAL SESI MG DE ROBÓTICA 2025.



## Description

The FRC Score System is a web application created to manage and display the scoring of FRC-style matches during the FESTIVAL SESI MG de Robótica 2025.
It allows referees to input scores easily and updates all match information in real time using WebSockets. The system includes an alliance scoring section, a live match scoreboard, and a table for qualification matches.




## Main Features

- Qualification match scoreboard
- Alliance scoring section
- Live match scoreboard
- CRUD for matches and alliances




## Stack 

- React
- TypeScript
- WebSocket.io
- Node + Express
- MySql




## Running application

Clone the project

```bash
  git clone https://github.com/ViniciusKendy17/FRC_ScoreTable.git
```

Enter the project directory

```bash
  cd FRC_ScoreTable
```

Install all dependencies

```bash
  npm install
```

Run the server in `/Server` and client in `/Client` by using

```bash
  npm run dev
```



## Melhorias

- Improve authentication (currently very basic)
- Create a shared typing pattern for client and server
- (Extra) Support multiple simultaneous matches with separated scoreboards

## Autores

- [@ViniciusKendy17](https://github.com/ViniciusKendy17)
- [@LucasPacheco](https://github.com/LaPachec)

