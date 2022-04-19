import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import AddLink from "./Components/AddLink";
import SearchBar from "./Components/SearchBar";
import LinkedList from "./Components/LinkList";

function App() {

  const storedLinks = localStorage.getItem("sharedLinks");
  const parsedLinks =
    storedLinks === "" || storedLinks === null ? [] : JSON.parse(storedLinks);

  const [links, setLinks] = useState(
    Array.isArray(parsedLinks) ? parsedLinks : []
  );
  const [search, setSearch] = useState("");

  function filterFunction(searchValue) {
    console.log(searchValue);

    const lowerSearch = searchValue.toLowerCase();

    return links.filter((link) => {
      return (
        link.name.toLowerCase().indexOf(lowerSearch) > -1 ||
        link.url.toLowerCase().indexOf(lowerSearch) > -1 ||
        link.tags
          .map((tag) => {
            return tag.name.toLowerCase().indexOf(lowerSearch) > -1;
          })
          .indexOf(true) > -1
      );
    });
  }

  function addLink(name, url, tags) {
    const newLinks = links.concat([
      {
        name,
        url,
        tags,
      },
    ]);
    setLinks(newLinks);
    localStorage.setItem("sharedLinks", JSON.stringify(newLinks));
  }

  return (
    <Container>
      <Row>
        <Col>
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          <h3>Jonathan's Links</h3>
          <br />
          <h4>
            Links Shared:{" "}
            {links.length > 0 ? links.length : "Please add links!"}
          </h4>
          <AddLink addLink={addLink} />
        </Col>
        <Col>
          <h4>Search for stored links:</h4>
          <SearchBar searchChange={setSearch} />
          <br />
          <h4>Links for: {search}</h4>
          <LinkedList links={filterFunction(search)} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
