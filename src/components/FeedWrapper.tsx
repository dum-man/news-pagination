import React, { useEffect } from "react";
import { URLSearchParamsInit } from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Pagination,
  Skeleton,
  Stack,
} from "@mui/material";
import { Feed } from "../types";

type FeedProps = {
  news: Feed | undefined;
  isLoading: boolean;
  page: number;
  setPage: (arg: number) => void;
  pageQty: number;
  searchParams: URLSearchParams;
  setSearchParams: (
    nextInit: URLSearchParamsInit,
    navigateOptions?:
      | {
          replace?: boolean | undefined;
          state?: any;
        }
      | undefined
  ) => void;
  params: React.MutableRefObject<{ page: number } | {}>;
};

const FeedWrapper: React.FC<FeedProps> = ({
  news,
  isLoading,
  page,
  setPage,
  pageQty,
  searchParams,
  setSearchParams,
  params,
}) => {
  const handleSetPage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (page) {
      //@ts-ignore
      params.current.page = page;
    } else {
      //@ts-ignore
      delete params.current.page;
    }
  }, [page]);

  return (
    <Stack>
      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        m={3}
        mx={10}
        rowGap={3}
      >
        {isLoading &&
          Array.from(new Array(10)).map((_, index) => (
            <Skeleton
              key={index + 1}
              animation="wave"
              variant="rectangular"
              width="600px"
              height="200px"
              sx={{ borderRadius: "4px" }}
            />
          ))}
        {news &&
          news.hits.map((item) => (
            <Card key={item.objectID} sx={{ width: "600px", heigth: "200px" }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title || item.story_title}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {item.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(item.created_at).toLocaleString("ru-RU").split(",")[0]}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" href={item.url} target="_blank">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
      </Stack>
      {!!pageQty && (
        <Pagination
          count={pageQty}
          page={page}
          onChange={handleSetPage}
          showFirstButton
          showLastButton
          sx={{ marginY: 3, marginX: "auto" }}
        />
      )}
    </Stack>
  );
};

export default FeedWrapper;
