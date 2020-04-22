import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";

const drawerWidth = 285;

const useStyles = makeStyles((theme) => ({
  head: {
    marginLeft: drawerWidth + 10,
    margin: theme.spacing(3),
  },
  table: {
    // minWidth: 650,
    flex: 1,
    marginLeft: drawerWidth + 10,
    width: "75%",
    maxWidth: "100%",
  },
  tableText: {
    margin: theme.spacing(2),
    marginLeft: drawerWidth + 20,
  },
  pageNo: {
    float: "right",
    margin: theme.spacing(2),
    marginLeft: drawerWidth,
  },
}));

const date = (isoDate) => {
  const date = new Date(isoDate);
  return (
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  );
};

const truncateText = (text, limit = 50) => {
  if (text && text.length > limit) {
    const newText = [];
    text.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newText.push(cur);
      }
      return acc + cur.length;
    }, 0);

    return newText.join(" ") + "...";
  }
  return text;
};

const truncateURL = (url, limit = 50) => {
  if (url && url.length > limit) {
    const newUrl = [];
    url.split("/").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newUrl.push(cur);
      }
      return acc + cur.length;
    }, 0);

    return newUrl.join(" ") + "...";
  }
  return url;
};

const ListOfData = (props) => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="body1" className={classes.head}>
        Here are your search results for '{props.topic.toUpperCase()}'
      </Typography>

      <TableContainer component={Paper}>
        <Typography variant="body1" className={classes.tableText}>
          ARTICLES
        </Typography>
        <Table aria-label="simple table" size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "15%" }}>Published Date</TableCell>
              <TableCell style={{ width: "20%" }}>Headline</TableCell>
              <TableCell style={{ width: "20%" }}>Summary</TableCell>
              <TableCell style={{ width: "20%" }}>URL</TableCell>
              <TableCell style={{ width: "15%" }}>Source</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row, index) => (
              <TableRow
                key={row._id}
                style={
                  index % 2 === 0
                    ? { background: "#fafafa" }
                    : { background: "white" }
                }
              >
                <TableCell>{date(row.pub_date)}</TableCell>
                <TableCell>{truncateText(row.headline.main, 45)}</TableCell>
                <TableCell>{truncateText(row.abstract, 45)}</TableCell>
                <TableCell>
                  <a href={row.web_url} target="blank">
                    {truncateURL(row.web_url, 45)}
                  </a>
                </TableCell>
                <TableCell>{truncateText(row.source)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={15}
        color="primary"
        page={props.page}
        onChange={props.handleChange}
        className={classes.pageNo}
      />
    </div>
  );
};

export default ListOfData;
