import { useAuth } from "../../contexts";
import { Api } from "../../config";
// import { handleErrorResponse } from "services";
import { Fetchers, Request, RequestMethod, RequestParams } from "../../types";

type AuthHeader = {
  Authorization: string;
};

const useFetch = (): Fetchers => {
  const { logout } = useAuth();

  const getHeaderParam = ({
    auth,
    token,
  }: {
    auth: boolean;
    token?: string;
  }): string | undefined => {
    if (!auth) return;
    if (token) return token;
    // const localAuth = getLocalAuth();
    // return localAuth?.token;
  };

  const getAuthHeader = (token?: string): AuthHeader | {} => {
    if (token) return { Authorization: `Bearer ${token}` };
    return {};
  };

  const request = (method: RequestMethod): Request => {
    return async ({
      auth = true,
      body,
      fullUrl = false,
      rawBody = false,
      responseType,
      token,
      url,
    }: RequestParams) => {
      const requestOptions: RequestInit = {
        method,
      };

      if (!rawBody) {
        const headerParam = getHeaderParam({ auth, token });
        // requestOptions.headers = getAuthHeader(headerParam);
      }

      if (body) {
        if (rawBody) {
          requestOptions.body = body as BodyInit;
        } else {
          requestOptions.headers = {
            ...requestOptions.headers,
            "Content-Type": "application/json",
          };
          requestOptions.body = JSON.stringify(body);
        }
      }

      const endpoint = fullUrl ? url : `${Api}${url}`;
      const res = await fetch(endpoint, requestOptions);

      if (!rawBody) {
        const data = await res.json();
        if (!res.ok) {
          const status = res.status;
          // if (status === 401) logout(EXPIRED_TOKEN_MESSAGE);
          // handleErrorResponse(data, status, responseType);
        }

        return data;
      }
    };
  };

  return {
    get: request(RequestMethod.GET),
    post: request(RequestMethod.POST),
    patch: request(RequestMethod.PATCH),
    put: request(RequestMethod.PUT),
    delete: request(RequestMethod.DELETE),
  };
};

export default useFetch;
