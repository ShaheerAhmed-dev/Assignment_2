import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';


const cards = [
    { imgSrc: require("./assets/dashboard.png"), title: "Overview" },
    { imgSrc: require("./assets/mechanical.png"), title: "Mechanical" },
    { imgSrc: require("./assets/thermometer.jpeg"), title: "Thermal comfort" },
    { imgSrc: require("./assets/digital_lock.png"), title: "Security Services" },
    { imgSrc: require("./assets/dashboard.png"), title: "EMS" },
    { imgSrc: require("./assets/generator.png"), title: "Generator" },
    { imgSrc: require("./assets/bus.png"), title: "Vertical Transport" },
    { imgSrc: require("./assets/fire.png"), title: "Fire Indication" },
    { imgSrc: require("./assets/solar_panel.png"), title: "Solar Panel" },
    { imgSrc: require("./assets/bulb.png"), title: "EV Charging" },
    { imgSrc: require("./assets/networking.png"), title: "ICN" },
    { imgSrc: require("./assets/dashboard.png"), title: "Hydraulics" },
    { imgSrc: require("./assets/EV.png"), title: "EV Charging" },
    { imgSrc: require("./assets/ups.jpeg"), title: "UPS" },
    { imgSrc: require("./assets/car_parking.png"), title: "Car Park" },
    { imgSrc: require("./assets/people.png"), title: "People Counting" },
    { imgSrc: require("./assets/dashboard.png"), title: "EOT" },
    { imgSrc: require("./assets/weather.png"), title: "Weather Station" },
    { imgSrc: require("./assets/security_camera.png"), title: "CCTV" },
    { imgSrc: require("./assets/lockers.png"), title: "Smart Locker" },
    { imgSrc: require("./assets/parcel.png"), title: "Parcel Locker" },
    { imgSrc: require("./assets/id_card.png"), title: "Visitor Management" },
    { imgSrc: require("./assets/bathtub.png"), title: "Smart Bathroom" },
    { imgSrc: require("./assets/IEQ.png"), title: "IEQ" },
    { imgSrc: require("./assets/irrigation.png"), title: "Irrigation" },
  ];

const Dashboard = () => {
  return (
    <div>
      <center>
        <h1>Welcome to Dashboard</h1>
      </center>
      <div className="container-fluid">
        <div className="row row-cols-4 justify-content-center">
          {cards.map((card, index) => (
            <div className="card mb-2 mx-1" key={index}>
              <div className="row g-0">
                <div className="col-md-3">
                  <div className="card-content">
                    <img src={card.imgSrc} className="img-small rounded-start" alt={card.title} />
                  </div>
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <div className="card-content">
                      <h5 className="card-title">{card.title}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default Dashboard;
