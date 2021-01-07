import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TutorialDataService from "../services/TutorialService";
import Pagination from "@material-ui/lab/Pagination";


const TutorialsList = () => {
  const data = [{
    id: 1,
    title: "Teste 1",
    description: "Teste 1",
    published: false
  },
  {
    id: 2,
    title: "Teste 2",
    description: "Teste 2",
    published: true
  }];

  const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];

  useEffect(() => {
    retrieveTutorialsTotalPages()
    retrieveTutorials();
  }, []);

  const getRequestParams = (page, pageSize) => {
    let params = {};

    if (page) {
      params["page"] = page;
    }

    if (pageSize) {
      params["limit"] = pageSize;
    }

    return params;
  };


  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveTutorials = () => {
    const params = getRequestParams(page, pageSize);

    TutorialDataService.getAllPagination(params)
    .then(response => {
      setTutorials(response.data);
      console.log(response.data)
    })
    .catch(e => {
      console.log(e);
    });
  };

  const retrieveTutorialsTotalPages = () => {
    TutorialDataService.getAll()
    .then(response => {
      setCount(Math.ceil(response.data.length/pageSize));
    })
    .catch(e => {
      console.log(e);
    });
  };


  useEffect(retrieveTutorials, [page, pageSize]);

  const refreshList = () => {
    retrieveTutorialsTotalPages()
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const deleteTutorial = (id) => {
    TutorialDataService.remove(id)
      .then(response => {
        console.log(response.data);
        retrieveTutorials();
      })
      .catch(e => {
        console.log(e);
      });
  }

  const removeAllTutorials = () => {
    tutorials.map( (tutorial) => {
    TutorialDataService.remove(tutorial.id)
      .then(response => {
        console.log(response.data);
        retrieveTutorials();
      })
      .catch(e => {
        console.log(e);
      });
    })
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
    .then(response => {
      setTutorials(response.data);
      console.log(response.data);
    })
    .catch(e => {
      console.log(e);
    });   
  };

  return (
    <div className="list row">
      <div className="col-md-10">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-10">
        <h4>Tutorials List</h4>

        <table class="table">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <tr>
                <th scope="row">{tutorial.id}</th>
                <td>{tutorial.title}</td>
                <td>{tutorial.description}</td>
                <td> <Link to={"/tutorials/" + tutorial.id}
                  className="badge badge-warning">Edit</Link>
                </td>
                <td> <Link onClick={() => deleteTutorial(tutorial.id)}
                  className="badge badge-danger">Remove</Link>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
          {"Items per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default TutorialsList;
