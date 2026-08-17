import { useEffect } from "react";

export default function AppointmentSuccessModal({ isOpen, onClose, appointmentData }) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const appointmentDate = appointmentData?.date
    ? new Date(appointmentData.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-xl overflow-hidden animate-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-green-500 to-brand-green p-8 text-white text-center">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold font-heading">Success!</h2>
          <p className="text-white/90 mt-2">Your appointment request has been received</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-800">
              Your appointment request has been submitted successfully and is currently
              <strong> pending confirmation</strong>. You can track its status from your
              dashboard.
            </p>
          </div>

          {appointmentData && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-gray-600">Department:</span>
                <span className="font-semibold text-brand-navy">{appointmentData.department}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-600">Date:</span>
                <span className="font-semibold text-brand-navy">{appointmentDate}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-600">Time:</span>
                <span className="font-semibold text-brand-navy">{appointmentData.time}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold text-yellow-600">Pending</span>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-xs text-blue-800">
              📧 An admin confirmation email has been sent. You'll receive a confirmation once
              our team reviews your request.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-semibold py-3 rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
