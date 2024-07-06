import { postRequest } from "../../utils";

enum Jira {
  PATH = "https://xray.cloud.getxray.app",
  AUTHENTICATE = "/api/v2/authenticate",
  ATTACHMENT = "/api/v2/attachment",
}

class JiraAPIClient {
  async authenticate() {
    const CLIENT_ID = "";
    const CLIENT_SECRET = "";
    await postRequest(Jira.PATH.concat(Jira.AUTHENTICATE), {
      data: { client_id: CLIENT_ID, client_secret: CLIENT_SECRET },
    });
  }
}

export const jira = new JiraAPIClient();
