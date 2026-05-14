import React, { useEffect, useState } from "react";
import { CheckCircle, Eye, Trash2 } from "lucide-react";
import AdminTable from "../../components/admin/AdminTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteReport, getAllReports, resolveReport } from "../../features/admin/adminSlice";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const initialReports = [
  {
    id: 201,
    postPrompt: "Cyberpunk city in neon rain",
    reportedBy: "user_john",
    reason: "Inappropriate content",
    status: "Pending",
    postId: 101,
  },
  {
    id: 202,
    postPrompt: "Abstract geometry 4k",
    reportedBy: "art_police",
    reason: "Copyright infringement",
    status: "Pending",
    postId: 102,
  },
  {
    id: 203,
    postPrompt: "Space station orbiting mars",
    reportedBy: "astro_fan",
    reason: "Spam",
    status: "Resolved",
    postId: 103,
  },
];

export default function AdminReports() {
  const {
    users,
    posts,
    reports,
    adminLoading,
    adminSuccess,
    adminError,
    adminErrorMessage,
  } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {

    if (!adminError) {
      // Fetch All REPORTS
      dispatch(getAllReports());
    }

    if (adminError && adminErrorMessage) {
      toast.error(adminErrorMessage, { position: "top-center" });
    }
  }, [adminError, adminErrorMessage]);

   if (adminLoading) {
      return <Loader />;
    }
  

// repost-delete
  const handleDeleteReport = (rid) => {
    dispatch(deleteReport(rid))
}
// resport's Resolve
const handleResolveReport = (rid) => {
    dispatch(resolveReport(rid))
}

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-[#111118]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
        <div>
          <h2 className="text-2xl font-bold font-['Syne'] text-white">
            Incident Reports
          </h2>
          <p className="text-sm text-gray-400">
            Review and resolve user-flagged content
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-lg border border-yellow-500/20 font-medium text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            {reports.filter((r) => r.status === "Pending").length} Pending
          </div>
          <div className="bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg border border-green-500/20 font-medium text-sm">
            {reports.filter((r) => r.status === "Resolved").length} Resolved
          </div>
        </div>
      </div>

      <AdminTable
        columns={[
          "Report ID",
          "Target Post",
          "Reported By",
          "Reason",
          "Status",
          "Actions",
        ]}
      >
        {reports.map((report) => (
          <tr
            key={report._id}
            className="hover:bg-white/5 transition-colors group"
          >
            <td className="px-6 py-4">
              <span className="font-mono text-gray-400 bg-[#0a0a0f] px-2 py-1 rounded border border-white/5">
                #{report._id.slice(20)}
              </span>
            </td>
            <td className="px-6 py-4">
              <Link
                to={`/admin/reports/${report?.post?._id}`}
                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors flex items-center gap-1 text-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                {report?.post?._id?.slice(20)}
              </Link>
            </td>
            <td className="px-6 py-4">
              <span className="text-gray-400 text-sm">
                @{report?.user?.email}
              </span>
            </td>
            <td className="px-6 py-4 text-gray-300">{report?.text}</td>
            <td className="px-6 py-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${report.status === "Resolved" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"}`}
              >
                {report.status === "Resolved" ? "RESOLVED" : "PENDING"}
              </span>
            </td>
            <td className="px-6 py-4">
              <div className="flex gap-2">
                {report.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => handleResolveReport(report._id)}
                      className="cursor-pointer p-2 bg-white/5 hover:bg-green-500/20 text-gray-400 hover:text-green-400 rounded-lg transition-all"
                      title="Mark Resolved"
                    >
                    <CheckCircle className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReport(report._id)}
                      className="p-2 bg-white/5 hover:bg-pink-500/20 text-gray-400 hover:text-pink-400 rounded-lg transition-all"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <span className="text-gray-500 text-sm italic">Actioned</span>
                )}
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
