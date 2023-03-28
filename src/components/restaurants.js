import axios from "axios";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Restaurants() {
  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .get("http://localhost:9000/api/restaurants")
      .then((res) => {
        console.log(res.data.result);
        setData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <MapContainer
      center={[40.82302903, -73.93414657]}
      zoom={1}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data?.map((item) => {
        return (
          <Marker
            position={[
              item.location.coordinates[1],
              item.location.coordinates[0],
            ]}
          >
            <Popup>{item.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
