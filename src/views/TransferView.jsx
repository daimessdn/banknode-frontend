import React, { useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import "../styles/home.css";

import {
  HiArrowsRightLeft,
  HiHome,
  HiUser,
  HiCreditCard,
} from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";

function TransferView() {
  const [transactions, setTransactions] = useState([]);
  const [recentTransfers, setRecentTransfers] = useState([]);
  const [walletNumber, setWalletNumber] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  const [transferFormInput, setTransferFormInput] = useState({
    transaction_from: walletNumber.name,
    transaction_to: "",
    transaction_amount: 0,
    transaction_description: "",
  });
  const [isTransferLoading, setIsTransferLoading] = useState(false);

  const navigate = useNavigate();

  const loadTransaction = async () => {
    const decodedToken = jwtDecode(localStorage.getItem("token"));

    setUserInfo(decodedToken.data);

    const id = decodedToken.data.id;
    const wallet_account = decodedToken.data.wallet_account;

    await fetch("http://localhost:3000/api/users/wallet/" + id)
      .then((res) => res.json())
      .then((res) => {
        setWalletNumber(res.data);
        setTransferFormInput({
          ...transferFormInput,
          transaction_from: res.data.name,
        });
      });

    await fetch(
      "http://localhost:3000/api/transaction/transfer/recents/" + wallet_account
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setRecentTransfers(res.data);
      });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    setIsTransferLoading(true);

    await fetch("http://localhost:3000/api/transaction/transfer", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...transferFormInput,
        transaction_amount: parseFloat(transferFormInput.transaction_amount),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setIsTransferLoading(false);
        navigate("/home", { replace: true });
      });
  };

  useEffect(() => {
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
          <h4 className="welcome-title">Transfer</h4>

          <form onSubmit={handleTransfer}>
            <div className="form-group">
              <label htmlFor="transfer_to">Transfer to</label>
              <input
                type="number"
                required="required"
                name="transfer_to"
                id="transfer_to"
                placeholder="Input wallet account"
                value={transferFormInput.transaction_to}
                onChange={(e) =>
                  setTransferFormInput({
                    ...transferFormInput,
                    transaction_to: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="transfer_amount">Amount</label>
              <input
                type="number"
                required="required"
                name="transfer_amount"
                id="transfer_amount"
                value={transferFormInput.transaction_amount}
                onChange={(e) =>
                  setTransferFormInput({
                    ...transferFormInput,
                    transaction_amount: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="transfer_description">Description</label>
              <textarea
                type="number"
                name="transfer_description"
                id="transfer_description"
                placeholder="Input transfer description"
                value={transferFormInput.transaction_description}
                onChange={(e) =>
                  setTransferFormInput({
                    ...transferFormInput,
                    transaction_description: e.target.value,
                  })
                }
              >
                {transferFormInput.transaction_description}
              </textarea>
            </div>

            <div className="btn-group">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isTransferLoading}
              >
                {isTransferLoading
                  ? "Processing transfer..."
                  : "Start transfer"}
              </button>
            </div>
          </form>

          <section>
            <h2 className="section-title">Recent Transfers</h2>
            <ul className="transaction-recents-container">
              {recentTransfers &&
                recentTransfers.map((transfer) => {
                  const { id, name } = transfer;

                  return (
                    <>
                      <li
                        className="transaction-recents-item"
                        key={"tx-" + id + "-" + name}
                      >
                        <span className="flex flex-row items-center transfer-name">
                          {transfer.user_details.name}
                        </span>

                        <span className="transfer-account">
                          {transfer && walletNumberFormat(name)}
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

export default TransferView;
