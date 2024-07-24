import React from 'react';
import Layout from '../components/Layout/Layout';

const Policy = () => {
  return (
       <Layout>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/policy.png"
            alt="contactus"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4">
          <br></br>
          <h1 className=" NEW">Privacy Policy</h1>
          <br>
          </br>
          <br></br>
  
          <p>Last Updated: [22/11/2023]</p>

          <p>We collect your name, contact information, and payment details to provide and improve our car rental services. </p>

          
          <h5>Data Security</h5>
          <p>Your information is secured against unauthorized access, and we do not sell or rent your personal data to third parties.</p>

         
        </div>

      </div>
    </Layout>
  );
};

export default Policy;