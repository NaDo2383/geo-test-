import axios from "axios";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";

export default function CurPolygon() {
    const [data, setData] = useState();
    // const curLocation = { lat: 40.848447, long: -73.856077 };
    let currentPolygon = [];
    const [polyArr, setPolyArr] = useState([]);
    const purpleOptions = { color: "purple" };

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        axios
            .get("http://localhost:9000/api/neighborhoods")
            .then((res) => {
                console.log(res.data.result);
                setData(res.data.result);
                changePosition(res.data.result);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function changePosition(arr) {
        const newAr = [];

        arr?.map((item1) => {
            item1?.geometry.coordinates[0].map((item2) => {
                currentPolygon.push([item2[1], item2[0]]);
            });
            console.log(currentPolygon);
            newAr.push(currentPolygon);

            //  setPolyArr([...polyArr, currentPolygon]);
            currentPolygon = [];
        });
        setPolyArr(newAr);
    }
    console.log(polyArr);

    return (
        <MapContainer
            center={[40.848447, -73.856077]}
            zoom={14}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {polyArr?.map((item) => {
                return <Polygon pathOptions={purpleOptions} positions={item} />;
            })}
        </MapContainer>
    );
}
