import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Image from "react-bootstrap/Image";

export default function Users(props) {
  console.log(props.users);
  return (
    <>
      <div>
        {props.users.map((elem, index) => {
          return (
            <Card className="card shadow bg-white" key={elem.id}>
              <Card.Body>
                <Image
                  className="img-fluid "
                  src={elem.avatar.toString()}
                  style={{ height: "140px", width: "140px" }}
                />

                <Card.Title
                  style={{ color: "blue", textDecoration: "underline" }}
                  onClick={() => props.initateUserEdit(elem.id)}
                >
                  {" "}
                  {elem.first_name} {elem.last_name}
                </Card.Title>
                <Card.Text>
                  <p>{elem.email}</p>
                </Card.Text>

                <Button
                  onClick={() => props.deleteUser(elem.id)}
                  variant="outline-danger"
                >
                  Delete user data
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
}
