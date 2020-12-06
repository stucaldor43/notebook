import React from "react";
import NotesOverview from "../components/NotesOverview.jsx";

function Home({ store }) {
  return(
      <article className="page home">
        <NotesOverview store={store}/>
      </article>
  );
}

export default Home;