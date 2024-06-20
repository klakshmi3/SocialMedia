import { useContext } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["stories"],
    queryFn: () => makeRequest.get("/stories").then((res) => res.data),
  });

  const queryClient = useQueryClient();

  const upload = async (file) => {
    console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const mutation = useMutation({
    mutationFn: (newStory) => makeRequest.post("/stories", newStory),
    onSuccess: () => {
      // Invalidate and refetch stories
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  const handleAddStory = async (file) => {
    const imgUrl = await upload(file);
    mutation.mutate({ img: imgUrl, name: currentUser.name });
  };

  return (
    <div className="stories">
      <div className="story">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <span>{currentUser.name}</span>
        <input
          type="file"
          onChange={(e) => handleAddStory(e.target.files[0])}
          style={{ display: "none" }}
          id="fileUpload"
        />
        <label htmlFor="fileUpload" className="addStoryButton">
          +
        </label>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "Loading..."
        : data.map((story) => (
            <div className="story" key={story.id}>
              <img src={story.img} alt="" />
              <span>{story.name}</span>
            </div>
          ))}
    </div>
  );
};

export default Stories;
