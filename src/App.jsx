import Header from "./components/Header";

function App(props) {
  return (
    <div class="grid grid-cols-4 gap-10 my- bg-black min-h-screen">
      <Header></Header>
      {props.children}
    </div>
    
  );
}

export default App;
