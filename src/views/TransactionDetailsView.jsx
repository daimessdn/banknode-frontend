import React, { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import "../styles/home.css";

import {
  HiArrowsRightLeft,
  HiHome,
  HiUser,
  HiCreditCard,
  HiBackward,
  HiArrowLeftCircle,
} from "react-icons/hi2";
import { Link, useNavigate, useParams } from "react-router-dom";

function TransactionDetailsView() {
  const [transaction, setTransaction] = useState();
  const [walletNumber, setWalletNumber] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [isMoneyIn, setIsMoneyIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();

  console.log("ini id user", id);

  const loadTransaction = async () => {
    const decodedToken = jwtDecode(localStorage.getItem("token"));

    setUserInfo(decodedToken.data);

    const userId = decodedToken.data.id;

    await fetch("http://localhost:3000/api/users/wallet/" + userId)
      .then((res) => res.json())
      .then((res) => {
        setWalletNumber(res.data);
      });

    await fetch("http://localhost:3000/api/transaction/" + id)
      .then((res) => res.json())
      .then((res) => {
        setTransaction(res.data);
        console.log(res.data);
        setIsMoneyIn(
          res.data.transaction_from_details.name == walletNumber.name
        );
      });

    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    loadTransaction();
  }, []);

  const walletNumberFormat = (num) => {
    const result = num.match(/.{1,4}/g) ?? [];
    return result.join(" ");
  };

  return (
    <>
      <main>
        <div className="container">
          <section className="top-container">
            <button className="top-button" onClick={() => navigate(-1)}>
              <HiArrowLeftCircle size={36} />
            </button>
            <h4 className="top-title">Transaction Details</h4>
          </section>

          {isLoading ? (
            <div className="loading-container">
              <div className="loader"></div>
            </div>
          ) : (
            <section className="transaction-details-container">
              <div className="transaction-detail-item">
                <p className="transaction-detail-label">From</p>
                <p>
                  {transaction &&
                    (isMoneyIn
                      ? transaction.transaction_to_details.user_details.name
                      : transaction.transaction_from_details.user_details.name)}
                </p>
                <p>
                  {transaction &&
                    (isMoneyIn
                      ? walletNumberFormat(
                          transaction.transaction_to_details.name
                        )
                      : walletNumberFormat(
                          transaction.transaction_from_details.name
                        ))}
                </p>
              </div>

              <div className="transaction-detail-item">
                <p className="transaction-detail-label">To</p>
                <p>
                  {transaction &&
                    (isMoneyIn
                      ? transaction.transaction_from_details.user_details.name
                      : transaction.transaction_to_details.user_details.name)}
                </p>
                <p>
                  {transaction &&
                    (isMoneyIn
                      ? walletNumberFormat(
                          transaction.transaction_from_details.name
                        )
                      : walletNumberFormat(
                          transaction.transaction_to_details.name
                        ))}
                </p>
              </div>

              <div className="transaction-detail-item">
                <p className="transaction-detail-label">Amount</p>
                <p>
                  {transaction &&
                    "Rp" + transaction.transaction_amount.toLocaleString()}
                </p>
              </div>

              <div className="transaction-detail-item">
                <p className="transaction-detail-label">Transaction Date</p>
                <p>
                  {transaction &&
                    new Date(transaction.createdAt).toLocaleString("id-id")}
                </p>
              </div>

              <div className="transaction-detail-item">
                <p className="transaction-detail-label">Description</p>
                <p>{transaction && transaction.transaction_description}</p>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default TransactionDetailsView;
