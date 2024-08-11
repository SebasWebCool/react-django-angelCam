import { useState } from "react";

export function Cameras({ camera }) {
  const [selectedFormat, setSelectedFormat] = useState(null);

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
    console.log(camera)
  };

  const getStreamUrl = (format) => {
    const stream = camera.streams.find((stream) => stream.format === format);
    console.log(stream)
    return stream ? stream.url : '';
  };

  return (
    <div className="flex flex-col justify-between py-6 items-center bg-gray-100 ">
      <div className="mb-6 w-full max-w-md">
        {camera.streams.length > 1 ? (
          camera.streams.map((stream) => (
            <button
              onClick={() => handleFormatChange(stream.format)}
              key={stream.format}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
            >
              {stream.format}
            </button>
          ))
        ) : (
          camera.streams.length === 1 && (
            <button
              onClick={() => handleFormatChange(camera.streams[0].format)}
              key={camera.streams[0].format}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
            >
              {camera.streams[0].format}
            </button>
          )
        )}
      </div>
      {selectedFormat && (
        <div className="w-full max-w-md bg-white p-4 rounded shadow-md ">
          <p className="text-gray-700 mb-4">Selected Format: {selectedFormat}</p>
          <video controls className="w-full rounded">
            <source src={getStreamUrl(selectedFormat)} type={`video/${selectedFormat}`} />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );

}
