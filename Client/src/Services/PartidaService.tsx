import type { Pontos } from "../utils/ScoreTable";
import type {
  AliancaParcial,
  Aliança,
  Equipe,
  PartialAlianca,
  Partida,
} from "../utils/Types";
import { HandleTry } from "../utils/Util";

export const PartidaService = {
  GetMatches: () =>
    HandleTry<Partida[]>(async () => {
      const res = await fetch("http://10.100.10.58:3000/frc/matches");

      const { partidas } = await res.json();

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return partidas as Partida[];
    }),

  GetTeams: () =>
    HandleTry(async () => {
      const res = await fetch("http://10.100.10.58:3000/frc/teams");

      const { equipes } = await res.json();

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return equipes as Equipe[];
    }),

  AddMatch: (payload: any) => {
    return HandleTry(async () => {
      const res = await fetch("http://10.100.10.58:3000/frc/match/new", {
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
  EditMatch: async function (id: number, alianca: any) {
    return HandleTry(async () => {
      console.log(alianca);

      const res = await fetch(
        `http://10.100.10.58:3000/frc/match/edit/${id}`,
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
  EndJudgeMatch: (id: number, alianca: any) => {
    return HandleTry(async () => {
      console.log(alianca);

      const res = await fetch(
        `http://10.100.10.58:3000/frc/match/judge/end/${id}`,
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
      const res = await fetch(`http://10.100.10.58:3000/frc/match/delete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();

      console.log(data);
      return data;
    });
  },
  EndMatch: async function (id: number, aliancas: any) {
    return HandleTry(async () => {
      const res = await fetch(`http://10.100.10.58:3000/frc/match/end/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(aliancas),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      const data = await res.json();
      console.log(data);

      return data;
    });
  },
  GetAlliencesByMatch: (id: number) =>
    HandleTry<Aliança[]>(async () => {
      const res = await fetch(
        `http://10.100.10.58:3000/frc/match/${id}/alliances`
      );

      const { aliancas } = await res.json();

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return aliancas as Aliança[];
    }),

  GetMatchInfo: (id: number) => {
    return HandleTry(async () => {
      const res = await fetch(`http://10.100.10.58:3000/frc/match/${id}/score`);

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
        `http://10.100.10.58:3000/frc/match/${id}/result`
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
  GetTeamsFromMatch: (id: number) => {
    return HandleTry(async () => {
      const res = await fetch(
        `http://10.100.10.58:3000/frc/match/${id}/teams`
      );

      const { teams } = await res.json();

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return { teams } as { teams: PartialAlianca[] };
    });
  },
};
