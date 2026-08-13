import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import Navbar from "../components/Navbar";

export default function Profile() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setProfile(data);
  };


  const signOut = async () => {

    setMessage("Signing out...");

    await supabase.auth.signOut();

    setTimeout(() => {
      navigate("/");
    }, 800);
  };


  const editProfile = () => {
    navigate("/edit-profile");
  };


  const getInitials = () => {

    if (!profile?.username) {
      return "U";
    }

    return profile.username
      .split(" ")
      .map(word => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };


  return (
    <>

      <Navbar />

      <style>{`

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #c8b5cb;
          font-family: Arial, sans-serif;
        }

        /* ================= PAGE ================= */

        .profile-page {

          min-height: 100vh;

          padding:
            135px
            25px
            80px;

          background:
            linear-gradient(
              135deg,
              #b79cbb 0%,
              #c9b9cc 45%,
              #ded8df 100%
            );

          color: #403648;

        }


        /* ================= CONTAINER ================= */

        .profile-wrapper {

          width: 760px;
          max-width: 100%;

          margin: auto;

        }


        /* ================= TOP SECTION ================= */

        .profile-header {

          display: flex;

          align-items: center;

          gap: 28px;

          padding: 32px;

          background:
            rgba(250,248,251,0.88);

          border:
            1px solid
            rgba(255,255,255,0.8);

          border-radius: 22px;

          box-shadow:
            0 20px 50px
            rgba(55,39,61,0.15);

          backdrop-filter: blur(15px);

        }


        /* ================= AVATAR ================= */

        .avatar {

          width: 105px;
          height: 105px;

          flex-shrink: 0;

          border-radius: 50%;

          display: flex;

          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              135deg,
              #806589,
              #a88caf
            );

          color: white;

          font-size: 32px;

          font-weight: 600;

          letter-spacing: 1px;

          border:
            4px solid
            rgba(255,255,255,0.7);

          box-shadow:
            0 8px 20px
            rgba(70,48,77,0.18);

        }


        /* ================= HEADER TEXT ================= */

        .profile-heading {

          flex: 1;

        }


        .profile-heading .small-title {

          margin: 0 0 6px;

          color: #8a7b8d;

          font-size: 12px;

          font-weight: 600;

          text-transform: uppercase;

          letter-spacing: 1.5px;

        }


        .profile-heading h1 {

          margin: 0;

          color: #3e3344;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 34px;

          font-weight: bold;

        }


        .profile-heading p {

          margin: 8px 0 0;

          color: #776b7b;

          font-size: 14px;

        }


        /* ================= EDIT BUTTON ================= */

        .header-edit {

          border: 1px solid #765a7d;

          background: #765a7d;

          color: white;

          padding: 12px 22px;

          border-radius: 9px;

          font-size: 14px;

          font-weight: 600;

          cursor: pointer;

          transition: 0.2s;

        }


        .header-edit:hover {

          background: #624969;

          transform: translateY(-1px);

        }


        /* ================= INFORMATION CARD ================= */

        .information-card {

          margin-top: 20px;

          padding: 32px;

          background:
            rgba(250,248,251,0.88);

          border:
            1px solid
            rgba(255,255,255,0.8);

          border-radius: 22px;

          box-shadow:
            0 20px 50px
            rgba(55,39,61,0.12);

          backdrop-filter: blur(15px);

        }


        .section-title {

          margin: 0;

          color: #403548;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 23px;

        }


        .section-subtitle {

          margin: 6px 0 25px;

          color: #8a808c;

          font-size: 13px;

        }


        /* ================= INFO ROWS ================= */

        .info-row {

          display: flex;

          align-items: center;

          justify-content: space-between;

          padding: 20px 0;

          border-bottom:
            1px solid #e4dfe5;

        }


        .info-row:last-child {

          border-bottom: none;

        }


        .info-label {

          color: #786a7c;

          font-size: 13px;

          font-weight: 600;

          min-width: 150px;

        }


        .info-value {

          flex: 1;

          color: #44394b;

          font-size: 15px;

          text-align: right;

        }


        .password {

          letter-spacing: 3px;

        }


        /* ================= ACCOUNT SECTION ================= */

        .account-card {

          margin-top: 20px;

          padding: 25px 32px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 20px;

          background:
            rgba(250,248,251,0.88);

          border:
            1px solid
            rgba(255,255,255,0.8);

          border-radius: 22px;

          box-shadow:
            0 15px 35px
            rgba(55,39,61,0.10);

        }


        .account-text h3 {

          margin: 0 0 5px;

          color: #45394b;

          font-size: 15px;

        }


        .account-text p {

          margin: 0;

          color: #8a808c;

          font-size: 13px;

        }


        /* ================= SIGN OUT ================= */

        .signout-btn {

          padding: 11px 20px;

          border-radius: 9px;

          border:
            1px solid #d8c9ce;

          background: #ffffff;

          color: #805766;

          font-size: 13px;

          font-weight: 600;

          cursor: pointer;

          transition: 0.2s;

        }


        .signout-btn:hover {

          background: #f7f0f2;

          border-color: #c5a9b1;

        }


        /* ================= MESSAGE ================= */

        .message {

          margin-top: 18px;

          text-align: center;

          color: #66576b;

          font-size: 13px;

        }


        /* ================= SCROLLBAR ================= */

        ::-webkit-scrollbar {

          width: 9px;

        }


        ::-webkit-scrollbar-track {

          background: #c9b8cc;

        }


        ::-webkit-scrollbar-thumb {

          background: #8b7191;

          border-radius: 10px;

        }


        ::-webkit-scrollbar-thumb:hover {

          background: #705477;

        }


        /* ================= TABLET ================= */

        @media (max-width: 700px) {

          .profile-page {

            padding:
              120px
              15px
              60px;

          }


          .profile-header {

            flex-wrap: wrap;

            padding: 25px;

          }


          .header-edit {

            width: 100%;

          }


          .information-card {

            padding: 25px;

          }


          .account-card {

            padding: 22px 25px;

          }

        }


        /* ================= MOBILE ================= */

        @media (max-width: 500px) {

          .profile-page {

            padding-top: 110px;

          }


          .profile-header {

            flex-direction: column;

            text-align: center;

          }


          .profile-heading h1 {

            font-size: 28px;

          }


          .avatar {

            width: 90px;
            height: 90px;

            font-size: 28px;

          }


          .info-row {

            display: block;

          }


          .info-label {

            display: block;

            margin-bottom: 7px;

          }


          .info-value {

            display: block;

            text-align: left;

            word-break: break-word;

          }


          .account-card {

            flex-direction: column;

            align-items: flex-start;

          }


          .signout-btn {

            width: 100%;

          }

        }

      `}</style>


      {/* ================= PROFILE PAGE ================= */}

      <div className="profile-page">

        <div className="profile-wrapper">


          {/* ================= HEADER ================= */}

          <section className="profile-header">

            <div className="avatar">

              {getInitials()}

            </div>


            <div className="profile-heading">

              <p className="small-title">
                My Account
              </p>

              <h1>
                {profile?.username || "User"}
              </h1>

              <p>
                Manage your MyLilMap profile
              </p>

            </div>


            <button
              className="header-edit"
              onClick={editProfile}
            >
              Edit Profile
            </button>

          </section>



          {/* ================= INFORMATION ================= */}

          <section className="information-card">

            <h2 className="section-title">
              Personal Information
            </h2>

            <p className="section-subtitle">
              Your account details
            </p>


            <div className="info-row">

              <span className="info-label">
                Full Name
              </span>

              <span className="info-value">
                {profile?.username || "Not provided"}
              </span>

            </div>


            <div className="info-row">

              <span className="info-label">
                Email Address
              </span>

              <span className="info-value">
                {profile?.email || "Not provided"}
              </span>

            </div>


            <div className="info-row">

              <span className="info-label">
                Password
              </span>

              <span className="info-value password">
                ••••••••••
              </span>

            </div>

          </section>



          {/* ================= ACCOUNT ================= */}

          <section className="account-card">

            <div className="account-text">

              <h3>
                Account
              </h3>

              <p>
                Sign out of your MyLilMap account
              </p>

            </div>


            <button
              className="signout-btn"
              onClick={signOut}
            >
              Sign Out
            </button>

          </section>


          {/* ================= MESSAGE ================= */}

          {message && (

            <p className="message">
              {message}
            </p>

          )}

        </div>

      </div>

    </>
  );
}