import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import "./HomeDetails.css";

const HomeDetails = () => {
  const { id } = useParams();
  let [wikidataId, setWikidataId] = useState("");
  let [result, setResult] = useState([]);
  let [genre, setGenre] = useState([]);
  let [matched_genName, setMatched_GenName] = useState([]);
  const [teaserUrl, setTeaserUrl] = useState("");
  const [videoClips, setVideoClips] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTI5NWJjOTkxZGRkMDI2ZDQ3MjI2ZjMwMTQxMmE1NyIsIm5iZiI6MTc0OTIwNTk3OC4xMTAwMDAxLCJzdWIiOiI2ODQyYzNkYTIwMDFhYzU5Nzc1MzlhMGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.10JpklH--KbVdqNk0eTzAtmYeeNE8x22AUte415GZK8",
      },
    };
    fetch(
      `https://api.themoviedb.org/3/movie/${Number(id)}/external_ids`,
      options
    )
      .then((res) => res.json())
      .then((res) => setWikidataId(res.wikidata_id))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const options2 = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTI5NWJjOTkxZGRkMDI2ZDQ3MjI2ZjMwMTQxMmE1NyIsIm5iZiI6MTc0OTIwNTk3OC4xMTAwMDAxLCJzdWIiOiI2ODQyYzNkYTIwMDFhYzU5Nzc1MzlhMGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.10JpklH--KbVdqNk0eTzAtmYeeNE8x22AUte415GZK8",
      },
    };
    if (!wikidataId) return;
    fetch(
      `https://api.themoviedb.org/3/find/${wikidataId}?external_source=wikidata_id`,
      options2
    )
      .then((res) => res.json())
      .then((res) => setResult(res.movie_results))
      .catch((err) => console.error(err));
  }, [wikidataId]);

  useEffect(() => {
    const options3 = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTI5NWJjOTkxZGRkMDI2ZDQ3MjI2ZjMwMTQxMmE1NyIsIm5iZiI6MTc0OTIwNTk3OC4xMTAwMDAxLCJzdWIiOiI2ODQyYzNkYTIwMDFhYzU5Nzc1MzlhMGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.10JpklH--KbVdqNk0eTzAtmYeeNE8x22AUte415GZK8",
      },
    };

    fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options3)
      .then((res) => res.json())
      .then((res) => setGenre(res.genres))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (result.length > 0 && genre.length > 0) {
      let matched = genre.filter((gen) => {
        return result[0].genre_ids.includes(gen.id);
      });
      setMatched_GenName(matched);
    }
  }, [result, genre]);
  // console.log(matched_genName);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTI5NWJjOTkxZGRkMDI2ZDQ3MjI2ZjMwMTQxMmE1NyIsIm5iZiI6MTc0OTIwNTk3OC4xMTAwMDAxLCJzdWIiOiI2ODQyYzNkYTIwMDFhYzU5Nzc1MzlhMGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.10JpklH--KbVdqNk0eTzAtmYeeNE8x22AUte415GZK8",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => {
        const teaser = res.results.find(
          (video) =>
            video.type === "Teaser" &&
            video.site === "YouTube" &&
            video.official === true
        );
        if (teaser) {
          setTeaserUrl(`https://www.youtube.com/watch?v=${teaser.key}`);
        }else{
          setTeaserUrl(null);
        }
        const clips = res.results.filter((videos) => {
          return (
            videos.type === "Clip" &&
            videos.site === "YouTube" &&
            videos.official === true
          );
        });
        setVideoClips(clips);
      })
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div>
      <div className="details-container">
        {result.length > 0 ? (
          <div className="details-movie-card">
            <div className="details-title-section">
              <h4>{result[0].original_title}</h4>
            </div>
            <div className="item-detail">
              <div className="genre-display">
                {matched_genName.map((gen) => {
                  return <p className="media-type">{gen.name}</p>;
                })}
              </div>

              <p>{result[0].overview}</p>
              <p>Realease date: {result[0].release_date}</p>
              <div className="detail-img-container">
                <img
                  src={`https://image.tmdb.org/t/p/w400${result[0].poster_path}`}
                  alt=""
                />
              </div>
              <div className="watch-button">
                {teaserUrl? (<a
                  href={teaserUrl}
                  target="_blank"
                  className="btn btn-warning mt-3"
                >
                  watch teaser
                </a>) : (<p className="no-teaser-message">No teaser available</p>)}
              </div>
              {videoClips.map((videos) => {
                return (
                  <div className="video-container">
                    <iframe
                      width="100%"
                      height="400"
                      src={`https://www.youtube.com/embed/${videos.key}`}
                      title="Clips"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default HomeDetails;
