import { customAlphabet } from "nanoid";

export const newId = (): string => {
  const nanoid = customAlphabet(
    "_-AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtXxYyZz",
    8,
  );
  return nanoid();
};
