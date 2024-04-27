import Todos from "./components/Todos";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    alert(
      "If you can't see the data, please wait a few minutes for the server to come back online. Thank you."
    );
  }, []);

  return (
    <>
      <Todos></Todos>
    </>
  );
}

export default App;
