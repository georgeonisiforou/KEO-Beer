import React, { useEffect, useState } from "react";
import { keyframes } from "styled-components";
import styled from "styled-components";

const LevelOne = styled.div`
  clip-path: path(100% 0, 95% 100%, 5% 100%, 0 0);
  width: 400px;
  height: 600px;
  margin: 150px auto;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 96px;
  font-weight: 700;
  border-radius: 10px;
  background-image: linear-gradient(
    0deg,
    hsl(41deg 99% 48%) 0%,
    hsl(39deg 89% 56%) 48%,
    hsl(39deg 88% 61%) 62%,
    hsl(39deg 88% 66%) 71%,
    hsl(39deg 87% 70%) 77%,
    hsl(39deg 85% 74%) 81%,
    hsl(39deg 83% 78%) 84%,
    hsl(39deg 80% 82%) 86%,
    hsl(40deg 75% 86%) 89%,
    hsl(40deg 64% 90%) 93%,
    hsl(40deg 40% 94%) 100%
  );
  color: rgb(167, 140, 75);
  position: relative;
  overflow: hidden;
`;

const floating = keyframes`
from {
  transform: translateY(0);
  filter: blur(1px);
  background-color: hsl(57, 91%, 65%);
}
to {
  transform: translateY(-100vh);
  filter: blur(5px);
  background-color: transparent;
}
`;

const Bubble = styled.div`
  width: 10px;
  aspect-ratio: 1/1;

  border: 1px solid rgb(231, 254, 255);
  border-radius: 50%;
  position: absolute;
  transform: translateY(0);
  animation: ${floating} 3s linear forwards;
`;

const Beer = () => {
  const [bubbles, setBubbles] = useState([]);

  function addBubble() {
    setBubbles((v) => [
      ...v.filter((b) => b.startTime + 5000 > Date.now()),
      {
        id: Math.floor(Math.random() * 100000000).toString(),
        size: Math.random() * 10 + 2 + "px",
        x: `${Math.random() * 400}px`,
        y: "5px",
        animationDuration: `${Math.random() * 20 + 3}s`,
        startTime: Date.now(),
      },
    ]);
  }
  useEffect(() => {
    const stateInterval = setInterval(addBubble, 50);
    return () => {
      clearInterval(stateInterval);
    };
  }, []);

  return (
    <>
      <LevelOne>
        <p style={{ marginTop: "100px", zIndex: 5 }}>KEO</p>

        {bubbles.map((bubble) => (
          <Bubble
            key={bubble.id}
            style={{
              bottom: bubble.y,
              left: bubble.x,
              width: bubble.size,
              animationDuration: bubble.animationDuration,
            }}
          />
        ))}
      </LevelOne>
    </>
  );
};

export default Beer;
