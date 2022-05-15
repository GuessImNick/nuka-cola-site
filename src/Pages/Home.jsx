import React from "react";
import Header from "../Components/Header";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  let navigate = useNavigate()
  return (
    <>
      <section className="showcase">
        <div className="heroImg">
          <img src={require("../Assets/Images/NukaColaBG.jpg")} />
          <div className="heroText card">
            <h1>Nuka-Cola</h1>
            <p>
              An explosive rush of flavor that will take you out of this world.
            </p>
            <button className="btn" onClick={() => navigate('/products')}>Explore More</button>
          </div>
        </div>
      </section>
      <section className="ad-section">
        <div className="ad-card">
          <div className="card">
            <div className="ad-image">
              <img src={require("../Assets/Images/NukaColaQuantum.jpg")} />
            </div>
            <div className="ad-p-btn">
              <p>
                Take the leap and try all new Nuka-Cola Quantum today! Now with
                double the energy!
              </p>
              <button className="btn" onClick={() => navigate('/products')}>Veiw Products</button>
            </div>
          </div>
          <div className="card">
            <div className="ad-image">
              <img src={require("../Assets/Images/NukaColaQuantum2.jpg")} />
            </div>
            <div className="ad-p-btn">
              <p>
                Would you like to have our product on you shelves! Sign-up and
                order and begin selling flavor!
              </p>
              <button className="btn" onClick={() => navigate('/orders')}>Order Today</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
