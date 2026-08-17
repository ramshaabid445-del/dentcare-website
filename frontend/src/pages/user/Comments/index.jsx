import { useState } from "react";
import { api } from "../../../api";

export default function UserComments() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    try {
      await api.createComment({ message });
      setMessage("");
      setStatus("Your comment was sent for admin approval.");
    } catch (err) {
      setStatus(err.message);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-heading text-brand-navy">Comment for Admin</h2>
        <p className="mt-1 text-sm text-brand-gray">Approved comments may be shown on the homepage.</p>
      </div>
      <form onSubmit={submit} className="rounded-2xl bg-white shadow-md p-4 sm:p-7">
        <label className="block text-sm font-semibold text-brand-navy mb-3">Your experience</label>
        <textarea
          required
          maxLength="500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your experience..."
          className="w-full min-h-44 rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
        />
        {status && <p className="mt-4 text-sm text-brand-green">{status}</p>}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs text-brand-gray">{message.length}/500 characters</p>
          <button className="bg-brand-green hover:bg-brand-green-dark text-white px-6 py-3 rounded-xl text-sm font-semibold whitespace-nowrap">
            Send for Approval
          </button>
        </div>
      </form>
    </div>
  );
}