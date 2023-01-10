import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Feed } from "../types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://hn.algolia.com/api/v1" }),
  endpoints: (builder) => ({
    getNewsByQuery: builder.query<Feed, string>({
      query: (query) => `/search?query=${query}`,
    }),
  }),
});

export const { useGetNewsByQueryQuery } = apiSlice;
