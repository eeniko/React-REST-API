import "./App.css";
import { useEffect, useState } from "react";
import Users from "./components/usersFunction";
import EditUser from "./components/editUserFunction";
import NewUser from "./components/newUserFunction";
import Pages from "./components/pagesFunction";
import Status from "./components/statusFunction";
import { GetData } from "./api/client";
import { GetSingleUserData } from "./api/client";
import { ItemDelete } from "./api/client";
import { CreateNewUser } from "./api/client";
import { RefreshUser } from "./api/client";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [users, setUsers] = useState([]);
  const [deletedUserId, setDeletedUserId] = useState();
  const [editedUser, setEditedUser] = useState({});
  const [newUserWindowOpen, setNewUserWindowOpen] = useState(false);
  const [error, setError] = useState();
  const [statusMessage, setStatusMessage] = useState();

  useEffect(() => {
    console.log(`Loading user data: ${page}, ${perPage}`);
    GetData(perPage, page, setUsers, setTotalPages);
    setEditedUser("");
  }, [page, perPage, deletedUserId]);

  function initateUserEdit(id) {
    GetSingleUserData(id, setEditedUser, setError);
  }

  function saveUser(user) {
    console.log(`Saving user:`);
    console.log(user);
    RefreshUser(
      user,
      (message) => {
        setStatusMessage(message);
        setEditedUser("");
        GetData(perPage, page, setUsers, setTotalPages);
        setPage(1);
      },
      (message) => {
        setError(message);
        setEditedUser("");
        GetData(perPage, page, setUsers, setTotalPages);
      }
    );
  }

  function createUser(user) {
    console.log(`Creating user: ${user}`);
    console.log(user);
    CreateNewUser(
      user,
      (message) => {
        setStatusMessage(message);
        setNewUserWindowOpen(false);
        GetData(perPage, page, setUsers, setTotalPages);
        setPage(1);
      },
      (message) => {
        setError(message);
        setNewUserWindowOpen(false);
      }
    );
  }

  function deleteUser(id) {
    console.log(`Deleting user ${id}`);
    ItemDelete(id, (message) => {
      setStatusMessage(message);
      setDeletedUserId(id);
      setEditedUser("");
      GetData(perPage, page, setUsers, setTotalPages);
      setPage(1);
    });
  }

  return (
    <>
      <div className="App">
        <div className="container">
          <Status error={error} statusMessage={statusMessage} />
          <NewUser
            newUserWindowOpen={newUserWindowOpen}
            setNewUserWindowOpen={setNewUserWindowOpen}
            createUser={createUser}
            setEditedUser={setEditedUser}
          />
          <div className="col-12" style={{ display: "block" }}>
            <Users
              users={users}
              initateUserEdit={initateUserEdit}
              deleteUser={deleteUser}
            />
          </div>
          <div className="row">
            <div className="col-8">
              <EditUser
                editedUser={editedUser}
                setEditedUser={setEditedUser}
                saveUser={saveUser}
                deleteUser={deleteUser}
              />
            </div>

            <div className="col-4"> </div>
          </div>
          <div className="col-12">
            <Pages
              perPage={perPage}
              setPerPage={setPerPage}
              totalPages={totalPages}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
