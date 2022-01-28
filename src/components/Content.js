import React, { useEffect, useState } from "react";
import "../scss/content.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DeleteIcon from "@mui/icons-material/Delete";

function Content({
  data,
  keyIS,
  childs,
  timestampIs,
  changeEditedkey,
  postkey,
  deleteKey,
}) {
  // console.log(data, childs);
  const [editClicked, setEditClicked] = useState(false);
  const [key, setKey] = useState(false);
  const [editedKey, setEditedkey] = useState("");
  const [index, setindex] = useState(0);
  const [addClicked, setAddClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    console.log(childs, timestampIs);
  }, [data]);

  function editPostBtnClicked(event) {
    event.preventDefault();
    let key = event.target.value;
    let timestamp = event.target.getAttribute("timestamp");
    setEditClicked(!editClicked);
    setAddClicked(false);
    setTimestamp(timestamp);
    setKey(key);
    let myIndex = event.target.getAttribute("val");
    setindex(myIndex);
    setEditedkey(key);
    console.log(key, timestamp);
  }

  function editPostClicked() {
    console.log(timestamp);
    changeEditedkey(editedKey, index, key, timestamp);
    setAddClicked(false);
    setEditClicked(false);
  }
  function changekey(event) {
    setEditedkey(event.target.value);
  }

  function addPostBtnClicked(event) {
    event.preventDefault();
    let key = event.target.value;
    setAddClicked(!addClicked);
    setEditClicked(false);
    setKey(key);
    let myIndex = event.target.getAttribute("val");
    setindex(myIndex);
    setTimestamp(event.target.getAttribute("timestamp"));
    console.log(
      key,
      event.target.getAttribute("val"),
      event.target.getAttribute("timestamp")
    );
  }
  function addpostClicked() {
    console.log(editedKey, index, keyIS, timestampIs);
    postkey(editedKey, index, keyIS, timestampIs);
    setEditedkey("");
    setAddClicked(false);
    setEditClicked(false);
  }
  const hasChildren = (data) => {
    if (data.length > 0) {
      return true;
    }
    return false;
  };

  function deletePostBtnClicked(event) {
    console.log("hello");
    event.preventDefault();
    console.log("sagar");
    let key = event.target.value;
    let timestamp = event.target.getAttribute("timestamp");
    console.log(timestamp);
    setKey(key);
    deleteKey(key, timestamp);
  }

  function arrowbtnClicked(event) {
    setExpand(!expand);
  }
  return (
    <div className="displayFlex margin10px">
      {editClicked ? (
        <div className="addpostcontainer">
          <input
            className="input"
            placeholder="Enter Something"
            onChange={changekey}
            value={editedKey}
          ></input>
          <button
            className="btn"
            type="submit"
            onClick={() => editPostClicked()}
          >
            Edit
          </button>
        </div>
      ) : null}

      {addClicked ? (
        <div className="editpostcontainer">
          <input
            className="input"
            placeholder="add post"
            onChange={changekey}
            value={editedKey}
          ></input>
          <button className="btn" type="submit" onClick={addpostClicked}>
            Post
          </button>
        </div>
      ) : null}
      <div className="keyContainer" val={keyIS}>
        <div className={`key-content btns-container cont${keyIS}`}>
          <div className="expand_contract_btns">
            {expand ? (
              <div
                className={`contract${key}`}
                value={key}
                attr="contract"
                onClick={arrowbtnClicked}
              >
                <KeyboardArrowDownIcon />
              </div>
            ) : (
              <div
                className={`expand${key}`}
                value={key}
                attr="expand"
                onClick={arrowbtnClicked}
              >
                <KeyboardArrowRightIcon />
              </div>
            )}
          </div>
          <div className="key_content">{keyIS}</div>
          <div className="addbtn" val={keyIS}>
            <button
              className="btn"
              type="submit"
              value={key}
              val={index}
              timestamp={timestampIs}
              onClick={addPostBtnClicked}
            >
              Add
            </button>
            <button
              className="btn"
              type="submit"
              value={keyIS}
              val={index}
              timestamp={timestampIs}
              onClick={editPostBtnClicked}
            >
              Edit
            </button>
            <button
              className="btn"
              type="submit"
              value={keyIS}
              val={index}
              timestamp={timestampIs}
              onClick={deletePostBtnClicked}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      {expand &&
        childs.map((child) => {
          let keys = Object.keys(child);
          let values = Object.values(child);
          return (
            <Content
              data={child}
              keyIS={keys[0]}
              childs={values[0]}
              timestampIs={values[1]}
              changeEditedkey={changeEditedkey}
              postkey={postkey}
              deleteKey={deleteKey}
            />
          );
        })}
    </div>
  );
}

export default Content;
