import React from "react";
import Navbar from "../components/Navbar";

export default function Home() {

  return (
    <>

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@300;400;500&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, sans-serif;
        }


        /* ================= HOME ================= */

        .home {

          min-height: 100vh;

          position: relative;

          background:

            linear-gradient(
              rgba(20,45,70,.45),
              rgba(15,30,55,.7)
            ),

            url("https://images.unsplash.com/photo-1469474968028-56623f02e42e");

          background-size: cover;

          background-position: center;

          background-attachment: fixed;

          padding: 40px 70px;

          color: white;

        }


        /* ================= HERO ================= */

        .hero {

          min-height: 100vh;

          display: flex;

          align-items: center;

        }


        .content {

          max-width: 650px;

        }


        .hero h1 {

          font-family:
            "Cormorant Garamond";

          font-size: 85px;

          line-height: 1;

          margin: 0;

        }


        .hero span {

          color: #dce8ff;

        }


        .hero p {

          font-size: 21px;

          line-height: 1.8;

          color:
            rgba(255,255,255,.85);

        }


        .diary-note {

          margin-top: 40px;

          font-family:
            "Cormorant Garamond";

          font-size: 32px;

          color: #f5f1e8;

        }


        /* ================= FOOTER ================= */

        .footer {

          margin-top: 120px;

          text-align: center;

          padding-bottom: 40px;

        }


        .footer h4 {

          font-family:
            "Cormorant Garamond";

          font-size: 45px;

          margin: 0;

        }


        .footer p {

          color:
            rgba(255,255,255,.75);

        }


        /* ================= MOBILE ================= */

        @media(max-width:900px) {

          .home {

            padding:
              30px 25px;

          }


          .hero {

            min-height:
              100vh;

          }


          .hero h1 {

            font-size:
              60px;

          }


          .hero p {

            font-size:
              18px;

          }


          .diary-note {

            font-size:
              26px;

          }

        }


        @media(max-width:500px) {

          .hero h1 {

            font-size:
              48px;

          }


          .hero p {

            font-size:
              16px;

          }


          .diary-note {

            font-size:
              23px;

          }

        }

      `}</style>


      <div className="home">

        <Navbar />


        {/* ================= HERO ================= */}

        <section className="hero">

          <div className="content">

            <h1>

              Your world,

              <br />

              your memories,

              <br />

              <span>
                your journey.
              </span>

            </h1>


            <p>

              A personal digital diary where
              your favourite places, moments,
              and dreams live forever.

            </p>


            <div className="diary-note">

              ✦ A collection of places, feelings & memories

            </div>

          </div>

        </section>


        {/* ================= FOOTER ================= */}

        <footer className="footer">

          <h4>
            MyLilMap
          </h4>


          <p>
            Created for keeping places, memories and dreams close.
          </p>


          <p>
            Vedika Patil © MyLilMap 2026
          </p>

        </footer>


      </div>

    </>
  );
}