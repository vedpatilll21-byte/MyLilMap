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


  // LOAD PROFILE
  useEffect(() => {
    loadProfile();
  }, []);


  const loadProfile = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();


    if (!user) {
      navigate("/login");
      return;
    }


    const { data, error } = await supabase
      .from("profiles")
      .select("username, email")
      .eq("id", user.id)
      .single();


    if (error) {

      console.log(error);

      alert("Could not load profile.");

      setLoading(false);

      return;
    }


    setName(data?.username || "");
    setEmail(data?.email || "");

    setLoading(false);
  };


  // SAVE CHANGES
  const handleSave = async (e) => {

    e.preventDefault();

    setSaving(true);


    const {
      data: { user },
    } = await supabase.auth.getUser();


    if (!user) {

      navigate("/login");

      return;
    }


    // UPDATE PROFILE TABLE
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        username: name.trim(),
        email: email.trim(),
      })
      .eq("id", user.id);


    if (profileError) {

      console.log(profileError);

      alert(profileError.message);

      setSaving(false);

      return;
    }


    // UPDATE AUTH EMAIL IF EMAIL CHANGED
    if (email.trim() !== user.email) {

      const { error: emailError } =
        await supabase.auth.updateUser({
          email: email.trim(),
        });


      if (emailError) {

        console.log(emailError);

        alert(emailError.message);

        setSaving(false);

        return;
      }
    }


    // UPDATE PASSWORD ONLY IF ENTERED
    if (password.trim() !== "") {

      const { error: passwordError } =
        await supabase.auth.updateUser({
          password: password.trim(),
        });


      if (passwordError) {

        console.log(passwordError);

        alert(passwordError.message);

        setSaving(false);

        return;
      }
    }


    setSaving(false);

    alert("Profile updated successfully!");

    navigate("/profile");
  };


  // LOADING
  if (loading) {

    return (
      <div className="loading">

        <style>{`

          .loading {

            min-height: 100vh;

            display: flex;

            justify-content: center;

            align-items: center;

            background: #e7e1e8;

            color: #4d3d52;

            font-family: Arial, sans-serif;

          }

        `}</style>

        Loading profile...

      </div>
    );
  }


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
          font-family: Arial, sans-serif;
        }


        .edit-page {

          min-height: 100vh;

          padding-top: 125px;

          padding-bottom: 80px;

          background:

            linear-gradient(
              135deg,
              #b9a5bc,
              #d8d1da,
              #ece9ed
            );

        }


        .edit-wrapper {

          width: 100%;

          display: flex;

          justify-content: center;

          padding: 30px 20px;

        }


        .edit-card {

          width: 560px;

          max-width: 100%;

          background: rgba(255,255,255,.92);

          border: 1px solid rgba(255,255,255,.9);

          border-radius: 22px;

          padding: 35px 42px 40px;

          box-shadow:
            0 20px 50px
            rgba(50,40,55,.16);

        }


        .back {

          border: none;

          background: transparent;

          color: #66576b;

          font-size: 14px;

          font-weight: 600;

          cursor: pointer;

          padding: 0;

        }


        .back:hover {

          color: #4b3850;

        }


        .heading {

          margin-top: 28px;

          margin-bottom: 30px;

          padding-bottom: 22px;

          border-bottom: 1px solid #e2dce4;

        }


        .heading h1 {

          margin: 0;

          font-family:
            Georgia,
            serif;

          font-size: 34px;

          color: #3f3344;

        }


        .heading p {

          margin:
            8px 0 0;

          color: #827785;

          font-size: 14px;

        }


        .field {

          margin-bottom: 22px;

        }


        .field label {

          display: block;

          margin-bottom: 8px;

          color: #55465a;

          font-size: 14px;

          font-weight: 600;

        }


        .field input {

          width: 100%;

          height: 50px;

          padding: 0 15px;

          border: 1px solid #d5cbd8;

          border-radius: 9px;

          background: #faf9fa;

          color: #3f3443;

          font-size: 15px;

          outline: none;

          transition: .2s;

        }


        .field input:focus {

          background: white;

          border-color: #806487;

          box-shadow:
            0 0 0 3px
            rgba(128,100,135,.10);

        }


        .hint {

          margin-top: 7px;

          color: #948a96;

          font-size: 12px;

        }


        .actions {

          display: flex;

          gap: 12px;

          margin-top: 32px;

        }


        .cancel,
        .save {

          height: 48px;

          border-radius: 9px;

          font-size: 14px;

          font-weight: 600;

          cursor: pointer;

          transition: .2s;

        }


        .cancel {

          flex: 1;

          background: white;

          border: 1px solid #d2c7d5;

          color: #5e5162;

        }


        .cancel:hover {

          background: #f5f1f6;

        }


        .save {

          flex: 1.5;

          background: #705578;

          border: 1px solid #705578;

          color: white;

          box-shadow:
            0 7px 18px
            rgba(80,60,85,.18);

        }


        .save:hover {

          background: #604568;

        }


        .save:disabled {

          opacity: .6;

          cursor: not-allowed;

        }


        @media(max-width:600px) {

          .edit-page {

            padding-top: 110px;

          }


          .edit-wrapper {

            padding:
              20px 15px 50px;

          }


          .edit-card {

            padding:
              28px 22px 32px;

          }


          .heading h1 {

            font-size: 29px;

          }

        }


        @media(max-width:430px) {

          .actions {

            flex-direction: column;

          }


          .cancel,
          .save {

            width: 100%;

          }

        }

      `}</style>


      <div className="edit-page">

        <div className="edit-wrapper">

          <div className="edit-card">


            <button
              className="back"
              onClick={() => navigate("/profile")}
            >
              ← Back to Profile
            </button>


            <div className="heading">

              <h1>
                Edit Profile
              </h1>

              <p>
                Update your personal information
              </p>

            </div>


            <form onSubmit={handleSave}>


              <div className="field">

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


              <div className="field">

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


              <div className="field">

                <label>
                  New Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Leave blank to keep current password"
                />

                <div className="hint">
                  Only enter a password if you want to change it.
                </div>

              </div>


              <div className="actions">

                <button
                  type="button"
                  className="cancel"
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="save"
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

        </div>

      </div>

    </>

  );
}
