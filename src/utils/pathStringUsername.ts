import { IS_LINUX, IS_WINDOWS, PLATFORM } from "../common.js";

export function setUsernameInPathStringIfAny(
  pathString: string,
  newUsername: string
) {
  const regexForWindows = /^([A-Z]:\\Users\\)(.+?)(\\.*)$/;
  const regexForLinux = /^(\/home\/)(.+?)(\/.*)$/;

  let regexToUse: RegExp;

  if (IS_WINDOWS) {
    regexToUse = regexForWindows;
  } else if (IS_LINUX) {
    regexToUse = regexForLinux;
  } else {
    throw new Error(`Unknown platform '${PLATFORM}'`);
  }

  const matches = pathString.match(regexToUse);

  if (matches === null) {
    // username component is not present
    return pathString;
  }

  // matches[0] is the full string match
  // matches[1] is the front part
  // matches[2] is the username component
  // matches[3] is the back part

  if (matches.length !== 4) {
    throw new Error(
      `Expected to extract the username component from the pathString '${pathString}'`
    );
  }

  const [_ignoredFullStringMatch, frontPart, username, backPart] = matches;

  if (typeof frontPart !== "string") {
    throw new Error("Expected 'frontPart' to be a string");
  }
  if (typeof username !== "string") {
    throw new Error("Expected 'username' to be a string");
  }
  if (typeof backPart !== "string") {
    throw new Error("Expected 'backPart' to be a string");
  }

  return `${frontPart}${newUsername}${backPart}`;
}
