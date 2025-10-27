import type { Pontos } from "../utils/ScoreTable";
import type { AliancaParcial, Aliança, Equipe, Partida } from "../utils/Types";
import { HandleTry } from "../utils/Util";

export const PartidaService = {
  GetMatches: () =>
    HandleTry<Partida[]>(async () => {
      const res = await fetch("http://192.168.1.4:3000/frc/matches");

      const { partidas } = await res.json();

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return partidas as Partida[];
    }),

  GetTeams: () =>
    HandleTry(async () => {
      const res = await fetch("http://192.168.1.4:3000/frc/teams");

      const { equipes } = await res.json();

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return equipes as Equipe[];
    }),

  AddMatch: (payload: any) => {
    return HandleTry(async () => {
      const res = await fetch("http://192.168.1.4:3000/frc/match/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(res.statusText);

      const data = await res.json();

      console.log(data);

      return data;
    });
  },
  EditMatch: async function () {},
  EndJudgeMatch: (id: number, alianca: any) => {
    return HandleTry(async () => {
      console.log(alianca);

      const res = await fetch(
        `http://192.168.1.4:3000/frc/match/judge/end/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(alianca),
        }
      );

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();
      console.log(data);

      return data;
    });
  },
  DeleteMatch: (id: number) => {
    return HandleTry(async () => {
      const res = await fetch(
        `http://192.168.1.4:3000/frc/match/delete/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();

      console.log(data);
      return data;
    });
  },
  EndMatch: async function () {},
  GetAlliencesByMatch: (id: number) =>
    HandleTry<Aliança[]>(async () => {
      const res = await fetch(
        `http://192.168.1.4:3000/frc/match/${id}/alliances`
      );

      const { aliancas } = await res.json();

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return aliancas as Aliança[];
    }),

  GetMatchInfo: (id: number) => {
    return HandleTry(async () => {
      const res = await fetch(
        `http://192.168.1.4:3000/frc/match/${id}/score`
      );

      const { match_info, alliances } = await res.json();

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return { match_info, alliances } as {
        match_info: any;
        alliances: AliancaParcial[];
      };
    });
  },
  GetResult: (id: number) => {
    return HandleTry(async () => {
      const res = await fetch(
        `http://192.168.1.4:3000/frc/match/${id}/result`
      );

      const { match_info, alliances } = await res.json();

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return { match_info, alliances } as {
        match_info: Partida;
        alliances: Aliança[];
      };
    });
  },
};
