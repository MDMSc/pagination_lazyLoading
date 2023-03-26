import {
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
} from "reactstrap";
import React, { useEffect, useState } from "react";

export default function PaginationPage() {
  const [list, setList] = useState();
  const [currPage, setCurrPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [numPages, setNumPages] = useState();
  const [pageNumbers, setPageNumbers] = useState([]);

  const recPerPage = 5;
  var lastIndex;
  var firstIndex;

  useEffect(() => {
    fetch(`https://api.openbrewerydb.org/v1/breweries`)
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        lastIndex = currPage * recPerPage;
        firstIndex = lastIndex - recPerPage;
        setRecords(data.slice(firstIndex, lastIndex));
        setNumPages(Math.ceil(data.length / recPerPage));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    try {
      lastIndex = currPage * recPerPage;
      firstIndex = lastIndex - recPerPage;
      list && setRecords(list.slice(firstIndex, lastIndex));
      numPages && setPageNumbers([...Array(numPages + 1).keys()].slice(1));
    } catch (e) {
      console.log(e);
    }
  }, [list, currPage]);

  const handleSearch = (e) => {
    if(e.target.value !== ""){fetch(
      `https://api.openbrewerydb.org/v1/breweries?by_name=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        setList(data);
        lastIndex = currPage * recPerPage;
        firstIndex = lastIndex - recPerPage;
        setRecords(data.slice(firstIndex, lastIndex));
        setNumPages(Math.ceil(data.length / recPerPage));
      })
      .catch((err) => {
        console.log(err);
      });}
  };

  const prevPage = () => {
    if (currPage !== 1) {
      setCurrPage(currPage - 1);
    }
  };

  const handleChangePage = (id) => {
    setCurrPage(id);
  };

  const nextPage = () => {
    if (currPage !== numPages) {
      setCurrPage(currPage + 1);
    }
  };

  return (
    <div className="comp_div_p">
      <Input className="search_input" placeholder="Search by name..." onChange={handleSearch} />

      <Table bordered className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Brewery Type</th>
            <th>city</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {records.length ? (
            records.map((l, i) => (
              <tr key={i}>
                <td>{l.name}</td>
                <td>{l.brewery_type}</td>
                <td>{l.city}</td>
                <td>{l.country}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                <h2 style={{ textAlign: "center" }}>Loading...</h2>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination>
        <PaginationItem>
          <PaginationLink href="#" previous onClick={prevPage}>
            Previous
          </PaginationLink>
        </PaginationItem>
        {pageNumbers.length ? (
          pageNumbers.map((n, i) => (
            <PaginationItem active={currPage === n} key={i}>
              <PaginationLink href="#" onClick={() => handleChangePage(n)}>
                {n}
              </PaginationLink>
            </PaginationItem>
          ))
        ) : (
          <></>
        )}
        <PaginationItem>
          <PaginationLink href="#" next onClick={nextPage}>
            Next
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  );
}
