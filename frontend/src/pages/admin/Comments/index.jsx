import { useEffect, useState } from "react";
import { api } from "../../../api";

export default function AdminComments() {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  const load = () => api.getAdminComments().then((d) => setComments(d.comments)).catch((err) => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  const update = async (id, status) => {
    await api.updateCommentStatus(id, status);
    load();
  };

  const remove = async (id) => {
    await api.deleteAdminComment(id);
    load();
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-heading text-brand-navy">User Comments</h2>
        <p className="mt-1 text-sm text-brand-gray">Approve comments to show the latest three on the homepage. Admins can delete any comment at any time.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      <div className="space-y-3">
        {comments.length ? comments.map((comment) => (
          <div key={comment._id} className="rounded-xl bg-white shadow-sm p-5 flex flex-wrap justify-between gap-4">
            <div>
              <b className="text-brand-navy">{comment.name}</b>
              <p className="mt-1 text-sm text-brand-gray">{comment.message}</p>
              <p className="mt-2 text-xs capitalize text-brand-green">{comment.status}</p>
            </div>

            <div className="flex gap-2">
              {comment.status === "pending" && (
                <>
                  <button onClick={() => update(comment._id, "approved")} className="bg-brand-green text-white px-4 py-2 rounded-lg text-sm">Approve</button>
                  <button onClick={() => update(comment._id, "rejected")} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">Reject</button>
                </>
              )}
              <button onClick={() => remove(comment._id)} className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">Delete</button>
            </div>
          </div>
        )) : (
          <div className="rounded-2xl bg-white shadow-md p-8 text-center text-sm text-brand-gray">No user comments have been submitted yet.</div>
        )}
      </div>
    </div>
  );
}
