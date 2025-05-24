import "./App.css";
// import NestedComments from "./NestedComments";
// import UberGrid from "./UberGrid";
// import commentsData from "../src/data/comments.json";
// import FileExplorer from "./FileExplorer";
// import fileData from "../src/data/data1.json"
// import Keyboard from "./Keyboard";
// import InfiniteScroll from "./InfiniteScroll/InfiniteScrollObserver";
import KeepNotes from "./KeepNotes/KeepNotes";

function App() {
  return (
    <div>
      <header className="App-header">
        {/* <UberGrid /> */}
        {/* <h1>Nested comments</h1> */}
        {/* <NestedComments
          comments={commentsData}
          onSubmit={() => {}}
          onEdit={() => {}}
          onDelete={() => {}}
          onUpvote={() => {}}
          onDownvote={() => {}}
        /> */}
        {/* <FileExplorer files={fileData} /> */}
        {/* <Keyboard /> */}
        {/* <InfiniteScroll /> */}
        <KeepNotes />
      </header>
    </div>
  );
}

export default App;
