import ReactDOM from "react-dom/client";
import Layout from "@/layouts/Layout";
import "../styles/index.css";
import "../styles/index.less";
import "animate.css";
import FullScreenContainer from "@/components/FullScreenContainer";

function Main() {
  return (
    <FullScreenContainer>
      <Layout />
    </FullScreenContainer>
  );
}
export default Main;
