import { createFileRoute } from "@tanstack/react-router";
import { OrionApp } from "../components/OrionApp";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <OrionApp />;
}
