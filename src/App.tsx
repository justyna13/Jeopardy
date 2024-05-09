import { RouterProvider } from "react-router-dom";
import { router } from "@/router.tsx";

import '@/i18n';

export default function App() {
  return <RouterProvider router={router} />
}
