import React, { useEffect, useState } from "react";
import "../scss/content.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function Content({ data, changeEditedkey, postkey, deleteKey }) {
  const [editClicked, setEditClicked] = useState(false);
  const [key, setKey] = useState(false);
  const [editedKey, setEditedkey] = useState("");
  const [index, setindex] = useState(0);
  const [addClicked, setAddClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const [expand, setExpand] = useState(false);
  useEffect(() => {}, [data]);

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
    console.log(editedKey);
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
  }
  function addpostClicked() {
    postkey(editedKey, index, key, timestamp);
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
    event.stopPropagation();
    setExpand(!expand);
  }
  return (
    <div className="displayFlex margin10px">
      {editClicked ? (
        <div className="editpostcontainer">
          <input
            className="input"
            placeholder="enter something"
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

      {hasChildren(data) &&
        data.map((obj, index) => {
          let key = Object.keys(obj);
          return (
            <div className="keyContainer" val={key[0]}>
              <div className={`key-content btns-container cont${key}`}>
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
                <div className="key_content">{key[0]}</div>
                <div className="addbtn" val={key}>
                  <button
                    className="btn"
                    type="submit"
                    value={key[0]}
                    val={index}
                    timestamp={obj[key[1]]}
                    onClick={addPostBtnClicked}
                  >
                    Add
                  </button>

                  <button
                    className="btn"
                    type="submit"
                    value={key[0]}
                    val={index}
                    timestamp={obj[key[1]]}
                    onClick={editPostBtnClicked}
                  >
                    Edit
                  </button>

                  <button
                    className="btn"
                    type="submit"
                    value={key[0]}
                    val={index}
                    timestamp={obj[key[1]]}
                    onClick={deletePostBtnClicked}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {expand ? (
                <Content
                  data={obj[key[0]]}
                  changeEditedkey={changeEditedkey}
                  postkey={postkey}
                  deleteKey={deleteKey}
                />
              ) : null}
              {/* <Content
                data={obj[key[0]]}
                changeEditedkey={changeEditedkey}
                postkey={postkey}
                deleteKey={deleteKey}
              /> */}
            </div>
          );
        })}
    </div>
  );
}

//         {/* //iterate data : [] */}

//         {/* data.key.map() */}

//         {/* {expand ? (
//           <Content
//             data={obj[key[0]]}
//             changeEditedkey={changeEditedkey}
//             postkey={postkey}
//             deleteKey={deleteKey}
//           />
//         ) : null} */}
//         {/* <Content
//           data={obj[key[0]]}
//           changeEditedkey={changeEditedkey}
//           postkey={postkey}
//           deleteKey={deleteKey}
//         /> */}
//       </div>



export default Content;
