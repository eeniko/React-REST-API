import React from "react";
import { Alert } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.css';




export default function Status(props) {

 if (props.error) 
    return (<Alert variant= "danger">{props.error}</Alert>);

 if  (props.statusMessage) 
    return (<Alert variant ="success">{props.statusMessage}</Alert>);
   
}