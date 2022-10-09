import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Pagination } from "react-bootstrap";

function Pages(props) {
  function generateButton(button) {
    return button();
  }
  return (
    <>
      <div className="pages-pageNumbers ">
        <div className="col-4">
          <p> Users per page</p>
          <select
            name="perPage"
            value={props.perPage}
            onChange={(event) => props.setPerPage(event.target.value)}
          >
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="12">12</option>
          </select>
        </div>
        <div className="col-1"></div>

        <div className="col-7">
          <br />
          <Pagination>
            {generateButton(() => {
              const list = [];
              for (var pgnum = 1; pgnum <= props.totalPages; pgnum++) {
                list.push(
                  <Button
                    className="btn btn-link"
                    name={pgnum}
                    key={pgnum.toString()}
                    onClick={(event) => props.setPage(event.target.value)}
                    value={pgnum}
                  >
                    {pgnum}
                  </Button>
                );
              }
              return list;
            })}
          </Pagination>
        </div>
      </div>
    </>
  );
}

export default Pages;
