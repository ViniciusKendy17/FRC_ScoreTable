import type { Aliança, Partida } from "../utils/Types";
import { HandleTry } from "../utils/Util";

export const PartidaService = {
  GetMatches: () =>
    HandleTry<Partida[]>(async () => {
      const res = await fetch("http://localhost:3000/frc/matches");

      const { partidas } = await res.json();

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return partidas as Partida[];
    }),

  AddMatch: async function () {},
  EditMatch: async function () {},
  EndJudgeMatch: (id: number, alianca: Aliança) => {
    HandleTry(async () => {
      const res = await fetch(
        `http://localhost:3000/frc/match/judge/end/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(alianca),
        }
      );

      const data = await res.json();
      console.log(data);
    });
  },
  EndMatch: async function () {},
  GetAlliencesByMatch: (id: number) =>
    HandleTry<Aliança[]>(async () => {
      const res = await fetch(
        `http://localhost:3000/frc/match/${id}/alliances`
      );

      const { aliancas } = await res.json();

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return aliancas as Aliança[];
    }),
};
