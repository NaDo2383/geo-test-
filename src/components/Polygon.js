import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  Polyline,
} from "react-leaflet";

export default function CurPolygon() {
  const [data, setData] = useState();
  const curLocation = { lat: 40.848447, long: -73.856077 };
  const currnetPolygon = [];
  const purpleOptions = { color: "purple" };

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .post("http://localhost:9000/api/currentNeighborHood", curLocation)
      .then((res) => {
        console.log(res.data.result);
        setData(res.data.result);
        changePosition(res.data.result.geometry.coordinates[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function changePosition(arr) {
    arr?.map((item) => {
      currnetPolygon.push([item[1], item[0]]);
    });
    console.log(currnetPolygon);
  }

  return (
    <MapContainer
      center={[9.9986585, -84.2040813]}
      zoom={1}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data && (
        <>
          {changePosition(data?.geometry.coordinates[0])}
          <Polygon pathOptions={purpleOptions} positions={currnetPolygon} />
        </>
      )}
    </MapContainer>
  );
}
