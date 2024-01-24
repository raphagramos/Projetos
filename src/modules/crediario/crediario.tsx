import React from "react";
import "./App.css";
import { CrediarioEnum } from "../common/core/enums/crediario.enum";

export const Crediario: React.FC = () => {
  return (
    <div>
      <h2>{CrediarioEnum.TITLE}</h2>
    </div>
  );
};
