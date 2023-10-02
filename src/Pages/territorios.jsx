import React, { useEffect } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';export default function container() { 
    return ( 
<>
  <meta charSet="utf-8" />
  <title>Earth Engine Demo</title>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/css/ol.css"
  />
  {/* Bootstrap core CSS */}
  <link
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
    rel="stylesheet"
  />

  <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">

    <span data-feather="settings" id="gear" onclick="toggleSideBar()" />

  </nav>
  <div className="container-fluid">
    <div className="row">
      <nav
        id="sidebar"
        className="col-md-3 d-none d-md-block col-lg-2 bg-light sidebar"
      >
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                <span data-feather="home" /> Opciones:
                <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
          <h6
            className="
          sidebar-heading
          d-flex
          justify-content-between
          align-items-center
          px-3
          mt-4
          mb-1
          text-muted
        "
            style={{ cursor: "pointer" }}
          >
            <span onclick="toggleCategory('maproutelist', 'mrexpand')">
              Mapping requests
              <span id="mrexpand" data-feather="minus-circle" />
            </span>
          </h6>
          <ul className="nav flex-column" id="maproutelist">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onclick="loadparameterPanel('test');event.preventDefault();"
                title="test route"
              >
                <span data-feather="map" /> test
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onclick="loadparameterPanel('meanImageByCollection');event.preventDefault();"
                title="meanImageByCollection route"
              >
                <span data-feather="map" /> meanImageByCollection
              </a>
            </li>
          </ul>
          <h6
            className="
          sidebar-heading
          d-flex
          justify-content-between
          align-items-center
          px-3
          mt-4
          mb-1
          text-muted
        "
            style={{ cursor: "pointer" }}
          >
            <span onclick="toggleCategory('graphroutelist', 'grexpand')">
              Graphing requests
              <span id="grexpand" data-feather="minus-circle" />
            </span>
          </h6>
          <ul className="nav flex-column mb-2" id="graphroutelist">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                onclick="loadparameterPanel('timeSeriesIndex');event.preventDefault();"
                title="timeSeriesIndex route"
              >
                <span data-feather="map" /> timeSeriesIndex
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <main
        id="main"
        role="main"
        className="col-md-9 ml-sm-auto col-lg-10 px-4"
      >
        <div id="map" className="smallmap" />
        <div id="graphcontainer" style={{ height: "calc(50vh - 50px)" }} />
      </main>
    </div>
  </div>
  <div id="overlay" style={{ display: "none" }} />
</>
    ); 
}