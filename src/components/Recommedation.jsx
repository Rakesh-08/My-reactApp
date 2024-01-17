import React from 'react';

let recommendations = [
  "/fUvylznXMQc?si=ypoBhfGMQFRDZsn5",
  "/XpoiGVBWQ08?si=0mbIbf0yg5srtjZv",
  "/hK6Z-ooqqVc?si=nyje0aMjloM_Y_Ik",
  "/Pk_qBTqTLs0?si=QcdJLxlL660VOdCV",
  "/32PouIfy02Y?si=_M3JYqNMTnM7xVm1",
  "/pgGJGrcAhIU?si=bJ87H1-T5LlePoPf",
  "/WmVVWf6oBF8?si=vud6G9_dchoJytVX",
  "/_u-4XLLgZ7M?si=eGZtpo59wg4wrO05",
];

const Recommedation = () => {

  return (
      <div className=" mt-5 p-2 d-flex  bg-info overflow-x-scroll">
          
          {recommendations.map((videoId, i) =>
            <iframe
              key={i}
                  className="m-2 rounded "
                  height="200"
                  src={`https://www.youtube.com/embed${videoId} `}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>)}
      
    </div>
  );
}

export default Recommedation