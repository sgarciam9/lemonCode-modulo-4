import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Member } from "../types";
import "../App.css";

function MembersList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialOrg = searchParams.get("org") ?? "lemoncode";

  const [organization, setOrganization] = useState(initialOrg);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

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
    fetchMembers(initialOrg);
  }, []);

  const handleSearch = () => {
    setSearchParams({ org: organization });
    fetchMembers(organization);
  };

  return (
    <div className="container">
      <h1>GitHub Members</h1>

      <header>
        <input
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          placeholder="Nombre de la organización"
        />
        <button onClick={handleSearch}>Buscar</button>
      </header>

      {loading && <p>Cargando...</p>}

      <div className="members-list">
        {members.map((member) => (
          <div
            key={member.id}
            className="member-card"
            onClick={() =>
              navigate(`/detail/${member.login}?org=${organization}`)
            }
          >
            <img src={member.avatar_url} alt={member.login} />
            <span>{member.login}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MembersList;
