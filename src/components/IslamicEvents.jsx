import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createIslamicFeatures,
  fetchIslamicFeatures,
} from "../redux/islamiceventsSlice";

const IslamicFeatures = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state) => state.islamicfeatures
  );

  const [form, setForm] = useState({
    eventName: "",
    date: "",
    description: "",
    reference: "",
  });

  useEffect(() => {
    dispatch(fetchIslamicFeatures());
  }, [dispatch]);

  // ───────────── Handlers ─────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = () => {
  if (!form.eventName || !form.date || !form.description || !form.reference) {
    alert("Please fill all required fields.");
    return;
  }

  const payload = {
    status: true,
    eventDetails: {
      eventName: form.eventName,
      date: form.date,
      description: form.description,
      reference: form.reference,
    },
  };

  console.log("Submitting payload:", payload);
  dispatch(createIslamicFeatures(payload));

  setForm({ eventName: "", date: "", description: "", reference: "" });
};


  // ───────────── UI ─────────────
  return (
    <div className="flex flex-col items-center space-y-6 p-6">
      {/* ───── Gradient-border form card ───── */}
      <div
        className="w-[400px] p-8 text-white font-sans flex flex-col gap-5"
        style={{
          background:
            "linear-gradient(#212121,#212121) padding-box,linear-gradient(145deg,transparent 35%,#e81cff,#40c9ff) border-box",
          border: "2px solid transparent",
          borderRadius: "16px",
        }}
      >
        <form className="flex flex-col gap-5">
          {/* Event name */}
          <InputBlock
            id="eventName"
            label="Event Name"
            value={form.eventName}
            onChange={handleChange}
            placeholder="Enter name"
          />

          {/* Date */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="date"
              className="text-[#717171] text-xs font-semibold"
            >
              Date
            </label>
            <input
              id="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg text-white bg-transparent border border-[#414141] focus:outline-none focus:border-[#e81cff]"
            />
          </div>

          {/* Description */}
          <InputBlock
            id="description"
            label="Description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter description"
          />

          {/* Reference */}
          <InputBlock
            id="reference"
            label="Reference"
            value={form.reference}
            onChange={handleChange}
            placeholder="Enter reference"
          />

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

      {/* ───── Table list ───── */}
      <div className="w-full max-w-4xl">
        <h3 className="text-lg font-semibold mb-2 text-white">
          Islamic Features
        </h3>
        {loading && <p className="text-white">Loading...</p>}
        {!loading && data.length > 0 ? (
          <table className="w-full text-left border-collapse border border-[#414141]">
            <thead>
              <tr className="bg-[#313131] text-white">
                <Th>Event</Th>
                <Th>Date</Th>
                <Th>Description</Th>
                <Th>Reference</Th>
              </tr>
            </thead>
            <tbody>
              {[...data]
                .sort(
                  (a, b) =>
                    new Date(a.eventDetails.date) -
                    new Date(b.eventDetails.date)
                )
                .map((row, idx) => (
                  <tr
                    key={row._id || idx}
                    className={
                      idx % 2
                        ? "bg-[#1f1f1f] text-white"
                        : "bg-[#252525] text-white"
                    }
                  >
                    <Td>{row.eventDetails.eventName}</Td>
                    <Td>{row.eventDetails.date?.slice(0, 10)}</Td>
                    <Td>{row.eventDetails.description}</Td>
                    <Td>{row.eventDetails.reference}</Td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          !loading && <p className="text-white">No records found.</p>
        )}
      </div>
    </div>
  );
};

/* ────────── tiny presentational helpers ────────── */
const InputBlock = ({ id, label, value, onChange, placeholder }) => (
  <div className="flex flex-col gap-1">
    <label htmlFor={id} className="text-[#717171] text-xs font-semibold">
      {label}
    </label>
    <input
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-lg text-white bg-transparent border border-[#414141] focus:outline-none focus:border-[#e81cff] placeholder:opacity-50"
    />
  </div>
);

const Th = ({ children }) => (
  <th className="border border-[#414141] p-2">{children}</th>
);
const Td = ({ children }) => (
  <td className="border border-[#414141] p-2">{children}</td>
);

export default IslamicFeatures;
