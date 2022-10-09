export function GetData(perPage, page, setUsers, setTotalPages) {
  const API = `https://reqres.in/api/users?per_page=${perPage}&page=${page}`;
  fetch(API)
    .then((result) => {
      if (!result.ok) throw new Error(`call error: ${result.status}`);
      if (result.status != 200)
        throw new Error(`status error: ${result.status}`);

      return result.json();
    })
    .then((data) => {
      setUsers(data.data);
      setTotalPages(data.total_pages);
      console.log("Received a response:");
      console.log(data);
    })
    .catch((error) => {
      console.log(error.message);
      setUsers({
        users: [],
      });
    });
}

export function GetSingleUserData(id, setEditedUser, setError) {
  const API = `https://reqres.in/api/users/${id}`;
  fetch(API)
    .then((result) => {
      if (!result.ok) throw new Error(`Call error, status:  ${result.status}`);
      if (result.status != 200)
        throw new Error(`status error: ${result.status}`);

      return result.json();
    })
    .then((data) => {
      setEditedUser(data.data);
      console.log("Received a response:");
      console.log(data.data);
    })
    .catch((error) => {
      setError(error.message);
      console.log(error.message);
    });
}

export function ItemDelete(id, successCallback) {
  const API = `https://reqres.in/api/users/${id}`;
  fetch(API, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((result) => {
      if (!result.ok) throw new Error(`Call error, status:  ${result.status}`);
      if (result.status != 204)
        throw new Error(`status error: ${result.status}`);
      successCallback(`User data deletion is succesful Id: ${id} `);
      alert(`User data deletion is succesful Id: ${id} `);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

export function CreateNewUser(user, successCallback) {
  let email = user.email;
  let fist_name = user.first_name;
  let last_name = user.last_name;
  if (email != "" && fist_name != "" && last_name != "") {
    FetchJsonRequest(
      "POST",
      uri,
      { email: email, fist_name: fist_name, last_name: last_name },
      (result) => {
        console.log(result);
        successCallback(
          `New user is created at:  ${result.createdAt},  id: ${result.id}`
        );
        alert(
          `New user is created at:  ${result.createdAt},  id: ${result.id}`
        );
      }
    );
  } else alert("Please fill in all fields");
}

export function RefreshUser(user, successCallback, errorCallback) {
  console.log("RefreshUser:");
  console.log(user);

  let email = user.email;
  let fist_name = user.first_name;
  let last_name = user.last_name;
  if (email != "" && fist_name != "" && last_name != "") {
    FetchJsonRequest(
      "PUT",
      `${uri}/${user.id}`,
      { email: email, fist_name: fist_name, last_name: last_name },
      (result) => {
        console.log(result);
        successCallback(
          `User data modification is successful ${result.updatedAt}`
        );
      }
    );
  } else alert("Please fill in all fields");
}

const uri = "https://reqres.in/api/users/";
const FetchJsonRequest = (httpMethod, uri, params = null, ...callbacks) => {
  let requestParams = { method: httpMethod };
  if (httpMethod === "GET") {
    if (params !== null) {
      uri = uri + "?";

      for (let p in params) {
        let key = p;
        let value = null;

        if (params[p] instanceof Array) {
          value = params[p].join(",");
        } else {
          value = params[p];
        }

        uri += `${key}=${value}&`;
      }
      uri = uri.slice(0, -1);
    }
  } else {
    requestParams.body = JSON.stringify(params);
    requestParams.header = {
      "Content-type": "application/json; charset=UTF-8",
    };
  }

  fetch(uri, requestParams)
    .then((response) => {
      if (response.status === 204) return response.status;
      else return response.json();
    })
    .then((data) => {
      for (let callback of callbacks) {
        callback(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
