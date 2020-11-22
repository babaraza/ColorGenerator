import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { alertState, chosenColorState } from "./atoms";

const ColorSwatch = styled.div`
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 1rem;
`;

function SingleColor({ color, index }) {
  const setAlert = useSetRecoilState(alertState);
  const setChosenColor = useSetRecoilState(chosenColorState);
  const hex = `#${color.hex}`;

  const copyToClipboard = () => {
    setAlert(true);
    setChosenColor(hex);
    navigator.clipboard.writeText(hex);
  };

  return (
    <ColorSwatch
      onClick={() => copyToClipboard()}
      style={{
        background: `rgb(${color.rgb})`,
      }}
    >
      <div style={{ color: `${index > 9 ? "white" : "black"}` }}>
        <p style={{ fontWeight: 600, opacity: 0.3 }}>{color.weight}%</p>
        <p>{hex}</p>
      </div>
    </ColorSwatch>
  );
}

export default SingleColor;
