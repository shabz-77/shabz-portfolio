import type { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Automotive Designer",
  description:
    "Automotive designer focused on 3D design, livery systems, and interactive experiences.",
  openGraph: {
    title: "Automotive Designer — Shahbaaz Nilgiriwala",
    description:
      "3D design, livery system, and interactive experiences.",
    url: "/",
  },
};

export default function Page() {
  return <HomeClient />;
}
