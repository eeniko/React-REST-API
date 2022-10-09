import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Table, Form } from "react-bootstrap";

function EditUser(props) {
  const { reset, register, getValues } = useForm({});

  useEffect(() => {
    reset(props.editedUser);
  }, [props.editedUser]);

  if (!props.editedUser) return <> </>;
  else
    return (
      <div className="shadow bg-white, col-12" style={{ marginLeft: "20px" }}>
        <br />
        <h5 style={{ fontWeight: "bold" }}>You can edit the user data here</h5>

        <Table>
          <tbody>
            <tr>
              <th>ID</th>
              <td>
                <Form.Control
                  type="text"
                  name="id"
                  readOnly
                  disabled
                  style={{ border: "none", backgroundColor: "white" }}
                  ref={register}
                  {...register("id")}
                />
              </td>
              <td rowSpan="5">
                {" "}
                <img src={props.editedUser.avatar} alt="" />
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <Form.Control
                  type="email"
                  name="email"
                  className="col-12"
                  ref={register}
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
                  ref={register}
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
                  ref={register}
                  {...register("last_name")}
                />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                {" "}
                <Button
                  onClick={() => props.saveUser(getValues())}
                  variant="outline-primary"
                >
                  {" "}
                  Send user data{" "}
                </Button>
                <Button
                  onClick={() => props.deleteUser(props.editedUser.id)}
                  variant="outline-danger"
                >
                  Delete data
                </Button>
                <Button
                  onClick={() => props.setEditedUser(null)}
                  variant="outline-secondary"
                >
                  {" "}
                  Close{" "}
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
}

export default EditUser;
