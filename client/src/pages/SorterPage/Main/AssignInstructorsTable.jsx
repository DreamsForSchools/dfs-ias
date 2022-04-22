import React, { useEffect, useState, useContext } from "react";
import { Table, Badge, OverlayTrigger, Popover } from "react-bootstrap";
import { TelephoneFill, CalendarWeek, X, Check } from "react-bootstrap-icons";
import {
 formatAvailability,
 formatPhoneNumber,
} from "../../../util/formatData";

import "./AssignInstructorsTable.scss";
import { InstructorsRow } from "./AssignInstructorsTableRow";
import { createToken } from "../../../fire";
import { GlobalContext } from "../../../context/GlobalContextProvider";



const AssignInstructorsTable = (props) => {
 // Fetch all instructors that have an availibility for this class
 // Iterate through each instructor to calculate distance from the university to the partnerPlaceId (classes don't store location of where they're taught)
 // The 'time' prop is an array of JSON values, where each has 'endTime', 'weekday', and 'startTime' keys

 const { show, time } = props;

 const { seasonSelected } = useContext(GlobalContext);

 const clickRow = () => {
  console.log("Row clicked");
 };

 const [availableInstructors, setAvailableInstructors] = useState([]);

 async function fetchInstructorById(id) {
  try {
   const header = await createToken();
   const request = await axios.post(`/api/instructor/find/${id}`, {}, header);
   return request.data;
  } catch (e) {
   return e;
  }
 }

 /**
  * Fetches the available instructors on a specified weekday between start and end times. Should be called when presenting the
  * AssingmentInstructorsTable component.
  * @param {*} dayOfTheWeek Day of the week, represented as a number. 0 - 6 starting with 'Sunday'
  * @param {*} startTime Time, as a string, in the format "HOUR:MINUTES:SECONDS" i.e. 6:00pm is written as "18:00:00"
  * @param {*} endTime Time, as a string, in the format "HOUR:MINUTES:SECONDS" i.e. 6:00pm is written as "18:00:00"
  */
 async function fetchAvailableInstructors(time) {
  try {
   const header = await createToken();
   let response = await axios.post(
    "/api/availableInstructors",
    {
     seasonSelected: seasonSelected,
     startTime: time.startTime,
     endTime: time.endTime,
     weekday: time.weekday,
    },
    header
   );

   // Filters 'response' to just the instructors array
   // Each individual instructor looks like: [{instructorId: 365, startTime: "14:00:00", endTime: "17:00:00", weekday: 1}]
   let instructors = response["data"]["data"];
   console.log(instructors);

   // Iterate through every item in the `instructors` array and return just the IDs
   const availInstructors = instructors.map((i) => {
    return i.instructorId;
   });

   let availableInstructorsForTheSelectedSeason = [];
   for (let i = 0; i < availInstructors.length; i++) {
    availableInstructorsForTheSelectedSeason[i] = await fetchInstructorById(
     availInstructors[i]
    );
   }

   setAvailableInstructors(availableInstructorsForTheSelectedSeason);
   console.log("available instructors for the selected season");
   console.log(availableInstructorsForTheSelectedSeason);
  } catch (err) {
   console.log("Error in fetch: ");
   console.log(err);
  }
 }

 useEffect(() => {
  // Fetch available instructors only once the modal appears
  if (show) {
   fetchAvailableInstructors(time);
  }
 }, [show]);

 const axios = require("axios");

 return (
  <div className="assn-table">
   {/* <Badge pill variant="success"></Badge> */}
   <Table borderless>
    <thead className="assn-table-heading">
     <tr>
      <th className="nameColumn">Name</th>
      <th>School</th>
      <th>Other Languages</th>
      <th>Programming Languages</th>
      <th className="sched">Schedule</th>
      <th>Tags</th>
     </tr>
    </thead>
    <tbody>
     {availableInstructors.map((el, idx) => (
      <InstructorsRow
       programsColorKey={props.programsColorKey}
       onClick={clickRow}
       instructor={el}
      />
     ))}
    </tbody>
   </Table>
  </div>
 );
};

export default AssignInstructorsTable;
