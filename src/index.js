import React, {useState} from "react";
import ReactDom from "react-dom";
import axios from "axios";

// Linking CSS
import "./index.css";

// Linking Api Endpoint
const api = axios.create({
  baseURL:
    "https://7cg8uz8p69.execute-api.us-east-1.amazonaws.com/test/people/",
});

// Shows active Button
let dataGet = false;

function Activity() {
  // useState Hook for Updating the Data
  const [data, setData] = useState({people: [], period: 0});

  // Getting Data from api for Today
  const toggleClassDay = () => {
    api.get("?period=day").then((res) => {
      setData({people: res.data.people, period: 0});
      dataGet = true;
    });
  };

  // Getting Data from api for this week
  const toggleClassWeek = () => {
    api.get("?period=week").then((res) => {
      setData({people: res.data.people, period: 1});
      dataGet = true;
    });
  };

  // Getting Data from api for this month
  const toggleClassMonth = () => {
    api.get("?period=month").then((res) => {
      setData({people: res.data.people, period: 2});
      dataGet = true;
    });
  };

  return (
    <div className="activityClass">
      <h1>Activity</h1>
      <div className="durationFlex">
        <button
          className={
            data.period === 0 ? "durationButton activeClass" : "durationButton"
          }
          onClick={toggleClassDay}
        >
          Today
        </button>
        <button
          className={
            data.period === 1 ? "durationButton activeClass" : "durationButton"
          }
          onClick={toggleClassWeek}
        >
          This Week
        </button>
        <button
          className={
            data.period === 2 ? "durationButton activeClass" : "durationButton"
          }
          onClick={toggleClassMonth}
        >
          This Month
        </button>
      </div>

      <table>
        <tr>
          <th>Client</th>
          <th>Matter</th>
          <th>Description</th>
          <th>Type</th>
          <th>Time</th>
        </tr>

        {/* It Will call Today if null and then map the data to the table */}
        {dataGet ? "" : toggleClassDay()}
        {data.people.map((item) => {
          return (
            <tr>
              <td>{item.client}</td>
              <td>{item.matter}</td>
              <td>{item.description}</td>
              <td>{item.type}</td>
              <td>{item.time}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

ReactDom.render(<Activity />, document.getElementById("root"));
