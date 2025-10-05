import { serialize, parse } from "cookie";
import { NextRequest } from "next/server";

export const setCookie = (name: string, value: string, maxAge = 60 * 60 * 24) => {
  return serialize(name, value, {
    maxAge,
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
};

export const getCookie = (req: NextRequest, name: string) => {
  const cookies = parse(req.headers.get("cookie") || "");
  return cookies[name];
};

export const removeCookie = (name: string) => {
  return serialize(name, "", {
    maxAge: -1,
    path: "/",
  });
};
