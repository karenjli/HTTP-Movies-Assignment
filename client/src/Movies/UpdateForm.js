import React, { useState, useEffect } from "react";
import axios from "axios";
// const initialItem = {
//   title: "",
//   director: "",
//   metascore: null,
//   stars: []
// };

const UpdateForm = props => {
  const [movie, setMovie] = useState({});
  const id = props.match.params.id;
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  }, []);

  const onChange = event => {
    event.preventDefault();
    let value = event.target.value;
    // if (event.target.name === "metascore") {
    //   value = parseInt(value, 10);
    // }

    setMovie({
      ...movie,
      [event.target.name]: value
    });
  };

  const onSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        props.history.push(`/movies/${id}`);
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="update-form">
      <h2>Update Movie Info</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={onChange}
        />
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={onChange}
        />
        <input
          type="text"
          name="metascore"
          value={movie.metascore}
          onChange={onChange}
        />
        <input
          type="text"
          name="stars"
          value={movie.stars}
          onChange={onChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default UpdateForm;
