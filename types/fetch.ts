type Response = {
  message: string;
  data: unknown;
  lek?: string;
};

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type RequestParams = {
  auth?: boolean; // include token or not
  body?: unknown; // include body or not
  fullUrl?: boolean; // include base api url or not
  rawBody?: boolean; // JSON.stringify body or not
  responseType?: ResponseType; // used to handle 404 error responses
  token?: string;
  url: string; // endpoint url, with or without base api url
};

export type Request = (requestParams: RequestParams) => Promise<Response>;

export type Fetchers = {
  get: Request;
  post: Request;
  patch: Request;
  put: Request;
  delete: Request;
};
