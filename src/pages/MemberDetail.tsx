import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

interface MemberDetailData {
  login: string;
  avatar_url: string;
  html_url: string;
}

function MemberDetail() {
  const { login } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const org = searchParams.get("org") ?? "lemoncode";

  const [member, setMember] = useState<MemberDetailData | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((res) => res.json())
      .then((data) => setMember(data));
  }, [login]);

  if (!member) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="detail">
      <button onClick={() => navigate(`/?org=${org}`)}>⬅ Volver</button>

      <h2>{member.login}</h2>
      <img src={member.avatar_url} />
      <p>
        <a href={member.html_url} target="_blank">
          Ver perfil en GitHub
        </a>
      </p>
    </div>
  );
}

export default MemberDetail;
