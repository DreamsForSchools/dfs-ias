import React from 'react'

import SideNavBar from '../components/sidebar/SideNavBar';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from 'react';
import classnames from 'classnames';

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardText,
  Button,
} from "reactstrap";

import fire from '.././config/fire';

export default function RosterAppjam() {

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('1');
  const toggle = tab => {
     if(activeTab !== tab) setActiveTab(tab);
   }

  let history = useHistory();

  //checks if user is currently logged in
  useEffect(() => {
      fire.auth().onAuthStateChanged(user => {
          if (user){
              setUser(user);
          }else{
              history.push('/');
          }

        })
    });
  return (
    <div>
    <SideNavBar />
    <div className="programPageContainer">
    <h1 className="programPageTitle">Roster</h1>
    <div className="hozLineDivider"></div>
    <div>
     <Nav tabs>
       <NavItem>
         <NavLink
           className={classnames({ active: activeTab === '1' })}
           onClick={() => { toggle('1'); }}
         >
           All
         </NavLink>
       </NavItem>
       <NavItem>
         <NavLink
           className={classnames({ active: activeTab === '2' })}
           onClick={() => { toggle('2'); }}
         >
           Sphero
         </NavLink>
       </NavItem>

       <NavItem>
         <NavLink
           className={classnames({ active: activeTab === '3' })}
           onClick={() => { toggle('3'); }}
         >
           Appjam+
         </NavLink>
       </NavItem>

       <NavItem>
         <NavLink
           className={classnames({ active: activeTab === '4' })}
           onClick={() => { toggle('4'); }}
         >
           WebJam
         </NavLink>
       </NavItem>
     </Nav>
     <TabContent activeTab={activeTab}>
       <TabPane tabId="1">
         <Row>
           <Col sm="13">
           <div className="content">
              <Row>
                <Col md="12">
                  <Card>
                    <CardBody>
                    <Button className="btn-icon" color="secondary" size="sm">
                    Download
                    </Button>

                    <Button className="btn-icon" color="success" size="sm">
                    Add User
                    </Button>
                    <Table class="table-lg responsive">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>District</th>
                        <th>Address</th>
                        <th>Program</th>
                        <th># of instructors</th>
                        <th>Days</th>
                        <th>Hours</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                      <td>Tim Bonnet</td>
                      <td>Santa Ana</td>
                      <td>12345 Apple Street,CA,Santa Ana,12344</td>
                      <td>Appjam+</td>
                      <td>4</td>
                      <td>Mon/Wed</td>
                      <td>3:30-5:00</td>

                        <td className="text-right">
                          <Button className="btn-icon" color="info" size="sm">
                          Info
                          </Button>{` `}
                          <Button className="btn-icon" color="warning" size="sm">
                          Edit
                          </Button>{` `}
                          <Button className="btn-icon" color="danger" size="sm">
                          Del
                          </Button>
                        </td>
                        </tr>
                        <tr>
                        <td>Tim Bonnet</td>
                        <td>Santa Ana</td>
                        <td>12345 Apple Street,CA,Santa Ana,12344</td>
                        <td>Appjam+</td>
                        <td>4</td>
                        <td>Mon/Wed</td>
                        <td>3:30-5:00</td>
                        <td className="text-right">
                            <Button className="btn-icon" color="info" size="sm">
                            Info
                            </Button>{` `}
                            <Button className="btn-icon" color="warning" size="sm">
                            Edit
                            </Button>{` `}
                            <Button className="btn-icon" color="danger" size="sm">
                            Del
                            </Button>
                            </td>
                            </tr>
                            <tr>
                            <td>Tim Bonnet</td>
                            <td>Santa Ana</td>
                            <td>12345 Apple Street,CA,Santa Ana,12344</td>
                            <td>Appjam+</td>
                            <td>4</td>
                            <td>Mon/Wed</td>
                            <td>3:30-5:00</td>
                            <td className="text-right">
                            <Button className="btn-icon" color="info" size="sm">
                            Info
                            </Button>{` `}
                            <Button className="btn-icon" color="warning" size="sm">
                            Edit
                            </Button>{` `}
                            <Button className="btn-icon" color="danger" size="sm">
                            Del
                            </Button>
                            </td>
                        </tr>
                    </tbody>
                  </Table>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
            </Col>
            </Row>
            </TabPane>
            //New Tab
           <TabPane tabId="2">
             <Row>
               <Col sm="12">
               <div className="content">
                <Row>
                  <Col md="12">
                    //Table insert
                  </Col>
                </Row>
              </div>
               </Col>
             </Row>
           </TabPane>
         </TabContent>
       </div>
      </div>
    </div>
);
}
