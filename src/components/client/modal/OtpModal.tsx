/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button, Modal } from "flowbite-react";
import { useState, useEffect, useRef } from "react";

export function OtpModal({
  email,
  onVerify,
  onResend,
  onCancel,
}: {
  email: string;
  onVerify: (otp: string) => void;
  onResend: () => void;
  onCancel: () => void;
}) {
  const [openModal, setOpenModal] = useState(true);
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [timer, setTimer] = useState(
    parseInt(sessionStorage.getItem("otpTimer") || "60")
  );

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (timer > 0) {
      sessionStorage.setItem("otpTimer", timer.toString());
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      sessionStorage.removeItem("otpTimer");
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    onVerify(otpString);
  };

  const handleCancel = () => {
    setOpenModal(false);
    onCancel();
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <>
      <Modal show={openModal}>
        <Modal.Body className="bg-gray-700 rounded-lg">
          <div className="space-y-6 p-6">
            <h2 className="text-white">Enter OTP sent to {email}</h2>
            <div className="flex justify-center space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-14 h-14 p-2 text-center bg-gray-800 text-white rounded-lg text-2xl"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>
            <div className="text-white text-center">
              {timer > 0 ? (
                `Resend OTP in ${timer}s`
              ) : (
                <Button
                  color="gray"
                  onClick={() => {
                    onResend();
                    setTimer(60);
                  }}
                >
                  Resend OTP
                </Button>
              )}
            </div>
            <Button onClick={handleVerify} className="w-full mt-4">
              Verify OTP
            </Button>
            <Button onClick={handleCancel} className="w-full mt-4" color="gray">
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
