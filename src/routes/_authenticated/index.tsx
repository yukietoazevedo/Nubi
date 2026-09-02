import { createFileRoute } from "@tanstack/react-router";
import { OrionApp } from "../../components/OrionApp";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "Nubi — Converse com sua IA" },
      {
        name: "description",
        content:
          "Converse com a Nubi: histórico persistente, conversas organizadas e uma interface silenciosa focada no diálogo.",
      },
      { property: "og:title", content: "Nubi — Converse com sua IA" },
      {
        property: "og:description",
        content: "Histórico persistente e conversas organizadas na Nubi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <OrionApp />;
}
