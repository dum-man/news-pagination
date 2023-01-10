import React, { useEffect } from "react";
import {
  Slide,
  AppBar,
  Toolbar,
  Typography,
  alpha,
  styled,
  useScrollTrigger,
  Autocomplete,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Feed } from "../types";
import { URLSearchParamsInit } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

type BarProps = {
  window?: () => Window;
  news: Feed | undefined;
  searchQuery: string;
  setSearchQuery: (arg: string) => void;
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
  params: React.MutableRefObject<{ query: string } | {}>;
};

const Bar: React.FC<BarProps> = ({
  window,
  news,
  searchQuery,
  setSearchQuery,
  searchParams,
  setSearchParams,
  params,
}) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  useEffect(() => {
    if (searchQuery) {
      //@ts-ignore
      params.current.query = searchQuery;
    } else {
      //@ts-ignore
      delete params.current.query;
    }
  }, [searchQuery]);

  const handleSetSearchQuery = (
    event: React.SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    setSearchQuery(newInputValue);
  };

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar>
          <Toolbar sx={{ mx: 5 }}>
            <Typography
              variant="h5"
              noWrap
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              News
            </Typography>
            {news && (
              <Search>
                <SearchIcon sx={{ position: "absolute", top: 9, left: 8 }} />
                <Autocomplete
                  inputValue={searchQuery}
                  onInputChange={handleSetSearchQuery}
                  freeSolo
                  id="free-solo-2-demo"
                  options={news.hits.map((option) => option.title || option.story_title)}
                  sx={{
                    width: "300px",
                    pl: 3,
                    ".MuiOutlinedInput-notchedOutline": { color: "white" },
                    ".MuiOutlinedInput-input": { color: "white" },
                    ".MuiSvgIcon-root": { fill: "white" },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      placeholder="Serach..."
                      size="small"
                      sx={{ ".MuiOutlinedInput-notchedOutline": { border: "none" } }}
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                  )}
                />
              </Search>
            )}
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />
    </>
  );
};

export default Bar;
