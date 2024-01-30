import React, { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import "../styles/home.css";

import { BsCreditCard, BsHouse, BsPerson } from "react-icons/bs";
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
              <BsCreditCard size={32} className="block me-4" />{" "}
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
                        <span>
                          {isMoneyIn
                            ? `${transaction.transaction_to_details.user_details.name}`
                            : `${transaction.transaction_from_details.user_details.name}`}
                        </span>

                        <span
                          className={isMoneyIn ? "balance-in" : "balance-out"}
                        >
                          {transaction &&
                            transaction.transaction_amount.toLocaleString()}
                        </span>
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
                <BsHouse size={32} />
                <span>Home</span>
              </Link>
            </li>

            <li>
              <Link to={"/home"} className="nav-footer-link">
                <BsCreditCard size={32} />
                <span>Transfer</span>
              </Link>
            </li>

            <li>
              <Link to={"/home"} className="nav-footer-link">
                <BsPerson size={32} />
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
