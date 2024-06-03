import React from "react";
import { useStateProvider } from "../../utils/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
  faRepeat,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";

export default function PlayerConrols() {
  const [{ token, playerSate }, dispatch] = useStateProvider();
  return (
    <div>
      <div className="shuffle">
        <FontAwesomeIcon icon={faShuffle} />
      </div>
      <div className="previous">
        <FontAwesomeIcon icon={faBackwardStep} />
      </div>
      <div className="state">
        {playerSate ? (<FontAwesomeIcon icon={faPause}/>) : (<FontAwesomeIcon icon={faPlay}/>)}
      </div>
      <div className="next">
        <FontAwesomeIcon icon={faForwardStep} />
      </div>
      <div className="repeat">
        <FontAwesomeIcon icon={faRepeat} />
      </div>
    </div>
  );
}
