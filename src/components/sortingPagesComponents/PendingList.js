import React from 'react'

import { useState, useEffect, useRef } from 'react';
import PendingListNameButton from './PendingListNameButton'

// import fire from '../../.././config/fire';
// import firebase from 'firebase';

/*
    This component is shows pending students
    meaning they are temporarily removed from the sorted roster
*/
export default function PendingList({instructorList}) {

    return (
        <div style={pendingLockedBox}>
            <h3 style={pendingLockedTitle}>Pending</h3>
            <div style={pendingLockedNameContainer}>
                <PendingListNameButton name="Hannah Fragante"/>
                <PendingListNameButton name="Dylan Fragante"/>
                <PendingListNameButton name="Annie Fragante"/>
                <PendingListNameButton name="Deodato Fragante"/>
                <PendingListNameButton name="Rodita Fragante"/>
            </div>
        </div>
    )
} 

const pendingLockedBox = {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    width: "300px",
    minHeight: "50px",
    maxHeight: "500px",
    backgroundColor: "white",
    marginLeft: "10px",
    borderRadius: "12px",
    border: "1px solid #A4A3CE",
    marginTop: "10px"
}

const pendingLockedTitle = {
    fontSize: "14px",
    fontWeight: "500",
    padding: "5px",
    backgroundColor: "#A4A3CE",
    width: "100%",
    textAlign: "center",
    color: "white",
    borderRadius: "10px"
}

const pendingLockedNameContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px"
}

const pendingLockedName = {
    fontWeight: "400",
    fontSize: "12px",
    // margin: "1px",
    padding: "1px",
    color: "#202E47",
    // backgroundColor: "#A4A3CE",
    width: "300px",
    textAlign: "center"
}