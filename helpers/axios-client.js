import axios from "axios";
import { getSession } from "next-auth/react";

const baseURL = "http://localhost:3000" || "http://localhost:1337";

console.log("calling axios client...");
const ApiClient = () => {
  const defaultOptions = {
    baseURL,
  };

  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    console.log({ session });
    if (session) {
      request.headers.Authorization = `Bearer ${session.jwt}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(`error`, error);
    }
  );

  console.log("called axios client!");
  return instance;
};

export default ApiClient();
