import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PageNotFound404 from "./PageNotFound404/PageNotFound404";
import Layout from "./Layout/Layout";
import LandingPage from "./LandingPage/LandingPage";
import NewsIndexPage from "./Pages/NewsIndexPage";
import NewsArticlePage from "./Pages/NewsArticlePage";
import GalleryPage from "./Pages/GalleryPage";
import ContentPage from "./Pages/ContentPage";
import { SiteContentProvider } from "./cms/SiteContent";
import { Toaster } from "react-hot-toast";

import error from "./PageNotFound404/Assets/illustration.svg";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <SiteContentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route path="news" element={<NewsIndexPage />} />
              <Route path="news/:slug" element={<NewsArticlePage />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="p/:slug" element={<ContentPage />} />
              <Route
                path="*"
                element={
                  <PageNotFound404 description={"Page Not Found"} img={error} />
                }
              />
            </Route>
          </Routes>
        </Router>
      </SiteContentProvider>
    </>
  );
}

export default App;
