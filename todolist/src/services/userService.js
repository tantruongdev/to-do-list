import { get } from "../utils/request";

export const getUserList = async () => {
  const result = await get("users");
  return result;
};
