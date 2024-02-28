import Header from "./components/Header";

function App(props) {
  return (
    <div class="min-h-screen bg-trienv-background-500">
      <Header></Header>
      {props.children}
    </div>
    
  );
}

export default App;
