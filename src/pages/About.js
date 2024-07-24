import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - कृषिCart"}>
      <div className="row aboutus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className=" about">About Us</h1>
          <p className="text-justify mt-2">
            🌱 Welcome to 🌾कृषिCart – Your Gateway to Agricultural Excellence!
            🚜 At 🌱कृषिCart, we embark on a mission to revolutionize the
            agricultural landscape by offering farmers a one-stop destination
            for all their seeding and small tool needs. Established in 2023, our
            platform is designed to elevate your farming experience, making
            every cultivation journey a seamless and rewarding adventure.
          </p>
          <p>🌾 Explore a Bounty of Quality Seeds</p>
          <p>🛒 Convenient Seed Shopping</p>
          <p>🛠️ Precision Tools for Agricultural Mastery</p>
          <p>🌍 Nationwide Delivery, Local Impact</p>
          <br></br>
          <h4>🌟 Why Choose 🌱कृषिCart?</h4>

          <h6>Quality Assurance:</h6>
          <p>
            Every seed and tool is sourced and vetted to meet the highest
            standards.
          </p>
          <h6> Convenience: </h6>
          <p>
            {" "}
            Enjoy the simplicity of online shopping, saving you time and effort.
            Expert Guidance: Access valuable information and recommendations to
            make informed choices.
          </p>
          <h6>Community Support:</h6>
          <p>Join a network of farmers dedicated to agricultural success.</p>
          <br></br>
          <h6>
            <p>
              Embark on a journey of agricultural excellence with 🌱कृषिCart –
              Where Cultivation Meets Convenience! 🚜🌾
            </p>
          </h6>
        </div>
      </div>
    </Layout>
  );
};

export default About;
