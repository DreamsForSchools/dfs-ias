import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

/* 
    formats the PDF when the user wants to save the sorted roster
    it uses the react-pdf api
*/
export default function GeneratePDF({sortedRoster}) {

    const styles = StyleSheet.create({
        page: {
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            flexDirection: 'row',
            flexWrap: "wrap"
        },
        section: {
          width: "25%",
          height: "125px",
          margin: "20px",
          backgroundColor: "white",
          border : "1 solid #0099FF",
          borderRadius: "10px"
        },
        schoolTextContainerStyle: {
            backgroundColor: "#0099FF",
            width: "100%",
            borderTopLeftRadius: "9px",
            borderTopRightRadius: "9px",
            // width: "100%",
            // height: "10px"
        },
        schoolTextStyle: {
            fontSize: "12px",
            textAlign: "center",
            padding: "5px"
        },
        mentorsContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'column',
            backgroundColor: "none",
            marginTop: "5px"
        },
        mentorNameStyle: {
            fontSize: "10px",
            // textAlign: "center",
            padding: "2px"
        },
        hoverSchedTimes: {
            color: "black",
            fontSize: "11px",
            fontWeight: "400",
            marginLeft: "2px"
        },
        hoverSchedDays: {
            color: "black",
            fontSize: "12px",
            fontWeight: "400",
        },
        hoverMoreInfoDetailsSchedGrid: {
            display: "grid",
            gridTemplateColumns: "13px 127px",
            gridTemplateRows: "15px 15px 15px 15px 15px",
            marginTop: "3px",
            justifyContent: "center",
            alignItems: "center",
        }




      });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {sortedRoster.map((schoolMentors,i) => (
                    <View style={styles.section} key={schoolMentors.school}>
                        <View style={styles.schoolTextContainerStyle}>
                            <Text style={styles.schoolTextStyle}>{schoolMentors.school}</Text>
                        </View>
                        <View style={styles.hoverMoreInfoDetailsSchedGrid}>
                            <Text style={styles.hoverSchedDays}>M</Text>
                            <Text style={styles.hoverSchedTimes}>{schoolMentors["mentors"][0]["schoolSchedule"]["mon"]}</Text>
                            <Text style={styles.hoverSchedDays}>T</Text>
                            <Text style={styles.hoverSchedTimes}>{schoolMentors["mentors"][0]["schoolSchedule"]["tue"]}</Text>
                            <Text style={styles.hoverSchedDays}>W</Text>
                            <Text style={styles.hoverSchedTimes}>{schoolMentors["mentors"][0]["schoolSchedule"]["wed"]}</Text>
                            <Text style={styles.hoverSchedDays}>T</Text>
                            <Text style={styles.hoverSchedTimes}>{schoolMentors["mentors"][0]["schoolSchedule"]["thu"]}</Text>
                            <Text style={styles.hoverSchedDays}>F</Text>
                            <Text style={styles.hoverSchedTimes}>{schoolMentors["mentors"][0]["schoolSchedule"]["fri"]}</Text>
                        </View>
                        <View style={styles.mentorsContainer}>
                            {schoolMentors.mentors.map((mentors) => (
                                <Text key={mentors.firstName} style={styles.mentorNameStyle}>{mentors.name}</Text>
                            ))}
                        </View>
                    </View>
                ))}
            </Page>
      </Document>
    )
}