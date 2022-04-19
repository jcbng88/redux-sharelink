import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

export default function AddLink(props) {
  const [modal, showModal] = useState(false);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState([]);

  function submitLink() {
    props.addLink(name, url, tags);
    showModal(false);
    setName("");
    setUrl("");
    setTags([]);
  }

  function onTagChange(i, e) {
    console.log("index", i);
    console.log("event", e);

    const newTags = tags.slice();
    newTags[i] = {
      name: e.target.value,
    };
    setTags(newTags);
  }

  return (
    <div>
      <Button variant="success" onClick={() => showModal(!modal)}>
        Add Link
      </Button>

      <Modal show={modal}>
        <Modal.Header>Add Link Form</Modal.Header>
        <Modal.Body>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label>Url:</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <br />
          <label>Tags</label>
          <br />
          {tags && tags.length > 0
            ? tags.map((tag, i) => {
                return (
                  <input
                    key={i}
                    type="text"
                    value={tag.name}
                    onChange={(e) => onTagChange(i, e)}
                  />
                );
              })
            : "No Tags"}

          <Button
            variant="secondary"
            onClick={() => setTags(tags.concat([{ name: "" }]))}
          >
            Add Tag
          </Button>

          <Modal.Footer>
            <Button variant="primary" onClick={submitLink}>
              Submit
            </Button>
            <Button variant="danger" onClick={() => showModal(!modal)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
}
