import React, { useState } from "react";
import axios from "axios";

const ClusterForm = () => {
  const [k, setK] = useState<number>(2); // Default number of groups
  const [groups, setGroups] = useState<any[][]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/cluster-students",
        { k }
      );
      setGroups(response.data.groups);
    } catch (error) {
      console.error("Could not fetch groups", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Groups (k):
          <input
            type="number"
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
          />
        </label>
        <button type="submit">Cluster Students</button>
      </form>
      <div>
        {groups.map((group, index) => (
          <div key={index}>
            <h3>Group {index + 1}</h3>
            <ul>
              {group.map((student: string) => (
                <li key={student}>{student}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClusterForm;
