import Header from "./components/Header";

function App(props) {
  return (
    <div class="min-h-screen bg-trienv-background-500">
      <Header />
      <div class="ml-32">{props.children}</div>
    </div>
    
  );
}

export default App;
