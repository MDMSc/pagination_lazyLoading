import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import PaginationPage from "./PaginationPage";
import { Button, ButtonGroup } from "reactstrap";
import LazyLoading from "./LazyLoading";

function App() {
  const [rSelected, setRSelected] = useState(null);
  return (
    <div className="main_div">
      <ButtonGroup>
        <Button
          color="primary"
          outline
          onClick={() => setRSelected(1)}
          active={rSelected === 1}
        >
          Pagination
        </Button>
        <Button
          color="primary"
          outline
          onClick={() => setRSelected(2)}
          active={rSelected === 2}
        >
          Lazy Loading, Infinite Scrolling
        </Button>
      </ButtonGroup>
      {
        rSelected === 1 ? <PaginationPage /> : rSelected === 2 ? <LazyLoading /> : <h2 style={{ marginTop: "5vh" }}>"Choose any one..."</h2>
      }
    </div>
  );
}

export default App;
