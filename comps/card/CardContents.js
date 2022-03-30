import React from "react";
import styles from "../../styles/Home.module.css";
import LinksContainer from "./LinksContainer";
import moment from "moment";
import Image from "next/image";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Tooltip from "@mui/material/Tooltip";
export default function CardContents({
  i2,
  currentKey,
  currentValue,
  excludeEntry,
  currentTitle,
}) {
  return (
    <div key={"2" + i2}>
      {currentKey === "coverImage" ? (
        <div className={styles.coverImageContainer}>
          <img
            className={styles.coverImage}
            src={currentValue}
            alt="Cover Image"
          />
        </div>
      ) : currentKey === "links" ? (
        <LinksContainer currentValue={currentValue} />
      ) : currentKey === "canonicity" ? null : (
        <h2>{currentKey.replace(/([A-Z])/g, " $1")}:</h2>
      )}

      {typeof currentValue === "string" && currentKey !== "coverImage" ? (
        <p>{currentValue}</p>
      ) : null}

      {typeof currentValue === "number" &&
      currentKey !== "timeline" &&
      currentKey !== "coverImage" ? (
        <p>{currentValue}</p>
      ) : null}

      {currentKey === "releaseDate" && moment(currentValue).isValid() ? (
        <p>
          {moment(currentValue)._d.toDateString().split(" ").slice(1).join(" ")}
        </p>
      ) : null}
      {currentKey === "timeline" && currentValue > 0 ? (
        <p>{Math.abs(currentValue).toLocaleString("en")} ABY</p>
      ) : null}
      {currentKey === "timeline" && currentValue <= 0 ? (
        <p>{Math.abs(currentValue).toLocaleString("en")} BBY</p>
      ) : null}
      {currentKey === "timeline" && currentValue === "" ? <p>N/A</p> : null}
      {currentKey === "canonicity" ? (
        currentValue ? (
          <div className={styles.canonDiv}>
            <h3 className={styles.canon}>Canon</h3>
            <Tooltip title="Exclude">
              <HighlightOffIcon
                sx={{
                  position: "absolute",
                  top: "0%",
                  left: "100%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  backgroundColor: "black",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={() => excludeEntry(currentTitle)}
              />
            </Tooltip>
          </div>
        ) : (
          <div className={styles.legendsDiv}>
            <h3 className={styles.legends}>Legends</h3>
            <Tooltip title="Exclude">
              <HighlightOffIcon
                sx={{
                  position: "absolute",
                  top: "0%",
                  left: "100%",
                  transform: "translate(-50%, -50%)",
                  color: "#ffe81f",
                  backgroundColor: "black",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
                onClick={() => excludeEntry(currentTitle)}
              />
            </Tooltip>
          </div>
        )
      ) : null}
    </div>
  );
}
