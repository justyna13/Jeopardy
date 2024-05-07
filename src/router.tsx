import { createBrowserRouter, Navigate } from "react-router-dom";
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { Layout } from "./pages/Layout/Layout.tsx";
import { Slugs } from "./constants";
import { HomePage } from "./pages/HomePage/HomePage.tsx";
import { GamePage } from "./pages/GamePage/GamePage.tsx";

export const router = createBrowserRouter([
  {
    element: (
      <QueryParamProvider
        adapter={ReactRouter6Adapter}
        options={{
          removeDefaultsFromUrl: true
        }}>
        <Layout testid={'layout'} />
      </QueryParamProvider>
    ),
    children: [
      {
        path: Slugs.HOME,
        element: <HomePage />
      },
      {
        path: Slugs.GAME,
        element: <GamePage />
      }
    ]
  },
  {
    path: Slugs.NOT_FOUND,
    element: <Navigate replace to={Slugs.HOME} />
  }
])
