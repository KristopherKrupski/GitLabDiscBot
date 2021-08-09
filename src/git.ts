import { Gitlab } from "@gitbeaker/node";

const git = new Gitlab({
  // host: hostname,
  token: GitLab Login Token,
});

export default git;
