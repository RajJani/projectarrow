const express = require("express");
const app = express();
const { Connection, Request } = require("tedious");

app.get("/", (req, res) => {
  
  const config = {
    authentication: {
      options: {
        userName: "_SQL_jarvis_tst@asqltstjarvisr.database.windows.net", // update me
        password: "Y+#9MQ5iS6", // update me
      },
      type: "default",
      trustedconnection: true,
    },
    port: 1433,
    server: "asqltstjarvisr.database.windows.net", // update me
    options: {
      database: "asqltstjarvis", //update me
      encrypt: true,
    },
  };

  const connection = new Connection(config);

  // Attempt to connect and execute queries if connection goes through
  connection.on("connect", (err) => {
    if (err) {
      console.error(err.message);
    } else {
      queryDatabase();
    }
  });

  connection.connect();

  function queryDatabase() {
    console.log("Reading rows from the Table...");

    // Read all rows from table
    const request = new Request(
      `Select top 10 * from dbo.losApplication;`,
      (err, rowCount) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`${rowCount} row(s) returned`);
          console.log();
        }
      }
    );

    request.on("row", (columns) => {
      columns.forEach((column) => {
        console.log("%s\t%s", column.metadata.colName, column.value);
      });
    });

    connection.execSql(request);
  }
  res.send("hello FUEL");
});

app.listen(3001, () => {
  console.log("runing on port 3001");
});
