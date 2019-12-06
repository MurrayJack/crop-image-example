import { createRef, useState, useEffect } from "react";

export default () => {
  const workSpace = createRef();
  const image = createRef();
  const imageSize = 600;

  let state;

  const handleResizeEvent = e => {
    const percent = e.target.value / 100;
    image.current.width = imageSize * percent;
  };

  const handleMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();

    state = {
      clientX: e.clientX,
      clientY: e.clientY,
      offsetLeft: e.target.offsetLeft,
      offsetTop: e.target.offsetTop
    };

    image.current.addEventListener("pointermove", handleMouseMove, false);
    workSpace.current.addEventListener("pointerup", handleMouseUp, false);
  };

  function handleMouseUp(e) {
    e.preventDefault();
    e.stopPropagation();

    image.current.removeEventListener("pointermove", handleMouseMove);
    workSpace.current.removeEventListener("pointerup", handleMouseUp);
    state = undefined;
  }

  const handleMouseMove = e => {
    e.preventDefault();
    e.stopPropagation();

    const left = state.offsetLeft + (e.clientX - state.clientX);
    const top = state.offsetTop + (e.clientY - state.clientY);

    image.current.style.left = left + "px";
    image.current.style.top = top + "px";
  };

  useEffect(() => {
    const { current } = image;

    if (window.PointerEvent) {
      current.addEventListener("pointerdown", handleMouseDown, false);
    }

    return () => {
      current.removeEventListener("pointerdown", handleMouseDown);
    };
  }, [image, handleMouseDown]);

  return (
    <>
      <main>
        <div ref={workSpace} className="workspace">
          <img ref={image} width={imageSize} src="https://cdn.collider.com/wp-content/uploads/2017/10/the-gifted-amy-acker-02.jpg" alt="A" />

          <div className="circle" />
        </div>
        <div className="resizeWrapper">
          <div className="resize">
            <div>
              <svg width="18" height="18" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.6533 22.3455L11.925 18.8544L7.19999 24.9H28.8L20.7 14.8247L14.6533 22.3455ZM4.5 8.7C4.5 7.20868 5.71289 6 7.18733 6H28.8127C30.2966 6 31.5 7.20128 31.5 8.7V26.25C31.5 27.7413 30.2871 28.95 28.8127 28.95H7.18733C5.70339 28.95 4.5 27.7487 4.5 26.25L4.5 8.7ZM11.25 15.45C12.7413 15.45 13.95 14.2413 13.95 12.75C13.95 11.2587 12.7413 10.05 11.25 10.05C9.75867 10.05 8.54999 11.2587 8.54999 12.75C8.54999 14.2413 9.75867 15.45 11.25 15.45Z"
                  fill="#566878"
                />
              </svg>
            </div>
            <input min={0} max={200} defaultValue="100" type="range" onChange={handleResizeEvent} />
            <div>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.6533 22.3455L11.925 18.8544L7.19999 24.9H28.8L20.7 14.8247L14.6533 22.3455ZM4.5 8.7C4.5 7.20868 5.71289 6 7.18733 6H28.8127C30.2966 6 31.5 7.20128 31.5 8.7V26.25C31.5 27.7413 30.2871 28.95 28.8127 28.95H7.18733C5.70339 28.95 4.5 27.7487 4.5 26.25L4.5 8.7ZM11.25 15.45C12.7413 15.45 13.95 14.2413 13.95 12.75C13.95 11.2587 12.7413 10.05 11.25 10.05C9.75867 10.05 8.54999 11.2587 8.54999 12.75C8.54999 14.2413 9.75867 15.45 11.25 15.45Z"
                  fill="#566878"
                />
              </svg>
            </div>
          </div>
        </div>
        <div>
          <button>Crop Photo</button>
        </div>
      </main>

      <style jsx>{`
        img {
          position: absolute;
          cursor: move;
        }

        .circle {
          position: absolute;
          height: 300px;
          width: 300px;
          margin-left: -250px;
          margin-top: -350px;
          border-radius: 50%;
          border: 400px solid rgba(255, 255, 255, 0.7);
          pointer-events: none;
        }

        .workspace {
          height: 400px;
          width: 600px;
          background-color: #f7f7f7;
          overflow: hidden;
          position: relative;
        }

        .resizeWrapper {
          width: 600px;
          padding: 16px;
        }

        .resize {
          margin: 0 auto;
          width: 300px;
          display: grid;
          grid-template-columns: 40px auto 40px;
          align-items: center;
        }

        // RANGE INPUTS

        input[type="range"] {
          -webkit-appearance: none;
          margin: 18px 0;
          width: 100%;
        }
        input[type="range"]:focus {
          outline: none;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          width: 100%;
          height: 8.4px;
          cursor: pointer;
          animate: 0.2s;
          // box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
          background: #3071a9;
          border-radius: 3px;
          border: 0.2px solid #010101;
        }
        input[type="range"]::-webkit-slider-thumb {
          box-shadow: 0px 2px 5px rgba(39, 40, 51, 0.2);
          height: 22px;
          width: 22px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          -webkit-appearance: none;
          margin-top: -8px;
        }
        input[type="range"]:focus::-webkit-slider-runnable-track {
          background: #367ebd;
        }
        input[type="range"]::-moz-range-track {
          width: 100%;
          height: 8.4px;
          cursor: pointer;
          animate: 0.2s;
          //  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
          background: #3071a9;
          border-radius: 1.3px;
          border: 0.2px solid #010101;
        }
        input[type="range"]::-moz-range-thumb {
          // box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
          border: 1px solid #000000;
          height: 36px;
          width: 16px;
          border-radius: 3px;
          background: #ffffff;
          cursor: pointer;
        }
        input[type="range"]::-ms-track {
          width: 100%;
          height: 8.4px;
          cursor: pointer;
          animate: 0.2s;
          background: transparent;
          border-color: transparent;
          border-width: 16px 0;
          color: transparent;
        }
        input[type="range"]::-ms-fill-lower {
          background: #2a6495;
          border: 0.2px solid #010101;
          border-radius: 2.6px;
          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        }
        input[type="range"]::-ms-fill-upper {
          background: #3071a9;
          border: 0.2px solid #010101;
          border-radius: 2.6px;
          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
        }
        input[type="range"]::-ms-thumb {
          box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
          border: 1px solid #000000;
          height: 36px;
          width: 16px;
          border-radius: 3px;
          background: #ffffff;
          cursor: pointer;
        }
        input[type="range"]:focus::-ms-fill-lower {
          background: #3071a9;
        }
        input[type="range"]:focus::-ms-fill-upper {
          background: #367ebd;
        }
      `}</style>
    </>
  );
};
