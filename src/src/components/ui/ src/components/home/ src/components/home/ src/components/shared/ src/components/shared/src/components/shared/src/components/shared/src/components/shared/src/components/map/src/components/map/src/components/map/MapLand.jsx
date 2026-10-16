import React from "react";
import { Polygon } from "react-leaflet";
import { MOROCCO_RINGS, NEIGHBOUR_RINGS } from "@/components/map/mapConfig";

const LAND = "#F6E1CC";
const neighbour = { color: "#D9CCBA", weight: 1, fillColor: "#EFE7DB", fillOpacity: 1, interactive: false };
// A wide ochre stroke drawn first, then covered by a same-colour fill: leaves a clean outer outline
// and hides the internal seam between the two Morocco shapes.
const outline = { color: "#D97E52", weight: 4, lineJoin: "round", fillColor: LAND, fillOpacity: 1, interactive: false };
const fill = { color: LAND, weight: 1, fillColor: LAND, fillOpacity: 1, interactive: false };

export default function MapLand() {
  return (
    <>
      {NEIGHBOUR_RINGS.map((r, i) => <Polygon key={"n" + i} positions={r} pathOptions={neighbour} />)}
      {MOROCCO_RINGS.map((r, i) => <Polygon key={"o" + i} positions={r} pathOptions={outline} />)}
      {MOROCCO_RINGS.map((r, i) => <Polygon key={"f" + i} positions={r} pathOptions={fill} />)}
    </>
  );
}
