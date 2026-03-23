export default function PassengerForm({ passengers, setPassengers }) {
  const updatePassenger = (index, field, value) => {
    const next = passengers.map((passenger, passengerIndex) =>
      passengerIndex === index ? { ...passenger, [field]: value } : passenger
    );
    setPassengers(next);
  };

  const addPassenger = () => {
    setPassengers([
      ...passengers,
      { firstName: "", lastName: "", age: "", gender: "Male", passportNumber: "" }
    ]);
  };

  const removePassenger = (index) => {
    if (passengers.length === 1) return;
    setPassengers(passengers.filter((_, passengerIndex) => passengerIndex !== index));
  };

  return (
    <div className="passenger-stack">
      {passengers.map((passenger, index) => (
        <div className="glass-card passenger-card" key={`${index}-${passenger.passportNumber}`}>
          <div className="section-header">
            <h3>Passenger {index + 1}</h3>
            <button type="button" className="button ghost" onClick={() => removePassenger(index)}>
              Remove
            </button>
          </div>
          <div className="form-grid">
            {[
              ["firstName", "First name"],
              ["lastName", "Last name"],
              ["age", "Age"],
              ["passportNumber", "Passport number"]
            ].map(([field, label]) => (
              <label key={field} className="input-group">
                <span>{label}</span>
                <input
                  value={passenger[field]}
                  onChange={(event) => updatePassenger(index, field, event.target.value)}
                />
              </label>
            ))}
            <label className="input-group">
              <span>Gender</span>
              <select
                value={passenger.gender}
                onChange={(event) => updatePassenger(index, "gender", event.target.value)}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>
          </div>
        </div>
      ))}
      <button type="button" className="button ghost" onClick={addPassenger}>
        Add Passenger
      </button>
    </div>
  );
}
