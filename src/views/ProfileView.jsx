import React, { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import "../styles/home.css";

import {
  HiArrowsRightLeft,
  HiHome,
  HiUser,
  HiMiniArrowRightOnRectangle,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

function ProfileView() {
  const [transactions, setTransactions] = useState([]);
  const [walletNumber, setWalletNumber] = useState("");
  const [userInfo, setUserInfo] = useState([]);

  const loadTransaction = async () => {
    const decodedToken = jwtDecode(localStorage.getItem("token"));

    setUserInfo(decodedToken.data);

    const id = decodedToken.data.id;
    const wallet_account = decodedToken.data.wallet_account;

    await fetch("http://localhost:3000/api/users/wallet/" + id)
      .then((res) => res.json())
      .then((res) => {
        setWalletNumber(res.data);
      });

    await fetch(
      "http://localhost:3000/api/transaction/history/" + wallet_account
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTransactions(res.data);
      });
  };

  useEffect(() => {
    loadTransaction();
  }, []);

  return (
    <>
      <main>
        <div className="container">
          <h4 className="welcome-title">Profile</h4>

          <section className="profile-section">
            <ul className="transaction-history-container">
              <li className="transaction-history-item">
                <Link className="flex flex-col" to="/">
                  <span className="flex flex-row items-center">
                    <HiMiniArrowRightOnRectangle
                      strokeWidth={1}
                      size={18}
                      className="me-4"
                    />
                    Logout
                  </span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <div className="container">
        <nav className="nav-footer">
          <ul>
            <li>
              <Link to={"/home"} className="nav-footer-link">
                <HiHome size={32} />
                <span>Home</span>
              </Link>
            </li>

            <li>
              <Link to={"/transfer"} className="nav-footer-link">
                <HiArrowsRightLeft size={32} />
                <span>Transfer</span>
              </Link>
            </li>

            <li>
              <Link to={"/profile"} className="nav-footer-link">
                <HiUser size={32} />
                <span>Profile</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default ProfileView;
