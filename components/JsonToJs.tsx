"use client";
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
interface Props {
  jsonData: string;
}
const JsonToJs = ({ jsonData }: Props) => {
  const [ts, setTs] = useState("");
  const handleSubmit = () => {
    try {
      const data = JSON.parse(jsonData);
      setTs(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {" "}
      <form action={handleSubmit}>
        {" "}
        <button>Convert</button>{" "}
      </form>{" "}
      <div>{ts}</div>{" "}
    </div>
  );
};
export default JsonToJs;
