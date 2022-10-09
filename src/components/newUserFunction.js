import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export default function NewUser(props) {
  const { register, getValues, reset } = useForm({});

  if (!props.newUserWindowOpen)
    return (
      <>
        <p> </p>
        <Button onClick={() => props.setNewUserWindowOpen(true)}>
          New User
        </Button>
      </>
    );
  else
    return (
      <Form
        style={{ width: "850px", marginLeft: "20px", paddingRight: "20px" }}
        className="shadow bg-white col-12"
      >
        <br />
        <h5 style={{ fontWeight: "bold" }}> You can create new user here </h5>
        <br />

        <Table responsive="md">
          <tbody>
            <tr>
              <th>Email</th>
              <td>
                <Form.Control
                  type="email"
                  name="email"
                  className="col-12"
                  value={props.email}
                  {...register("email")}
                />
              </td>
            </tr>
            <tr>
              <th> First name </th>
              <td>
                <Form.Control
                  type="text"
                  name="first_name"
                  className="col-12"
                  value={props.first_name}
                  {...register("first_name")}
                />
              </td>
            </tr>
            <tr>
              <th> Last name </th>
              <td>
                <Form.Control
                  type="text"
                  name="last_name"
                  className="col-12"
                  value={props.last_name}
                  {...register("last_name")}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <Button
          onClick={() => {
            props.createUser(getValues());
            reset();
          }}
          variant="outline-primary"
        >
          Send user data
        </Button>
        <Button
          onClick={() => props.setNewUserWindowOpen(false)}
          variant="outline-secondary"
        >
          Close
        </Button>
        <br />
        <br />
      </Form>
    );
}
