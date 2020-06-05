import React from 'react'

import { useState, useEffect, useRef } from 'react';

// import fire from '../../.././config/fire';
// import firebase from 'firebase';

/*
    This component is shows locked students
*/
export default function LockedList({instructorList}) {

    return (
        <div style={pendingLockedBox}>
            <h3 style={pendingLockedTitle}>Locked</h3>
            <div style={pendingLockedNameContainer}>
                {/* <h4 style={pendingLockedName}>Hannah Fragante</h4>
                <h4 style={pendingLockedName}>Hannah Fragante</h4> */}
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