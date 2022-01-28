import React, { useEffect, useState } from "react";
import Content from "./Content";
import "../scss/todolist.scss";

function ToDoList() {
  const [data, setData] = useState([
    {
      key1: [
        { key4: [], timestamp: 1278651 },
        { key5: [], timestamp: 1278650 },
        { key6: [], timestamp: 1278649 },
        { key7: [], timestamp: 1278648 },
      ],
      timestamp: 1278654,
    },
    { key2: [], timestamp: 1278653 },
    { key3: [], timestamp: 1278652 },
  ]);
  const [enterValue, setEnterValue] = useState("");
  const [initialState, setInitialState] = useState([
    {
      key1: [
        { key4: [], timestamp: 1278651 },
        { key5: [], timestamp: 1278650 },
        { key6: [], timestamp: 1278649 },
        { key7: [], timestamp: 1278648 },
      ],
      timestamp: 1278654,
    },
    { key2: [], timestamp: 1278653 },
    { key3: [], timestamp: 1278652 },
  ]);

  function inputValueChange(event) {
    setEnterValue(event.target.value);
    if (event.target.value.length === 0) {
      setData(initialState);
    }
  }

  function addPostClicked(event) {
    event.preventDefault();
    if (enterValue.length > 0) {
      let obj = {};
      obj[enterValue] = [];
      obj["timestamp"] = Date.now();
      let dataArray = [...data];
      dataArray.push(obj);
      setData([...dataArray]);
      setEnterValue("");
    }
  }

  function postkey(postKey, index, key, timestamp) {
    let arr = [...data];
    console.log(postKey, index, key, timestamp);
    // Recursively add...
    let ans = addRecursively(arr, postKey, key, timestamp);
    setData([...data]);
    setEnterValue("");
    console.log(data);
  }

  function addRecursively(arr, postKey, key, timestamp) {
    for (let i = 0; i < arr.length; i++) {
      const obj = arr[i];
      let keysArray = Object.keys(obj);
      let values = Object.values(obj);
      console.log(arr, postKey, key, keysArray[0], timestamp, values[0]);

      // let stringTimestamp = values[1].toString();
      console.log(values[1] === timestamp);
      console.log(typeof values[1], typeof timestamp);
      if (
        keysArray[0] === key &&
        values[1] === timestamp &&
        !checkExistOrNot(values[0], postKey) &&
        postKey !== key
      ) {
        console.log("key matched");
        let dummyObject = {};
        dummyObject[postKey] = [];
        dummyObject["timestamp"] = Date.now();
        console.log(dummyObject);
        obj[`${key}`].push(dummyObject);
        return true;
      }
      let ans = addRecursively(obj[keysArray[0]], postKey, key, timestamp);
      if (ans) return true;
    }
  }

  function checkExistOrNot(data, key) {
    console.log("this is value", data);
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let keys = Object.keys(element);
      if (keys[0] === key) {
        console.log("exist");
        return true;
      }
    }
    return false;
  }

  function searchBtnClicked() {
    if (enterValue.length !== 0) {
      let result = [];
      for (let i = 0; i < data.length; i++) {
        let dataObj = data[i];
        let searchedArray = searchRecursively(
          dataObj,
          data,
          enterValue,
          i,
          data,
          result
        );
        console.log(searchedArray);
      }
      setData([...result]);
    }
  }
  function searchRecursively(object, data, key, indexIs, initialData, result) {
    let keyArray = Object.keys(object);
    let values = Object.values(object);
    console.log(keyArray[0]);
    let stringTimestamp = values[1].toString();
    if (keyArray[0] === key) {
      // timestamp
      let arr = [];
      result.push(object);
      setInitialState([...initialData]);
      // setData([...arr]);
      return result;
    }
    for (let i = 0; i < values[0].length; i++) {
      const element = values[0][i];
      console.log(element);
      return searchRecursively(element, values[0], key, i, initialData, result);
    }
    // values[0].map((value, index) => {
    //   return searchRecursively(value, values[0], key, index, initialData);
    // });
  }

  function editRecursively(object, data, key, editedKey, indexIs, timestamp) {
    let keyArray = Object.keys(object);
    let values = Object.values(object);
    let stringTimestamp = values[1].toString();
    console.log(object, stringTimestamp);
    if (keyArray[0] === key && stringTimestamp === timestamp) {
      let searchedObjectKey = Object.keys(data[indexIs])[0];
      let obj = {};
      obj[editedKey] = data[indexIs][`${searchedObjectKey}`];
      obj["timestamp"] = values[1];
      // push
      data.push(obj);
      const lastObj = data[data.length - 1];
      data[data.length - 1] = data[indexIs];
      data[indexIs] = lastObj;
      // pop
      data.pop();
      return true;
    }
    for (let i = 0; i < values[0].length; i++) {
      const element = values[0][i];
      let ans = editRecursively(
        element,
        values[0],
        key,
        editedKey,
        i,
        timestamp
      );
      if (ans) {
        return true;
      }
    }
  }
  function changeEditedkey(editedKey, index, key, timestamp) {
    console.log({ data });
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      let ans = editRecursively(element, data, key, editedKey, i, timestamp);
      setData([...data]);
      if (ans) {
        break;
      }
    }
  }
  function deleteKey(key, timestamp) {
    console.log(key, timestamp);
    for (let i = 0; i < data.length; i++) {
      let dataObj = data[i];
      let ans = deleteRecursively(dataObj, key, data, i, timestamp);
      console.log(ans);
      setData([...data]);
      if (ans) break;
    }
  }
  function deleteRecursively(object, key, data, index, timestamp) {
    let keyArray = Object.keys(object);
    let values = Object.values(object);
    console.log(keyArray[0], timestamp);
    if (values[1] !== undefined) {
      let stringTimestamp = values[1].toString();
      if (keyArray[0] === key && timestamp === stringTimestamp) {
        let removed = data.splice(index, 1);
        console.log(data);
        return true;
      }
    }

    for (let i = 0; i < values[0].length; i++) {
      const element = values[0][i];
      let ans = deleteRecursively(element, key, values[0], i, timestamp);
      if (ans) {
        return true;
      }
    }

    // values[0].map((value, index) => {
    //   console.log(deleteRecursively(value, key, values[0], index, timestamp));
    // });
  }

  useEffect(() => {}, []);
  return (
    <div className="container__">
      <div className="container1">
        <div className="input-addpost-search">
          <input
            className="input"
            placeholder="Enter Something"
            onChange={inputValueChange}
            value={enterValue}
          ></input>
          <button className="btn" type="submit" onClick={addPostClicked}>
            Add Post
          </button>
          <button className="btn" type="submit" onClick={searchBtnClicked}>
            Search
          </button>
        </div>
      </div>
      <div className="container2">
        {data.map((obj, index) => {
          let dummy = Object.keys(obj);
          let key = dummy[0];
          let time = obj[dummy[1]];
          console.log(obj[key]);

          return (
            <Content
              data={obj}
              keyIS={key}
              childs={obj[key]}
              timestampIs={time}
              changeEditedkey={changeEditedkey}
              postkey={postkey}
              deleteKey={deleteKey}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ToDoList;
