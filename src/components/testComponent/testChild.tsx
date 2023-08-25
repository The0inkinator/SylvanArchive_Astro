import { createSignal, createEffect } from "solid-js";
import "./testComponentStyle.css";

interface childProps {
  hovered: any;
}

export default function TestChild({ hovered }: childProps) {
  return <div>{hovered}</div>;
}
