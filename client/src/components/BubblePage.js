import React, {useState, useEffect} from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";
import {useHistory} from "react-router-dom";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  const history = useHistory();

  const getColorList = () => {
    axiosWithAuth()
      .get("/api/colors")
      .then((res) => setColorList(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    getColorList();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
