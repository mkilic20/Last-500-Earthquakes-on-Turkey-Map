import L from "leaflet";
import { useState } from "react";

type RangeInputProps = {
  currRange: number;
  setradiusMeter: React.Dispatch<React.SetStateAction<number>>;
  setzoomLevel: React.Dispatch<React.SetStateAction<number>>;
  setcenterMap: React.Dispatch<React.SetStateAction<L.LatLng>>;
};

export const RangeInput = (props: RangeInputProps) => {
  const [inputRange, setinputRange] = useState(props.currRange);

  return (
    <div>
      {" "}
      <label style={{ color: "white" }}> Enter the radius in meters: </label>
      <input
        className="form-input"
        type="text"
        name="username"
        placeholder="Enter your username"
        value={inputRange}
        onChange={(e) => {
          if (isNaN(parseFloat(e.target.value))) {
            setinputRange(0);
          } else {
            setinputRange(parseFloat(e.target.value));
          }
        }}
      />
      <button
        onClick={(e) => {
          if (inputRange <= 0) {
            props.setradiusMeter(1);
          } else {
            props.setzoomLevel(5);
            props.setradiusMeter(inputRange);
            props.setcenterMap(new L.LatLng(1, 6));
          }
        }}
      >
        Search
      </button>
    </div>
  );
};
