import React from "react";

export default function PostGrid({ children }) {
  return <div className="grid md:grid-cols-12 gap-4">{children}</div>;
}
