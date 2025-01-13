import React from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// Tọa độ các khu vực khách hàng
const markers = [
    { coordinates: [-100, 40], name: "United States", count: "29,051" }, // Mỹ
    { coordinates: [10, 50], name: "Europe", count: "18,041" }, // Châu Âu
    { coordinates: [135, -25], name: "Australia", count: "10,430" }, // Úc
    { coordinates: [80, 20], name: "Other", count: "5,420" }, // Khác
];

const WorldMap = () => {
    return (
        <div className="h-64 w-full rounded-lg overflow-hidden shadow bg-gray-100">
            <ComposableMap
                projectionConfig={{ scale: 160 }}
                style={{ width: "100%", height: "100%" }}
            >
                <Geographies geography="https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json">
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                style={{
                                    default: { fill: "#E5E7EB", outline: "none" },
                                    hover: { fill: "#D1D5DB", outline: "none" },
                                    pressed: { fill: "#9CA3AF", outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>
                {markers.map(({ coordinates, name, count }, index) => (
                    <Marker key={index} coordinates={coordinates}>
                        <circle r={5} fill="#FF5722" />
                        <text
                            textAnchor="middle"
                            style={{
                                fontFamily: "system-ui",
                                fontSize: 10,
                                fill: "#333",
                            }}
                            y={-10}
                        >
                            {name} ({count})
                        </text>
                    </Marker>
                ))}
            </ComposableMap>
        </div>
    );
};

export default WorldMap;
