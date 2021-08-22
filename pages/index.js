import axios from "axios";
import Image from "next/image";

const Home = ({ feed }) => {
  return (
    <div>
      <div>
        <h1 style={{ color: "white", textAlign: "center" }}>
          Instagram API Example with Nextjs
        </h1>
        <h3 style={{ color: "white", textAlign: "center" }}>
          Just a simple app where an an instagram feed is fetched using the
          Instagram API
        </h3>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          rowGap: "20px",
          columnGap: "20px",
        }}
      >
        {feed.map((_feed, index) => (
          <div key={index}>
            {_feed.media_type === "IMAGE" ? (
                <Image
                  src={_feed.media_url}
                  alt={_feed.caption}
                  height={250}
                  width={250}
                  objectFit="contain"
                />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const _response = await axios.get(
    `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,timestamp&limit=20&access_token=${process.env.ACCESS_TOKEN}`
  );

  return {
    props: {
      feed: _response.data.data || [],
    },
  };
};
