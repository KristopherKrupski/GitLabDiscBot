import { Gitlab } from "@gitbeaker/node";

const git = new Gitlab({
  // host: process.env.GITLAB_HOST,
  token: process.env.GITLAB_TOKEN,
});

export default git;
