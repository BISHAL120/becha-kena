import React from "react";
import css from "./pendingCss.module.css";

const Pending = () => {
  return (
    <div>
      <div className={`${css.loader}`}>
        <div className={`${css.square} bg-foreground`} id={`${css.sq1}`}></div>
        <div className={`${css.square} bg-foreground`} id={`${css.sq2}`}></div>
        <div className={`${css.square} bg-foreground`} id={`${css.sq3}`}></div>
        <div className={`${css.square} bg-foreground`} id={`${css.sq4}`}></div>
        <div className={`${css.square} bg-foreground`} id={`${css.sq5}`}></div>
        <div className={`${css.square} bg-foreground`} id={`${css.sq6}`}></div>
        <div className={`${css.square} bg-foreground`} id={`${css.sq7}`}></div>
        <div className={`${css.square} bg-foreground`} id={`${css.sq8}`}></div>
        <div className={`${css.square} bg-foreground`} id={`${css.sq9}`}></div>
      </div>
    </div>
  );
};

export default Pending;
