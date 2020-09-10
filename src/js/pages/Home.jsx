import React, {useState} from "react";
import NotesOverview from "../components/NotesOverview.jsx";
import AddNoteDialog from "./../components/AddNoteDialog.jsx";

function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return(
      <article className="page home">
        <NotesOverview openDialog={() => setIsDialogOpen(true)}/>
        <AddNoteDialog isOpen={isDialogOpen} closeDialog={() => setIsDialogOpen(false)}/>
      </article>
  );
}

export default Home;