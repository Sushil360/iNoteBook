import React from "react";

const About = () => {
  return (
    <>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://assets.website-files.com/60abcbf13c9af64a88390582/6230f5f37b84136a6985b3df_899889.jpg"
              className="d-block w-100"
              alt="notes"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://www.wikihow.com/images/thumb/1/18/Take-Better-Notes-Step-1-Version-2.jpg/aid11032-v4-728px-Take-Better-Notes-Step-1-Version-2.jpg.webp"
              className="d-block w-100"
              alt="notes"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://images.samsung.com/is/image/samsung/p5/in/apps/samsung-notes/0803-v5-apps-and-service-notes-screenoffmemo-section-02-pc.jpg?$ORIGIN_JPG$"
              className="d-block w-100"
              alt="notes"
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>
        <h3>
            <div>
          <p>
            This WebApp is all about helping you to make a notes which you can
            store in the cloud. So, that you won't have to worry about the
            deletion of notes you made.
          </p>
          </div>
        </h3>
        <h3>
            <div>
          <p>
            This can be accessed anywhere as it is cloud based. So, feel free to
            add and view your notes in time.
          </p>
          </div>
        </h3>
      </div>
    </>
  );
};

export default About;
