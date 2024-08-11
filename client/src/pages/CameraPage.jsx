import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { sharedCameras } from "../api/angelcam.api";
import { Cameras } from "../components/Camera";
import { getUser as angelCamUser } from "../api/angelcam.api";

export function CameraPage({ currentUser, setCurrentUser }) {


  const [sharedCamerasInfo, setSharedCamerasInfo] = useState();
  const [selectedCamera, setSelectedCamera] = useState();
  const [haveCameras, setHaveCameras] = useState(false);
  const location = useLocation();
  const email = location.state?.email || '';
  useEffect(() => {

    async function getAngelCameraUser() {
      try {
        const res = await angelCamUser();
        if (email == res?.data.email)
          setHaveCameras(true);
      }
      catch (error) {
        console.error("Error getting Angel Cam User:", error);
        toast.error("Error getting Angel Cam User");
      }
    }

    async function getAngelCameras() {
      try {
        const res = await sharedCameras();
        setSharedCamerasInfo(res?.data.results);
      }
      catch (error) {
        console.error("Error fetching cameras:", error);
        toast.error("Error fetching cameras");
      }
    }
    getAngelCameraUser();
    getAngelCameras();
  }, []);

  const handleCameraChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCamera(selectedId);
  };

  if (haveCameras)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
          <label htmlFor="cameras" className="block text-gray-700 mb-2">Cameras</label>
          <select
            name="cameras"
            id="cameras"
            onChange={handleCameraChange}
            className="w-full px-3 py-2 border border-gray-300 rounded mb-4"
          >
            <option value="">Select a camera</option>
            {sharedCamerasInfo?.map((camera) => (
              <option value={camera.id} key={camera.id}>
                Camera {camera.id}
              </option>
            ))}
          </select>

          {sharedCamerasInfo?.map((camera) => {
            if (camera.id == selectedCamera)
              return <Cameras camera={camera} key={camera.id} />;
          })}
        </div>
      </div>
    )
  else
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">No Cameras Available</h2>
          <p className="text-gray-700">The current user has no cameras available.</p>
        </div>
      </div>
    );

}
