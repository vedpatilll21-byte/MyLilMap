import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import Navbar from "../components/Navbar";

export default function EditProfile() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  // ================= LOAD PROFILE =================

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
      alert("Could not load your profile.");
      setLoading(false);
      return;
    }


    setName(data.username || "");
    setEmail(data.email || "");

    setLoading(false);
  };


  // ================= SAVE PROFILE =================

  const handleSave = async (e) => {

    e.preventDefault();

    setSaving(true);


    const {
      data: { user }
    } = await supabase.auth.getUser();


    if (!user) {
      navigate("/login");
      return;
    }


    // Update username and email in profiles table
    const { error } = await supabase
      .from("profiles")
      .update({
        username: name,
        email: email
      })
      .eq("id", user.id);


    if (error) {

      console.log(error.message);

      alert("Failed to update profile.");

      setSaving(false);

      return;
    }


    // Change password only if user entered one
    if (password.trim() !== "") {

      const { error: passwordError } =
        await supabase.auth.updateUser({
          password: password
        });


      if (passwordError) {

        alert(passwordError.message);

        setSaving(false);

        return;
      }
    }


    setSaving(false);

    alert("Profile updated successfully!");

    navigate("/profile");
  };


  // ================= LOADING =================

  if (loading) {

    return (
      <div className="loading-page">

        <style>{`

          .loading-page {
            min-height: 100vh;

            display: flex;
            align-items: center;
            justify-content: center;

            background:
              linear-gradient(
                135deg,
                #b79cbb,
                #ded8df
              );

            color: #4d3d52;

            font-family: Arial, sans-serif;

            font-size: 16px;
          }

        `}</style>

        Loading profile...

      </div>
    );
  }


  return (
    <div className="edit-page">

      {/* YOUR EXISTING NAVBAR */}

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

          background: #ded8df;

          font-family: Arial, sans-serif;
        }


        /* ================= PAGE ================= */

        .edit-page {

          min-height: 100vh;

          padding-top: 125px;

          padding-bottom: 80px;

          background:
            linear-gradient(
              135deg,
              #b79cbb 0%,
              #c9b9cc 45%,
              #ded8df 100%
            );

          color: #403648;

        }


        /* ================= MAIN ================= */

        .edit-main {

          width: 100%;

          display: flex;

          justify-content: center;

          align-items: flex-start;

          padding:
            30px 20px 70px;

        }


        /* ================= CARD ================= */

        .edit-card {

          width: 570px;

          max-width: 100%;

          padding:
            32px 45px 42px;

          background:
            rgba(250, 247, 250, 0.92);

          border:
            1px solid
            rgba(255,255,255,0.85);

          border-radius: 24px;

          box-shadow:
            0 25px 60px
            rgba(55,39,61,0.17);

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);

        }


        /* ================= BACK ================= */

        .back-button {

          border: none;

          background: transparent;

          padding: 0;

          color: #66586b;

          font-size: 14px;

          font-weight: 600;

          cursor: pointer;

          transition:
            color .2s ease,
            transform .2s ease;

        }


        .back-button:hover {

          color: #3f3145;

          transform:
            translateX(-4px);

        }


        /* ================= HEADER ================= */

        .edit-header {

          margin-top: 28px;

          padding-bottom: 22px;

          margin-bottom: 30px;

          border-bottom:
            1px solid #dfd7e1;

        }


        .edit-header h1 {

          margin: 0;

          color: #3e3344;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 32px;

          font-weight: bold;

        }


        .edit-header p {

          margin:
            8px 0 0;

          color: #7c717f;

          font-size: 14px;

        }


        /* ================= FORM ================= */

        .form-group {

          margin-bottom: 23px;

        }


        .form-group label {

          display: block;

          margin-bottom: 9px;

          color: #57445f;

          font-size: 14px;

          font-weight: 600;

        }


        .form-group input {

          width: 100%;

          height: 52px;

          padding:
            0 16px;

          border:
            1px solid #d7cbd9;

          border-radius: 10px;

          outline: none;

          background:
            rgba(255,255,255,0.82);

          color: #403648;

          font-size: 15px;

          transition:
            border .2s ease,
            box-shadow .2s ease,
            background .2s ease;

        }


        .form-group input:hover {

          border-color:
            #bba9be;

        }


        .form-group input:focus {

          background: white;

          border-color:
            #806589;

          box-shadow:
            0 0 0 3px
            rgba(128,101,137,.10);

        }


        .password-info {

          margin:
            7px 0 0;

          color:
            #918692;

          font-size:
            12px;

        }


        /* ================= BUTTONS ================= */

        .button-row {

          display: flex;

          gap: 12px;

          margin-top: 34px;

        }


        .cancel-button,
        .save-button {

          height: 50px;

          border-radius: 10px;

          font-size: 14px;

          font-weight: 600;

          cursor: pointer;

          transition:
            .2s ease;

        }


        .cancel-button {

          flex: .8;

          border:
            1px solid #d2c6d4;

          background: white;

          color: #5e5063;

        }


        .cancel-button:hover {

          background:
            #f4eff5;

          transform:
            translateY(-1px);

        }


        .save-button {

          flex: 1.2;

          border:
            1px solid #70527a;

          background:
            #70527a;

          color: white;

          box-shadow:
            0 7px 15px
            rgba(76,53,83,.18);

        }


        .save-button:hover {

          background:
            #604568;

          transform:
            translateY(-1px);

          box-shadow:
            0 10px 20px
            rgba(76,53,83,.23);

        }


        .save-button:disabled {

          opacity: .6;

          cursor:
            not-allowed;

          transform:
            none;

        }


        /* ================= SCROLLBAR ================= */

        ::-webkit-scrollbar {

          width: 9px;

        }


        ::-webkit-scrollbar-track {

          background:
            #c9b8cc;

        }


        ::-webkit-scrollbar-thumb {

          background:
            #8b7191;

          border-radius:
            10px;

        }


        ::-webkit-scrollbar-thumb:hover {

          background:
            #705477;

        }


        /* ================= TABLET ================= */

        @media (max-width: 700px) {

          .edit-page {

            padding-top: 110px;

          }


          .edit-main {

            padding:
              20px 15px 60px;

          }


          .edit-card {

            padding:
              27px 24px 34px;

            border-radius:
              20px;

          }


          .edit-header h1 {

            font-size:
              28px;

          }

        }


        /* ================= MOBILE ================= */

        @media (max-width: 450px) {

          .button-row {

            flex-direction:
              column;

          }


          .cancel-button,
          .save-button {

            width:
              100%;

          }

        }

      `}</style>


      {/* ================= EDIT CONTENT ================= */}

      <main className="edit-main">

        <div className="edit-card">


          {/* BACK BUTTON */}

          <button
            className="back-button"
            onClick={() => navigate("/profile")}
          >
            ← Back to Profile
          </button>


          {/* HEADER */}

          <div className="edit-header">

            <h1>
              Edit Profile
            </h1>

            <p>
              Update your account information
            </p>

          </div>


          {/* FORM */}

          <form onSubmit={handleSave}>


            {/* NAME */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your name"
                required
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label>
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter a new password"
              />

              <p className="password-info">
                Leave this blank if you don't want to change your password.
              </p>

            </div>


            {/* BUTTONS */}

            <div className="button-row">


              <button
                type="button"
                className="cancel-button"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </button>


              <button
                type="submit"
                className="save-button"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"
                }
              </button>


            </div>

          </form>

        </div>

      </main>

    </div>
  );
}