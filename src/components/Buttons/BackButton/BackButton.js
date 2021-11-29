import { useNavigate } from "react-router-dom";

function HomeButton() {
    const navigate = useNavigate();
    
  return (
    <button type="button" onClick={navigate('/')}>
      Go home
    </button>
  );
}

export default HomeButton;
