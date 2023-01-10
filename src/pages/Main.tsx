import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Bar from "../components/Bar";
import FeedWrapper from "../components/FeedWrapper";
import useDebounce from "../useDebounce";
import { useGetNewsByQueryQuery } from "../app/apiSlice";

const Main: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useRef({});

  const pageNum = searchParams.get("page");
  const searchQueryValue = searchParams.get("query");

  const [searchQuery, setSearchQuery] = useState(searchQueryValue || "");
  const debouncedValue = useDebounce<string>(searchQuery, 1000);

  const [page, setPage] = useState(Number(pageNum) || 1);

  const [pageQty, setPageQty] = useState(0);

  const { data: news, isLoading } = useGetNewsByQueryQuery(
    `query=${debouncedValue}&page=${page - 1}`
  );

  useEffect(() => {
    if (news) {
      setPageQty(news?.nbPages);

      if (news.nbPages < page) {
        setPage(1);
        setSearchParams({ ...params.current, page: String(1) });
      }
    }
  }, [page, news, searchQuery]);

  useEffect(() => {
    setSearchParams(params.current);
  }, [page, searchQuery]);

  return (
    <>
      <CssBaseline />
      <Bar
        news={news}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
        params={params}
      />
      <FeedWrapper
        news={news}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        pageQty={pageQty}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
        params={params}
      />
    </>
  );
};

export default Main;
