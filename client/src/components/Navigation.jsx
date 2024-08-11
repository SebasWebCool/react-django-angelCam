import { logOutUser } from "../api/users.api";
import { useNavigate } from "react-router-dom";

export function Navigation({ currentUser, setCurrentUser }) {
  const email = "user@example.com"; // Define el email correctamente
  const password = "password"; // Define el password correctamente
  const navigate = useNavigate();

  function submitLogout(e) {
    e.preventDefault();
    async function tryLogOutUser(data) {
      const res = await logOutUser(data);
    }
    tryLogOutUser({
      email: email,
      password: password,
    }).then(function (res) {
      setCurrentUser(false);
      navigate("/");
    });
  }
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between py-3 items-center bg-gray-800 text-white z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Angelcam App</div>
        <div className="flex items-center">
          {currentUser ? (
            <button
              onClick={submitLogout}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              LogOut
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
