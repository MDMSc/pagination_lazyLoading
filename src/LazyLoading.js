import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  CardTitle,
  Input,
  Spinner,
} from "reactstrap";
import React, { useEffect, useState } from "react";

export default function LazyLoading() {
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    fetch(`https://api.jikan.moe/v4/anime?page=${pageNum}&limit=12`)
      .then((res) => res.json())
      .then((data) => {
        setList((prevList) => [...prevList, ...data.data]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, [pageNum]);

  const handleSearch = (e) => {
    setList([]);
    if (e.target.value !== "") {
      fetch(
        `https://api.jikan.moe/v4/anime?page=${pageNum}&limit=12&letter=${e.target.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          setList((prevList) => [...prevList, ...data.data]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getData();
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPageNum((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="comp_div_ll">
      <Input
        className="search_input"
        placeholder="Search by name..."
        onChange={handleSearch}
      />

      <div className="comp_div_cards">
        {list && list.length ? (
          list.map((item, index) => (
            <Card
              color="light"
              style={{
                width: "18rem",
                margin: "2rem",
              }}
              key={index}
            >
              <img
                alt={item.title_english ? item.title_english : item.title}
                src={item.images.jpg.image_url}
                style={{ height: "20rem" }}
              />
              <CardBody>
                <CardTitle tag="h5">
                  {item.title_english ? item.title_english : item.title}
                </CardTitle>
                <CardSubtitle
                  className="mb-2 text-muted d-flex justify-content-between"
                  tag="h6"
                >
                  <span>Duration: {item.duration}</span>
                  <span>Score: {item.score}</span>
                </CardSubtitle>
                <CardText className="d-flex flex-column">
                  <span>Type: {item.type}</span>
                  <span>Source: {item.source}</span>
                  <span>Episodes: {item.episodes}</span>
                  <span>Status: {item.status}</span>
                </CardText>
                <Button tag="a" href={item.url} target="_blank">
                  URL
                </Button>
              </CardBody>
            </Card> 
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
      {loading && (
          <Spinner
            color="danger"
            type="grow"
            style={{
              height: "6rem",
              width: "6rem",
            }}
          >
            Loading...
          </Spinner>
        )}
    </div>
  );
}
