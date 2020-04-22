import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import SearchIcon from "@material-ui/icons/Search";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import Content from "./Content";
import ListOfData from "./ListOfData";
import nyt from "../nyt.png";
import Chart from "./Chart";

const drawerWidth = 285;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
    backgroundColor: "#e0e0e0",
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  one: {
    fontFamily: "sans-serif",
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "#eeeeee",
  },
  head: {
    justifyContent: "center",
    alignItems: "center",
  },

  search: {
    width: `calc(55% - ${drawerWidth}px)`,
    marginLeft: drawerWidth + 30,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "white",
    marginRight: theme.spacing(5),
    padding: theme.spacing(1, 0, 1, 1),
    marginTop: 15,
    height: "100%",
  },
  searchIcon: {
    padding: theme.spacing(1, 1, 3, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  },
  margin: {
    margin: theme.spacing(1, 0),
    height: 48,
    marginTop: theme.spacing(2),
    borderRadius: 25,
    opacity: 0.7,
    width: `10%`,
    fontSize: 16,
  },
  progress: {
    margin: theme.spacing(2),
    marginTop: 150,
    marginLeft: drawerWidth + 300,
  },
  chart: {
    margin: theme.spacing(2),
    marginTop: 50,
    marginLeft: drawerWidth + 20,
    width: "70%",
  },
}));

export default function PermanentDrawerLeft() {
  const classes = useStyles();

  const [inputText, setInputText] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [topic, setTopic] = useState("");
  const [show, setShow] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [chartLoading, setChartLoading] = useState(false);
  const [dArray, setDArray] = useState([]);

  useEffect(() => {
    if (show) {
      setLoading(true);
      const text = topic;
      Axios.get(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
          text +
          "&page=" +
          page +
          "&sort=newest&api-key=xrp7NPZMKRQ3U8nmHM5UMXu2XwBKYXei&begin_date=20110101&end_date=20201231"
      )
        .then((res) => {
          setData(res.data.response.docs);

          setInputText("");
          setLoading(false);
          // console.log(res.data.response.docs);
        })

        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [page, show, topic]);

  useEffect(() => {
    if (show && loading === false) {
      setChartLoading(true);
      let dArray = new Array(5);
      const input = topic;
      const pubkey = "xrp7NPZMKRQ3U8nmHM5UMXu2XwBKYXei";
      Axios.get(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20160101&end_date=20161231&q=" +
          input +
          "&api-key=" +
          pubkey
      )
        .then((response) => {
          dArray[0] = response.data.response.meta.hits;
          Axios.get(
            "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20170101&end_date=20171231&q=" +
              input +
              "&api-key=" +
              pubkey
          )
            .then((response) => {
              dArray[1] = response.data.response.meta.hits;
              Axios.get(
                "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20180101&end_date=20181231&q=" +
                  input +
                  "&api-key=" +
                  pubkey
              )
                .then((response) => {
                  dArray[2] = response.data.response.meta.hits;
                  Axios.get(
                    "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20190101&end_date=20191231&q=" +
                      input +
                      "&api-key=" +
                      pubkey
                  )
                    .then((response) => {
                      dArray[3] = response.data.response.meta.hits;
                      Axios.get(
                        "https://api.nytimes.com/svc/search/v2/articlesearch.json?begin_date=20200101&end_date=20201231&q=" +
                          input +
                          "&api-key=" +
                          pubkey
                      )
                        .then((response) => {
                          dArray[4] = response.data.response.meta.hits;
                          setShowChart(true);

                          setDArray(dArray);
                          setChartLoading(false);
                        })
                        .catch((error) => {
                          console.log(error);
                          setChartLoading(false);
                        });
                    })
                    .catch((error) => {
                      console.log(error);
                      setChartLoading(false);
                    });
                })
                .catch((error) => {
                  console.log(error);
                  setChartLoading(false);
                });
            })
            .catch((error) => {
              console.log(error);
              setChartLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
          setChartLoading(false);
        });
    }
  }, [show, topic, loading]);

  const inputTextHandler = (event) => {
    setInputText(event.target.value);
  };

  const enterPressed = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      searchClickHandler();
    }
  };

  const searchClickHandler = () => {
    setShow(true);
    if (inputText) setTopic(inputText);
    setPage(1);
  };

  const handleChange = (event, value) => {
    setPage(value);
  };

  let result = <Content />;

  let chartResult;

  if (loading === false && data && chartLoading) {
    chartResult = (
      <Typography variant="h5" style={{ width: "100%", textAlign: "center" }}>
        Please wait Chart is loading....
      </Typography>
    );
  } else if (chartLoading === false && showChart) {
    chartResult = <Chart topic={topic} dArray={dArray} />;
  }

  if (loading) {
    result = (
      <CircularProgress
        className={classes.progress}
        size={100}
        thickness={3.5}
      />
    );
  } else if (data) {
    result = (
      <ListOfData
        data={data}
        topic={topic}
        handleChange={handleChange}
        page={page}
      />
    );
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            onChange={inputTextHandler}
            value={inputText}
            onKeyPress={enterPressed}
          />
        </div>
        <Button
          className={classes.margin}
          variant="contained"
          color="primary"
          onClick={searchClickHandler}
        >
          Search
        </Button>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          {/* <h1 className={classes.one}>The New York Times</h1> */}
          <img
            src={nyt}
            alt="Logo"
            style={{
              marginTop: "10px",
              height: "40px",
            }}
          />
          ;
          <List>
            {["Dashboard", "Articles", "Analytics", "Message", "Calendar"].map(
              (text, index) => (
                <ListItem button key={text}>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Drawer>
      </div>
      {result}
      <div className={classes.chart}>{chartResult}</div>
    </React.Fragment>
  );
}
