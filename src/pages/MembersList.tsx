import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Member } from "../types";

function MembersList() {
  const [organization, setOrganization] = useState("lemoncode");
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchMembers = (org: string) => {
    setLoading(true);
    fetch(`https://api.github.com/orgs/${org}/members`)
      .then((res) => res.json())
      .then((data: Member[]) => {
        setMembers(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMembers(organization);
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Miembros de GitHub</h1>

      <input
        value={organization}
        onChange={(e) => setOrganization(e.target.value)}
      />
      <button onClick={() => fetchMembers(organization)}>Buscar</button>

      {loading && <p>Cargando...</p>}

      <ul>
        {members.map((member) => (
          <li
            key={member.id}
            style={{ cursor: "pointer", marginBottom: "1rem" }}
            onClick={() => navigate(`/detail/${member.login}`)}
          >
            <img
              src={member.avatar_url}
              width={50}
              style={{ borderRadius: "50%", marginRight: "1rem" }}
            />
            {member.login}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MembersList;
