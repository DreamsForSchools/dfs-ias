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
                      <h1 className="programPageTitle">WebJam Spring2020</h1>
                      <div className="hozLineDivider"></div>
                      <div>
                   <Nav tabs>
                     <NavItem>
                       <NavLink
                         className={classnames({ active: activeTab === '1' })}
                         onClick={() => { toggle('1'); }}
                       >
                         Roster
                       </NavLink>
                     </NavItem>
                     <NavItem>
                       <NavLink
                         className={classnames({ active: activeTab === '2' })}
                         onClick={() => { toggle('2'); }}
                       >
                         Sorted Roster
                       </NavLink>
                     </NavItem>
                   </Nav>
                   <TabContent activeTab={activeTab}>
                     <TabPane tabId="1">
                       <Row>
                         <Col sm="12">
                            <div className="content">
                               <Row>
                                 <Col md="13">
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
                                               <th>Gender</th>
                                               <th>Region</th>
                                               <th>University/College</th>
                                               <th>Year</th>
                                               <th>Mon</th>
                                               <th>Tue</th>
                                               <th>Wed</th>
                                               <th>Thu</th>
                                               <th>Fri</th>
                                               <th>Teach Multiple Days?</th>
                                           </tr>
                                       </thead>
                                       <tbody>
                                           <tr>
                                           <td>Tim Bonnet</td>
                                           <td>F</td>
                                           <td>Orange County</td>
                                           <td>UCI</td>
                                           <td>4</td>
                                           <td>[3:00-5:00]</td>
                                           <td>[2:00-4:00]</td>
                                           <td>[2:00-4:00]</td>
                                           <td>[3:00-5:00]</td>
                                           <td>[2:00-4:00]</td>
                                           <td>Yes</td>
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
                                           <td>F</td>
                                           <td>Orange County</td>
                                           <td>UCI</td>
                                           <td>4</td>
                                           <td>[3:00-5:00]</td>
                                           <td>[2:00-4:00]</td>
                                           <td>[2:00-4:00]</td>
                                           <td>[3:00-5:00]</td>
                                           <td>[2:00-4:00]</td>
                                           <td>Yes</td>
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
                                           <td>F</td>
                                           <td>Orange County</td>
                                           <td>UCI</td>
                                           <td>4</td>
                                           <td>[3:00-5:00]</td>
                                           <td>[2:00-4:00]</td>
                                           <td>[2:00-4:00]</td>
                                           <td>[3:00-5:00]</td>
                                           <td>[2:00-4:00]</td>
                                           <td>Yes</td>
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
                      </TabContent>
                    </div>
                     </div>
                 </div>
              );
}
