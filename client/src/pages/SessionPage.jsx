import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, logInUser, registerUser } from "../api/users.api";

export function SessionPage({ currentUser, setCurrentUser }) {


  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {

    async function loadUser() {
      const res = await getUser();
      setEmail(res.data['email']);
      setPassword(res.data['password']);
      if (res.data['email'])
        setCurrentUser(true);
      else
        setCurrentUser(false);
    }
    loadUser();

    if (currentUser)
      navigate("/cams", { state: { email } });

  }, [currentUser]);


  function submitRegistration(e) {
    e.preventDefault();
    async function trayRegisterUser(data) {
      const res = await registerUser(data);
    }
    trayRegisterUser(
      {
        email: email,
        password: password
      }
    ).then(() => submitLogin(e));

  }

  function submitLogin(e) {
    e.preventDefault();
    async function tryLogInUser(data) {
      const res = await logInUser(data);
    }
    tryLogInUser(
      {
        email: email,
        password: password
      }
    ).then(function (res) {
      setCurrentUser(true);
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h4 className="text-2xl font-bold mb-4">{!registrationToggle ? 'Login' : 'Registration'}</h4>
        <form onSubmit={e => { registrationToggle ? submitRegistration(e) : submitLogin(e) }}>
          <div className="mb-4">
            <label htmlFor="formBasicEmail" className="block text-gray-700">Email address</label>
            <input
              type="email"
              id="formBasicEmail"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
            />
            <small className="text-gray-500">We'll never share your email with anyone else.</small>
          </div>
          <div className="mb-4">
            <label htmlFor="formBasicPassword" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="formBasicPassword"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setRegistrationToggle(!registrationToggle)}
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {!registrationToggle ? 'Registration' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}