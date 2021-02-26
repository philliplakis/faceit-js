import axios from "axios";

interface Headers {
  url: string;
  headers: {
    authorization: string;
    content_type: string;
  };
}

enum ChampionshipOption {
  subscriptions = "subscriptions",
  matches = "matches",
  organizer = "organizer",
  game = "game",
}

export class Faceit {
  private authorization: string;
  private apiUrl: string = "https://open.faceit.com/data/v4";

  constructor(token: string) {
    this.authorization = `Bearer ${token}`;
  }

  private get headers(): Headers {
    return {
      url: this.apiUrl,
      headers: {
        authorization: `${this.authorization}`,
        content_type: "application/json",
      },
    };
  }

  public async account(): Promise<boolean> {
    const req = this.headers;
    req.url = req.url.concat("/games?limit=1");

    try {
      await axios(req);
      return true;
    } catch (error) {
      return false;
    }
  }

  public async championships(
    championship_id: string,
    option?: string,
    limit?: number
  ): Promise<any | Error> {
    if (!championship_id) throw Error("championship_id");
    if (!limit) limit = 20;

    const req = this.headers;
    if (!option) {
      req.url = req.url.concat(
        `/championships/${championship_id}?offset=0&limit=${limit}`
      );
    }
    if (option === "matches" || option === "subscriptions") {
      req.url = req.url.concat(
        `/championships/${championship_id}/${option}?offset=0&limit=${limit}`
      );
    }

    if (option === "game" || option === "organizer") {
      req.url = req.url.concat(
        `/championships/${championship_id}?expanded=${option}&offset=0&limit=${limit}`
      );
    }

    try {
      const data = await axios(req);
      return data.data;
    } catch (error) {
      throw Error(error);
    }
  }
}
