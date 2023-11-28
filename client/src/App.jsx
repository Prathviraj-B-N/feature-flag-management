import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [comp1,setComp1] = useState('Loading...');
  const [comp2,setComp2] = useState('Loading...');
  const [comp3,setComp3] = useState('Loading...');

  useEffect(() => {
    fetchAllComponents()
  }, []);



  function fetchAllComponents(){
    fetch("http://localhost:5003/api/comp1", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setComp1(data.msg);
        console.log(data.msg);
      });

      fetch("http://localhost:5003/api/comp2", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setComp2(data.msg);
        console.log(data.msg);
      });

      fetch("http://localhost:5003/api/comp3", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setComp3(data.msg);
        console.log(data.msg);
      });
  }

  return (
    <div className="card-parent">
      <div className="card">{comp1}</div>
      <div className="card">{comp2}</div>
      <div className="card">{comp3}</div>
    </div>
  );
}

export default App;
