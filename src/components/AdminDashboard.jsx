import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminDashboard() {
  const [chargeForSongs, setChargeForSongs] = useState(false);
  const [customSongAmount, setCustomSongAmount] = useState("");
  const [amounts, setAmounts] = useState([]);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setChargeForSongs(data?.charge_customers);
    setCustomSongAmount(data?.amount?.category_6);

    const sortedAmounts = [
      data?.amount?.category_7,
      data?.amount?.category_8,
      data?.amount?.category_9,
      data?.amount?.category_10,
    ];
    setAmounts(sortedAmounts);
  }, [data]);

  useEffect(() => {
    async function fetchAdminDetails() {
      const id = localStorage.getItem("userId");
      if (!id) navigate("/");
      const url = `https://stg.dhunjam.in/account/admin/${id}`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setData(data?.data);
      } catch (error) {
        console.error("Fetching admin details failed:", error);
      }
    }
    fetchAdminDetails();
  }, []);

  const handleAmountChange = (index, value) => {
    const updatedAmounts = [...amounts];
    updatedAmounts[index] = Number(value);
    setAmounts(updatedAmounts);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isEnabled =
      customSongAmount >= 99 &&
      amounts[0] >= 79 &&
      amounts[1] >= 59 &&
      amounts[2] >= 39 &&
      amounts[3] >= 19;

    if (!isEnabled) return;

    const url = "https://stg.dhunjam.in/account/admin/4";
    const body = {
      amount: {
        category_6: Number(customSongAmount),
        category_7: amounts[0],
        category_8: amounts[1],
        category_9: amounts[2],
        category_10: amounts[3],
      },
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success("Upadated successfully!");
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Updating admin prices failed:", error);
    }
  };
  const isEnabled =
    customSongAmount >= 99 &&
    amounts[0] >= 79 &&
    amounts[1] >= 59 &&
    amounts[2] >= 39 &&
    amounts[3] >= 19;

  return (
    <div className="min-h-screen h-fit flex flex-col items-center bg-[#030303] font-poppins text-[#FFFFFF]">
     
      <div className="text-center text-[#FFFFFF] font-bold text-[32px] mb-4">
        {data?.name}, {data?.location} on Dhun Jam
      </div>
      <form
        className="w-full max-w-xl px-4 text-[16px]"
        onSubmit={handleSubmit}
      >
        {/* Charge for Songs Toggle */}
        <div className="flex items-center justify-between mb-4">
          <label className="text-[16px]  w-[45%]">
            Do you want to charge your customers for requesting songs?
          </label>
          <div className=" w-[45%] flex justify-center">
            <label className="mr-2">
              <input
                type="radio"
                name="chargeForSongs"
                checked={chargeForSongs}
                onChange={() => setChargeForSongs(true)}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="chargeForSongs"
                checked={!chargeForSongs}
                onChange={() => setChargeForSongs(false)}
              />{" "}
              No
            </label>
          </div>
        </div>

        {/* Custom Song Amount Input */}
        <div
          className={`flex items-center mb-4 ${
            !chargeForSongs ? "opacity-50" : ""
          }`}
        >
          <label className={`block text-[16px]  w-[45%] mr-3`}>
            Custom song request amount:
          </label>
          <input
            disabled={!chargeForSongs}
            type="text"
            value={customSongAmount}
            onChange={(e) => setCustomSongAmount(e.target.value)}
            className="flex-1  w-[45%] py-2 px-3 border border-[#FFFFFF] rounded-lg text-[16px] bg-[#030303]"
            placeholder="Enter value"
          />
        </div>

        {/* Regular Song Amount Inputs */}
        <div className={`flex ${!chargeForSongs ? "opacity-50" : ""}`}>
          <label className="block text-[16px] mr-3 w-[45%]">
            Regular song request amount from High to low
          </label>
          {amounts.map((amount, index) => (
            <input
              disabled={!chargeForSongs}
              key={index}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={amount}
              onChange={(e) => handleAmountChange(index, e.target.value)}
              className="w-16 py-2 px-3 border border-white rounded-lg text-[16px] bg-[#030303] mx-1 text-center"
            />
          ))}
        </div>

        {/* Chart Display */}
        {chargeForSongs && (
          <div
            className={`bg-[#030303] w-[600px] mt-20 h-64 mb-4 flex items-center relative`}
          >
            <span className="absolute text-white text-xl -top-6 left-0 ">
              ₹
            </span>
            <Chart amounts={[customSongAmount, ...amounts]} />
          </div>
        )}

        {/* Save Button */}
        <button
          type="submit"
          className={`w-full mt-24 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline ${
            isEnabled ? "bg-[#6741D9]" : "bg-gray-400"
          } ${!chargeForSongs ? "opacity-50" : ""}`}
          style={{
            borderWidth: "1px",
            cursor: isEnabled ? "pointer" : "not-allowed",
          }}
        >
          Save
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default AdminDashboard;
