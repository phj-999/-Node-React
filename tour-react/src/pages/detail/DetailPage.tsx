/**
 * 旅游路线详情页
 * 
 */
import React from "react";
import { useParams } from "react-router-dom";

export const DetailPage: React.FC = (
  props
) => {
  const {touristRouteId} = useParams()
//   console.log(props.history);
//   console.log(props.location);
//   console.log(props.match);
return <h1>路游路线详情页面, 路线ID: {touristRouteId}</h1>;
};

