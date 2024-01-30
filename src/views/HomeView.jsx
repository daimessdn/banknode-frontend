import React, { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import "../styles/home.css";

import {
  HiArrowsRightLeft,
  HiHome,
  HiUser,
  HiCreditCard,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

function HomeView() {
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
          <h4 className="welcome-title">Hello, {userInfo.name}</h4>

          <div className="card-container">
            <div className="section-title">Balance</div>

            <div className="flex flex-row items-center mb-4">
              <span className="card-amount">
                Rp{walletNumber.amount && walletNumber.amount.toLocaleString()}
              </span>
            </div>

            <div className="flex flex-row items-center">
              <HiCreditCard size={32} className="block me-4" />{" "}
              <span>{walletNumber.name}</span>
            </div>
          </div>

          <section>
            <h2 className="section-title">Transaction History</h2>
            <ul className="transaction-history-container">
              {transactions &&
                transactions.map((transaction) => {
                  const isMoneyIn =
                    transaction.transaction_from_details.name ==
                    walletNumber.name;

                  const { id, transaction_from, transaction_to } = transaction;

                  const formatDate = new Date(
                    transaction.createdAt
                  ).toLocaleString("id-id", { day: "numeric", month: "short" });

                  return (
                    <>
                      <li
                        className="transaction-history-item"
                        key={
                          "tx-" +
                          id +
                          "-" +
                          transaction_from +
                          "-" +
                          transaction_to
                        }
                      >
                        <Link
                          className="flex flex-col"
                          to={`/transaction/details/${transaction.id}`}
                        >
                          <span className="flex flex-row items-center">
                            <HiArrowsRightLeft
                              strokeWidth={1}
                              size={18}
                              className="me-4"
                            />
                            {isMoneyIn
                              ? `${transaction.transaction_to_details.user_details.name}`
                              : `${transaction.transaction_from_details.user_details.name}`}{" "}
                            {`(${formatDate})`}
                          </span>

                          <span
                            className={isMoneyIn ? "balance-out" : "balance-in"}
                          >
                            {transaction &&
                              "Rp" +
                                transaction.transaction_amount.toLocaleString()}
                          </span>
                        </Link>
                      </li>
                    </>
                  );
                })}
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

export default HomeView;
