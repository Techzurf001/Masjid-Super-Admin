import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMasjids, createMasjid } from "../redux/masjidSlice";

const MasjidComponent = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.masjid);

  const [form, setForm] = useState({
    masjidName: "",
    address: "",
    masjidId: "",
    status: true,
    createdBy: "admin",
  });

  useEffect(() => {
    dispatch(fetchMasjids());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = () => {
    console.log("Submitting Masjid:", form);
    dispatch(createMasjid(form));
    setForm({ masjidName: "", address: "", masjidId: "", status: true });
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      <div
        className="w-[400px] p-8 text-white font-sans flex flex-col gap-5"
        style={{
          background:
            "linear-gradient(#212121, #212121) padding-box, linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box",
          border: "2px solid transparent",
          borderRadius: "16px",
        }}
      >
        <form className="flex flex-col gap-5">
          {/* Masjid Name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="masjidName"
              className="text-[#717171] text-xs font-semibold"
            >
              Masjid Name
            </label>
            <input
              id="masjidName"
              name="masjidName"
              placeholder="Enter masjid name"
              value={form.masjidName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-white bg-transparent border border-[#414141] focus:outline-none focus:border-[#e81cff] placeholder:opacity-50"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="address"
              className="text-[#717171] text-xs font-semibold"
            >
              Address
            </label>
            <input
              id="address"
              name="address"
              placeholder="Enter address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-white bg-transparent border border-[#414141] focus:outline-none focus:border-[#e81cff] placeholder:opacity-50"
            />
          </div>

          {/* Masjid ID */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="masjidId"
              className="text-[#717171] text-xs font-semibold"
            >
              Masjid ID
            </label>
            <input
              id="masjidId"
              name="masjidId"
              placeholder="Enter unique ID"
              value={form.masjidId}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-white bg-transparent border border-[#414141] focus:outline-none focus:border-[#e81cff] placeholder:opacity-50"
            />
          </div>

          {/* Status */}
          <div className="flex items-center space-x-2">
            <input
              id="status"
              type="checkbox"
              name="status"
              checked={form.status}
              onChange={handleChange}
              className="w-4 h-4 text-[#e81cff] bg-transparent border-[#414141] focus:ring-[#e81cff] rounded"
            />
            <label htmlFor="status" className="text-sm text-white">
              Active
            </label>
          </div>

          {/* Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            className="self-start px-4 py-3 bg-[#313131] text-[#717171] font-semibold text-sm border border-[#414141] rounded-md hover:bg-white hover:text-black hover:border-white transition-transform active:scale-95"
          >
            Create
          </button>
        </form>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>

      {/* Masjid List */}
      <div className="w-full max-w-2xl">
        <h3 className="text-lg font-semibold mb-2">Masjid List</h3>
        {loading && <p>Loading...</p>}
        {!loading && data.length > 0 ? (
          <table className="w-full text-left border-collapse border border-[#414141]">
            <thead>
              <tr className="bg-[#313131] text-white">
                <th className="border border-[#414141] p-2">Name</th>
                <th className="border border-[#414141] p-2">Address</th>
                <th className="border border-[#414141] p-2">Masjid ID</th>
                <th className="border border-[#414141] p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...data]
                .sort((a, b) => a.masjidId.localeCompare(b.masjidId))
                .map(
                  (masjid, i) =>
                    masjid && (
                      <tr key={i} className="bg-[#1f1f1f] text-white">
                        <td className="border border-[#414141] p-2">
                          {masjid.masjidName}
                        </td>
                        <td className="border border-[#414141] p-2">
                          {masjid.address}
                        </td>
                        <td className="border border-[#414141] p-2">
                          {masjid.masjidId}
                        </td>
                        <td className="border border-[#414141] p-2">
                          {masjid.status ? "Active" : "Inactive"}
                        </td>
                      </tr>
                    )
                )}
            </tbody>
          </table>
        ) : (
          !loading && <p className="text-white">No masjids found.</p>
        )}
      </div>
    </div>
  );
};

export default MasjidComponent;
